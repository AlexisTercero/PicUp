const express = require('express');
const multer = require('multer'); //requiero multer,middleware maneja data para subir archivos.
const path = require('path'); //requiero modulo path para usar el metodo join() para unir dos rutas
const fs = require('fs'); // requiero  fs para leer el archivo y poder mandarlo a la base de datos

const router = express.Router();

const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, '../images'),
  //determina carpeta en donde los archivos son subidos, la carpeta será creada automaticamente por multer.
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-PicUp!-' + file.originalname);
  }, //determina un nombre de archivo unico
}); //almacenamiento en el disco mediante los metodos de multer.

const fileUpload = multer({
  storage: diskstorage, // indico donde y como guardar el archivo apuntando a lo definido en diskstorage
}).single('image'); //indico que acepte un solo archivo y que su fieldname sea "image" definido en el formateo de data en el formulario en del lado del cliente,UploadForm.js

router.get('/', (req, res) => {
  res.send('Welcome to PicUp!');
});

router.post('/images/post', fileUpload, (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(500).send('server error'); // valido si hay algun error

    const type = req.file.mimetype; //guardo el tipo de archivo
    const name = req.file.originalname; //guardo el nombre del archivo
    const data = fs.readFileSync(
      path.join(__dirname, '../images/' + req.file.filename)
    ); //leo el archivo y lo guardo en la constante data

    conn.query(
      'INSERT INTO image set ?',
      [{ type, name, data }],
      (err, rows) => {
        if (err) return res.status(500).send('server error');

        res.send('Pic saved!');
      }
    ); //realizo la conexion mediante una query
  });
});

router.get('/images/get', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(500).send('server error'); // valido si hay algun error

    conn.query('SELECT * FROM image', (err, rows) => {
      if (err) return res.status(500).send('server error');

      rows.map((img) => {
        fs.writeFileSync(
          path.join(__dirname, '../dbimages/' + img.id + 'PicUp.png'),
          img.data
        );
      }); //mapeo las imagenes de la base de datos y las guardo en una carpeta temporal.

      const imagedir = fs.readdirSync(path.join(__dirname, '../dbimages/')); //leo los archivos de la carpeta temporal y guardo ese array en una constante

      res.json(imagedir);
    }); //realizo la conexion mediante una query
  });
});

router.delete('/images/delete/:id', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(500).send('server error'); // valido si hay algun error

    conn.query(
      'DELETE FROM image WHERE id = ?',
      [req.params.id], //elimino imagen de la base de datos
      (err, rows) => {
        if (err) return res.status(500).send('server error');

        fs.unlinkSync(
          path.join(__dirname, '../dbimages/' + req.params.id + 'PicUp.png')
        ); //elimino imagen de la carpeta dbimages

        res.send('image deleted');
      }
    );
  });
});

module.exports = router;
