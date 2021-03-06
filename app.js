const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose'),
methodOverride = require("method-override");
const path = require('path');
const passport = require('passport');
const multer = require('multer');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();
app.use(methodOverride("_method"));

// Passport Config
require('./config/passport')(passport);

// Connect to MongoDB
mongoose
  .connect(
    'mongodb+srv://ChamanRaghav:Raghav%4061@projecttasks-uw9iy.mongodb.net/test?retryWrites=true',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(multer().single('image'));
// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.login = req.isAuthenticated();
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/subject',require('./routes/subjects'));
app.use('/users', require('./routes/users.js'));
app.use('/student',require('./routes/students'));
app.use('/note', require('./routes/notification.js'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
