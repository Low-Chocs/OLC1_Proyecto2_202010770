const { Instruccion } = require("../Abstractas/Instruccion")
const { TipoInst } = require("../Utilities/TipoInst")

class Print extends Instruccion {
    constructor(linea, columna, expresion, endl) {
        super(linea, columna, TipoInst.PRINT)
        this.expresion = expresion
        this.endl = endl
    }

    execute = (entorno) => {
        const valor = this.expresion.execute(entorno)
        entorno.setPrint(`${valor.valor}`)
        if(this.endl) {
            entorno.setPrint('\n')
        }
    }
}

module.exports = { Print }