const { Instruccion } = require("../Abstractas/Instruccion")
const { TipoInst } = require("../Utilities/TipoInst")

class AsignacionVec extends Instruccion {
    constructor(linea, columna, nombre, indiceI, valor) {
        super(linea, columna, TipoInst.ASIGVAR)
        this.nombre = nombre
        this.indiceI = indiceI
        this.valor = valor
    }

    execute = (entorno) => {
        const valor = this.valor.execute(entorno)
        const indiceI = this.indiceI.execute(entorno)
        entorno.reasignarValorVector(this.nombre, indiceI.valor, valor, this.linea, this.columna)
    }
}

module.exports = { AsignacionVec }