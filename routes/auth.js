//TODO replace fake data with DB calls
var jwt = require('jwt-simple');

var auth = {
    login: function(req, res) {
      var username = req.body.username || '';
      var password = req.body.password || '';

      if (username == '' || password == '') {
        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid credentials"
        });
        return;
      }
      if(username === 'jon' && password === 'test'){
        res.json({
          token : genToken(username),
          message : 'login success'
        });
      } else{
        res.status(401);
        res.json({
          status : 401,
          message : 'Invalid credentials!!'
        });
      }
    },
    register: function(req, res){
      if(req.body.username !== 'jon' && req.body.username != ''){ //TODO: check for white space/remove it
         if(req.body.email !== 'jon@gmail.com'){ //TODO: validate that it is a valid email
           if(req.body.pass === req.body.verPass)
           {
             if(req.body.pass.len >= 6){ //TODO: what else do I want to check length and contains upper and lower and special char
               //TODO: create user
               res.json({
                 token : genToken(username),
                 message : 'register success'
               });
             }
             else{
               res.json({
                 status: 401,
                 message: 'Make sure your password contains upper and lower case, 6 characters long, and has at least one specail character.'
               });
             }
           }
           else {
             res.json({
               status: 401,
               message:'Passwords don\'t match.'
             });
           }
         }
         else {
           res.json({
             status: 401,
             message: 'Invalid email.'
           });
         }
      }
      else {
        res.json({
          status: 401,
          message: 'Username already taken.'
        });
      }
    }
  }
// Private Methods
  function genToken(user) {
    var expires = expiresIn(7); // 7 days
    var token = jwt.encode({
      exp: expires,
      user: user
    }, require('../middlewares/secret.js')());
    return {
      token: token,
      expires: expires,
      user: user
    };
  }

  function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
  }
  module.exports = auth;
