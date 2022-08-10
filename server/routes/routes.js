const express = require('express');
const multer = require('multer'); //requiero multer,middleware maneja data para subir archivos.
const path = require('path'); //requiero modulo path para usar el metodo join() para unir dos rutas

const router = express.Router();

const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, '../images'),
  //determina capeta en donde los archivos son subidos, la carpeta será creada automaticamente por multer.
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
  console.log(req.file);
  res.send('PicUp!');
});

module.exports = router;
