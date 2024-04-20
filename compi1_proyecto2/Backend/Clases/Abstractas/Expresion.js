class Expresion {
    constructor(linea, columna, tipoExp) {
        this.linea = linea
        this.columna = columna
        this.tipoExp = tipoExp
    }

    execute(_) {}

    ast() {}
}

module.exports = { Expresion }