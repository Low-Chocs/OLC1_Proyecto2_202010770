const { Instruccion } = require("../Abstractas/Instruccion")
const { TipoInst } = require("../Utilities/TipoInst")

class Execute extends Instruccion {
    constructor(linea, columna, funcion) {
        super(linea, columna, TipoInst.EXECUTE)
        this.funcion = funcion
    }

    execute = (entorno) => {
        this.funcion.execute(entorno)
    }
}

module.exports = { Execute }