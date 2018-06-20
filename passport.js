var localStrategy = require('passport-local').Strategy;
var User = require('./db/User');


module.exports = function(passport){
    passport.serializeUser(function(user, done){
            done(null, user)
    })

    passport.deserializeUser(function(user, done){
             done(null, user)
    })

    passport.use(new localStrategy(function(username, password, done){
        console.log(username, password);
    }))
}