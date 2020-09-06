var expres = require('express');
var router = express.Router();
const connectController = require('./connectController')


/* GET room page. */
router.get('/', connectController.controll, function(req, res, next) {
  res.render('room', { title: 'Express' });
});

module.exports = router;
