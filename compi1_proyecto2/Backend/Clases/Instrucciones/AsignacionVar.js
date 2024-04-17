const { Instruccion } = require("../Abstractas/Instruccion")
const { TipoInst } = require("../Utilities/TipoInst")

class AsignacionVar extends Instruccion {
    constructor(linea, columna, nombre, valor) {
        super(linea, columna, TipoInst.ASIGVAR)
        this.nombre = nombre
        this.valor = valor
    }

    execute = (entorno) => {
        const valor = this.valor.execute(entorno)
        entorno.reasignarValorVariable(this.nombre, valor, this.linea, this.columna)
    }
}

module.exports = { AsignacionVar }