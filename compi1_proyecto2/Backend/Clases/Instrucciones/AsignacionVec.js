const { Instruccion } = require("../Abstractas/Instruccion")
const { TipoInst } = require("../Utilities/TipoInst")
const { Nodo } = require('../AST/Nodo')

class AsignacionVec extends Instruccion {
    constructor(linea, columna, nombre, indiceI, valor) {
        super(linea, columna, TipoInst.ASIGVAR)
        this.nombre = nombre
        this.indiceI = indiceI
        this.valor = valor
    }

    execute = (entorno) => {
        const valor = this.valor.execute(entorno)
        const indiceI = this.indiceI.execute(entorno)
        entorno.reasignarValorVector(this.nombre, indiceI.valor, valor, this.linea, this.columna)
    }

    ast = () => {
        const nodo = new Nodo('ASIGNACION')
        const igual = new Nodo('=')
        const identificador = new Nodo(this.nombre)
        identificador.insertarHijo(this.indiceI.ast())
        igual.insertarHijo(identificador)
        igual.insertarHijo(this.valor.ast())
        nodo.insertarHijo(igual)
        return nodo
    }
}

module.exports = { AsignacionVec }