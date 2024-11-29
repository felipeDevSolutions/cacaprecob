const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.get('/', produtoController.getProdutos);
router.get('/:id', produtoController.getProdutoById);
router.get('/categorias', produtoController.getCategorias);

module.exports = router;