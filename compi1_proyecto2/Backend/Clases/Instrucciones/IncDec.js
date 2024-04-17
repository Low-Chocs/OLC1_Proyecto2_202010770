const { Instruccion } = require("../Abstractas/Instruccion")
const { TipoInst } = require("../Utilities/TipoInst")
const { Tipo } = require("../Utilities/Tipo")
class IncDec extends Instruccion {
    constructor(line, column, nombre, signo) {
        super(line, column, signo == '++' ? TipoInst.INC : TipoInst.DEC)
        this.nombre = nombre
        this.signo = signo
    }

    execute = (entorno) => {
        var valor = entorno.obtenerVariable(this.nombre)
        if(!valor) {
            entorno.setError(`Acceso a variable inexistente "${this.nombre}".`, this.linea, this.columna)
            return
        }
        if(valor.tipo !== Tipo.INT && valor.tipo !== Tipo.DOUBLE) {
            entorno.setError(`Solo se puede usar el incremento o decremento para tipos "INT" o "DOUBLE".`, this.linea, this.columna)
            return
        }
        switch(this.signo) {
            case '++':
                valor.valor += 1
                entorno.reasignarValorVariable(this.nombre, {valor: valor.valor, tipo: Tipo.INT})
                valor = entorno.obtenerVariable(this.nombre)
                break
            default:
                valor.valor -= 1
                entorno.reasignarValorVariable(this.nombre, {valor: valor.valor, tipo: Tipo.INT})
                valor = entorno.obtenerVariable(this.nombre)
                break
        }
    }
}

module.exports = { IncDec }