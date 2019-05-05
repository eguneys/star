var express = require('express');
var router = express.Router();

var lobbyController = require('../controllers/Lobby');

router.get('/', lobbyController.home);

module.exports = router;
