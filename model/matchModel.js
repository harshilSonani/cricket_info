const mongoose = require("mongoose");

const matchSchema = mongoose.Schema({
  match: {
    type: String,
    required: true,
  },
  series: {
    type: String,
    required: true,
  },
  matchTypes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "match types data",
    required: true,
  },
  f_teams: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cricket teams Data",
    required: true,
  },
  l_teams: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cricket teams Data",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  toss: {
    type: String,
    require: true,
  },
  umpires: {
    type: String,
    require: true,
  },
  THUmpires: {
    type: String,
    require: true,
  },
  referee: {
    type: String,
    required: true,
  },
  Stadium: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "stadium Data",
    required: true,
  },
});

const match = mongoose.model("matchs data", matchSchema);
module.exports = match;
