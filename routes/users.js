var users = {
  getAllUsers: function(req, res){
    res.json([{name:'Bob'}, {name:'Steve'}]);
  },
  getFriends: function(req, res){
    res.json([{name:'Martha'},{name:'Sammy'}]);
  }
};
module.exports = users;
