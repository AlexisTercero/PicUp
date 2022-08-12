import { Fragment, useState } from 'react';
import NavBar from './components/NavBar';
import UploadForm from './components/UploadForm';
import Images from './components/Images';
import './App.css';

function App() {
  const [listUpdated, setListUpdated] = useState(false); //estado para actualizar la lista de imagenes a mostrar en pantalla
  return (
    <Fragment>
      <NavBar></NavBar>
      <UploadForm setListUpdated={setListUpdated}></UploadForm>
      <Images
        listUpdated={listUpdated}
        setListUpdated={setListUpdated}
      ></Images>
    </Fragment>
  );
}

export default App;
