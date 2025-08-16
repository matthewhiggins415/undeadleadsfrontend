import React, { useState } from 'react';
import { Container } from './Home.styles';
import SearchForm from '../../components/SearchForm/SearchForm';
import UploadGoogleSheetForm from '../../components/UploadForm/UploadForm';
import RemoveUpload from '../../components/RemoveUpload/RemoveUpload';
import ReauthModal from '../../components/ReauthModal/ReauthModal';

const Home = () => {
  const [sheetUploaded, setSheetUploaded] = useState(''); 
  const [numOfUploadLeads, setNumOfUploadLeads] = useState(0);
  const [showReauthModal, setShowReauthModal] = useState(false);

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

      <SearchForm />

      <ReauthModal 
        show={showReauthModal} 
        onClose={() => setShowReauthModal(false)} 
      />
    </Container>
  )
}

export default Home