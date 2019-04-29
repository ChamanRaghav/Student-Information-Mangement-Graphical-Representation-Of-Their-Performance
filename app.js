const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose'),
methodOverride = require("method-override");
const path = require('path');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();
app.use(methodOverride("_method"));


// Passport Config
require('./config/passport')(passport);


// Connect to MongoDB
mongoose
  .connect(
    "mongodb://localhost:27017/studentDetail",
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, '/style')));
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

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
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/courses', require('./routes/courses.js'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
