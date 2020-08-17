const express = require('express');
const router = express.Router();
const bicicletaController = require('../controllers/bicicletaController');

router.get('/', bicicletaController.index);
router.get('/:id', bicicletaController.showDetails);
router.get('/create', bicicletaController.newBici);
router.post('/create', bicicletaController.create);
router.get('/:id/update', bicicletaController.updateGet);
router.post('/:id/update', bicicletaController.updatePost);
router.post('/:id/delete', bicicletaController.delete);

module.exports = router