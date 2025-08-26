import React, { useState, useEffect } from 'react';
import { Container } from './Home.styles';
import SearchForm from '../../components/SearchForm/SearchForm';
import UploadGoogleSheetForm from '../../components/UploadForm/UploadForm';
import RemoveUpload from '../../components/RemoveUpload/RemoveUpload';
import ReauthModal from '../../components/ReauthModal/ReauthModal';
import CaptchaModal from '../../components/CaptchaModal/CaptchaModal';
import LoadingSpinner from '../../components/LoadingModal/LoadingModal';
import SheetsList from '../../components/UserSheets/UserSheets';
import io from 'socket.io-client';

// sheet functions
import { getAllSheets } from '../../api/user'; 

const socket = io('http://localhost:5000'); 

const Home = () => {
  const [masterSheetTitle, setMasterSheetTitle] = useState('');
  const [sheetUploaded, setSheetUploaded] = useState(''); 
  const [numOfUploadLeads, setNumOfUploadLeads] = useState(0);
  const [showReauthModal, setShowReauthModal] = useState(false);
  const [showCaptchaModal, setShowCaptchaModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userSheets, setUserSheets] = useState([]); // state to hold user sheets

  useEffect(() => {
    const userSheets = async () => {
      try {
        const sheets = await getAllSheets();
        console.log("Fetched sheets:", sheets);
        // filter out master sheets to get only user-uploaded sheets
        const nonMasterSheets = sheets.filter(sheet => sheet.isMaster === false);
        setUserSheets(nonMasterSheets);
      } catch (error) {
        console.error("Error fetching sheets:", error);
      }
    }

    userSheets();
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);
    });
  
    socket.on("disconnect", () => {
      console.log("Disconnected from socket");
    });
  }, []);

  useEffect(() => {
    const handleCaptcha = () => {
      console.log('received captchaRequired event');
      setIsLoading(false);
      setShowCaptchaModal(true);
    };
  
    socket.on('captchaRequired', handleCaptcha);
  
    return () => {
      socket.off('captchaRequired', handleCaptcha);
    };
  }, []);

  const handleCaptchaSolved = () => {
    socket.emit('captchaSolved'); 
    console.log('Captcha solved, emitted event to server');
    setShowCaptchaModal(false);
    setIsLoading(true)
  };


  return (
    <Container>
      <h1>Summon your leads</h1>

      {!sheetUploaded && (
        <UploadGoogleSheetForm 
          setSheetUploaded={setSheetUploaded} 
          setNumOfUploadLeads={setNumOfUploadLeads} 
          onAuthError={() => setShowReauthModal(true)}
          setMasterSheetTitle={setMasterSheetTitle}
        />
      )}

      {sheetUploaded && (
        <RemoveUpload 
          setSheetUploaded={setSheetUploaded} 
          sheetUploaded={sheetUploaded} 
          numOfUploadLeads={numOfUploadLeads}
          masterSheetTitle={masterSheetTitle}
        />
      )}

      <SearchForm 
        loading={setIsLoading}
      />

      <SheetsList sheets={userSheets} />

      <ReauthModal 
        show={showReauthModal} 
        onClose={() => setShowReauthModal(false)} 
      />

      <CaptchaModal 
        show={showCaptchaModal} 
        onSolve={handleCaptchaSolved} 
      />

      <LoadingSpinner 
        show={isLoading} 
      />
    </Container>
  )
}

export default Home