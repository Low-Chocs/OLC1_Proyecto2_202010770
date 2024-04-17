const { Expresion } = require("../Abstractas/Expresion")
const { TipoExp } = require("../Utilities/TipoExp")
const { Tipo } = require("../Utilities/Tipo")

class Casteo extends Expresion {
    constructor(linea, columna, destino, valor) {
        super(linea, columna, destino, TipoExp.CASTEO)
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
            entorno.setError(`No hay casteo de "${valor.tipo}" a "${this.destino}"`, exp.linea, exp.columna)
            return {valor: 'NULL', tipo: Tipo.NULL}
        }
        if(this.destino === Tipo.DOUBLE) {
            if(valor.tipo === Tipo.INT) {
                return {valor: Number(valor.valor), tipo: this.destino}
            }
            if(valor.tipo === Tipo.CHAR) {
                return {valor: Number(valor.valor.charCodeAt(0)), tipo: this.destino}
            }
            entorno.setError(`No hay casteo de "${valor.tipo}" a "${this.destino}"`, exp.linea, exp.columna)
            return {valor: 'NULL', tipo: Tipo.NULL}
        }
        if(this.destino === Tipo.STRING) {
            if(valor.tipo === Tipo.INT) {
                return {valor: String(valor.valor), tipo: this.destino}
            }
            if(valor.tipo === Tipo.DOUBLE) {
                return {valor: String(valor.valor), tipo: this.destino}
            }
            entorno.setError(`No hay casteo de "${valor.tipo}" a "${this.destino}"`, exp.linea, exp.columna)
            return {valor: 'NULL', tipo: Tipo.NULL}
        }
        if(this.destino === Tipo.CHAR) {
            if(valor.tipo === Tipo.INT) {
                return {valor: String.fromCharCode(valor.valor), tipo: this.destino}
            }
            entorno.setError(`No hay casteo de "${valor.tipo}" a "${this.destino}"`, exp.linea, exp.columna)
        }
        entorno.setError(`No hay casteo de "${valor.tipo}" a "${this.destino}"`, exp.linea, exp.columna)
        return {valor: 'NULL', tipo: Tipo.NULL}
    }
}

module.exports = { Casteo }