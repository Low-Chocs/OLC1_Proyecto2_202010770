const { Instruccion } = require('../Abstractas/Instruccion')
const { Entorno } = require("../Entorno/Entorno")
const { TipoInst } = require('../Utilities/TipoInst')
class For extends Instruccion {
    constructor(line, column, args, bloque) {
        super(line, column, TipoInst.FOR)
        this.args = args
        this.bloque = bloque
    }
    execute = (entorno) => {
        const entornoFor = new Entorno(entorno, entorno.nombre)
        this.args[0].execute(entornoFor)
        var condicion = this.args[1].execute(entornoFor)
        while(condicion.valor) {
            var bloque = this.bloque.execute(entornoFor)
            if(bloque) {
                if(bloque.valor === TipoInst.CONTINUE) {
                    this.args[2].execute(entornoFor)
                    condicion = this.args[1].execute(entornoFor)
                    continue
                }
                else if(bloque.valor === TipoInst.BREAK) {
                    break
                }
                return bloque
            }
            this.args[2].execute(entornoFor)
            condicion = this.args[1].execute(entornoFor)
        }
    }
}

module.exports = { For }