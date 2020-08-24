const mongoose = require('mongoose');
const Reserva = require('./Reserva')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRound = 10;

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

// usuarioSchema.plugin(uniqueValidator, { message: 'El {PATH} ya existe con otro usuario'});

usuarioSchema.pre('save', function(next){
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, saltRound);
    }
    next();
});

usuarioSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};


usuarioSchema.methods.reservar = function(biciID, desde, hasta, cb){
    let reserva = new Reserva({
        usuario: this._id,
        bicicleta: biciID,
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


module.exports = mongoose.model('Usuario', usuarioSchema);