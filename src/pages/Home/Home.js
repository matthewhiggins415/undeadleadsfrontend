import React, { useState, useEffect } from 'react';
import { Container } from './Home.styles';
import SearchForm from '../../components/SearchForm/SearchForm';
import UploadGoogleSheetForm from '../../components/UploadForm/UploadForm';
import RemoveUpload from '../../components/RemoveUpload/RemoveUpload';
import ReauthModal from '../../components/ReauthModal/ReauthModal';
import CaptchaModal from '../../components/CaptchaModal/CaptchaModal';
import LoadingSpinner from '../../components/LoadingModal/LoadingModal';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); 

const Home = () => {
  const [sheetUploaded, setSheetUploaded] = useState(''); 
  const [numOfUploadLeads, setNumOfUploadLeads] = useState(0);
  const [showReauthModal, setShowReauthModal] = useState(false);
  const [showCaptchaModal, setShowCaptchaModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
          onAuthError={() => setShowReauthModal(true)} // pass handler
        />
      )}

      {sheetUploaded && (
        <RemoveUpload setSheetUploaded={setSheetUploaded} sheetUploaded={sheetUploaded} numOfUploadLeads={numOfUploadLeads}/>
      )}

      <SearchForm 
        loading={setIsLoading}
      />

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