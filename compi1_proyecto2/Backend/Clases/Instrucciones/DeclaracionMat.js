const { Instruccion } = require('../Abstractas/Instruccion')
const { Nativas } = require('../Expresiones/Nativas')
const { TipoInst } = require('../Utilities/TipoInst')
const { Tipo } = require('../Utilities/Tipo')
class DeclaracionMat extends Instruccion {
    constructor(linea, columna, nombre, tipo1, tipo2, longitudI, longitudJ, valores) {
        super(linea, columna, TipoInst.DECMAT)
        this.nombre = nombre
        this.tipo1 = tipo1
        this.tipo2 = tipo2
        this.longitudI = longitudI
        this.longitudJ = longitudJ
        this.valores = valores
    }

    execute = (entorno) => {
        if(this.valores) {
            var hayError = false
            for(var i = 0; i < this.valores.length; i ++) {
                if(this.valores[i] instanceof Nativas) {
                    if(this.valores[i].func === 'c_str') {
                        if(this.tipo1 === Tipo.CHAR) {
                            this.valores[i] = this.valores[i].execute(entorno)
                        } else {
                            entorno.setError(`Tipos incompatibles en vector.`, this.valores[i].linea, this.valores[i].columna)
                            hayError = true
                        }
                    } else {
                        entorno.setError(`Valor no aceptado para el vector.`, this.valores[i].linea, this.valores[i].columna)
                        hayError = true
                    }
                } else {
                    for(var j = 0; j < this.valores[i].length; j ++) {
                        const valor = this.valores[i][j].execute(entorno)
                        if(this.tipo1 == valor.tipo) {
                            this.valores[i][j] = valor
                        } else {
                            entorno.setError(`Tipos incompatibles en vector.`, this.valores[i][j].linea, this.valores[i][j].columna)
                            hayError = true
                        }
                    }
                    this.valores[i] = {valor: this.valores[i], tipo: Tipo.VECTOR}
                }
            }
            if(!hayError) {
                entorno.guardarVector(this.nombre, this.valores, Tipo.MATRIZ, this.tipo1, this.linea, this.columna)
            }
        } else {
            if(this.tipo1 == this.tipo2) {
                const longitudI = this.longitudI.execute(entorno)
                const longitudJ = this.longitudJ.execute(entorno)
                entorno.guardarVector(this.nombre, this.obtenerMatriz(longitudI.valor, longitudJ.valor), Tipo.MATRIZ, this.tipo1, this.linea, this.columna)
            } else {
                entorno.setError(`Tipos incompatibles en matriz.`, this.linea, this.columna)
            }
        }
    }

    obtenerMatriz = (longitudI, longitudJ) => {
        const valorDefault = this.obtenerValorDefault()
        var matriz = new Array(longitudI)
        for(var i = 0; i < longitudI; i ++) {
            matriz[i] = new Array(longitudJ)
            for(var j = 0; j < longitudJ; j ++) {
                matriz[i][j] = valorDefault
            }
            matriz[i] = {valor: matriz[i], tipo: Tipo.VECTOR}
        }
        return matriz
    }

    obtenerValorDefault = () => {
        switch(this.tipo1) {
            case Tipo.INT:
                return {valor: 0, tipo: this.tipo1}
            case Tipo.DOUBLE:
                return {valor: 0.0, tipo: this.tipo1}
            case Tipo.BOOL:
                return {valor: true, tipo: this.tipo1}
            case Tipo.CHAR:
                return {valor: '0', tipo: this.tipo1}
            case Tipo.STRING:
                return {valor: "", tipo: this.tipo1}
        }
    }
}

module.exports = { DeclaracionMat }