const { Instruccion } = require("../Abstractas/Instruccion")
const { Tipo } = require("../Utilities/Tipo")
const { TipoInst } = require("../Utilities/TipoInst")
const { Nodo } = require('../AST/Nodo')

class Break extends Instruccion {
    constructor(linea, columna) {
        super(linea, columna, TipoInst.BREAK)
    }

    execute = (_) => {
        return {valor: this.tipoInst, tipo: Tipo.NULL}
    }

    ast = () => {
        return new Nodo('BREAK')
    }
}

module.exports = { Break }