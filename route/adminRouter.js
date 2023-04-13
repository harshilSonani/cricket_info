const express = require("express");
const adminC = require("../controller/adminController");
const app = express.Router();
const passport = require("passport");
const admindb = require("../model/adminModel");

// admin crud operation

app.get("/login", adminC.login);

app.get("/register", adminC.register);

app.post("/adminRegister", adminC.adminRegister);

app.post(
  "/adminLogin",
  passport.authenticate("local", { failureRedirect: "/login" }),
  adminC.adminLogin
);

app.get("/addAdmin", passport.checkAuthentication, adminC.addAdmin);

app.post("/insertAdmin", admindb.uploadImg, adminC.insertAdmin);

app.get(
  "/show_adminRecord",
  passport.checkAuthentication,
  adminC.show_adminRecord
);

app.get("/deleteAdminRecord/:id", adminC.deleteAdminRecord);


app.get('/deActive/:id', passport.checkAuthentication, adminC.deActive)

app.get('/active/:id', passport.checkAuthentication, adminC.active)

app.get("/adminProfile", passport.checkAuthentication, adminC.adminProfile);

app.post("/changePass", passport.checkAuthentication, adminC.changePass);

app.get("/logout", passport.checkAuthentication, adminC.logout);

app.get("/forgetPassword", adminC.forgetPassword);

app.post("/forgetPass", adminC.forgetPass);

app.get("/otp", adminC.otp);

app.post("/checkotp", adminC.checkotp);


app.post('/changePassword' ,adminC.changePassword)

module.exports = app;
