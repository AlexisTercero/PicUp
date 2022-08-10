const express = require('express');
const multer = require('multer'); //requiero multer,middleware maneja data para subirla.

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to PictureThis!');
});

router.post('/images/post', (req, res) => {
  console.log(req.files);
});

module.exports = router;
