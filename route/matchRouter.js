const express = require("express");
const matchC = require("../controller/matchController");
const app = express.Router();
const passport = require('passport');

app.get('/addMatchs', passport.checkAuthentication, matchC.addMatchs);

app.post('/insertMatchs', passport.checkAuthentication, matchC.insertMatchs);

app.get('/show_matchRecord', passport.checkAuthentication, matchC.show_matchRecord)

app.get('/showMore/:id', passport.checkAuthentication, matchC.showMore);

app.get('/stadiumInfo/:id', passport.checkAuthentication, matchC.stadiumInfo)

app.get('/playerInfo/:id', passport.checkAuthentication, matchC.playerInfo)

app.get('/updateMore/:id', passport.checkAuthentication, matchC.updateMore)

app.post('/updateData', matchC.updateData)

app.get('/deleteMore/:id', matchC.deleteMore)

module.exports = app;
