import React, { useState } from 'react';
import { Container } from './Home.styles';
import SearchForm from '../../components/SearchForm/SearchForm';
import UploadGoogleSheetForm from '../../components/UploadForm/UploadForm';
import RemoveUpload from '../../components/RemoveUpload/RemoveUpload';

const Home = () => {
  const [sheetUploaded, setSheetUploaded] = useState(''); 
  const [numOfUploadLeads, setNumOfUploadLeads] = useState(0);

  return (
    <Container>
      <h1>Summon your leads</h1>

      {!sheetUploaded && (
        <UploadGoogleSheetForm setSheetUploaded={setSheetUploaded} setNumOfUploadLeads={setNumOfUploadLeads} />
      )}

      {sheetUploaded && (
        <RemoveUpload setSheetUploaded={setSheetUploaded} sheetUploaded={sheetUploaded} numOfUploadLeads={numOfUploadLeads}/>
      )}

      <SearchForm />
    </Container>
  )
}

export default Home