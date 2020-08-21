let mongoose = require('mongoose');
let Bicicleta = require('../../database/models/Bicicleta');

describe('Testing Bicicletas', function() {
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
        Bicicleta.deleteMany({}, function(err, success) {
            if(err) console.log(err);
            done();
        });
    });

    describe('Bicicleta.createInstance', () => {
        it('Crea una instancia de bicicleta', () => {
            let bici = Bicicleta.createInstance(1, 'negra', 'mountain', [-32.9655714,-68.8912686]);

            expect(bici.code).toBe(1);
            expect(bici.color).toBe('negra');
            expect(bici.modelo).toBe('mountain');
            expect(bici.ubicacion[0]).toEqual(-32.9655714);
            expect(bici.ubicacion[1]).toEqual(-68.8912686);
        })
    });

    describe('Bicicleta.allBicis', () => {
        it('comienza vacía', done => {
            Bicicleta.allBicis( function(err, bicis){
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });

    describe('Bicicleta.add', () => {
        it('agrega solo una bici', (done) => {
            let aBici =  new Bicicleta({code: 1, color: 'azul', modelo: 'urbana'});
            Bicicleta.add(aBici, (err, newBici) => {
                if (err) console.log(err);
                Bicicleta.allBicis(function(err, bicis){
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(aBici.code);

                    done();
                });
            });
        });
    });

    describe('Bicicleta.findByCode', () => {
        it('debe devolver la bici con code 1', (done) => {
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);

                let aBici =  new Bicicleta({code: 1, color: 'azul', modelo: 'urbana'});
                Bicicleta.add(aBici, (err, newBici) => {
                  if (err) console.log(err);
                  Bicicleta.findByCode(1, function(err, targetBici){
                      expect(targetBici.code).toBe(aBici.code);
                      expect(targetBici.color).toBe(aBici.color);
                      expect(targetBici.modelo).toBe(aBici.modelo);

                      done();
                  })
                })
            })
        })
    });
});
