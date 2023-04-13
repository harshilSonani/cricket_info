const express = require('express')
const matchC = require('../controller/matchtypeController')
const app = express.Router();
const passport = require('passport');

app.get('/addmatch', passport.checkAuthentication, matchC.addmatch);

app.post('/insertMatchtype', passport.checkAuthentication, matchC.insertMatchtype)

app.get('/matchTypesRecod', passport.checkAuthentication, matchC.matchTypesRecod)

app.get('/deleteAdminRecord/:id', passport.checkAuthentication, matchC.deleteAdminRecord)

app.get('/updateAdminRecord/:id', passport.checkAuthentication, matchC.updateAdminRecord);

app.post('/updateData', passport.checkAuthentication, matchC.updateData)

module.exports = app;