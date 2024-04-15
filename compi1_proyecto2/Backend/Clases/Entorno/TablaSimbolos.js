class TablaSimbolo {
    constructor() {
        this.simbolos = []
    }

    push = (simbolo) => {
        if(this.validate(simbolo)) {
            this.simbolos.push(simbolo)
        }
    }

    validate = (simbolo) => {
        for(const i of this.simbolos) {
            if(this.hash(i) == this.hash(simbolo)) {
                return false
            }
        }
        return true
    }

    hash = (simbolo) => {
        return `${simbolo.id}_${simbolo.tipo}_${simbolo.nameEnv}_${simbolo.linea}_${simbolo.columna}_${simbolo.tipoID}_${simbolo.tipo}`
    }

    splice = () => {
        this.simbolos.splice(0, this.simbolos.length)
    }
}

var tablaSimbolos = new TablaSimbolo()

module.exports = { tablaSimbolos }