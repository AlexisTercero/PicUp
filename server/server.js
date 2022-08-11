const express = require('express'); //requiero express
const mysql = require('mysql'); //requiero mysql
const myconn = require('express-myconnection'); //requiero express-myconncection
const path = require('path');

const cors = require('cors'); //requiero cors permite realizar peticiones desde el cliente

const app = express(); //ejecuto express

app.use(
  myconn(mysql, {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'abcd1234',
    database: 'PicUp',
  })
);

app.use(cors());
app.use(express.static(path.join(__dirname, 'dbimages'))); //agrego como carpeta estatica a /dbimages para que pueda ser accedida desde el navegador

app.use(require('./routes/routes')); //requiero y uso las routes

app.listen(9000, () => {
  console.log('Server runing on', 'http://localhost:' + 9000);
});
