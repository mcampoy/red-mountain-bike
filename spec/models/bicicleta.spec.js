const Bicicleta = require('../../bd/models/Bicicleta');

// Antes de cada testeo la coleeción Bicicleta vale 0
beforeEach(() => {
    Bicicleta.allBicis = []
});

// Testeo del método allBicis, comienza en 0
describe('Bicleta.allBicis', () => {
    it('Comienza vacía', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

// Testeo del método de agregar una bici
describe('Bicicleta.add', () => {
    it('se agrega una bicicleta', () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        let a = new Bicicleta(1, 'rojo', 'mountain bike', [-32.9655714,-68.8912686]);

        Bicicleta.add(a)

        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);
    })
})

// Testeo del método de encontrar según id
describe('Bicicleta.findById', () => {
    it('debe devolver la bici con id 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        let a = new Bicicleta(1, 'rojo', 'mountain bike', [-32.9655714,-68.8912686]);
        let b = new Bicicleta(2, 'negro', 'urbana', [-32.9722849,-68.8825144]);

        Bicicleta.add(a);
        Bicicleta.add(b);

        let targetBici = Bicicleta.findById(1)
        expect(targetBici.id).toBe(1)
        expect(targetBici.color).toBe(a.color)
        expect(targetBici.modelo).toBe(a.modelo)
    })
})

// Testeo del método delete
describe('Bicicleta.removeById', () => {
    it('elimina bicicleta según su id', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        
        // Agrego una bici para luego borrarla y comprobar que la colleción queda nuevamente vacía
        let a = new Bicicleta(1, 'rojo', 'mountain bike', [-32.9655714,-68.8912686]);
        Bicicleta.add(a)
        
        // Compruebo que ahora la colección tiene un elemento
        let targetBici = Bicicleta.findById(1)
        expect(targetBici.id).toBe(1)

        for (let i = 0; i < Bicicleta.allBicis.length; i++) {
                Bicicleta.allBicis.splice(i, 1);
                break;
            }
        // Compruebo que nuevamente valga cero
        expect(Bicicleta.allBicis.length).toBe(0);

        })
    })