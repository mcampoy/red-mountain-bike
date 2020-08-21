const mongoose = require('mongoose');
const Bicicleta = require('../../database/models/Bicicleta');
const Usuario = require('../../database/models/Usuario');
const Reserva = require('../../database/models/Reserva');
const server = require('../../bin/www');

describe('Testing Usuarios', function() {
    beforeEach(function(done) {
        let mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB, { useNewUrlParser: true })
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDBTest connection error'));
        db.once('open', function() {
            console.log('We are connected to test database');

            done();
        });
    });

    afterEach(function(done) {
        Reserva.deleteMany({}, function(err, success) {
            if(err) console.log(err);
            Usuario.deleteMany({}, function(err, success) {
                if(err) console.log(err);
                Bicicleta.deleteMany({}, function(err, success) {
                    if(err) console.log(err);
                done();
                });
            });
        });
    });

    describe('Cuando el usuario hace una reserva', function(){
        it('Debe existir una reserva', (done) => {
            const usuario = new Usuario({nombre: 'Matías'});
            usuario.save();
            const bicicleta = new Bicicleta({code: 1, color: 'azul', modelo: 'urbana'});
            bicicleta.save();

            let hoy = new Date();
            let mañana = new Date();
            mañana.setDate(hoy.getDate()+1);
            usuario.reservar(bicicleta.id, hoy, mañana, function(errr, reserva){
                Reserva.find({}).populate('bicicleta').populate('usuario').exec(function(err, reservas){
                // console.log(reservas[0]);
                expect(reservas.length).toBe(1);
                expect(reservas[0].diasDeReserva()).toBe(2);
                expect(reservas[0].bicicleta.code).toBe(1);
                expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
                done()
            });
            });
        });
    });

});