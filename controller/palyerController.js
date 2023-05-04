const teamsdb = require("../model/teamsModel");
const palyerdb = require("../model/playerModel");
const fs = require('fs');
const path = require('path');

module.exports.addplayer = async (req, res) => {
  let data = await teamsdb.find({});

  return res.render("addPlayer", {
    data: data,
  });
};

module.exports.insertPlayer = async (req, res) => {
  req.body.active = true;
  if (req.file) {
    req.body.img = palyerdb.playerImg + "/" + req.file.filename;
  }

  let data = await palyerdb.create(req.body);
  return res.redirect("back");
};

module.exports.playerRecord = async (req, res) => {
  let search = "";
  if (req.query.search) {
    search = req.query.search;
  }

  let data = await palyerdb.find({}).populate("countryID").exec();
  let teamsData = await teamsdb.find({});

  return res.render("show_playerRecord", {
    data: data,
    teamsData: teamsData,
  });
};

module.exports.showPlayerInformation = async (req, res) => {
  let data = await palyerdb
    .findById(req.params.id)
    .populate("countryID")
    .exec();

  return res.render("show_playerProfile", {
    data: data,
  });
};
module.exports.playerInfo = (req, res) => {
  console.log("work");
};

module.exports.deActive = async (req, res) => {
  let data = await palyerdb.findByIdAndUpdate(req.params.id, { active: false });

  return res.redirect("back");
};

module.exports.active = async (req, res) => {
  let data = await palyerdb.findByIdAndUpdate(req.params.id, { active: true });

  return res.redirect("back");
};

module.exports.delete = async (req,res) =>{
  let data = await palyerdb.findById(req.params.id);

  if(data.img){
    fs.unlinkSync(path.join(__dirname,'../assets',data.img));
  }

  let aa = await palyerdb.findByIdAndDelete(req.params.id);

  return res.redirect('back');
}

module.exports.update = async (req,res) =>{
  let data = await palyerdb.findById(req.params.id);
  let teams = await teamsdb.find({});

  return res.render('update_player',{
    data : data,
    teams : teams
  })
}

module.exports.updateData = async (req,res) =>{
  console.log(req.body)
  console.log(req.file)
}