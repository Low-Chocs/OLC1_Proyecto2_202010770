const { Expresion } = require("../Abstractas/Expresion")
const { sum, res, mul, div, pow, mod } = require("../Utilities/Operaciones")
const { Tipo } = require("../Utilities/Tipo")
const { TipoExp } = require("../Utilities/TipoExp")

class Aritmetico extends Expresion {
    constructor(linea, columna, exp1, signo, exp2) {
        super(linea, columna, TipoExp.ARITMETICO)
        this.exp1 = exp1
        this.signo = signo
        this.exp2 = exp2
    }

    execute = (entorno) => {
        switch(this.signo) {
            case '+':
                return this.sum(entorno)
            case '-':
                if(this.exp1) {
                    return this.res(entorno)
                }
                return this.neg(entorno)
            case '*':
                return this.mul(entorno)
            case '/':
                return this.div(entorno)
            case '%':
                return this.mod(entorno)
            case '^':
                return this.pow(entorno)
            default:
                return {valor: 'NULL', tipo: Tipo.NULL}
        }
    }

    sum = (entorno) => {
        var valor1 = this.exp1.execute(entorno)
        var valor2 = this.exp2.execute(entorno)
        this.tipo = sum[valor1.tipo][valor2.tipo]
        if(this.tipo !== Tipo.NULL) {
            if(this.tipo === Tipo.INT) {
                return {valor: parseInt(this.obtenerValor(valor1.valor)) + parseInt(this.obtenerValor(valor2.valor)), tipo: this.tipo}
            }
            if(this.tipo === Tipo.DOUBLE) {
                return {valor: parseFloat(this.obtenerValor(valor1.valor)) + parseFloat(this.obtenerValor(valor2.valor)), tipo: this.tipo}
            }
            else if(this.tipo === Tipo.STRING) {
                return {valor: `${valor1.valor}${valor2.valor}`, tipo: this.tipo}
            }
        }
        entorno.setError("Los tipos no son válidos para operaciones aritméticas (+).", this.exp2.linea, this.exp2.columna)
        return {valor: 'NULL', tipo: Tipo.NULL}
    }

    res = (entorno) => {
        var valor1 = this.exp1.execute(entorno)
        var valor2 = this.exp2.execute(entorno)
        this.tipo = res[valor1.tipo][valor2.tipo]
        if(this.tipo !== Tipo.NULL) {
            if(this.tipo === Tipo.INT) {
                return {valor: parseInt(this.obtenerValor(valor1.valor)) - parseInt(this.obtenerValor(valor2.valor)), tipo: this.tipo}
            }
            if(this.tipo === Tipo.DOUBLE) {
                return {valor: parseFloat(this.obtenerValor(valor1.valor)) - parseFloat(this.obtenerValor(valor2.valor)), tipo: this.tipo}
            }
        }
        entorno.setError("Los tipos no son válidos para operaciones aritméticas (-).", this.exp2.linea, this.exp2.columna)
        return {valor: 'NULL', tipo: Tipo.NULL}
    }

    neg = (entorno) => {
        var valor = this.exp2.execute(entorno)
        this.tipo = valor.tipo
        if(this.tipo === Tipo.INT || this.tipo === Tipo.DOUBLE) {
            return {valor: -valor.valor, tipo: this.tipo}
        }
        entorno.setError("Los tipos no son válidos para operaciones aritméticas (-).", this.exp2.linea, this.exp2.columna)
        return {valor: 'NULL', tipo: Tipo.NULL}
    }

    mul = (entorno) => {
        var valor1 = this.exp1.execute(entorno)
        var valor2 = this.exp2.execute(entorno)
        this.tipo = mul[valor1.tipo][valor2.tipo]
        if(this.tipo !== Tipo.NULL) {
            if(this.tipo === Tipo.INT) {
                return {valor: parseInt(this.obtenerValor(valor1.valor)) * parseInt(this.obtenerValor(valor2.valor)), tipo: this.tipo}
            }
            if(this.tipo === Tipo.DOUBLE) {
                return {valor: parseFloat(this.obtenerValor(valor1.valor)) * parseFloat(this.obtenerValor(valor2.valor)), tipo: this.tipo}
            }
        }
        entorno.setError("Los tipos no son válidos para operaciones aritméticas (*).", this.exp2.linea, this.exp2.columna)
        return {valor: 'NULL', tipo: Tipo.NULL}
    }

    div = (entorno) => {
        var valor1 = this.exp1.execute(entorno)
        var valor2 = this.exp2.execute(entorno)
        this.tipo = div[valor1.tipo][valor2.tipo]
        if(this.tipo !== Tipo.NULL) {
            if(valor2.valor == 0) {
                entorno.setError("Operación inválida, no se puede dividir entre cero.", this.exp2.linea, this.exp2.columna)
                return {valor: 'NULL', tipo: Tipo.NULL}
            }
            if(this.tipo === Tipo.DOUBLE) {
                return {valor: parseFloat(this.obtenerValor(valor1.valor)) / parseFloat(this.obtenerValor(valor2.valor)), tipo: this.tipo}
            }
        }
        entorno.setError("Los tipos no son válidos para operaciones aritméticas (/).", this.exp2.linea, this.exp2.columna)
        return {valor: 'NULL', tipo: Tipo.NULL}
    }

    pow = (entorno) => {
        var valor1 = this.exp1.execute(entorno)
        var valor2 = this.exp2.execute(entorno)
        this.tipo = pow[valor1.tipo][valor2.tipo]
        if(this.tipo !== Tipo.NULL) {
            if(this.tipo === Tipo.INT) {
                return {valor: valor1.valor ** valor2.valor, tipo: this.tipo}
            }
            else if(this.tipo === Tipo.DOUBLE) {
                return {valor: parseFloat(this.obtenerValor(valor1.valor)) ** parseFloat(this.obtenerValor(valor2.valor)), tipo: this.tipo}
            }
        }
        entorno.setError("Los tipos no son válidos para operaciones aritméticas (pow).", this.exp2.linea, this.exp2.columna)
        return {valor: 'NULL', tipo: Tipo.NULL}
    }

    mod = (entorno) => {
        var valor1 = this.exp1.execute(entorno)
        var valor2 = this.exp2.execute(entorno)
        this.tipo = mod[valor1.tipo][valor2.tipo]
        if(this.tipo !== Tipo.NULL) {
            if(valor2.valor == 0) {
                entorno.setError("Operación inválida, no se puede dividir entre cero.", this.exp2.linea, this.exp2.columna)
                return {valor: 'NULL', tipo: Tipo.NULL}
            }
            if(this.tipo === Tipo.DOUBLE) {
                return {valor: parseFloat(this.obtenerValor(valor1.valor)) % parseFloat(this.obtenerValor(valor2.valor)), tipo: this.tipo}
            }
        }
        entorno.setError("Los tipos no son válidos para operaciones aritméticas (%).", this.exp2.linea, this.exp2.columna)
        return {valor: 'NULL', tipo: Tipo.NULL}
    }

    obtenerValor = (valor) => {
        if(valor.tipo == Tipo.BOOL) {
            if(valor.valor) {
                return {valor: 1, tipo: Tipo.INT}
            }
            return {valor: 0, tipo: Tipo.INT}
        }
        if(valor.tipo == Tipo.CHAR) {
            return {valor: valor.valor.charCodeAt(0), tipo: Tipo.INT}
        }
        return valor
    }
}

module.exports = { Aritmetico }