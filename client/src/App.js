import { Fragment, useState } from 'react';
import NavBar from './components/NavBar';
import UploadForm from './components/UploadForm';
import './App.css';

function App() {
  return (
    <Fragment>
      <NavBar></NavBar>
      <UploadForm></UploadForm>
    </Fragment>
  );
}

export default App;
