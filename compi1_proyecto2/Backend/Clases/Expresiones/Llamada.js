const { Expresion } = require("../Abstractas/Expresion")
const { Entorno } = require("../Entorno/Entorno")
const { Tipo } = require("../Utilities/Tipo")
const { TipoExp } = require("../Utilities/TipoExp")

class Llamada extends Expresion {
    constructor(linea, columna, nombre, argumentos) {
        super(linea, columna, TipoExp.LLAMADAFUNC)
        this.nombre = nombre
        this.argumentos = argumentos
    }

    execute = (entorno) => {
        const func = entorno.obtenerFuncion(this.nombre)
        if(func) {
            const entornoFunc = new Entorno(entorno.getGlobal(), `Funcion ${this.nombre.toLowerCase()}`)
            if(func.parametros.length == this.argumentos.length) {
                for(let i = 0; i < func.parametros.length; i ++) {
                    const valor = this.argumentos[i].execute(entorno)
                    const param = func.parametros
                    if(valor.tipo == param[i][0]) {
                        entornoFunc.guardarVariable(param[i][1], valor.valor, valor.tipo, param[i][2], param[i][3])
                    } else {
                        entorno.setError(`El Parámetro "${param.valor}" no es del tipo "${this.getType(param.tipo)}".`, this.linea, this.columna)
                        return
                    }
                }
                const return_ = func.bloque.execute(entornoFunc)
                if(return_) {
                    if(return_.valor === TipoExp.RETURN) {
                        return
                    }
                    return return_
                }
            } else {
                entorno.setError(`La Función "${this.nombre}" no tiene la cantidad correcta de parámetros.`, this.linea, this.columna)
            }
        } else {
            entorno.setError(`La Función "${this.nombre}" no existe.`, this.linea, this.columna)
        }
    }

    getType(tipo) {
        if(tipo === Tipo.INT) {
            return 'int'
        }
        if(tipo === Tipo.DOUBLE) {
            return 'double'
        }
        if(tipo === Tipo.BOOLEAN) {
            return 'boolean'
        }
        if(tipo === Tipo.CHAR) {
            return 'char'
        }
        if(tipo === Tipo.STRING) {
            return 'String'
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

module.exports = { Llamada }