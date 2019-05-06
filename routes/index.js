var express = require('express');
var router = express.Router();

var lobbyController = require('../controllers/Lobby');

router.get('/', lobbyController.home);
router.ws('/lobby/socket/v:apiVersion', lobbyController.socket);

module.exports = router;
