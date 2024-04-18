const { Instruccion } = require('../Abstractas/Instruccion')
const { Entorno } = require("../Entorno/Entorno")
const { TipoInst } = require('../Utilities/TipoInst')
class While extends Instruccion {
    constructor(line, column, condicion, bloque) {
        super(line, column, TipoInst.WHILE)
        this.condicion = condicion
        this.bloque = bloque
    }
    execute = (entorno) => {
        const entornoWhile = new Entorno(entorno, entorno.name)
        var condicion = this.condicion.execute(entornoWhile)
        while(condicion.valor) {
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
        }
    }
}

module.exports = { While }