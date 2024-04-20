const { Instruccion } = require("../Abstractas/Instruccion")
const { TipoInst } = require("../Utilities/TipoInst")
const { Tipo } = require("../Utilities/Tipo")
const { Nodo } = require('../AST/Nodo')

class Funcion extends Instruccion {
    constructor(linea, columna, nombre, parametros, bloque, tipo) {
        super(linea, columna, TipoInst.DECFUNC)
        this.nombre = nombre
        this.parametros = parametros
        this.bloque = bloque
        this.tipo = tipo
    }

    execute = (entorno) => {
        entorno.guardarFuncion(this.nombre, this)
    }

    ast = () => {
        const nodo = new Nodo(this.tipo !== Tipo.NULL ? 'FUNCION' : 'METODO')
        const funcion = new Nodo(this.nombre)
        if(this.tipo !== Tipo.NULL) {
            const nodotipo = new Nodo('TIPO')
            nodotipo.insertarHijo(new Nodo(this.obtenerTipo(this.tipo)))
            funcion.insertarHijo(nodotipo)
        }
        if(this.parametros.length > 0) {
            const parametros = new Nodo('PARAMS')
            for(const parametro of this.parametros) {
                const nodotipo = new Nodo(this.obtenerTipo(parametro[0]))
                nodotipo.insertarHijo(new Nodo(parametro[1]))
                parametros.insertarHijo(nodotipo)
            }
            funcion.insertarHijo(parametros)
        }
        funcion.insertarHijo(this.bloque.ast())
        nodo.insertarHijo(funcion)
        return nodo
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
            return 'Array'
        }
        if(tipo === Tipo.MATRIZ) {
            return 'Matrix'
        }
        return 'NULL'
    }
}

module.exports = { Funcion }