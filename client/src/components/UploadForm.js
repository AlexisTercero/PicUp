import React from 'react';
import { useState } from 'react';

function UploadForm(props) {
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
        props.setListUpdated(true); //cambio el estado de la lista de imagenes a true, viene por props desde App.js
      })
      .catch((err) => {
        console.error(err);
      }); //envio la data al servidor

    document.getElementById('fileinput').value = null; //reseteo el formulario

    setFile(null); // reseteo el State a null para que no quede ocupado por la imagen.
  };
  return (
    <div className="container mt-5">
      <div className="card p-3">
        <div className="row">
          <div className="col-10">
            <input
              id="fileinput"
              onChange={selectedHandler}
              className="form-control"
              type="file"
              accept="image/*"
            />
          </div>
          <div className="col-2">
            <button
              onClick={sendHandler}
              type="button"
              className="btn btn-primary col-12"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadForm;
