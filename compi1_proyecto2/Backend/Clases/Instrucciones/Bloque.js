const { Instruccion } = require("../Abstractas/Instruccion")
const { Entorno } = require("../Entorno/Entorno")
const { TipoInst } = require("../Utilities/TipoInst")
const { Nodo } = require('../AST/Nodo')

class Bloque extends Instruccion {
    constructor(linea, columna, instrucciones) {
        super(linea, columna, TipoInst.BLOQUE)
        this.instrucciones = instrucciones
    }

    execute = (entorno) => {
        const entornoBloque = new Entorno(entorno, entorno.nombre)
        for(const instruccion of this.instrucciones) {
            try {
                const return_ = instruccion.execute(entornoBloque)
                if(return_) {
                    return return_
                }
            } catch(error) {}
        }
    }

    ast = () => {
        const nodo = new Nodo('BLOQUE')
        for(const instruccion of this.instrucciones) {
            try {
                nodo.insertarHijo(instruccion.ast())
            } catch(error) {}
        }
        return nodo
    }
}

module.exports = { Bloque }