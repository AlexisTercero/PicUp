import { Fragment, useState } from 'react';
import NavBar from './components/NavBar';
// import UploadForm from './components/UploadForm';
import Images from './components/Images';
import styled from '@emotion/styled';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [listUpdated, setListUpdated] = useState(false); //estado para actualizar la lista de imagenes a mostrar en pantalla
  return (
    <Fragment>
      <Pagina>
        <NavBar setListUpdated={setListUpdated} />
        <Contenedor>
          {/* <UploadForm setListUpdated={setListUpdated}></UploadForm> */}
          <Images
            listUpdated={listUpdated}
            setListUpdated={setListUpdated}
          ></Images>
        </Contenedor>
        <Footer />
      </Pagina>
    </Fragment>
  );
}

const Contenedor = styled.div`
  max-width: 60vw;
  margin: 3vh auto;
  flex: 1;
  @media (max-width: 600px) {
    max-width: 300px;
    margin: 1vh auto;
  }
`;

const Pagina = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0 auto;
  @media (max-width: 500px) {
  }
`;
export default App;
