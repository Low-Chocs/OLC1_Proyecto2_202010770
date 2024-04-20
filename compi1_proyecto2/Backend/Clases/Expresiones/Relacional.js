const { Expresion } = require("../Abstractas/Expresion")
const { Tipo } = require("../Utilities/Tipo")
const { TipoExp } = require("../Utilities/TipoExp")
const { Nodo } = require('../AST/Nodo')

class Relacional extends Expresion {
    constructor(linea, columna, exp1, signo, exp2) {
        super(linea, columna, TipoExp.RELACIONAL)
        this.exp1 = exp1
        this.signo = signo
        this.exp2 = exp2
    }

    execute = (entorno) => {
        switch(this.signo) {
            case '==':
                return this.igual(entorno)
            case '!=':
                return this.diferente(entorno)
            case '>=':
                return this.mayorigual(entorno)
            case '<=':
                return this.menorigual(entorno)
            case '>':
                return this.mayor(entorno)
            case '<':
                return this.menor(entorno)
            default:
                return {valor: 'NULL',type: Type.NULL}
        }
    }

    igual = (entorno) => {
        var valor1 = this.exp1.execute(entorno)
        var valor2 = this.exp2.execute(entorno)
        if(valor1.tipo === Tipo.INT || valor1.tipo === Tipo.DOUBLE || valor1.tipo === Tipo.CHAR) {
            if(valor2.tipo === Tipo.INT || valor2.tipo === Tipo.DOUBLE || valor2.tipo === Tipo.CHAR) {
                valor1 = this.obtenerValor(valor1)
                valor2 = this.obtenerValor(valor2)
                return {valor: valor1.valor === valor2.valor, tipo: Tipo.BOOL}
            }
            entorno.setError("Los tipos no son válidos para operaciones relacionales (==).", this.exp2.linea, this.exp2.columna)
            return {valor: 'NULL',tipo: Tipo.NULL}
        }
        if(valor1.tipo === Tipo.STRING && valor2.tipo === Tipo.STRING) {
            return {valor: valor1.valor === valor2.valor, tipo: Tipo.BOOL}
        }
        entorno.setError("Los tipos no son válidos para operaciones relacionales (==).", this.exp2.linea, this.exp2.columna)
        return {valor: 'NULL',tipo: Tipo.NULL}
    }

    diferente = (entorno) => {
        var valor1 = this.exp1.execute(entorno)
        var valor2 = this.exp2.execute(entorno)
        if(valor1.tipo === Tipo.INT || valor1.tipo === Tipo.DOUBLE || valor1.tipo === Tipo.CHAR) {
            if(valor2.tipo === Tipo.INT || valor2.tipo === Tipo.DOUBLE || valor2.tipo === Tipo.CHAR) {
                valor1 = this.obtenerValor(valor1)
                valor2 = this.obtenerValor(valor2)
                return {valor: valor1.valor !== valor2.valor, tipo: Tipo.BOOL}
            }
            entorno.setError("Los tipos no son válidos para operaciones relacionales (!=).", this.exp2.linea, this.exp2.columna)
            return {valor: 'NULL',tipo: Tipo.NULL}
        }
        if(valor1.tipo === Tipo.STRING && valor2.tipo === Tipo.STRING) {
            return {valor: valor1.valor !== valor2.valor, tipo: Tipo.BOOL}
        }
        entorno.setError("Los tipos no son válidos para operaciones relacionales (!=).", this.exp2.linea, this.exp2.columna)
        return {valor: 'NULL',tipo: Tipo.NULL}
    }

    mayorigual = (entorno) => {
        var valor1 = this.exp1.execute(entorno)
        var valor2 = this.exp2.execute(entorno)
        if(valor1.tipo === Tipo.INT || valor1.tipo === Tipo.DOUBLE || valor1.tipo === Tipo.CHAR) {
            if(valor2.tipo === Tipo.INT || valor2.tipo === Tipo.DOUBLE || valor2.tipo === Tipo.CHAR) {
                valor1 = this.obtenerValor(valor1)
                valor2 = this.obtenerValor(valor2)
                return {valor: valor1.valor >= valor2.valor, tipo: Tipo.BOOL}
            }
            entorno.setError("Los tipos no son válidos para operaciones relacionales (>=).", this.exp2.linea, this.exp2.columna)
            return {valor: 'NULL',tipo: Tipo.NULL}
        }
        if(valor1.tipo === Tipo.STRING && valor2.tipo === Tipo.STRING) {
            return {valor: valor1.valor >= valor2.valor, tipo: Tipo.BOOL}
        }
        entorno.setError("Los tipos no son válidos para operaciones relacionales (>=).", this.exp2.linea, this.exp2.columna)
        return {valor: 'NULL',tipo: Tipo.NULL}
    }

