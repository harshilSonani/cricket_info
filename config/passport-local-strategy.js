const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const admindb = require("../model/adminModel");

passport.use(new passportLocal({usernameField: "email",},async (email, password, done) => {
      let user = await admindb.findOne({ email: email });

      if (!user || user.password != password) {
        console.log("email and password not match");
        return done(null, false);
      }
      
      return done(null, user);
    }));

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async ( id,done) => {
  let data = await admindb.findById(id);

  if(data){
    return done(null,data);
  }
  return done(null,false);
});

passport.checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/admin/login");
};

passport.setAuth = (req,res,next)=>{
  res.locals.user = req.user;
  return next();
}

module.exports = passport;
