const express = require('express');
const router = express.Router();
const mainController = require('./mainControllers');

/* APP Routes */

router.get('/', mainController.homepage);
router.get('/about', mainController.about);
router.get('/coko', mainController.coko);


module.exports = router;