const mongoose = require('mongoose');
const Usuario = require('../../database/models/Usuario');
const request = require('request');
let server = require('../../bin/www');

let urlBase = 'http://localhost:3000/api/usuarios';

describe('Testing API Usuarios', function() {
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
        Usuario.deleteMany({}, function(err, success) {
            if(err) console.log(err);
            done();
        });
    });

        describe('GET usuarios /', () => {
            it('Status 200', (done) => {
                request.get(urlBase, function(error, response, body) {
                    let result = JSON.parse(body);
                    expect(response.statusCode).toBe(200);
                    expect(result.usuarios.length).toBe(0);
                    done();
                    });
                });
            });
        });
    
        describe('POST usuarios /create', () => {
            it('Status 200', (done) => {
                let headers = {'content-type' : 'application/json'};
                let aUser = `{"nombre": "Marta"}`;
                request.post({
                    headers: headers,
                    url: urlBase + '/create',
                    body: aUser
                }, function(error, response, body) {
                    expect(response.statusCode).toBe(200);
                    let user = JSON.parse(body);
                    if(error) console.log(error)
                    console.log(user);
                    expect(user.nombre).toBe('Marta');
                    done();
                });
            });
        });
