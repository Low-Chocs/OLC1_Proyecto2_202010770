const { Instruccion } = require("../Abstractas/Instruccion")
const { TipoInst } = require("../Utilities/TipoInst")
const { Nodo } = require('../AST/Nodo')

class Print extends Instruccion {
    constructor(linea, columna, expresion, endl) {
        super(linea, columna, TipoInst.PRINT)
        this.expresion = expresion
        this.endl = endl
    }

    execute = (entorno) => {
        const valor = this.expresion.execute(entorno)
        entorno.setPrint(`${valor.valor}`)
        if(this.endl) {
            entorno.setPrint('\n')
        }
    }

    ast = () => {
        const nodo = new Nodo('PRINT')
        nodo.insertarHijo(this.expresion.ast())
        if(this.endl) {
            nodo.insertarHijo(new Nodo('endl'))
        }
        return nodo
    }
}

module.exports = { Print }