const { Expresion } = require("../Abstractas/Expresion")
const { Tipo } = require("../Utilities/Tipo")
const { TipoExp } = require("../Utilities/TipoExp")

class AccesoMat extends Expresion {
    constructor(linea, columna, nombre, indiceI, indiceJ) {
        super(linea, columna, TipoExp.ACCESOMAT)
        this.nombre = nombre
        this.indiceI = indiceI
        this.indiceJ = indiceJ
    }

    execute = (entorno) => {
        const indiceI = this.indiceI.execute(entorno)
        const indiceJ = this.indiceJ.execute(entorno)
        const valor = entorno.obtenerPosicionMatriz(this.nombre, indiceI.valor, indiceJ.valor, this.linea, this.columna)
        if(valor) {
            return valor
        }
        return {valor: 'NULL', tipo: Tipo.NULL}
    }
}

module.exports = { AccesoMat }