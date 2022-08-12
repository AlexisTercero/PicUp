import React from 'react';
import { useState, useEffect } from 'react';

function Images(props) {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9000/images/get')
      .then((res) => res.json())
      .then((res) => setImageList(res))
      .catch((err) => {
        console.error(err);
      });
    props.setListUpdated(false); //reseteo a false el estado de la lista de imagenes luego de ejecutar el useEffect
  }, [props.listUpdated]); //el useEffect espera cambios en el estado de la lista de imagenes para ejecutarse

  return (
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
        </div>
      ))}
    </div>
  );
}

export default Images;
