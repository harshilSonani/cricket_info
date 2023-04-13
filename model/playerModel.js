const mongoose = require("mongoose");
const multer = require('multer')
const path = require('path');
const imgPath = ('/images/players');

const matchSchema = mongoose.Schema({
  countryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cricket teams Data",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  hobby: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  Place: {
    type: String,
    required: true,
  },
  scrore : {
    type : String,
    required : true,
  },
  role : {
    type : String,
    required : true,
  },
  format : {
    type : String,
    required : true,
  },
  img : {
    type :String,
    required : true
  },
  active : {
    type : Boolean,
    required : true,
  }
});

const strogee = multer.diskStorage({
  destination : (req,file,cb) =>{
    cb(null, path.join(__dirname, '../assets', imgPath));
  },
  filename : (req,file,cb)=>{
    cb(null, file.fieldname+ '-' + Date.now());
  }
});

matchSchema.statics.uploadsImg = multer({storage : strogee}).single('img');
matchSchema.statics.playerImg = imgPath;

const match = mongoose.model("cricket player data", matchSchema);
module.exports = match;