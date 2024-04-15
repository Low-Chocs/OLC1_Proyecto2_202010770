class Expresion {
    constructor(linea, columna, tipo, tipoExp) {
        this.linea = linea
        this.columna = columna
        this.tipo = tipo
        this.tipoExp = tipoExp
    }
    execute(_) {}
}

module.exports = { Expresion }