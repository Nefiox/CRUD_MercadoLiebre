// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

router.get('/', mainController.index); // SE OBTIENE INFO 
router.get('/search', mainController.search); // NO SE HIZO

module.exports = router;
