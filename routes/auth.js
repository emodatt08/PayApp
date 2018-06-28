var express = require('express');
var router = express.Router();
var User = require('../db/User');



module.exports = function(passport){


    /* process the registration . */
router.post('/register', function(req, res) {
    var body = req.body,
        username = body.username,
        password = body.password;
        email = body.email;
    User.findOne({email:email},function(err, doc){
            if(err){
                res.status(500).send('error ocurred');
            }else{
                if(doc){
                    res.status(500).send('Email already exist')
                }else{
                    var insert = new User()
                    insert.username = username;
                    insert.email = email;
                    insert.password = insert.hashPassword(password)
                    insert.save(function(err,user){
                        if (err) {
                            res.status(500).send('db error')
                        } else {
                            res.redirect('/login')
                        }
                    })
                }
            }
    })
  });

 router.post('/login', passport.authenticate('local', {
        failureRedirect: '/',
        successRedirect: '/dashboard',
    }), function (req, res) {
        res.send('hey')
    })
    return router;
       
};
