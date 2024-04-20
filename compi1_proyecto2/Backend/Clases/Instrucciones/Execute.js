const { Instruccion } = require("../Abstractas/Instruccion")
const { TipoInst } = require("../Utilities/TipoInst")
const { Nodo } = require('../AST/Nodo')

class Execute extends Instruccion {
    constructor(linea, columna, funcion) {
        super(linea, columna, TipoInst.EXECUTE)
        this.funcion = funcion
    }

    execute = (entorno) => {
        this.funcion.execute(entorno)
    }

    ast = () => {
        const nodo = new Nodo('EXECUTE')
        nodo.insertarHijo(this.funcion.ast())
        return nodo
    }
}

module.exports = { Execute }