const { Expresion } = require("../Abstractas/Expresion")
const { Tipo } = require("../Utilities/Tipo")
const { TipoExp } = require("../Utilities/TipoExp")
const { Nodo } = require('../AST/Nodo')

class Return extends Expresion {
    constructor(linea, columna, expresion) {
        super(linea, columna, TipoExp.RETURN)
        this.expresion = expresion
    }

    execute = (entorno) => {
        if(this.expresion) {
            var valor = this.expresion.execute(entorno)
            return valor
        }
        return {valor: this.tipoExp, tipo: Tipo.NULL}
    }

    ast = () => {
        const nodo = new Nodo('RETURN')
        if(this.expresion) {
            nodo.insertarHijo(this.expresion.ast())
        }
        return nodo
    }
}

module.exports = { Return }