    menorigual = (entorno) => {
        var valor1 = this.exp1.execute(entorno)
        var valor2 = this.exp2.execute(entorno)
        if(valor1.tipo === Tipo.INT || valor1.tipo === Tipo.DOUBLE || valor1.tipo === Tipo.CHAR) {
            if(valor2.tipo === Tipo.INT || valor2.tipo === Tipo.DOUBLE || valor2.tipo === Tipo.CHAR) {
                valor1 = this.obtenerValor(valor1)
                valor2 = this.obtenerValor(valor2)
                return {valor: valor1.valor <= valor2.valor, tipo: Tipo.BOOL}
            }
            entorno.setError("Los tipos no son válidos para operaciones relacionales (<=).", this.exp2.linea, this.exp2.columna)
            return {valor: 'NULL',tipo: Tipo.NULL}
        }
        if(valor1.tipo === Tipo.STRING && valor2.tipo === Tipo.STRING) {
            return {valor: valor1.valor <= valor2.valor, tipo: Tipo.BOOL}
        }
        entorno.setError("Los tipos no son válidos para operaciones relacionales (<=).", this.exp2.linea, this.exp2.columna)
        return {valor: 'NULL',tipo: Tipo.NULL}
    }

    mayor = (entorno) => {
        var valor1 = this.exp1.execute(entorno)
        var valor2 = this.exp2.execute(entorno)
        if(valor1.tipo === Tipo.INT || valor1.tipo === Tipo.DOUBLE || valor1.tipo === Tipo.CHAR) {
            if(valor2.tipo === Tipo.INT || valor2.tipo === Tipo.DOUBLE || valor2.tipo === Tipo.CHAR) {
                valor1 = this.obtenerValor(valor1)
                valor2 = this.obtenerValor(valor2)
                return {valor: valor1.valor > valor2.valor, tipo: Tipo.BOOL}
            }
            entorno.setError("Los tipos no son válidos para operaciones relacionales (>).", this.exp2.linea, this.exp2.columna)
            return {valor: 'NULL',tipo: Tipo.NULL}
        }
        if(valor1.tipo === Tipo.STRING && valor2.tipo === Tipo.STRING) {
            return {valor: valor1.valor > valor2.valor, tipo: Tipo.BOOL}
        }
        entorno.setError("Los tipos no son válidos para operaciones relacionales (>).", this.exp2.linea, this.exp2.columna)
        return {valor: 'NULL',tipo: Tipo.NULL}
    }

    menor = (entorno) => {
        var valor1 = this.exp1.execute(entorno)
        var valor2 = this.exp2.execute(entorno)
        if(valor1.tipo === Tipo.INT || valor1.tipo === Tipo.DOUBLE || valor1.tipo === Tipo.CHAR) {
            if(valor2.tipo === Tipo.INT || valor2.tipo === Tipo.DOUBLE || valor2.tipo === Tipo.CHAR) {
                valor1 = this.obtenerValor(valor1)
                valor2 = this.obtenerValor(valor2)
                return {valor: valor1.valor < valor2.valor, tipo: Tipo.BOOL}
            }
            console.log(valor1, valor2)
            entorno.setError("Los tipos no son válidos para operaciones relacionales (<).", this.exp2.linea, this.exp2.columna)
            return {valor: 'NULL',tipo: Tipo.NULL}
        }
        if(valor1.tipo === Tipo.STRING && valor2.tipo === Tipo.STRING) {
            return {valor: valor1.valor < valor2.valor, tipo: Tipo.BOOL}
        }
        entorno.setError("Los tipos no son válidos para operaciones relacionales (<).", this.exp2.linea, this.exp2.columna)
        return {valor: 'NULL',tipo: Tipo.NULL}
    }

    obtenerValor = (valor) => {
        return valor.tipo === Tipo.CHAR ? {valor: valor.valor.charCodeAt(0),tipo: Tipo.INT} : valor
    }

    ast = () => {
        const nodo = new Nodo(this.signo)
        nodo.insertarHijo(this.exp1.ast())
        nodo.insertarHijo(this.exp2.ast())
        return nodo
    }
}

module.exports = { Relacional }