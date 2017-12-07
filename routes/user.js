var express = require('express');
var router = express.Router();
var Token = require('./../model/Token')
var User = require('./../model/User')
var jwt = require('jsonwebtoken')
var moment = require('moment')
const request = require('request');
var configs = require('./configs')


router.get('/',function(req, res, next) {res.render('login');});
/* POST users listing. */
router.post('/login', function (req, res, next) {
  var input = req.body
  if (!input.username || !input.password) res.status(401).send({ code: 401, success: false, status: "401 not username or password" })
  else {
    User.findOne({ username: input.username, hashpass: input.password, status: 'OFFLINE' }, function (error, result) {
      if (error) res.status(400).json({ code: 400, success: false, status: 'Error network' })
      else if (!result) res.status(400).json({ code: 400, success: false, status: 'User not found' })
      else {
        var jwtToken = jwt.sign({ username: input.username, hashpass: input.password }, configs.jwtSecret, { expiresIn: 1 * 7 });
        new Token({
          token: jwtToken.toString(),
          status: 'USING',
          expired: moment().add(7, 'day')
        }).save((error, result) => {
          if (error || !result) res.status(400).json({ code: 400, success: false, status: error ? error : 'Not create token' })
          else res.status(200).json({ code: 200, success: true, token: result.token })
        })
      }
    })
  }
});
/* POST users listing. */
router.post('/register', function (req, res, next) {
  req.isNew = true
  if (!req.body.username || req.body.username == '' || !req.body.password || req.body.password == '') res.status(400).json({ code: 400, success: false, status: 'Username or Password is empty' })
  else {
    new User({
      username: req.body.username,
      hashpass: req.body.password,
      status: 'OFFLINE',
    }).save(function (error, result) {
      if (error || !result) res.status(400).json({ code: 400, success: false, status: error ? error : 'Register failed' })
      else res.status(200).json({ code: 200, success: true, status: 'Register successful' })
    })
  }
});

//middleware
router.all('/*', (req, res, next) => {
  if (!true) next()
  else {
    if (!req.headers.token) {
      res.status(403).send({ code: 403, success: false, status: "403 missing token" })
    }
    else {
      Token.findOne({ token: req.headers.token })
        .exec(function (err, token) {
          if (err) {
            res.status(404).send({ code: 404, success: false, status: "404 error connecting to user data", results: err })
          }
          else if (!token) {
            res.status(401).send({ code: 401, success: false, status: "401 invalid token" })
          }
          else if (token) {
            // TEST: it should track req user
            req.user = token.user
            next()
          }
        })
    }
  }
})

router.get('/logout', function (req, res, next) {
  var input = req.body
  if (input.username || input.password) res.status(401).send({ code: 401, success: false, status: "401 not username" })
  else {
    User.findOne({ username: self._id, hashpass: input.password, status: 'ONLINE' }, function (error, result) {
      if (error) res.status(404).json({ code: 404, success: false, status: 'Error network' })
      else if (!result) res.status(401).json({ code: 401, success: false, status: 'User not found' })
      else {
        result.set({ status: 'OFFLINE' })
        Token.remove({ token: req.token }, (error, result) => {
          if (error || !result) res.status(401).json({ code: 401, success: false, status: 'User not found' })
          else res.redirect('../')
        })
      }
    })
  }
});




module.exports = router;
