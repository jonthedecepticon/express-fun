var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { title : 'Welcome' });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact/send', (req, res) => {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'blah@gmail.com',
      pass: ''
    }
  });
  var mailOptions = {
    from: 'Jon Lambson <blah@gmail.com>',
    to: 'blah@gmail.com',
    subject: 'Website Submission',
    text: 'blah blah blah blah. Name: ' + req.body.name + ' Email: ' + req.body.email + ' Message: ' + req.body.message,
    html: '<p>asdflkjasd asdf asdfjasdk lasdf</p>'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.redirect('/');
    } else {
      console.log('Message Sent: ', info.response);
      res.redirect('/');
    }
  });
});

app.listen(3000);

console.log("Server is running on port 3000....");
