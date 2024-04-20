const { Instruccion } = require("../Abstractas/Instruccion")
const { Tipo } = require("../Utilities/Tipo")
const { TipoInst } = require("../Utilities/TipoInst")
const { Nodo } = require('../AST/Nodo')

class Continue extends Instruccion {
    constructor(linea, columna) {
        super(linea, columna, TipoInst.CONTINUE)
    }

    execute = (_) => {
        return {valor: this.tipoInst, tipo: Tipo.NULL}
    }

    ast = () => {
        return new Nodo('CONTINUE')
    }
}

module.exports = { Continue }