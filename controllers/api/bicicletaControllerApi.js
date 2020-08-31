const BiciMap = require('../../database/Bici');
const Bicicleta = require('../../database/models/Bicicleta');

const bicicletaController = {

    index: async (req, res) => {

        // Bicicleta.allBicis(function(err, bicicletas){
        //     res.status(200).json({'Cantidad de bicicletas': bicicletas.length, bicicletas: bicicletas})
        // })
        let bicicletas = await Bicicleta.allBicis;
        let results ={
            meta:
            {
                status: 'ok'
            },
            body: {
                'cantidad de bicicletas disponibles': bicicletas.length,
                bicicletas: bicicletas
            }
        }

        res.status(200).json({results})

    },

    create: (req, res) => {

        let ubicacion = [req.body.lat, req.body.lng];
        let bicicleta = ({code: Number(req.body.code), color: req.body.color, modelo: req.body.modelo, ubicacion: ubicacion});
        Bicicleta.add(bicicleta, (function(err){
            if(bicicleta){
                res.status(200).json({'ok': true, bicicleta})
            } else {
                let mensaje = 'No se pudo guardar la bicicleta'
                res.status(404).json({'ok': false, mensaje})
            }
        }));
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
                res.status(200).json( { bicicleta: bici } )
            })
        })
    },

    map: (req, res) => {
        res.status(200).json({ bicicletas: BiciMap.allBicis })
    }
};

module.exports = bicicletaController;