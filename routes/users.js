var repo = require('../repositories/usersRepo.js')
var users = {
    getAllUsers: function(req, res) {
        //res.json([{name:'Bob'}, {name:'Steve'}]);
        repo.getAllUsers().then(console.log('we'));
        res.json(repo.getAllUsers());
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
