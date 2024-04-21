const { Expresion } = require("../Abstractas/Expresion")
const { Tipo } = require("../Utilities/Tipo")
const { TipoExp } = require("../Utilities/TipoExp")
const { Nodo } = require('../AST/Nodo')

class AccesoMat extends Expresion {
    constructor(linea, columna, nombre, indiceI, indiceJ) {
        super(linea, columna, TipoExp.ACCESOMAT)
        this.nombre = nombre
        this.indiceI = indiceI
        this.indiceJ = indiceJ
    }

    execute = (entorno) => {
        const indiceI = this.indiceI.execute(entorno)
        const indiceJ = this.indiceJ.execute(entorno)
        const valor = entorno.obtenerPosicionMatriz(this.nombre, indiceI.valor, indiceJ.valor, this.linea, this.columna)
        if(valor) {
            return valor
        }
        return {valor: 'NULL', tipo: Tipo.NULL}
    }

    ast = () => {
        const nodo = new Nodo(this.nombre)
        nodo.insertarHijo(this.indiceI.ast())
        nodo.insertarHijo(this.indiceJ.ast())
        return nodo
    }
}

module.exports = { AccesoMat }