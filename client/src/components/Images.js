import React from 'react';
import { useState, useEffect } from 'react';

function Images() {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9000/images/get')
      .then((res) => res.json())
      .then((res) => setImageList(res))
      .catch((err) => {
        console.error(err);
      });
  }, []);

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
