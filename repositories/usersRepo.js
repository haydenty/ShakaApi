var MongoClient = require('mongodb').MongoClient;
var constants = require('../shakaApi/constants.js');

var usersRepo = {
    getAllUsers: function() {
        MongoClient.connect(constants.dbConnection, function(err, db) {
            if (!err) {
                console.log("We are connected to the db");
            }
            var collection = db.collection('users');
            collection.find().toArray(function(err, users) {
                if (!err) {
                    db.close();
                    return users;
                }
                else{
                  console.log('erroerd');
                  return {};
                }
            });
        });
    },
    getFriends: function(id) {

    }
};
module.exports = usersRepo;
