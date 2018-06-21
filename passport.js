var localStrategy = require('passport-local').Strategy;
var User = require('./db/User');


module.exports = function(passport){
    passport.serializeUser(function(user, done){
            done(null, user)
    })

    passport.deserializeUser(function(user, done){
             done(null, user)
    })

    passport.use(new localStrategy(function(email, password, done){
        User.findOne({email:email}, function(err, doc){
            if(err){
                done(err)
            }else{
                if(doc){
                    var valid = doc.comparePassword(password, doc.password)
                    if(valid){
                        done(null, {
                            email:doc.email,
                            password:doc.password
                        })
                    }else{
                        done(null,false)
                    }
                }else{
                    done(null, false)
                }
                
            }
        })
    }))
}