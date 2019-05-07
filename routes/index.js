var express = require('express');
var router = express.Router();

var lobbyController = require('../controllers/Lobby');
var setupController = require('../controllers/Setup');

router.get('/', lobbyController.home);

router.ws('/lobby/socket/v:apiVersion', lobbyController.socket);

router.post('/setup/hook/:uid', setupController.hook);

module.exports = router;
