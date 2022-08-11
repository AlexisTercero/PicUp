import { Fragment, useState } from 'react';
import NavBar from './components/NavBar';
import UploadForm from './components/UploadForm';
import Images from './components/Images';
import './App.css';

function App() {
  return (
    <Fragment>
      <NavBar></NavBar>
      <UploadForm></UploadForm>
      <Images></Images>
    </Fragment>
  );
}

export default App;
