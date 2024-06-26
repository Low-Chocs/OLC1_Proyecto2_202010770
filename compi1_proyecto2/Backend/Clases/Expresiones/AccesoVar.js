const { Expresion } = require("../Abstractas/Expresion")
const { Tipo } = require("../Utilities/Tipo")
const { TipoExp } = require("../Utilities/TipoExp")
const { Nodo } = require('../AST/Nodo')

class AccesoVar extends Expresion {
    constructor(linea, columna, nombre) {
        super(linea, columna, TipoExp.ACCESOVAR)
        this.nombre = nombre
    }

    execute = (entorno) => {
        const valor = entorno.obtenerVariable(this.nombre)
        if(valor) {
            return {valor: valor.valor, tipo: valor.tipo}
        }
        entorno.setError(`Acceso a variable inexistente "${this.nombre}".`, this.linea, this.columna)
        return {valor: 'NULL', tipo: Tipo.NULL}
    }

    ast = () => {
        return new Nodo(this.nombre)
    }
}

module.exports = { AccesoVar }