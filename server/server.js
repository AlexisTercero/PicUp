const express = require('express'); //requiero express

const app = express(); //ejecuto express

app.use(require('./routes/routes')); //requiero y uso las routes

app.listen(9000, () => {
  console.log('Server runing on', 'http://localhost:' + 9000);
});
