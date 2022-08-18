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
      <div
        className="divimgs container "
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
              style={{ maxHeight: '200px', maxWidth: '200px' }}
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
        style={{
          content: {
            height: '800px',
            backgroundColor: 'black',
            left: '20%',
            right: '20%',
          },
        }}
        isOpen={modalIsOpen}
        onRequestClose={() => modalHandler(false, null)}
      >
        <div
          style={{
            backgroundColor: 'red',
          }}
          className="card"
        >
          <img
            src={'http://localhost:9000/' + currentImage}
            alt="..."
            style={{
              margin: '0 auto',
              height: 'auto',
              width: 'auto',
              maxHeight: '100%',
              maxWidth: '100%',
            }}
          />
          <div
            style={{
              backgroundColor: 'red',
            }}
            className="card-body"
          >
            <button onClick={() => deleteHandler()} className="btn btn-danger">
              DELETE
            </button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

export default Images;
