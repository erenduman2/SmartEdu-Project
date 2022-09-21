const express = require('express');
const mongoose = require('mongoose');

const pageRoute = require('./routes/pageRoutes');
const courseRoute = require('./routes/courseRoutes');
const bodyParser = require('body-parser'); 

const app = express();
// 8.42 dk
// CONNECT DB
mongoose
  .connect('mongodb://localhost/smartedu_db')
  .then(() => {
    console.log('DB connected.');
  })
  .catch((err) => {
    console.log(err);
  });

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// ROUTES
app.use('/', pageRoute);
app.use('/courses', courseRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`app started on port ${port}`);
});
