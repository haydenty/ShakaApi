var users = {
  getAllUsers: function(req, res){
    res.json([{name:'Bob'}, {name:'Jane'}]);
  }
};
module.exports = users;
