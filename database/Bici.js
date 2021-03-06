const Bicicleta  = function (id, color, modelo, ubicacion){
        this.id = id;
        this.color = color;
        this.modelo = modelo;
        this.ubicacion = ubicacion;
    }
    
    Bicicleta.prototype.toString = function() {
        return 'id: ' + this.id + ' | color: ' + this.color;
    }
    
    Bicicleta.allBicis = [];
    Bicicleta.add = function(aBici){
        Bicicleta.allBicis.push(aBici);
    }
    
    Bicicleta.findById = (aBiciId) => {
        let aBici =Bicicleta.allBicis.find((x) => x.id == aBiciId);
        if(aBici)
            return aBici
        else
            throw new Error(`No existe una bicicleta con el id ${aBiciId}`)
    }
    
    Bicicleta.removeById = (aBiciId) => {
        for (let i = 0; i < Bicicleta.allBicis.length; i++){
            if(Bicicleta.allBicis[i].id == aBiciId) {
                Bicicleta.allBicis.splice(i, 1);
                break;
            }
        }
    }
    
    let a = new Bicicleta(1, 'rojo', 'mountain bike', [-32.9655714,-68.8912686]);
    let b = new Bicicleta(2, 'negro', 'mountain bike', [-32.9722849,-68.8825144]);
    
    Bicicleta.add(a)
    Bicicleta.add(b)
    
    module.exports = Bicicleta