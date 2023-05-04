const express = require('express')
const palyerdb = require('../controller/palyerController');
const app = express.Router();
const playerModel = require('../model/playerModel');
const passport = require('passport');

app.get('/addplayer',passport.checkAuthentication, palyerdb.addplayer)

app.post('/insertPlayer', passport.checkAuthentication,playerModel.uploadsImg, palyerdb.insertPlayer);

app.get('/playerRecord', passport.checkAuthentication,palyerdb.playerRecord)

app.get('/showPlayerInformation/:id', passport.checkAuthentication,palyerdb.showPlayerInformation)


app.get('/deActive/:id', palyerdb.deActive)

app.get('/active/:id', palyerdb.active)

app.get('/delete/:id', palyerdb.delete)

app.get('/update/:id', passport.checkAuthentication, palyerdb.update);

app.post('/updateData', playerModel.uploadsImg, palyerdb.updateData)

module.exports = app;