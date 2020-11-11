const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/', adminController.getIndex);

router.get('/add-game', adminController.getAddGame);

router.get('/edit-list/:gameId', adminController.getEditList);

router.post('/add-game', adminController.postGame);

router.post('/edit-list', adminController.postEditList);

router.get('/:gameId', adminController.getGame);

router.post('/delete', adminController.postDelete);

module.exports = router;