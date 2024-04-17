const { setConsola, errores } = require('../Utilities/Salida')
const { tablaSimbolos } = require('./TablaSimbolos')
const { Tipo } = require("../Utilities/Tipo")

class Entorno {
    constructor(anterior, nombre) {
        this.anterior = anterior
        this.nombre = nombre
        this.variables = new Map()
        this.funciones = new Map()
    }

    guardarFuncion = (nombre, funcion) => {
        if(!this.funciones.has(nombre.toLowerCase())) {
            this.funciones.set(nombre.toLowerCase(), funcion)
            const tipoFunc = this.obtenerTipoFunc(funcion.tipo)
            tablaSimbolos.push({id: nombre.toLowerCase(), nameEnv: this.nombre, tipoID: tipoFunc == 'void' ? 'Método' : 'Función', tipo: tipoFunc, linea: funcion.linea, columna: funcion.columna + 1})
            return
        }
        this.setError(`Redefinición de función existente "${nombre}".`, funcion.linea, funcion.columna)
    }

    obtenerFuncion = (nombre) => {
        let entorno = this
        while(entorno) {
            if(entorno.funciones.has(nombre.toLowerCase())) {
                return entorno.funciones.get(nombre.toLowerCase())
            }
            entorno = entorno.anterior
        }
        return null
    }

    guardarVariable = (nombre, valor, tipo, linea, columna) => {
        if(!this.variables.has(nombre.toLowerCase())) {
            this.variables.set(nombre.toLowerCase(), {id: nombre.toLowerCase(), valor: valor, tipo: tipo})
            tablaSimbolos.push({id: nombre.toLowerCase(), nameEnv: this.nombre, tipoID: 'Variable', tipo: this.obtenerTipo(tipo), linea: linea, columna: columna + 1})
            return
        }
        this.setError(`Redeclaración de variable existente "${nombre}".`, linea, columna)
    }

    obtenerVariable = (nombre) => {
        let entorno = this
        while(entorno) {
            if(entorno.variables.has(nombre.toLowerCase())) {
                return entorno.variables.get(nombre.toLowerCase())
            }
            entorno = entorno.anterior
        }
        return null
    }

    reasignarValorVariable = (nombre, valor, linea, columna) => {
        var entorno = this
        while(entorno) {
            if(entorno.variables.has(nombre.toLowerCase())) {
                let simbolo = entorno.variables.get(nombre.toLowerCase())
                if(simbolo.tipo === valor.tipo || simbolo.tipo === Tipo.DOUBLE && valor.tipo === Tipo.INT) {
                    simbolo.valor = valor.valor
                    entorno.variables.set(nombre.toLowerCase(), simbolo)
                    return true
                }
                this.setError(`Los tipos no coinciden en la asignación. Intenta asignar un "${this.obtenerTipo(valor.tipo)}" a un "${this.obtenerTipo(simbolo.tipo)}".`, linea, columna)
                return false
            }
            entorno = entorno.anterior
        }
        this.setError('Resignación de valor a variable inexistente.', linea, columna)
        return false
    }

    setPrint = (print) => {
        setConsola(print)
    }

    match = (err, linea, columna) => {
        for(const s of errores) {
            if(`${s}` == `${{tipo: 'SEMANTICO', descripcion: err, linea: linea, columna: columna + 1}}`) {
                return true
            }
        }
        return false
    }

    setError = (errorD, linea, columna) => {
        if(!this.match(errorD, linea, columna)) {
            errores.push({tipo: 'SEMANTICO', descripcion: errorD,  linea: linea, columna: columna + 1})
        }
    }

    getGlobal = () => {
        let env = this
        while(env.previous) {
            env = env.previous
        }
        return env
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

    obtenerTipoFunc = (tipo) => {
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
        return 'void'
    }
}

module.exports = { Entorno }