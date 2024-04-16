const { Expresion } = require("../Abstractas/Expresion")
const { Tipo } = require("../Utilities/Tipo")
const { TipoExp } = require("../Utilities/TipoExp")

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
}

module.exports = { Return }