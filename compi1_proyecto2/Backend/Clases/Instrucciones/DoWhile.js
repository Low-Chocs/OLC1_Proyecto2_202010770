const { Instruccion } = require('../Abstractas/Instruccion')
const { Entorno } = require("../Entorno/Entorno")
const { TipoInst } = require('../Utilities/TipoInst')
class DoWhile extends Instruccion {
    constructor(line, column, condicion, bloque) {
        super(line, column, TipoInst.DOWHILE)
        this.condicion = condicion
        this.bloque = bloque
    }
    execute = (entorno) => {
        const entornoWhile = new Entorno(entorno, entorno.name)
        var condicion = null
        do {
            var bloque = this.bloque.execute(entornoWhile)
            if(bloque) {
                if(bloque.valor === TipoInst.CONTINUE) {
                    condicion = this.condicion.execute(entornoWhile)
                    continue
                }
                else if(bloque.valor === TipoInst.BREAK) {
                    break
                }
                return bloque
            }
            condicion = this.condicion.execute(entornoWhile)
        } while(condicion.valor)
    }
}

module.exports = { DoWhile }