const express = require('express');
const fs = require('fs');
var exphbs  = require('express-handlebars');


var app = express();

const port = process.env.PORT || 3000;


app.engine('handlebars', exphbs(
  {defaultLayout: 'main',
  partialsDir: __dirname + '/views/partials/'}
));
app.set('view engine', 'handlebars');

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log)

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log(`${err} occurrred!`)
    }
  })

  next();
})

// app.use((req, res, next) => {
//   res.render('maintance'); 
// })

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home', {
    welcomeMessage: "no Elo"
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'my title from server js',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({
    "errorMesage": "that's so bad!"
  });
});

// app.listen(3000, () => {
//   console.log('server is up on port 3000');
// });

//to heroku
app.listen(port, () => {
  console.log(`listeting on ${port}`);
});