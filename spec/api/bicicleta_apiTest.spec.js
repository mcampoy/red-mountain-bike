const mongoose = require('mongoose');
const Bicicleta = require('../../database/models/Bicicleta');
const request = require('request');
const server = require('../../bin/www');

let urlBase = 'http://localhost:3000/api/bicicletas';

describe('Testing API Bicicletas', function() {
    beforeEach(function(done) {
        let mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB, { useNewUrlParser: true })
        .then

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDBTest connection error'));
        db.once('open', function() {
            console.log('We are connected to test database');
            done();
        });
    });

    afterEach(function(done) {
        Bicicleta.deleteMany({}, function(err, success) {
            if(err) console.log(err);
            done();
        });
    });

    describe('GET bicicletas /', () => {
        it('Status 200', (done) => {
            request.get(urlBase, function (error, response, body) {
                let result = JSON.parse(body);
                expect(response.statusCode).toBe(200);
                expect(result.bicicletas.length).toBe(0);
                done();
                });
            });
        });


    describe('POST bicicletas /create', () => {
        it('Status 200', (done) => {
            let headers = {'content-type' : 'application/json'};
            let aBici = `{"id": 9, "color": "rojo", "modelo": "mountain bike", "lat": -32.9655714, "lng": -68.8912686}`;

            request.post({
                headers: headers,
                url: urlBase + '/create',
                body: aBici
            }, function(error, response, body) {
                expect(response.statusCode).toBe(200);

                let bici = JSON.parse(body).bicicleta;
                // console.log(bici);

                expect(bici.color).toBe('rojo');
                expect(bici.ubicacion[0]).toBe(-32.9655714);
                expect(bici.ubicacion[1]).toBe(-68.8912686);

                done();
            });
        });
    });

    describe('PUT BICICLETA /update', () => {
        it('status 200', (done) => {
            let aBici = new Bicicleta({code:1, color:"roja", modelo:"xtreme"});

            aBici.save(( err, bici ) => {
                if (err) console.log(err);
                Bicicleta.findOne({code: bici.code}).exec((err, bicicleta) => {
                    if (err) console.log(err);

                    let headers = {'content-type' : 'application/json'};
                    let abiciUpdate = '{ "code":1, "color":"azul","modelo":"urbana","lat": -32.975832,"lng": -98.808815 }';   

                    request.put({
                        headers : headers,
                        url: urlBase + '/update',
                        body : abiciUpdate
                    },
                    function(error, response, body) {
                        expect(response.statusCode).toBe(200);
                        Bicicleta.findByCode(1, ( err, bicicleta) => {
                            if ( err) console.log(err);

                            // console.log( 'Bicicleta actualizada:' + bicicleta);

                            expect(bicicleta.code).toBe(1);
                            expect(bicicleta.color).toBe('azul');
                            expect(bicicleta.modelo).toBe('urbana');

                            done();

                        });
                    });
                });
            });
        });
    });

    describe('DELETE Bicicletas /delete', () => {
        it('Status 200', (done) => {
            let aBici = new Bicicleta({code:4, color:"roja", modelo:"xtreme"});

            aBici.save(( err, bici ) => {
                if (err) console.log(err);

                Bicicleta.findOne({code: bici.code}).exec((err, bicicleta) => {
                    if (err) console.log(err);

                    // console.log(bicicleta);

                    let headers = {'content-type': 'application/json'};

                    request.delete({
                        headers: headers,
                        url: `${urlBase}/delete`,
                        body: '{"code": 4}'
                    }, function(err, response, body) {
                        expect(response.statusCode).toBe(200);
                        let mensaje = JSON.parse(body)
                        // console.log(mensaje.mensaje)

                        Bicicleta.allBicis(function (err, newBicis) {
                            expect(newBicis.length).toBe(0);

                            done();

                        });
                    });
                });
            });
        });
    });
});