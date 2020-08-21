const BiciMap = require('../../database/Bici');
const Bicicleta = require('../../database/models/Bicicleta');

const bicicletaController = {

    index: function (req, res){
        Bicicleta.find({}, function(err, bicicletas){
            res.status(200).json({'Cantidad de bicicletas': bicicletas.length, bicicletas: bicicletas})
        })
    },

    create: (req, res) => {

        let ubicacion = [req.body.lat, req.body.lng];
        let bicicleta = new Bicicleta({code: req.body.code, color: req.body.color, modelo: req.body.modelo, ubicacion: ubicacion});
        bicicleta.save(function(err){
            res.status(200).json({bicicleta})
        });

      },

    delete: (req, res) => {
         Bicicleta.findByCode(req.body.code, function(err, bici){
            if(bici){
            Bicicleta.removeByCode(req.body.code, function(err, bicicleta){
                let mensaje = `Se elmiminó correctamente la bicicleta con el código: ${req.body.code}`
                 res.status(200).json({'ok':true, mensaje})
            })
            } else {
                let mensaje = `No existe una bicicleta con el código: ${req.body.code}`
                res.status(404).json({'ok': false, mensaje})
            }
        })
    },

    update: (req, res) => {
        Bicicleta.findByCode(req.body.code, function(err, bici){

               bici.code = req.body.code;
               bici.color = req.body.color;
               bici.modelo = req.body.modelo;

             bici.save(function(err){
                res.status(200).json( { bicileta: bici } )
            })
        })
    },

    map: (req, res) => {
        res.status(200).json({ bicicletas: BiciMap.allBicis })
    }
};

module.exports = bicicletaController;