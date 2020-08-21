var mongoose = require('mongoose');
var Reserva = require('../../database/models/Reserva');
var Bicicleta = require('../../database/models/Bicicleta');
var Usuario = require('../../database/models/Usuario');
let server = require('../../bin/www');


describe('Testing Reservas', function() {
    
    beforeEach(function(done){
        
        var mongoDB = "mongodb://localhost/testdb";
        mongoose.connect(mongoDB, { useNewUrlParser:true });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function(){
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