const { Instruccion } = require("../Abstractas/Instruccion")
const { Tipo } = require("../Utilities/Tipo")
const { TipoInst } = require("../Utilities/TipoInst")

class Continue extends Instruccion {
    constructor(linea, columna) {
        super(linea, columna, TipoInst.CONTINUE)
    }

    execute = (_) => {
        return {valor: this.tipoInst, tipo: Tipo.NULL}
    }
}

module.exports = { Continue }