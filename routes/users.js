var MongoClient = require('mongodb').MongoClient;
var constants = require('../shakaApi/constants.js');

var users = {
    getAllUsers: function(req, res) {
        MongoClient.connect(constants.dbConnection, function(err, db) {
            if (err) {
                console.log("Unable to connect to the db");
            } else {
                var collection = db.collection('users');
                collection.find().toArray(function(err, users) {
                    if (!err) {
                        res.json(users);
                    } else {
                        console.log('Error trying to getAllUsers!');
                        res.json({});
                    }
                    db.close();
                });
            }
        });
    },
    getFriends: function(req, res) {
        res.json([{
            name: 'Martha'
        }, {
            name: 'Sammy'
        }]);
    }
};
module.exports = users;
