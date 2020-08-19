const BiciMap = require('../../database/Bici');
const Bicicleta = require('../../database/models/Bicicleta');

const bicicletaController = {

    index: function (req, res){
        Bicicleta.find({}, function(err, bicicletas){
            res.status(200).json({bicicletas: bicicletas})
        })
    },

    create: (req, res) => {
        let ubicacion = [req.body.lat, req.body.lng];
        let bicicleta = {color: req.body.color, modelo: req.body.modelo, ubicacion};

        Bicicleta.createInstance(bicicleta)

                  res.status(200).json( {bicicleta} )
      },
    // index: (req, res) => {
    //      res.status(200).json({
    //          bicicletas: Bicicleta.allBicis
    //         })
    // },

    // create: (req, res) => {
    //     let bicicleta = new Bicicleta(req.body.id, req.body.color, req.body.modelo)
    //     bicicleta.ubicacion = [req.body.lat, req.body.lng];
    //     Bicicleta.add(bicicleta);

    //     res.status(200).json({ bicicleta})
    // },

    // update: (req, res) => {
    //     let bici = Bicicleta.findById(req.body.id)
    //     bici.id = req.body.id;
    //     bici.color = req.body.color;
    //     bici.modelo = req.body.modelo;
    //     bici.ubicacion = [req.body.lat, req.body.lng];

    //     res.status(200).json( { bicileta: bici } )
    // },

    // delete: (req, res) => {
    //     Bicicleta.removeById(req.body.id);
        
    //     res.status(204).json()
    // }
    map: (req, res) => {
        res.status(200).json({ bicicletas: BiciMap.allBicis })
    }
};

module.exports = bicicletaController;