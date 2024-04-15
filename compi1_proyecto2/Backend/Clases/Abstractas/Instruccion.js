class Instruccion {
    constructor(linea, columna, tipoInst) {
        this.linea = linea
        this.columna = columna
        this.tipoInst = tipoInst
    }
    execute(_) {}
}

module.exports = { Instruccion }