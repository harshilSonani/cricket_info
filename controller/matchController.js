const matchTypesdb = require("../model/matchTypesModel");
const stadiumdb = require("../model/stadiumModel");
const teamsdb = require("../model/teamsModel");
const matchdb = require("../model/matchModel");
const palyerdb = require("../model/playerModel");

module.exports.addMatchs = async (req, res) => {
  let data = await matchTypesdb.find({});
  let match = await stadiumdb.find({});
  let teams = await teamsdb.find({});
  return res.render("addMatchs", {
    matchTypes: data,
    stadium: match,
    teams: teams,
  });
};

module.exports.insertMatchs = async (req, res) => {
  let data = await matchdb.create(req.body);

  return res.redirect("back");
};

module.exports.show_matchRecord = async (req, res) => {
  let data = await matchdb
    .find({})
    .populate("f_teams")
    .populate("l_teams")
    .populate("matchTypes")
    .exec();

  return res.render("show_matchs", {
    data: data,
  });
};

module.exports.showMore = async (req, res) => {
  let data = await matchdb
    .findById(req.params.id)
    .populate("f_teams")
    .populate("l_teams")
    .populate("matchTypes")
    .populate("Stadium")
    .exec();

  return res.render("show_moreMatchs", {
    data: data,
    dd: data,
  });
};

module.exports.stadiumInfo = async (req, res) => {
  let data = await matchdb.findById(req.params.id).populate("Stadium").exec();

  return res.render("show_moreStadium", {
    data: data,
  });
};

module.exports.playerInfo = async (req, res) => {
  let data = await matchdb
    .findById(req.params.id)
    .populate("f_teams")
    .populate("l_teams")
    .exec();

  let fteams = await data.f_teams.id;
  let lteams = await data.l_teams.id;

  let f_playerData = await palyerdb
    .find({ countryID: fteams })
    .populate("countryID")
    .exec();
  let l_playerData = await palyerdb
    .find({ countryID: lteams })
    .populate("countryID")
    .exec();

  return res.render("show_matchPlayerRecord", {
    data: data,
    F_player: f_playerData,
    l_player: l_playerData,
  });
};

module.exports.updateMore = async (req, res) => {
  let data = await matchdb.findByIdAndUpdate(req.params.id);
  let mData = await matchTypesdb.find({});
  let match = await stadiumdb.find({});
  let teams = await teamsdb.find({});

  return res.render("update_match", {
    data: data,
    mData: mData,
    match: match,
    teams: teams,
  });
};

module.exports.updateData = async (req, res) => {
  let data = await matchdb.findByIdAndUpdate(req.body.uid, req.body);

  return res.redirect("back");
};

module.exports.deleteMore = async (req, res) => {
  let data = await matchdb.findByIdAndDelete(req.params.id);

  return res.redirect('back')
};
