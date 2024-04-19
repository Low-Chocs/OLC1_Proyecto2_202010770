const { Instruccion } = require("../Abstractas/Instruccion")
const { TipoInst } = require("../Utilities/TipoInst")

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
}

module.exports = { If }