const { Expresion } = require("../Abstractas/Expresion")
const { Tipo } = require("../Utilities/Tipo")
const { TipoExp } = require("../Utilities/TipoExp")

class Primitivo extends Expresion {
    constructor(linea, columna, valor, tipo) {
        super(linea, columna, tipo, TipoExp.PRIMITIVO)
        this.valor = valor
    }

    execute = (_) => {
        switch (this.tipo) {
            case Tipo.INT:
                return { valor: parseInt(this.valor), tipo: this.tipo }
            case Tipo.DOUBLE:
                return { valor: parseFloat(this.valor), tipo: this.tipo }
            case Tipo.BOOL:
                return { valor: this.valor.toString().toLowerCase() === 'true', tipo: this.tipo }
            case Tipo.CHAR:
                this.valor = this.valor.replace(/\\n/g, '\n')
                this.valor = this.valor.replace(/\\t/g, '\t')
                this.valor = this.valor.replace(/\\"/g, '\"')
                this.valor = this.valor.replace(/\\'/g, '\'')
                this.valor = this.valor.replace(/\\\\/g, '\\')
                return { valor: this.valor, tipo: this.tipo }
            default:
                this.valor = this.valor.replace(/\\n/g, '\n')
                this.valor = this.valor.replace(/\\t/g, '\t')
                this.valor = this.valor.replace(/\\"/g, '\"')
                this.valor = this.valor.replace(/\\'/g, '\'')
                this.valor = this.valor.replace(/\\\\/g, '\\')
                return { valor: this.valor, tipo: this.tipo }
        }
    }
}

module.exports = { Primitivo }