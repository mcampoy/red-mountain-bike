const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Reserva = require('./Reserva');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const saltRound = 10;

const Token = require('./Token');
const mailer = require('../../mailer/mailer');

let Schema = mongoose.Schema;

const validateEmail = function (email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};


let usuarioSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'El email es obligatorio'],
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Por favor ingresar un email válido'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    passwordResetToken: String,
    passwordResetTokenExpire: Date,
    verificado: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.plugin(uniqueValidator, {message: 'El {PATH} ya existe con otro usuario'});

usuarioSchema.pre('save', function(next){
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, saltRound);
    }
    next();
});

usuarioSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};


usuarioSchema.methods.reservar = function(biciId, desde, hasta, cb){
    let reserva = new Reserva({
        usuario: this._id,
        bicicleta: biciId,
        desde: desde,
        hasta: hasta
    })
    console.log(reserva);
    reserva.save(cb);
};

usuarioSchema.statics.allUsuarios = function(cb) {
    return this.find({ }, cb);
};

usuarioSchema.statics.add = function(user, cb) {
    return this.create(user, cb);
};

usuarioSchema.statics.findByName = function(name, cb) {
    return this.findOne({nombre: name }, cb);
};

usuarioSchema.statics.removeByName = function(name, cb) {
    return this.deleteOne({nombre: name}, cb);
}


// Mail de bienvenida y autenticación de cuenta de usuario

usuarioSchema.methods.enviarEmailBienvenida = function(cb) {
    const token = new Token({_userId: this.id, token: crypto.randomBytes(16).toString('hex')});
    const emailDestination = this.email;

    console.log('token: ' + token);
    console.log('email destination: ' + emailDestination);

    // Persistitmos el Token
    token.save(function(err) {
        if(err) {
            return console.log(err.message);
        }

        const validationDir = `http://localhost:3000/token/confirmation/${token.token}`

        const mailOptions = {
            from: 'no-reply@redbicicletas.com',
            to: emailDestination,
            subject: 'Verificación de cuenta',
            text: '¡Te damos la bienvenida a Red bicicletas de montaña!, \n\n' + 'Por favor, para verificar tu cuenta hacé click en el siguiente enlace: \n' + validationDir
        }

        console.log( '-------------------------------------------' + '\n')
        console.log( 'Pueden validar la cuenta desde aquí: ' + validationDir)
        console.log( '\n' + '-------------------------------------------' + '\n')
        console.log(mailOptions)
        
        mailer.sendMail(mailOptions, function(err) {
            if(err) { 
                return console.log(err.message); 
            } else {
                console.log('Se ha enviado un correo electrónico de bienvenida a ' + emailDestination + '.');
            }
        });
    });
};


module.exports = mongoose.model('Usuario', usuarioSchema);