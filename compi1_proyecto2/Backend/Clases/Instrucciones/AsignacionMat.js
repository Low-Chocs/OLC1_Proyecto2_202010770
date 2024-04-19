const { Instruccion } = require("../Abstractas/Instruccion")
const { TipoInst } = require("../Utilities/TipoInst")

class AsignacionMat extends Instruccion {
    constructor(linea, columna, nombre, indiceI, indiceJ, valor) {
        super(linea, columna, TipoInst.ASIGMAT)
        this.nombre = nombre
        this.indiceI = indiceI
        this.indiceJ = indiceJ
        this.valor = valor
    }
    
    execute = (entorno) => {
        const valor = this.valor.execute(entorno)
        const indiceI = this.indiceI.execute(entorno)
        const indiceJ = this.indiceJ.execute(entorno)
        entorno.reasignarValorMatriz(this.nombre, indiceI.valor, indiceJ.valor, valor, this.linea, this.columna)
    }
}

module.exports = { AsignacionMat }