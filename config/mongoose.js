const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1/cricket_score');

const db = mongoose.connection;

db.once("open", (err) => {
  if (err) {
    console.log("db not work");
    return false;
  }
  console.log("db is work");
});

module.exports = db;