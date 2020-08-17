const Bicicleta = require('../../bd/models/Bicicleta');

const bicicletaController = {
    index: (req, res) => {
         res.status(200).json({
             bicicletas: Bicicleta.allBicis
            })
    },

    create: (req, res) => {
        let bicicleta = new Bicicleta(req.body.id, req.body.color, req.body.modelo)
        bicicleta.ubicacion = [req.body.lat, req.body.lng];
        Bicicleta.add(bicicleta);

        res.status(200).json({ bicicleta})
    },

    update: (req, res) => {
        let bici = Bicicleta.findById(req.params.id)
        bici.id = req.body.id;
        bici.color = req.body.color;
        bici.modelo = req.body.modelo;
        bici.ubicacion = [req.body.lat, req.body.lng];

        res.status(200).json( { bicileta: bici } )
    },

    delete: (req, res) => {
        Bicicleta.removeById(req.body.id);
        
        res.status(204).json()
    }
};

module.exports = bicicletaController;