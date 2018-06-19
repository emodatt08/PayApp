var express = require('express');
var router = express.Router();
var User = require('../db/User');



module.exports = function(passport){
    /* GET home page. */
router.post('/register', function(req, res) {
    var body = req.body,
        username = body.username,
        password = body.password;
        email = body.email;
    User.findOne({username:username},function(err, doc){
            if(err){
                res.status(500).send('error ocurred');
            }else{
                if(doc){
                    res.status(500).send('Username already exist')
                }else{
                    var insert = new User()
                    insert.username = username;
                    insert.email = email;
                    insert.password = insert.hashPassword(password)
                    insert.save(function(err,user){
                        if(err){
                            res.status(500).send(err);
                        }else{
                            res.send(user)
                        }
                           
                    })
                }
            }
    })
  });
        return router;
}
