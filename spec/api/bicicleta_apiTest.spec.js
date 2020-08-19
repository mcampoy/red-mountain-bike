const mongoose = require('mongoose');
const Bicicleta = require('../../database/models/Bicicleta');
const request = require('request');
// let server = require('../../bin/www');

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
                    expect(result.bicicletas.length).toBe(1);
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



// describe('Bicicleta API', () => {
//     // anidamos los describe
//     describe('GET bicicletas /', () => {
//         it('Status 200', () => {
//             expect(Bicicleta.allBicis.length).toBe(1);

//             let a = new Bicicleta(1, 'rojo', 'mountain bike', [-32.9655714,-68.8912686]);
//             Bicicleta.add(a);

//             request.get('http://localhost:3000/api/bicicletas', function(error, response, body) {
//                 expect(response.statusCode).toBe(200)
//             });
//         });
//     });

//     describe('POST bicicletas /create', () => {
//         it('Status 200', (done) => {
//             let headers = {'content-type' : 'application/json'};
//             let aBici = `{"id": 9, "color": "rojo", "modelo": "mountain bike", "lat": -32.9655714, "lng": -68.8912686}`;
//             request.post({
//                 headers: headers,
//                 url: 'http://localhost:3000/api/bicicletas/create',
//                 body: aBici
//             }, function(error, response, body) {
//                 expect(response.statusCode).toBe(200)
//                 expect(Bicicleta.findById(9).color).toBe('rojo');
//                 done();
//             });
//         });
//     });

//     describe('PUT bicicletas /update', () => {
//         // Creo una bici
//         let a = new Bicicleta(1, 'rojo', 'mountain bike', [-32.9655714,-68.8912686]);
//         Bicicleta.add(a)

//         // Hago un pedido por el método put para camibiar el modelo de la bici
//         it('Status 200', (done) => {
//             let headers = {'content-type' : 'application/json'};
//             let aBici = `{"id": 1, "color": "rojo", "modelo": "urbana", "lat": -32.9655714, "lng": -68.8912686}`;
//             request.put({
//                 headers: headers,
//                 url: 'http://localhost:3000/api/bicicletas/update',
//                 body: aBici
//             }, function(error, response, body) {
//                 expect(response.statusCode).toBe(200)
//                 expect(Bicicleta.findById(1).modelo).toBe('urbana');
//                 done();
//             });
//         });
//     });
    
//     describe('DELETE bicicletas /delete', () => {

//         it('Status 204', (done) => {
//             let headers = {'content-type' : 'application/json'};
//             let aBici = `{"id": 1}`;
//             request.delete({
//                 headers: headers,
//                 url: 'http://localhost:3000/api/bicicletas/delete',
//                 body: aBici
//             }, function(error, response, body) {
//                 expect(response.statusCode).toBe(204)
//                 let targetBici = Bicicleta.findById(1)
//                 expect(targetBici.id).toBe(1)

//                 for (let i = 0; i < Bicicleta.allBicis.length; i++) {
//                         Bicicleta.allBicis.splice(i, 1);
//                         break;
//                     }
//                 done();
//             });
//         });
//     });
// })
// });