import { Fragment, useState } from 'react';
import NavBar from './components/NavBar';
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
  width: 935px;
  margin: 1vh auto 6vh;
  flex: 1;
  @media (max-width: 1020px) {
    width: 704px;
  }
  @media (max-width: 600px) {
    margin: 1vh auto;
  }
`;

const Pagina = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0 auto;
`;
export default App;
