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
}

module.exports = mongoose.model('Usuario', usuarioSchema);