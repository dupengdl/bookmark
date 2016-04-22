/**
 * passport配置
 */
var mongoose = require('mongoose');
var UserModel = require('../api/models/user');
var User = mongoose.model('User');
var LocalStrategy = require('passport-local').Strategy;

var local = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    console.log('user.find');
    var options = {
      criteria: { email: email }
    };
    User.load(options, function (err, user) {
      if (err) return done(err)
      if (!user) {
        return done(null, false, { message: 'Unknown email' });
      }
      if (!user.authenticate(password)) {
        return done(null, false, { message: 'Invalid password' });
      }
      return done(null, user);
    });
  }
);

module.exports = function (passport) {
  // serialize sessions
  passport.serializeUser(function(user, done) {
    console.log('pass.serializeUser');
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    console.log('pass.deserializeUser');
    User.findOne({ _id: id }, function (err, user) {
      done(err, user)
    })
  })

  // use these strategies
  passport.use(local);
};
