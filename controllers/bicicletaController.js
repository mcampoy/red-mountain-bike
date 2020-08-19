const Bicicleta = require('../database/Bici');

const bicicletaController ={
    index: (req, res) => {
        res.render('bicicletas/index', { bicis: Bicicleta.allBicis })
    },

    showDetails: (req, res) => {
        let bici = Bicicleta.findById(req.params.id)
        res.render('bicicletas/show', { bici })
    },

    newBici: (req, res) => {
        res.render('bicicletas/create')
    },

    create: (req, res) => {
        let bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo)
        bici.ubicacion = [req.body.lat, req.body.lng];

        Bicicleta.add(bici);

        res.redirect('/bicicletas')
    },

    updateGet: (req, res) => {
        let bici = Bicicleta.findById(req.params.id)
        res.render('bicicletas/update', { bici })
    },

    updatePost: (req, res) => {
        let bici = Bicicleta.findById(req.params.id)
        bici.id = req.body.id;
        bici.color = req.body.color;
        bici.modelo = req.body.modelo;
        bici.ubicacion = [req.body.lat, req.body.lng];

        res.redirect('/bicicletas')
    },

    delete: (req, res) => {
        Bicicleta.removeById(req.body.id);
        
        res.redirect('/bicicletas')
    }
}

module.exports = bicicletaController

