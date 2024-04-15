class Entorno {
    constructor(anterior, nombre) {
        this.anterior = anterior
        this.nombre = nombre
        this.variables = new Map()
        this.functions = new Map()
    }
}

module.exports = { Entorno }