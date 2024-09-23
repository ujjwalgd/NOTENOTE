const express = require('express');
const router = express.Router();
const dashboardController = require('./dashboardControllers');
const { isLoggedIn } = require('../middleware/checkAuth');

router.get('/dashboard', isLoggedIn, dashboardController.dashboard);
router.get('/dashboard/item/:id', isLoggedIn, dashboardController.ViewNote);
router.put('/dashboard/item/:id', isLoggedIn, dashboardController.UpdateNote);
router.get('/dashboard/newNote', isLoggedIn, dashboardController.createNewNote);
router.post('/dashboard/newNote', isLoggedIn, dashboardController.saveNewNote);
router.delete('/dashboard/item-delete/:id', isLoggedIn, dashboardController.deleteNote);

module.exports = router;