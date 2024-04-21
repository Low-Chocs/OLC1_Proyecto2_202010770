const { Instruccion } = require("../Abstractas/Instruccion")
const { TipoInst } = require("../Utilities/TipoInst")
const { Nodo } = require('../AST/Nodo')

class If extends Instruccion {
    constructor(linea, columna, condicion, bloque, _else_) {
        super(linea, columna, TipoInst.IF)
        this.condicion = condicion
        this.bloque = bloque
        this._else_ = _else_
    }

    execute = (entorno) => {
        var condicion = this.condicion.execute(entorno)
        if(condicion.valor) {
            var bloque = this.bloque.execute(entorno)
            if(bloque) {
                return bloque
            }
            return
        }
        if(this._else_) {
            var _else_ = this._else_.execute(entorno)
            if(_else_) {
                return _else_
            }
        }
    }

    ast = () => {
        const nodo = new Nodo('IF')
        const condicion = new Nodo('CONDICION')
        condicion.insertarHijo(this.condicion.ast())
        nodo.insertarHijo(condicion)
        const verdadero = new Nodo('VERDADERO')
        verdadero.insertarHijo(this.bloque.ast())
        nodo.insertarHijo(verdadero)
        if(this._else_) {
            const falso = new Nodo('FALSO')
            falso.insertarHijo(this._else_.ast())
            nodo.insertarHijo(falso)
        }
        return nodo
    }
}

module.exports = { If }