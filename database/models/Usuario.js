const mongoose = require('mongoose');
const Reserva = require('./Reserva')
const Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: String
});


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