const Bicicleta = require('../../database/models/Bicicleta');
const request = require('request');
// let server = require('../../bin/www');

beforeEach(() => {
    console.log('testeando...')
});
describe('Bicicleta API', () => {
    // anidamos los describe
    describe('GET bicicletas /', () => {
        it('Status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(1);

            let a = new Bicicleta(1, 'rojo', 'mountain bike', [-32.9655714,-68.8912686]);
            Bicicleta.add(a);

            request.get('http://localhost:3000/api/bicicletas', function(error, response, body) {
                expect(response.statusCode).toBe(200)
            });
        });
    });

    describe('POST bicicletas /create', () => {
        it('Status 200', (done) => {
            let headers = {'content-type' : 'application/json'};
            let aBici = `{"id": 9, "color": "rojo", "modelo": "mountain bike", "lat": -32.9655714, "lng": -68.8912686}`;
            request.post({
                headers: headers,
                url: 'http://localhost:3000/api/bicicletas/create',
                body: aBici
            }, function(error, response, body) {
                expect(response.statusCode).toBe(200)
                expect(Bicicleta.findById(9).color).toBe('rojo');
                done();
            });
        });
    });

    describe('PUT bicicletas /update', () => {
        // Creo una bici
        let a = new Bicicleta(1, 'rojo', 'mountain bike', [-32.9655714,-68.8912686]);
        Bicicleta.add(a)

        // Hago un pedido por el método put para camibiar el modelo de la bici
        it('Status 200', (done) => {
            let headers = {'content-type' : 'application/json'};
            let aBici = `{"id": 1, "color": "rojo", "modelo": "urbana", "lat": -32.9655714, "lng": -68.8912686}`;
            request.put({
                headers: headers,
                url: 'http://localhost:3000/api/bicicletas/update',
                body: aBici
            }, function(error, response, body) {
                expect(response.statusCode).toBe(200)
                expect(Bicicleta.findById(1).modelo).toBe('urbana');
                done();
            });
        });
    });
    
    describe('DELETE bicicletas /delete', () => {

        it('Status 204', (done) => {
            let headers = {'content-type' : 'application/json'};
            let aBici = `{"id": 1}`;
            request.delete({
                headers: headers,
                url: 'http://localhost:3000/api/bicicletas/delete',
                body: aBici
            }, function(error, response, body) {
                expect(response.statusCode).toBe(204)
                let targetBici = Bicicleta.findById(1)
                expect(targetBici.id).toBe(1)

                for (let i = 0; i < Bicicleta.allBicis.length; i++) {
                        Bicicleta.allBicis.splice(i, 1);
                        break;
                    }
                done();
            });
        });
    });
});