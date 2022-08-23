import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Images.css';

function Images(props) {
  const [imageList, setImageList] = useState([]);
  const [currentImage, setcurrentImage] = useState(null); //state para asignar la imagen que debe abrirse en el modal
  const [modalIsOpen, setmodalIsOpen] = useState(false); //state para manejar el modal de apertura de imagenes

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

  const deleteHandler = () => {
    let imageID = currentImage.split('P');
    imageID = parseInt(imageID[0]);

    console.log(imageID);

    fetch('http://localhost:9000/images/delete/' + imageID, {
      method: 'DELETE',
    })
      .then((res) => res.text())
      .then((res) => console.log(res));
    setmodalIsOpen(false);
    props.setListUpdated(true);
  };

  return (
    <Fragment>
      <div className="divimgs">
        {imageList.map((image) => (
          <div
            className="divimg"
            key={image}
            onClick={() => modalHandler(true, image)} //el state cambia a true para que se abra el Modal  y se asigna la imagen cuando se hace click
          >
            <img
              src={'http://localhost:9000/' + image}
              alt="..."
              className="pic"
            ></img>
            <p className="img__description">Open!</p>
          </div>
        ))}
      </div>
      <Modal
        style={{
          content: {
            margin: '0 auto',
            height: '40vh',
            backgroundColor: 'transparent',
            width: '40vw',
            height: 'fit-content',
            border: 'none',
          },
          overlay: {
            zIndex: 1000,
            backgroundColor: 'rgb(0 0 0 / 90%)',
          },
        }}
        isOpen={modalIsOpen}
        onRequestClose={() => modalHandler(false, null)}
      >
        <div className="imgmodal-wrapper">
          <img
            src={'http://localhost:9000/' + currentImage}
            alt="..."
            className="img-modal"
          />
          <button onClick={() => deleteHandler()} className="button-delete">
            DELETE
          </button>
        </div>
      </Modal>
    </Fragment>
  );
}

export default Images;
