var express = require('express');
var router = express.Router();

var auth = require('./auth.js');
var users = require('./users.js');
var drops = require('./drops.js');

/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);
router.post('/register', auth.register);

/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/v1/users', users.getAllUsers);
//router.get('/api/v1/users/:id', users.getFriends);

router.post('/api/v1/drops/', drops.createDrop);
router.get('/api/v1/drops/', drops.getAllDrops);
//router.get('/api/v1/drops/:id', drops.getDropsForUser);

module.exports = router;
