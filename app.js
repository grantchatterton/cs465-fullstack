var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
var mongoose = require('mongoose');
require('./app_server/models/db');

var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
const travelRouter = require('./app_server/routes/travel');
const roomsRouter = require('./app_server/routes/rooms');
const mealsRouter = require('./app_server/routes/meals');
const newsRouter = require('./app_server/routes/news');
const aboutRouter = require('./app_server/routes/about');
const contactRouter = require('./app_server/routes/contact');

var app = express();

// if true, populates the db w/ starter trip data
const popStartTrips = true;

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// register handlebars partials
hbs.registerPartials(path.join(__dirname, 'app_server', 'views/partials'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/rooms', roomsRouter);
app.use('/meals', mealsRouter);
app.use('/news', newsRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// there is likely a MUCH better way to do this...
const popStartTripsFunc = () => {
  const printMsg = (msg, div) => {
    if (div == null) {
      div = false;
    }

    const tag = '[ app.js : popStartTripsFunc ]';

    if (div) {
      console.log(`${tag} : =======================================`);
    }

    console.log(`${tag} : ${msg}`);
  };

  if (popStartTrips) {
    const fs = require('fs');
    const Trip = require(path.join(__dirname, 'app_server', 'models', 'travlr'));
  
    // Remove all current trips from the DB
    printMsg('Clearing DB before adding starter trip data...');
    Trip.deleteMany({}).exec()
      .then((value) => {
        printMsg(`Removed ${value.deletedCount} documents from the DB.`);

        // Fetch the abs. path to the "data/trips.json" file
        const tripsJson = path.join(__dirname, 'data', 'trips.json');
        printMsg(`Parsing ${tripsJson}...`, true);
        fs.readFile(tripsJson, 'utf8', (error, data) => {
            if (error) {
                printMsg(error, false);
                return;
            }

            const parsedData = JSON.parse(data);
            for (let i = 1; parsedData[i] != null; ++i) {
              const newTrip = new Trip(parsedData[i]);
              newTrip.save()
                .then((value) => {
                  printMsg(`Added trip to DB: ${value.name} (${value.code}).`);
                });
            }
        });
      });
  }
};

mongoose.connection.on("connected", () => {
  console.log("[ app.js ] Mongoose connected!");
  popStartTripsFunc();
});

module.exports = app;