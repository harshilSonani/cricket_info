const express = require('express')
const stadiumC = require('../controller/StadiumController');
const app = express.Router();
const passport = require('passport')

app.get('/addStadium', passport.checkAuthentication,stadiumC.addStadium)

app.post('/insertstadium', passport.checkAuthentication,stadiumC.insertstadium)

app.get('/stadiumRecord', passport.checkAuthentication,stadiumC.stadiumRecord)

app.get('/deleteAdminRecord/:id', passport.checkAuthentication, stadiumC.deleteAdminRecord);

app.get('/update/:id', passport.checkAuthentication, stadiumC.update)

app.post('/updateData', passport.checkAuthentication, stadiumC.updateData)

module.exports = app;