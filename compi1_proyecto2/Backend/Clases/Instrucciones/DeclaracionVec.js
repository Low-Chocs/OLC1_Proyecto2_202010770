const { Instruccion } = require('../Abstractas/Instruccion')
const { Nativas } = require('../Expresiones/Nativas')
const { TipoInst } = require('../Utilities/TipoInst')
const { Tipo } = require('../Utilities/Tipo')
const { Nodo } = require('../AST/Nodo')

class DeclaracionVec extends Instruccion {
    constructor(linea, columna, nombre, tipo1, tipo2, longitudI, valores) {
        super(linea, columna, TipoInst.DECVEC)
        this.nombre = nombre
        this.tipo1 = tipo1
        this.tipo2 = tipo2
        this.longitudI = longitudI
        this.valores = valores
    }

    execute = (entorno) => {
        if(this.valores) {
            var hayError = false
            if(this.valores instanceof Nativas) {
                if(this.valores.func === 'c_str') {
                    if(this.tipo1 === Tipo.CHAR) {
                        this.valores = this.valores.execute(entorno).valor
                    } else {
                        entorno.setError(`Tipos incompatibles en vector.`, this.valores.linea, this.valores.columna)
                        hayError = true
                    }
                } else {
                    entorno.setError(`Valor no aceptado para el vector.`, this.valores.linea, this.valores.columna)
                    hayError = true
                }
            } else {
                for(var i = 0; i < this.valores.length; i ++) {
                    const valor = this.valores[i].execute(entorno)
                    if(this.tipo1 == valor.tipo) {
                        this.valores[i] = valor
                    } else {
                        entorno.setError(`Tipos incompatibles en vector.`, this.valores[i].linea, this.valores[i].columna)
                        hayError = true
                    }
                }
            }
            if(!hayError) {
                entorno.guardarVector(this.nombre, this.valores, Tipo.VECTOR, this.tipo1, this.linea, this.columna)
            }
        } else {
            if(this.tipo1 === this.tipo2) {
                const longitudI = this.longitudI.execute(entorno)
                entorno.guardarVector(this.nombre, this.obtenerVector(longitudI.valor), Tipo.VECTOR, this.tipo1, this.linea, this.columna)
            } else {
                entorno.setError(`Tipos incompatibles en vector.`, this.linea, this.columna)
            }
        }
    }

    ast = () => {
        const nodo = new Nodo('DECLARACION')
        nodo.insertarHijo(new Nodo(`${this.obtenerTipo(this.tipo1)}[]`))
        nodo.insertarHijo(new Nodo(this.nombre))
        if(this.valores) {
            if(this.valores instanceof Nativas) {
                if(this.valores.func === 'c_str') {
                    nodo.insertarHijo(this.valores.ast())
                }
            } else {
                const valores = new Nodo('VALORES')
                for(const valor of this.valores) {
                    valores.insertarHijo(valor.ast())
                }
                nodo.insertarHijo(valores)
            }
        } else {
            const vector = new Nodo('VECTOR')
            vector.insertarHijo(new Nodo(`${this.obtenerTipo(this.tipo2)}[]`))
            vector.insertarHijo(this.longitudI.ast())
            nodo.insertarHijo(vector)
        }
        return nodo
    }

    obtenerVector = (longitudI) => {
        const valorDefault = this.obtenerValorDefault()
        var vector = new Array(this.longitudI)
        for(var i = 0; i < longitudI; i ++) {
            vector[i] = valorDefault
        }
        return vector
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

    obtenerTipo = (tipo) => {
        if(tipo === Tipo.INT) {
            return 'int'
        }
        if(tipo === Tipo.DOUBLE) {
            return 'double'
        }
        if(tipo === Tipo.BOOL) {
            return 'bool'
        }
        if(tipo === Tipo.CHAR) {
            return 'char'
        }
        if(tipo === Tipo.STRING) {
            return 'std::string'
        }
        if(tipo === Tipo.VECTOR) {
            return 'Vector'
        }
        if(tipo === Tipo.MATRIZ) {
            return 'Matrix'
        }
        return 'NULL'
    }
}

module.exports = { DeclaracionVec }