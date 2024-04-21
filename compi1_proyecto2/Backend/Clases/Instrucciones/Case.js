const { Instruccion } = require("../Abstractas/Instruccion")
const { Entorno } = require("../Entorno/Entorno")
const { TipoInst } = require("../Utilities/TipoInst")
const { Nodo } = require('../AST/Nodo')

class Case extends Instruccion {
    constructor(linea, columna, caso, bloque) {
        super(linea, columna, TipoInst.CASE)
        this.caso = caso
        this.bloque = bloque
    }

    setCaso = (casoEvaluado) => {
        this.casoEvaluado = casoEvaluado
    }

    execute = (entorno) => {
        const entornoCase = new Entorno(entorno, entorno.nombre)
        var caso = this.caso.execute(entornoCase)
        if(caso.valor === this.casoEvaluado.valor) {
            var bloque = this.bloque.execute(entornoCase)
            if(bloque) {
                return bloque
            }
        }
    }

    ast = () => {
        const nodo = new Nodo('CASE')
        nodo.insertarHijo(this.caso.ast())
        nodo.insertarHijo(this.bloque.ast())
        return nodo
    }
}

module.exports = { Case }