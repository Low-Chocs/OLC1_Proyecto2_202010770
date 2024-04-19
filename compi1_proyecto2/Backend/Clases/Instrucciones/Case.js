const { Instruccion } = require("../Abstractas/Instruccion")
const { Entorno } = require("../Entorno/Entorno")
const { TipoInst } = require("../Utilities/TipoInst")

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
}

module.exports = { Case }