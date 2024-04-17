const { Expresion } = require("../Abstractas/Expresion")
const { TipoExp } = require("../Utilities/TipoExp")
const { Tipo } = require("../Utilities/Tipo")
const { Primitivo } = require('./Primitivo')

class Nativas extends Expresion {
    constructor(line, column, func, valor) {
        super(line, column, TipoExp.FUNCNATIVA)
        this.func = func
        this.valor = valor
    }

    execute = (entorno) => {
        var valor = this.valor.execute(entorno)
        switch(this.func.toLowerCase()) {
            case 'tolower':
                return {valor: valor.valor.toString().toLowerCase(), tipo: Tipo.STRING}
            case 'toupper':
                return {valor: valor.valor.toString().toUpperCase(), tipo: Tipo.STRING}
            case 'length':
                return {valor: valor.valor.length, tipo: Tipo.INT}
            case 'round':
                return {valor: Math.round(valor.valor), tipo: Tipo.INT}
            case 'typeof':
                return {valor: this.obtenerTypeOf(valor), tipo: Tipo.STRING}
            case 'std::tostring':
                return {valor: valor.valor.toString(), tipo: Tipo.STRING}
            case 'c_str':
                return {valor: this.obtenerCharArray(valor.valor), tipo: Tipo.ARRAY}
            default:
                return {valor: 'NULL', tipo: Tipo.NULL}
        }
    }

    obtenerTypeOf = (valor) => {
        if(valor.tipo === Tipo.INT) {
            return 'int'
        }
        if(valor.tipo === Tipo.DOUBLE) {
            return 'double'
        }
        if(valor.tipo === Tipo.BOOL) {
            return 'boolean'
        }
        if(valor.tipo === Tipo.CHAR) {
            return 'char'
        }
        if(valor.tipo === Tipo.STRING) {
            return 'std::string'
        }
        if(valor.tipo === Tipo.ARRAY) {
            return 'Array'
        }
        return 'NULL'
    }

    obtenerCharArray = (string) => {
        let charArray = []
        for(const character of string) {
            charArray.push(new Primitivo(this.line, this.column, character, Tipo.CHAR))
        }
        return charArray
    }
}

module.exports = { Nativas }