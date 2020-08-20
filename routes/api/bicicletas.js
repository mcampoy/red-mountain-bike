const express = require('express');
const router = express.Router();
const bicicletaAPIController = require('../../controllers/api/bicicletaController');

router.get('/', bicicletaAPIController.index);
router.post('/create', bicicletaAPIController.create);
router.put('/update', bicicletaAPIController.update);
router.delete('/delete', bicicletaAPIController.delete);
router.get('/map', bicicletaAPIController.map);

module.exports = router