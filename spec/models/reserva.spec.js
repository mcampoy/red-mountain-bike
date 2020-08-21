const mongoose = require('mongoose');
const Reserva = require('../../database/models/Reserva');
const Bicicleta = require('../../database/models/Bicicleta');
const Usuario = require('../../database/models/Usuario');
const server = require('../../bin/www');


describe('Testing Reservas', function() {
    
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

    afterEach(function(done){
        Reserva.deleteMany({}, function(err, success) {
            if (err) console.log(err);
            Usuario.deleteMany({}, function( err, success ){
                if (err) console.log(err);
                Bicicleta.deleteMany({}, function(err, success)  {
                    if (err) console.log(err);
                    done();
                });
            });
        });
    });


});