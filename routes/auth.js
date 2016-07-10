var jwt = require('jwt-simple');
var MongoClient = require('mongodb').MongoClient;
var constants = require('../shakaApi/constants.js');

var auth = {
    login: function(req, res) {
        var username = req.body.username || '';
        var password = req.body.password || '';

        if (username !== '' || password !== '') {
            areCredentialsValid(username, password, function(result) {
                if (result) {
                    res.json({
                        token: genToken(username),
                        message: 'login success'
                    });
                } else {
                    res.status(401);
                    res.json({
                        status: 401,
                        message: 'Invalid credentials!!'
                    });
                }
            });
        } else {
            res.status(401);
            res.json({
                status: 401,
                message: 'Invalid credentials!!'
            });
        }
    },
    register: function(req, res) {
        validateRegistration(req.body, function(result) {
            res.json(result);
        });
    }
}

//------------------------ Private Methods-------------------------------------
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

//Searches db for matching login information
//return true if match, else false otherwise
function areCredentialsValid(inUsername, inPassword, callback) {
    MongoClient.connect(constants.dbConnection, function(err, db) {
        if (err) {
            console.log("Unable to connect to the db");
        } else {
            var collection = db.collection('users');
            var query = {
                username: {
                    $eq: inUsername
                },
                password: {
                    $eq: inPassword
                }
            };
            collection.find(query).toArray(function(err, users) {
                if (!err) {
                    if (users.length !== 0) {
                        callback(true);
                    } else {
                        callback(false);
                    }
                } else {
                    console.log('Error trying to validate credentials!');
                    callback(false);
                }
                db.close();
            });
        }
    });
}

//returns a response object that gives information whether or not
//the account was created correctly
//TODO: how can I maintain order...? Learn JS http://stackoverflow.com/questions/13455134/javascript-doesnt-seem-to-wait-for-return-values
//use callbacks to handle this and errors
function validateRegistration(userAccountInfo, callback) {
    isUsernameUnique(userAccountInfo.username, function(result) {
        if (result) { //TODO: check for white space/remove it
            if (userAccountInfo.email.indexOf('@') > -1 && userAccountInfo.email.indexOf('.com') > -1) { //TODO: validate that it is a valid email
                if (userAccountInfo.pass === userAccountInfo.verPass) {
                    if (userAccountInfo.pass.length >= 6) { //TODO: what else do I want to check length and contains upper and lower and special char
                        console.log('Going to create the user now');
                        createUser(userAccountInfo);
                        callback({
                            token: genToken(userAccountInfo.username),
                            message: 'register success'
                        });
                    } else {
                        callback({
                            status: 401,
                            message: 'Make sure your password contains upper and lower case, 6 characters long, and has at least one specail character.'
                        });
                    }
                } else {
                    callback({
                        status: 401,
                        message: 'Passwords do not match.'
                    });
                }
            } else {
                callback({
                    status: 401,
                    message: 'Invalid email.'
                });
            }
        } else {
            callback({
                status: 401,
                message: 'Username already taken.'
            });
        }
    });
}

//Check if username is unique
//true = yes unique, false no some on already has that username
function isUsernameUnique(inUsername, callback) {
    MongoClient.connect(constants.dbConnection, function(err, db) {
        if (err) {
            console.log("Unable to connect to the db");
        } else {
            var collection = db.collection('users');
            var query = {
                username: {
                    $eq: inUsername
                }
            };
            collection.find(query).toArray(function(err, users) {
                if (!err) {
                    if (users.length === 0) {
                        console.log('no user with that name');
                        db.close();
                        callback(true);
                    } else {
                        console.log('found a user with that name');
                        db.close();
                        callback(false);
                    }
                } else {
                    db.close();
                    callback(false); //TODO: handle error
                }
            });
        }
    });
}
//Will create a user in the db
function createUser(userAccountInfo) {
    var user = {
        username: userAccountInfo.username,
        email: userAccountInfo.email,
        password: userAccountInfo.pass
    };
    MongoClient.connect(constants.dbConnection, function(err, db) {
        if (!err) {
            var collection = db.collection('users');
            collection.insert(user);
            db.close();
        } else {
            console.log("Unable connect to the db");
        }
    });
}


module.exports = auth;
