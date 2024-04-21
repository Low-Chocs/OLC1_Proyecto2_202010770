const { Expresion } = require("../Abstractas/Expresion")
const { Tipo } = require("../Utilities/Tipo")
const { TipoExp } = require("../Utilities/TipoExp")
const { Nodo } = require('../AST/Nodo')

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

    ast = () => {
        const nodo = new Nodo(this.nombre)
        nodo.insertarHijo(this.indiceI.ast())
        return nodo
    }
}

module.exports = { AccesoVec }