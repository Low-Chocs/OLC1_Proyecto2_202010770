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
            tablaSimbolos.push({nombre: nombre.toLowerCase(), nameEnv: this.nombre, tipoID: tipoFunc == 'void' ? 'Método' : 'Función', tipo: tipoFunc, linea: funcion.linea, columna: funcion.columna + 1})
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
            this.variables.set(nombre.toLowerCase(), {nombre: nombre.toLowerCase(), valor: valor, tipo: tipo})
            tablaSimbolos.push({nombre: nombre.toLowerCase(), nameEnv: this.nombre, tipoID: 'Variable', tipo: this.obtenerTipo(tipo), linea: linea, columna: columna + 1})
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
        this.setError(`Resignación de valor a variable inexistente  "${nombre}".`, linea, columna)
        return false
    }

    guardarVector = (nombre, valor, tipo1, tipo2, linea, columna) => {
        if(!this.variables.has(nombre.toLowerCase())) {
            this.variables.set(nombre.toLowerCase(), {nombre: nombre.toLowerCase(), valor: valor, tipo: tipo1})
            tablaSimbolos.push({nombre: nombre.toLowerCase(), nameEnv: this.nombre, tipoID: 'Variable', tipo: `${this.obtenerTipo(tipo2)}${this.obtenerTipoVector(tipo1)}`, linea: linea, columna: columna + 1})
            return
        }
        this.setError(`Redeclaración de variable existente "${nombre}".`, linea, columna)
    }

    obtenerPosicionVector = (nombre, indiceI, linea, columna) => {
        var entorno = this
        while(entorno) {
            if(entorno.variables.has(nombre.toLowerCase())) {
                var variable = entorno.variables.get(nombre.toLowerCase())
                if(variable.tipo === Tipo.VECTOR || variable.tipo === Tipo.MATRIZ) {
                    variable = variable.valor
                    if(indiceI < variable.length) {
                        return variable[indiceI]
                    }
                    this.setError(`Indice fuera de rango. Indice ${indiceI} en longitud ${variable.length}.`, linea, columna)
                    return null
                }
                this.setError(`"${this.nombre.toLowerCase()}" no es un vector.`, linea, columna)
                return null
            }
            entorno = entorno.anterior
        }
        this.setError(`Acceso a variable inexistente "${this.nombre}".`, linea, columna)
        return null
    }

    obtenerPosicionMatriz = (nombre, indiceI, indiceJ, linea, columna) => {
        var entorno = this
        while(entorno) {
            if(entorno.variables.has(nombre.toLowerCase())) {
                var variable = entorno.variables.get(nombre.toLowerCase())
                if(variable.tipo === Tipo.MATRIZ) {
                    variable = variable.valor
                    if(indiceI < variable.length) {
                        variable = variable[indiceI].valor
                        if(indiceJ < variable.length) {
                            return variable[indiceJ]
                        }
                        this.setError(`Indice fuera de rango. Indice ${indiceJ} en longitud ${variable.length}.`, linea, columna)
                        return null
                    }
                    this.setError(`Indice fuera de rango. Indice ${indiceI} en longitud ${variable.length}.`, linea, columna)
                    return null
                }
                this.setError(`"${this.nombre}" no es un vector.`, linea, columna)
                return null
            }
            entorno = entorno.anterior
        }
        this.setError(`Acceso a variable inexistente "${this.nombre}".`, linea, columna)
        return null
    }

    reasignarValorVector = (nombre, indiceI, valor, linea, columna) => {
        var entorno = this
        while(entorno) {
            if(entorno.variables.has(nombre.toLowerCase())) {
                var simbolo = entorno.variables.get(nombre.toLowerCase())
                if(simbolo.tipo === Tipo.VECTOR) {
                    var vector = simbolo.valor
                    if(indiceI < vector.length) {
                        var vector = vector[indiceI]
                        if(vector.tipo === valor.tipo || vector.tipo === Tipo.DOUBLE && valor.tipo === Tipo.INT) {
                            simbolo.valor[indiceI] = valor
                            entorno.variables.set(nombre.toLowerCase(), simbolo)
                            return true
                        }
                        this.setError(`Los tipos no coinciden en la asignación. Intenta asignar un "${this.obtenerTipo(valor.tipo)}" a un "${this.obtenerTipo(vector.tipo)}".`, linea, columna)
                        return false
                    }
                    this.setError(`Indice fuera de rango. Indice ${indiceI} en longitud ${vector.length}.`, linea, columna)
                    return false
                }
                this.setError(`Intenta acceder mediante índice a una variable "${this.obtenerTipo(simbolo.tipo)}".`, linea, columna)
                return false
            }
            entorno = entorno.anterior
        }
        this.setError(`Resignación de valor a variable inexistente "${nombre}".`, linea, columna)
        return false
    }

    reasignarValorMatriz = (nombre, indiceI, indiceJ, valor, linea, columna) => {
        var entorno = this
        while(entorno) {
            if(entorno.variables.has(nombre.toLowerCase())) {
                var simbolo = entorno.variables.get(nombre.toLowerCase())
                if(simbolo.tipo === Tipo.MATRIZ) {
                    var vector = simbolo.valor
                    if(indiceI < vector.length) {
                        var vector = vector[indiceI].valor
                        if(indiceJ < vector.length) {
                            vector = vector[indiceJ]
                            if(vector.tipo === valor.tipo || vector.tipo === Tipo.DOUBLE && valor.tipo === Tipo.INT) {
                                simbolo.valor[indiceI].valor[indiceJ] = valor
                                entorno.variables.set(nombre.toLowerCase(), simbolo)
                                return true
                            }
                            this.setError(`Los tipos no coinciden en la asignación. Intenta asignar un "${this.obtenerTipo(valor.tipo)}" a un "${this.obtenerTipo(vector.tipo)}".`, linea, columna)
                            return false
                        }
                        this.setError(`Indice fuera de rango. Indice ${indiceJ} en longitud ${vector.length}.`, linea, columna)
                        return false
                    }
                    this.setError(`Indice fuera de rango. Indice ${indiceI} en longitud ${vector.length}.`, linea, columna)
                    return false
                }
                this.setError(`Intenta acceder mediante índice a una variable "${this.obtenerTipo(simbolo.tipo)}".`, linea, columna)
                return false
            }
            entorno = entorno.anterior
        }
        this.setError(`Resignación de valor a variable inexistente "${nombre}".`, linea, columna)
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
            return 'bool'
        }
        if(tipo === Tipo.CHAR) {
            return 'char'
        }
        if(tipo === Tipo.STRING) {
            return 'std::string'
        }
        if(tipo === Tipo.VECTOR) {
            return 'Vector'
        }
        if(tipo === Tipo.MATRIZ) {
            return 'Matrix'
        }
        return 'NULL'
    }

    obtenerTipoVector = (tipo) => {
        if(tipo == Tipo.VECTOR) {
            return '[]'
        }
        return '[][]'
    }

    obtenerTipoFunc = (tipo) => {
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
        return 'void'
    }
}

module.exports = { Entorno }