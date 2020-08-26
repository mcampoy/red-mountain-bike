const Usuario = require('../database/models/Usuario');
const Token = require('../database/models/Token');

module.exports = {

    confirmation: function(req, res, next) {

        Token.findOne({token: req.params.token}, function(err, token) {

            if(!token) return res.status(400).send({type: 'not-verified', msg: 'No encontramos un usuario con ese token. Quizá haya expirado. Por favor, solicítelo nuevamente.'});

            Usuario.findById(token._userId, function(err, usuario) {

                if(!usuario) return res.status(400).send({msg: 'No encontramos un usuario con ese token'});
                if(usuario.verificado) return res.redirect('/usuarios');
                usuario.verificado = true;
                usuario.save(function(err) {

                    if(err) { return res.status(500).send({msg: err.message}); }
                    res.redirect('/usuarios');

                });
            });
        });
    },
}