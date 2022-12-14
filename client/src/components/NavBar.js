import React from 'react';
import { useState } from 'react';
import './NavBar.css';

function NavBar(props) {
  const [file, setFile] = useState(null);

  const selectedHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const sendHandler = () => {
    if (!file) {
      alert('Please select a picture to upload');
      return;
    } //Valido que se haya seleccionado una imagen

    const formdata = new FormData();
    formdata.append('image', file); //formateo la data para enviarla al servidor

    fetch('http://localhost:9000/images/post', {
      method: 'POST',
      body: formdata,
    })
      .then((res) => res.text())
      .then((res) => {
        console.log(res);
        props.setListUpdated(true); //cambio el estado de la lista de imagenes a true luego de ser actualizada, viene por props desde App.js
      })
      .catch((err) => {
        console.error(err);
      }); //envio la data al servidor

    document.getElementById('fileinput').value = null; //reseteo el formulario

    setFile(null); // reseteo el State a null para que no quede ocupado por la imagen.
  };
  return (
    <div>
      <nav id="navmenu">
        <div className="contenedorNav">
          <a href="/" id="logo">
            <img src="/images/logo-picup.svg" alt=" logo" />
          </a>
          <form>
            <div>
              <label className="custom-file-upload">
                <input
                  id="fileinput"
                  onChange={selectedHandler}
                  className="form-control"
                  type="file"
                  accept="image/*"
                />
                Pic...
              </label>
              <button onClick={sendHandler} type="submit" className="btn-up">
                Up!
              </button>
            </div>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
