const express = require('express');

const app = express();

// DK 9

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));

// ROUTES
app.get('/', (req, res) => {
  res.status(200).render('index', {
    page_name: "index",
  });
  // res.status(200).send('index');
});

app.get('/about', (req, res) => {
  res.status(200).render('about', {
    page_name: "about",
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`app started on port ${port}`);
});
