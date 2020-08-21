const express = require('express');
const router = express.Router();
const usuariosAPIController = require('../../controllers/api/usuariosController');

router.get('/', usuariosAPIController.index);
router.post('/create', usuariosAPIController.create);
router.delete('/delete', usuariosAPIController.delete);
// router.put('/update', usuariosAPIController.update);
router.post('/reservar', usuariosAPIController.usuario_reservar);

module.exports = router;