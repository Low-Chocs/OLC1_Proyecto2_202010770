const { Expresion } = require("../Abstractas/Expresion")
const { Tipo } = require("../Utilities/Tipo")
const { TipoExp } = require("../Utilities/TipoExp")

class AccesoVec extends Expresion {
    constructor(linea, columna, nombre, indiceI) {
        super(linea, columna, TipoExp.ACCESOVEC)
        this.nombre = nombre
        this.indiceI = indiceI
    }
    
    execute = (entorno) => {
        const indiceI = this.indiceI.execute(entorno)
        const valor = entorno.obtenerPosicionVector(this.nombre, indiceI.valor, this.linea, this.columna)
        if(valor) {
            return valor
        }
        return {valor: 'NULL', tipo: Tipo.NULL}
    }
}

module.exports = { AccesoVec }