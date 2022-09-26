const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const pageRoute = require('./routes/pageRoutes');
const courseRoute = require('./routes/courseRoutes');
const categoryRoute = require('./routes/categoryRoutes');
const userRoute = require('./routes/userRoute');
const bodyParser = require('body-parser');

const app = express();
// 29 dk
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

// GLOBAL VARIABLES
global.userIN = null;

// MIDDLEWARES
app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu_db' }), // session'ları saklamak için
  })
);

// ROUTES
// herhangi bir yönlendime olduğudna eğer userID varsa onu userIN'e atar
// null kalırsa kullanıcı giriş yapmamış demektir
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`app started on port ${port}`);
});
