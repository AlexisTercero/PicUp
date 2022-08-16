import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import Modal from 'react-modal';

function Images(props) {
  const [imageList, setImageList] = useState([]);
  const [modalIsOpen, setmodalIsOpen] = useState(false); //state para manejar el modal de apertura de imagenes
  const [currentImage, setcurrentImage] = useState(null); //state para asignar la imagen que debe abrirse en el modal

  useEffect(() => {
    Modal.setAppElement('body'); //seteo el modal atandolo a body

    fetch('http://localhost:9000/images/get')
      .then((res) => res.json())
      .then((res) => setImageList(res))
      .catch((err) => {
        console.error(err);
      });
    props.setListUpdated(false); //reseteo a false el estado de la lista de imagenes luego de ejecutar el useEffect
  }, [props.listUpdated]); //el useEffect espera cambios en el estado de la lista de imagenes para ejecutarse

  const modalHandler = (isOpen, image) => {
    setmodalIsOpen(isOpen);
    setcurrentImage(image);
  }; //funcion para manejar la apertura del modal y asignar la imagen correspondiente

  return (
    <Fragment>
      <div
        className="container mt-3"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {imageList.map((image) => (
          <div key={image} className="card m-2">
            <img
              src={'http://localhost:9000/' + image}
              alt="..."
              className="card-img-top"
              style={{ height: '200px', maxwidth: '300px' }}
            ></img>
            <div className="card-body">
              <button
                onClick={() => modalHandler(true, image)} //el state cambia a true para que se abra el Modal  y se asigna la imagen cuando se hace click
                className="btn btn-dark"
              >
                Open
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => modalHandler(false, null)}
      >
        <div className="card">
          <img src={'http://localhost:9000/' + currentImage} alt="..." />
          <div className="card-body">
            <button className="btn btn-danger">X</button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

export default Images;
