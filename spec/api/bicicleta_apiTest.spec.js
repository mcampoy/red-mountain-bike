const mongoose = require('mongoose');
const Bicicleta = require('../../database/models/Bicicleta');
const request = require('request');
let server = require('../../bin/www');

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
                request.get(urlBase, function(error, response, body) {
                    let result = JSON.parse(body);
                    expect(response.statusCode).toBe(200);
                    expect(result.bicicletas.length).toBe(0);
                    done();
                    });
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
                    console.log(bici);
                    expect(bici.color).toBe('rojo');
                    expect(bici.ubicacion[0]).toBe(-32.9655714);
                    expect(bici.ubicacion[1]).toBe(-68.8912686);
                    done();
                });
            });
        });