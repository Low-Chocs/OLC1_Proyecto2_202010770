const { Expresion } = require("../Abstractas/Expresion")
const { TipoExp } = require("../Utilities/TipoExp")
const { Tipo } = require("../Utilities/Tipo")

class Ternario extends Expresion {
    constructor(line, column, condicion, verdadero, falso) {
        super(line, column, Tipo.NULL, TipoExp.TERNARIO)
        this.condicion = condicion
        this.verdadero = verdadero
        this.falso = falso
    }

    execute = (entorno) => {
        const condicion = this.condicion.execute(entorno)
        if(condicion.tipo != Tipo.BOOL) {
            entorno.setError("El tipo de dato de la condición no es aceptable.", condicion.linea, condicion.columna)
            return {valor: 'NULL', tipo: Tipo.NULL}
        }
        if(condicion.valor) {
            const verdadero = this.verdadero.execute(entorno)
            return verdadero
        }
        const falso = this.falso.execute(entorno)
        return falso
    }
}

module.exports = { Ternario }