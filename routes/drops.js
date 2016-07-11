var MongoClient = require('mongodb').MongoClient;
var constants = require('../shakaApi/constants.js');

var drops = {
    createDrop: function(req, res) {
      MongoClient.connect(constants.dbConnection, function(err, db) {
          if (!err) {
              var collection = db.collection('drops');
              collection.insert(req.body, function(error, result){ //example of db error handling
                if(error){
                  res.status(401);
                  res.json({
                      status: 401,
                      message: 'We messed up trying to create your drop, sorry try again.',
                      errors: error
                  });
                }else{
                  res.json({});
                }
                db.close();
              });
          } else {
            res.status(401);
            res.json({
                status: 401,
                message: 'Database connection issues, sorry try again.',
                errors: err
            });
          }
      });
    },
    getAllDrops: function(req, res) {
      MongoClient.connect(constants.dbConnection, function(err, db) {
          if (!err) {
            var collection = db.collection('drops');
            collection.find().toArray(function(error, drops) {
                if (!error) {
                    res.json(drops);
                } else {
                    res.status(401);
                    res.json({
                        status: 401,
                        message: 'We messed up trying to get all the drops.',
                        errors: error
                    });
                }
                db.close();
            });
          } else {
            res.status(401);
            res.json({
                status: 401,
                message: 'Database connection issues, sorry try again.',
                errors: err
            });
          }
      });
    },
    getDropsForUser: function(req, res) {
      //TODO: privacy- should these be public always
        res.json([{
            id: 2,
            lat: 22,
            long: 33,
            note: 'someones drop: This is the note section for drop 2!',
            user: 'sknyforeal',
            createdDateTime: new Date('1-2-2016'),
            category: 'dinner'
        }]);
    }
};
module.exports = drops;
