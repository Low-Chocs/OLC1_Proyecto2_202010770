const { Instruccion } = require("../Abstractas/Instruccion")
const { TipoInst } = require("../Utilities/TipoInst")
const { Nodo } = require('../AST/Nodo')

class AsignacionVar extends Instruccion {
    constructor(linea, columna, nombre, valor) {
        super(linea, columna, TipoInst.ASIGVAR)
        this.nombre = nombre
        this.valor = valor
    }

    execute = (entorno) => {
        const valor = this.valor.execute(entorno)
        entorno.reasignarValorVariable(this.nombre, valor, this.linea, this.columna)
    }

    ast = () => {
        const nodo = new Nodo('ASIGNACION')
        const igual = new Nodo('=')
        igual.insertarHijo(new Nodo(this.nombre))
        igual.insertarHijo(this.valor.ast())
        nodo.insertarHijo(igual)
        return nodo
    }
}

module.exports = { AsignacionVar }