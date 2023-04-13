const mongoose = require("mongoose");

const stadiumSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  capacity: {
    type: String,
    require: true,
  }
});

const stadiumdb = mongoose.model("stadium Data", stadiumSchema);
module.exports = stadiumdb;