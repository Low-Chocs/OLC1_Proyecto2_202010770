const { Instruccion } = require("../Abstractas/Instruccion")
const { TipoInst } = require("../Utilities/TipoInst")

class Funcion extends Instruccion {
    constructor(linea, columna, nombre, parametros, bloque, tipo) {
        super(linea, columna, TipoInst.DECFUNC)
        this.nombre = nombre
        this.parametros = parametros
        this.bloque = bloque
        this.tipo = tipo
    }

    execute = (entorno) => {
        entorno.guardarFuncion(this.nombre, this)
    }
}

module.exports = { Funcion }