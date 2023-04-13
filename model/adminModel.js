const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const imgPath = '/images/admin';

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  username : {
    type : String,
    required : true,
  },
  password: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
    require: true,
  },
  active: {
    type: Boolean,
    require: true,
  },
});

const a = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../assets", imgPath));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  }
});

adminSchema.statics.uploadImg = multer({ storage: a }).single("avatar");
adminSchema.statics.adminPath = imgPath;

const adminDB = mongoose.model("admin Data", adminSchema);
module.exports = adminDB;
