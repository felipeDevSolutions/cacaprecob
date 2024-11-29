const express = require('express');
const router = express.Router();
const supermercadoController = require('../controllers/supermercadoController');

router.get('/', supermercadoController.getSupermercados);

module.exports = router;