var express = require('express');
var router = express.Router();

var roundController = require('../controllers/Round');
var lobbyController = require('../controllers/Lobby');
var setupController = require('../controllers/Setup');

router.get('/', lobbyController.home);

router.ws('/lobby/socket/v:apiVersion', lobbyController.socket);

router.post('/setup/hook/:uid', setupController.hook);

router.get('/:fullId(\\w{12})', roundController.player);
router.ws('/:fullId(\\w{12})/socket/v:apiVersion', roundController.websocketPlayer);

module.exports = router;
