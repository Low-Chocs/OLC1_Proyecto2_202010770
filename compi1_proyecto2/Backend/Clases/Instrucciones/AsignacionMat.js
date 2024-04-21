const { Instruccion } = require("../Abstractas/Instruccion")
const { TipoInst } = require("../Utilities/TipoInst")
const { Nodo } = require('../AST/Nodo')

class AsignacionMat extends Instruccion {
    constructor(linea, columna, nombre, indiceI, indiceJ, valor) {
        super(linea, columna, TipoInst.ASIGMAT)
        this.nombre = nombre
        this.indiceI = indiceI
        this.indiceJ = indiceJ
        this.valor = valor
    }

    execute = (entorno) => {
        const valor = this.valor.execute(entorno)
        const indiceI = this.indiceI.execute(entorno)
        const indiceJ = this.indiceJ.execute(entorno)
        entorno.reasignarValorMatriz(this.nombre, indiceI.valor, indiceJ.valor, valor, this.linea, this.columna)
    }

    ast = () => {
        const nodo = new Nodo('ASIGNACION')
        const igual = new Nodo('=')
        const identificador = new Nodo(this.nombre)
        identificador.insertarHijo(this.indiceI.ast())
        identificador.insertarHijo(this.indiceJ.ast())
        igual.insertarHijo(identificador)
        igual.insertarHijo(this.valor.ast())
        nodo.insertarHijo(igual)
        return nodo
    }
}

module.exports = { AsignacionMat }