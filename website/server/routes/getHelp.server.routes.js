const server  = require('../controllers/getHelp.server.controller.js'),
      express = require('express'),
      router  = express.Router();

router.route('/getHelp')
    .post(server.msg_received);

module.exports = router;
