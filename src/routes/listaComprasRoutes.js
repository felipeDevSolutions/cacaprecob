// routes/listaComprasRoutes.js
const express = require('express');
const router = express.Router();
const listaComprasController = require('../controllers/listaComprasController');

router.post('/', listaComprasController.criarListaCompras);
router.get('/:id', listaComprasController.getListaCompras);

module.exports = router;