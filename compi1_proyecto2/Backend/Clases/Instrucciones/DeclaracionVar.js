const { Instruccion } = require('../Abstractas/Instruccion')
const { TipoInst } = require('../Utilities/TipoInst')
const { Tipo } = require('../Utilities/Tipo')
class DeclaracionVar extends Instruccion {
    constructor(linea, columna, identificadores, tipo, valor) {
        super(linea, columna, TipoInst.DECVAR)
        this.identificadores = identificadores
        this.valor = valor
        this.tipo = tipo
    }
    execute = (entorno) => {
        var valor = null
        if(this.valor) {
            valor = this.valor.execute(entorno)
        } else {
            switch(this.tipo) {
                case Tipo.INT:
                    valor = {valor: 0, tipo: this.tipo}
                    break
                case Tipo.DOUBLE:
                    valor = {valor: 0.0, tipo: this.tipo}
                    break
                case Tipo.BOOL:
                    valor = {valor: true, tipo: this.tipo}
                    break
                case Tipo.CHAR:
                    valor = {valor: '0', tipo: this.tipo}
                    break
                case Tipo.STRING:
                    valor = {valor: "", tipo: this.tipo}
                    break
            }
        }
        for(const id of this.identificadores) {
            entorno.guardarVariable(id, valor.valor, this.tipo, this.linea, this.columna)
        }
    }
}

module.exports = { DeclaracionVar }