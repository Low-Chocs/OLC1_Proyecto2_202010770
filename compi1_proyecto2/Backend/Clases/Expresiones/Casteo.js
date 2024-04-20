const { Expresion } = require("../Abstractas/Expresion")
const { TipoExp } = require("../Utilities/TipoExp")
const { Tipo } = require("../Utilities/Tipo")
const { Nodo } = require('../AST/Nodo')

class Casteo extends Expresion {
    constructor(linea, columna, destino, valor) {
        super(linea, columna, TipoExp.CASTEO)
        this.destino = destino
        this.valor = valor
    }

    execute(entorno) {
        let valor = this.valor.execute(entorno)
        if(this.destino === Tipo.INT) {
            if(valor.tipo === Tipo.DOUBLE) {
                return {valor: parseInt(valor.valor), tipo: this.destino}
            }
            if(valor.tipo === Tipo.CHAR) {
                return {valor: valor.valor.charCodeAt(0), tipo: this.destino}
            }
            entorno.setError(`No hay casteo de "${valor.tipo}" a "${this.destino}"`, this.valor.linea, this.valor.columna)
            return {valor: 'NULL', tipo: Tipo.NULL}
        }
        if(this.destino === Tipo.DOUBLE) {
            if(valor.tipo === Tipo.INT) {
                return {valor: Number(valor.valor), tipo: this.destino}
            }
            if(valor.tipo === Tipo.CHAR) {
                return {valor: Number(valor.valor.charCodeAt(0)), tipo: this.destino}
            }
            entorno.setError(`No hay casteo de "${valor.tipo}" a "${this.destino}"`, this.valor.linea, this.valor.columna)
            return {valor: 'NULL', tipo: Tipo.NULL}
        }
        if(this.destino === Tipo.STRING) {
            if(valor.tipo === Tipo.INT) {
                return {valor: String(valor.valor), tipo: this.destino}
            }
            if(valor.tipo === Tipo.DOUBLE) {
                return {valor: String(valor.valor), tipo: this.destino}
            }
            entorno.setError(`No hay casteo de "${valor.tipo}" a "${this.destino}"`, this.valor.linea, this.valor.columna)
            return {valor: 'NULL', tipo: Tipo.NULL}
        }
        if(this.destino === Tipo.CHAR) {
            if(valor.tipo === Tipo.INT) {
                return {valor: String.fromCharCode(valor.valor), tipo: this.destino}
            }
            entorno.setError(`No hay casteo de "${valor.tipo}" a "${this.destino}"`, this.valor.linea, this.valor.columna)
        }
        entorno.setError(`No hay casteo de "${valor.tipo}" a "${this.destino}"`, this.linea, this.columna)
        return {valor: 'NULL', tipo: Tipo.NULL}
    }

    ast = () => {
        const nodo = new Nodo('CAST')
        nodo.insertarHijo(new Nodo(this.obtenerTipo(this.destino)))
        nodo.insertarHijo(new Nodo(this.valor.ast()))
        return nodo
    }

    obtenerTipo(tipo) {
        if(tipo === Tipo.INT) {
            return 'int'
        }
        if(tipo === Tipo.DOUBLE) {
            return 'double'
        }
        if(tipo === Tipo.BOOLEAN) {
            return 'bool'
        }
        if(tipo === Tipo.CHAR) {
            return 'char'
        }
        if(tipo === Tipo.STRING) {
            return 'std::string'
        }
        if(tipo === Tipo.ARRAY) {
            return 'Array'
        }
        if(tipo === Tipo.LIST) {
            return 'List'
        }
        return 'NULL'
    }
}

module.exports = { Casteo }