const Usuario = require('../../database/models/Usuario');

const usuarioController = {

    index: function(req, res) {
        Usuario.find({}, function(err, usuarios){
            res.status(200).json({
                usuarios: usuarios
            });
        });
    },

    create: function(req, res) {
        let usuario = new Usuario({nombre: req.body.nombre});

        usuario.save(function(err){
            res.status(200).json(usuario)
        });
    },

    usuario_reservar: function (req, res) {
        Usuario.findById(req.body.id, function(err, usuario){
            console.log(usuario);
            usuario.reservar(req.body.bici_id, req.body.desde, req.body.hasta, function(err){
            let confirmation = `${usuario.nombre} ha reservado la bicicleta ${req.body.bici_id} desde el ${req.body.desde} hasta el ${req.body.hasta}`;
                res.status(200).send({ok: true, confirmation});
            });
        });
    }

}

module.exports = usuarioController