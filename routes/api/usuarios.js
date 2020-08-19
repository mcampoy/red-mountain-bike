const express = require('express');
const router = express.Router();
const usuariosAPIController = require('../../controllers/api/usuariosController');

router.get('/', usuariosAPIController.index);
router.post('/create', usuariosAPIController.create);
router.post('/reservar', usuariosAPIController.usuario_reservar);

module.exports = router;