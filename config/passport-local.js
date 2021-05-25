const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')
passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function(email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err); }
        if (!user||user.password!=password) { return done(null, false); }
        
        return done(null, user);
      });
    }
));
  // serializing to keep in cookie
passport.serializeUser(function (user, done) {
    done(null, user.id);
})
  //deserializing
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log(eroror)
            return done(err);
        }
        return done(null, user);
    })
    
});
passport.checkAuthentication = function (req, res, next)
{
    if (req.isAuthenticated())
    {
        return next();
    }
    return res.redirect('/user/sign-in');
}
passport.setAuthenticatedUser = function (req, res, next)
{
    if (req.isAuthenticated())
    {
        res.locals.user = req.user;
        }
    }
module.exports = passport;