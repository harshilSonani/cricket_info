const express = require("express");
const cricketC = require("../controller/countryController");
const app = express.Router();
const teamsModel = require('../model/teamsModel');
const passport = require('passport');

app.get('/addCricket',passport.checkAuthentication, cricketC.addCricket);

app.post('/insertTemas', passport.checkAuthentication, teamsModel.uploadFlags, cricketC.insertTemas);

app.get('/show_circketRecord',passport.checkAuthentication, cricketC.show_circketRecord);

app.get('/deleteCricketRecord/:id',passport.checkAuthentication, cricketC.deleteCricketRecord);

app.get('/updateAdminRecord/:id', passport.checkAuthentication, cricketC.updateAdminRecord);

app.post('/update', passport.checkAuthentication, cricketC.update)



module.exports = app;