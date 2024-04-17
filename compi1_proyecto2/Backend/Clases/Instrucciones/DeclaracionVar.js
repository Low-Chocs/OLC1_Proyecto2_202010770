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
            if(this.tipo !== valor.tipo || this.tipo === Tipo.DOUBLE && valor.tipo === Tipo.INT) {
                entorno.setError(`Los tipos no coinciden en la asignación. Intenta asignar un "${this.obtenerTipo(valor.tipo)}" a un "${this.obtenerTipo(this.tipo)}".`)
                return
            }
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

    obtenerTipo = (tipo) => {
        if(tipo === Tipo.INT) {
            return 'int'
        }
        if(tipo === Tipo.DOUBLE) {
            return 'double'
        }
        if(tipo === Tipo.BOOL) {
            return 'boolean'
        }
        if(tipo === Tipo.CHAR) {
            return 'char'
        }
        if(tipo === Tipo.STRING) {
            return 'std::string'
        }
        if(tipo === Tipo.ARRAY) {
            return 'Array'
        }
        return 'NULL'
    }
}

module.exports = { DeclaracionVar }