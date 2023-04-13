const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const imgPath = ('/images/country');

const cricketSchema = mongoose.Schema({
  team: {
    type: String,
    require: true,
  },
  flages: {
    type: String,
    require: true,
  }
});

var stroge = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../assets', imgPath));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

cricketSchema.statics.uploadFlags = multer({ storage: stroge }).single('flages');
cricketSchema.statics.imagePath = imgPath;


const cricketDB = mongoose.model("cricket teams Data", cricketSchema);
module.exports = cricketDB;