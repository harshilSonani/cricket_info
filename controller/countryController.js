const cricketdb = require("../model/teamsModel");
const fs = require("fs");
const path = require("path");

module.exports.addCricket = (req, res) => {
  return res.render("addTeams");
};
module.exports.insertTemas = async (req, res) => {
  if (req.file) {
    let imgPath = cricketdb.imagePath + "/" + req.file.filename;
    req.body.flages = imgPath;
  }

  let data = await cricketdb.create(req.body);

  return res.redirect("back");
};

module.exports.show_circketRecord = async (req, res) => {
  let data = await cricketdb.find({});

  return res.render("show_teamsRecord", {
    data: data,
  });
};

module.exports.deleteCricketRecord = async (req,res) =>{
  let data = await cricketdb.findById(req.params.id);

  if(data.flages){
    fs.unlinkSync(path.join(__dirname,'../assets',data.flages));
  }
  let aa = await cricketdb.findByIdAndDelete(req.params.id);

  return res.redirect('back');
}

module.exports.updateAdminRecord = async (req,res) =>{
  let data = await cricketdb.findById(req.params.id);

  return res.render('update_country',{
    data : data
  })
}

module.exports.update = async (req,res) =>{
  if(req.file){
    let data = await cricketdb.findById(req.body.uid);

    if(data.flages){
      fs.unlinkSync(path.join(__dirname,'../assets',data.flages));
    }
    req.body.flages = cricketdb.imagePath+ '/' + req.file.filename;

    let insertData = cricketdb.findByIdAndUpdate(req.body.uid, req.body);

    return res.redirect('show_circketRecord');
  } else{
    let data = await cricketdb.findByIdAndUpdate(req.body.uid);

    return res.redirect('show_circketRecord')
  }
}