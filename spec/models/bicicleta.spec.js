let mongoose = require('mongoose');
let Bicicleta = require('../../database/models/Bicicleta');

describe('Testing Bicicletas', function() {
    beforeEach(function(done) {
        let mongoDB = 'mongodb://127.0.0.1/testdb';
        mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true })
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





// // Antes de cada testeo la coleeción Bicicleta vale 0
// beforeEach(() => {
//     Bicicleta.allBicis = []
// });

// // Testeo del método allBicis, comienza en 0
// describe('Bicleta.allBicis', () => {
//     it('Comienza vacía', () => {
//         expect(Bicicleta.allBicis.length).toBe(0);
//     });
// });

// // Testeo del método de agregar una bici
// describe('Bicicleta.add', () => {
//     it('se agrega una bicicleta', () => {
//         expect(Bicicleta.allBicis.length).toBe(0);

//         let a = new Bicicleta(1, 'rojo', 'mountain bike', [-32.9655714,-68.8912686]);

//         Bicicleta.add(a)

//         expect(Bicicleta.allBicis.length).toBe(1);
//         expect(Bicicleta.allBicis[0]).toBe(a);
//     })
// })

// // Testeo del método de encontrar según id
// describe('Bicicleta.findById', () => {
//     it('debe devolver la bici con id 1', () => {
//         expect(Bicicleta.allBicis.length).toBe(0);

//         let a = new Bicicleta(1, 'rojo', 'mountain bike', [-32.9655714,-68.8912686]);
//         let b = new Bicicleta(2, 'negro', 'urbana', [-32.9722849,-68.8825144]);

//         Bicicleta.add(a);
//         Bicicleta.add(b);

//         let targetBici = Bicicleta.findById(1)
//         expect(targetBici.id).toBe(1)
//         expect(targetBici.color).toBe(a.color)
//         expect(targetBici.modelo).toBe(a.modelo)
//     })
// })

// // Testeo del método delete
// describe('Bicicleta.removeById', () => {
//     it('elimina bicicleta según su id', () => {
//         expect(Bicicleta.allBicis.length).toBe(0);
        
//         // Agrego una bici para luego borrarla y comprobar que la colleción queda nuevamente vacía
//         let a = new Bicicleta(1, 'rojo', 'mountain bike', [-32.9655714,-68.8912686]);
//         Bicicleta.add(a)
        
//         // Compruebo que ahora la colección tiene un elemento
//         let targetBici = Bicicleta.findById(1)
//         expect(targetBici.id).toBe(1)

//         for (let i = 0; i < Bicicleta.allBicis.length; i++) {
//                 Bicicleta.allBicis.splice(i, 1);
//                 break;
//             }
//         // Compruebo que nuevamente valga cero
//         expect(Bicicleta.allBicis.length).toBe(0);

//         })
//     })