const { Instruccion } = require('../Abstractas/Instruccion')
const { Entorno } = require("../Entorno/Entorno")
const { TipoInst } = require('../Utilities/TipoInst')
const { Nodo } = require('../AST/Nodo')

class For extends Instruccion {
    constructor(line, column, args, bloque) {
        super(line, column, TipoInst.FOR)
        this.args = args
        this.bloque = bloque
    }

    execute = (entorno) => {
        const entornoFor = new Entorno(entorno, entorno.nombre)
        this.args[0].execute(entornoFor)
        var condicion = this.args[1].execute(entornoFor)
        while(condicion.valor) {
            var bloque = this.bloque.execute(entornoFor)
            if(bloque) {
                if(bloque.valor === TipoInst.CONTINUE) {
                    this.args[2].execute(entornoFor)
                    condicion = this.args[1].execute(entornoFor)
                    continue
                }
                else if(bloque.valor === TipoInst.BREAK) {
                    break
                }
                return bloque
            }
            this.args[2].execute(entornoFor)
            condicion = this.args[1].execute(entornoFor)
        }
    }

    ast = () => {
        const nodo = new Nodo('FOR')
        const inicio = new Nodo('INICIO')
        inicio.insertarHijo(this.args[0].ast())
        nodo.insertarHijo(inicio)
        const condicion = new Nodo('CONDICION')
        condicion.insertarHijo(this.args[1].ast())
        nodo.insertarHijo(condicion)
        const actualizacion = new Nodo('ACTUALIZACION')
        actualizacion.insertarHijo(this.args[2].ast())
        nodo.insertarHijo(actualizacion)
        nodo.insertarHijo(this.bloque.ast())
        return nodo
    }
}

module.exports = { For }