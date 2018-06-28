var express = require('express');
var router = express.Router();


var loggedin = function (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
}



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FiFo | First In First Out' });
});



router.get('/dashboard', loggedin, function (req, res, next) {
  res.render('dashboard', {
    user: req.user
  })
});


router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

module.exports = router;
