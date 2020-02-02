const server  = require('../controllers/handler.server.controller.js'),
      express = require('express'),
      router  = express.Router();

router.route('/rescueeRequest')
    .post(server.rescueeRequest);
router.route('/rescuerNewMission')
	.post(server.rescuerNewMission);
router.route('/rescueePickedUp')
	.post(server.rescueePickedUp);
router.route('/getGPX')
	.get(server.getGPX);

module.exports = router;
