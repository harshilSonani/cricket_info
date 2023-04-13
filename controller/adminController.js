const admindb = require("../model/adminModel");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const { model } = require("mongoose");
const matchdb = require("../model/matchModel");
const palyerdb = require("../model/playerModel");

module.exports.main = async (req, res) => {
  let data = await matchdb
    .find({})
    .populate("matchTypes")
    .populate("f_teams")
    .populate("l_teams")
    .populate("Stadium")
    .exec();

  return res.render("user_match", {
    data: data,
  });
};

module.exports.showMore = async (req, res) => {
  let data = await matchdb
    .findById(req.params.id)
    .populate("matchTypes")
    .populate("f_teams")
    .populate("l_teams")
    .populate("Stadium")
    .exec();

  return res.render("user_matchMore", {
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

  return res.render("user_matchPalyer", {
    data: data,
    F_player: f_playerData,
    l_player: l_playerData,
  });
};

module.exports.dashboard = (req, res) => {
  return res.redirect("/matchs/show_matchRecord");
};

module.exports.addAdmin = (req, res) => {
  return res.render("addAdmin");
};

module.exports.register = (req, res) => {
  return res.render("register-pages");
};

module.exports.adminRegister = async (req, res) => {
  (req.body.phone = ""),
    (req.body.address = ""),
    (req.body.avatar = ""),
    (req.body.active = true);

  let data = await admindb.create(req.body);

  return res.redirect("back");
};

module.exports.showPlayerInformation = async (req,res) =>{
  let data = await palyerdb
    .findById(req.params.id)
    .populate("countryID")
    .exec();

  return res.render("user_playerInfo", {
    data: data,
  });
}

module.exports.stadiumInfo = async (req,res) =>{
  let data = await matchdb.findById(req.params.id).populate("Stadium").exec();

  return res.render("user_stadiumInfo", {
    data: data,
  });
}

module.exports.insertAdmin = async (req, res) => {
  if (req.file) {
    req.body.avatar = admindb.adminPath + "/" + req.file.filename;
  }

  req.body.active = true;
  req.body.username = "null";
  let data = await admindb.create(req.body);

  return res.redirect("back");
};

module.exports.show_adminRecord = async (req, res) => {
  let search = "";
  let page = 1;
  let perPage = 2;

  if (req.query.page) {
    page = Number(req.query.page);
  }

  if (req.query.search) {
    search = req.query.search;
  }

  let admindata = await admindb
    .find({
      $or: [
        { name: { $regex: ".*" + search + ".*" } },
        { email: { $regex: ".*" + search + ".*" } },
      ],
    })
    .skip((page - 1) * perPage)
    .limit(perPage);

  let adminCountData = await admindb.find({}).countDocuments({
    $or: [
      { name: { $regex: ".*" + search + ".*" } },
      { email: { $regex: ".*" + search + ".*" } },
    ],
  });

  let countData = await Math.ceil(adminCountData / perPage);

  return res.render("show_adminRecord", {
    data: admindata,
    dataNO: countData,
    prev: Number(page - 1),
    next: Number(page + 1),
  });
};

module.exports.deActive = async (req, res) => {
  let data = await admindb.findByIdAndUpdate(req.params.id, { active: false });

  return res.redirect("back");
};

module.exports.active = async (req, res) => {
  let data = await admindb.findByIdAndUpdate(req.params.id, { active: true });

  return res.redirect("back");
};

module.exports.deleteAdminRecord = async (req, res) => {
  let data = await admindb.findById(req.params.id);

  if (data.avatar) {
    fs.unlinkSync(path.join(__dirname, "..", data.avatar));
  }

  let aa = await admindb.findByIdAndDelete(req.params.id);

  return res.redirect("back");
};

module.exports.updateAdminRecord = async (req, res) => {
  let data = await admindb.findByIdAndUpdate(req.params.id);

  return res.render("update_admin", {
    data: data,
  });
};

module.exports.updateAdmin = async (req, res) => {
  console.log(req.file)
  if (req.file) {
    let data = await admindb.findById(req.body.uid);

    if (data.avatar) {
      fs.unlinkSync(path.join(__dirname, "..", data.avatar));
    }
    req.body.avatar = (await admindb.adminPath) + "/" + req.file.filename;

    let imgData = await admindb.findByIdAndUpdate(req.body.uid, req.body);

    return res.redirect("back");
  } else {
    let data = await admindb.findByIdAndUpdate(req.body.uid, req.body);

    return res.redirect("back");
  }
};

module.exports.login = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/admin");
  }
  return res.render("login-page");
};

module.exports.adminLogin = (req, res) => {
  return res.redirect("/admin/login");
};

module.exports.adminProfile = (req, res) => {
  return res.render("admin-profile");
};

module.exports.changePass = async (req, res) => {
  oldPass = await res.locals.user.password;
  pass = await req.body.pass;
  newPass = await req.body.newPass;
  rePass = await req.body.rePass;

  if (oldPass == pass) {
    if (pass != newPass) {
      if (newPass == rePass) {
        let data = await admindb.findOneAndUpdate(oldPass, {
          password: req.body.newPass,
        });

        return res.redirect("back");
      } else {
        console.log("new password and re password not match");
        return res.redirect("back");
      }
    } else {
      console.log("old password and new password are match");
      return res.redirect("back");
    }
  } else {
    console.log("old password not match");
    return res.redirect("back");
  }
};

module.exports.logout = (req, res) => {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) {
        console.log("not logout");
        return res.redirect("back");
      }
      return res.redirect("/admin/login");
    });
  }
};

module.exports.forgetPassword = async (req, res) => {
  // let data = await admindb.findOne({email : req.body.email})
  return res.render("forget-password");
};

module.exports.forgetPass = async (req, res) => {
  let data = await admindb.findOne({ email: req.body.email });

  if (data) {
    const otp = await Math.floor(Math.random() * 10000 + 100);
    console.log(otp);
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "e6b7d6a29ff81a",
        pass: "692e127db25e24",
      },
    });

    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" niceadmin@gmail.com', // sender address
      to: data.email, // list of receivers
      subject: "opt ✔", // Subject line
      text: "your otp", // plain text body
      html: "<b>your otp is here : " + otp + "</b>", // html body
    });
    res.cookie("otp", JSON.stringify(otp));
    res.cookie("email", JSON.stringify(data.email));

    return res.render("otp");
  } else {
    console.log("email not found");
    return false;
  }
};

module.exports.otp = (req, res) => {
  return res.render("otp");
};

module.exports.checkotp = async (req, res) => {
  let data = await JSON.parse(req.cookies.otp);

  if (data == req.body.otp) {
    return res.render("forget_chage");
  } else {
    req.flash("error", "otp not match");
    return res.redirect("/otp");
  }
};

module.exports.changePassword = async (req, res) => {
  let email = await JSON.parse(req.cookies.email);

  if (req.body.password == req.body.rePassword) {
    let data = await admindb.find({ email: email });

    if (data[0]) {
      let eData = await admindb.findByIdAndUpdate(data[0].id, {
        password: req.body.password,
      });

      return res.redirect("/");
    } else {
      console.log("somthig wrong");
      return res.redirect("back");
    }
  } else {
    console.log("confirm passsword not match");
    return res.render("forget_chage");
  }
};
