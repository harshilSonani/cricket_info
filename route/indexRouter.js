const express = require('express')
const adminC = require('../controller/adminController');
const app  = express.Router();
const passport = require('passport')


app.get('/', adminC.main);

app.get('/showMore/:id', adminC.showMore)

app.get('/playerInfo/:id', adminC.playerInfo)

app.get('/showPlayerInformation/:id', adminC.showPlayerInformation)

app.get('/stadiumInfo/:id', adminC.stadiumInfo);


app.get("/admin", passport.checkAuthentication, adminC.dashboard);

app.use('/admin', require('./adminRouter'));
app.use("/cricket", require("./countryRouter"));
app.use("/stadium", require("./StadiumRouter"));
app.use("/matchtype", require("./matchtypeRouter"));
app.use("/player", require("./palyerRouter"));
app.use("/matchs", require("./matchRouter"));

module.exports = app;