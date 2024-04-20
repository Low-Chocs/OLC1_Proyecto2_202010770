const { Expresion } = require("../Abstractas/Expresion")
const { Tipo } = require("../Utilities/Tipo")
const { TipoExp } = require("../Utilities/TipoExp")
const { Nodo } = require('../AST/Nodo')

class Logico extends Expresion {
    constructor(linea, columna, exp1, signo, exp2) {
        super(linea, columna, TipoExp.LOGICO)
        this.exp1 = exp1
        this.signo = signo
        this.exp2 = exp2
    }

    execute = (entorno) => {
        switch(this.signo) {
            case '&&':
                return this.and(entorno)
            case '||':
                return this.or(entorno)
            case '!':
                return this.not(entorno)
            default:
                return {value: 'NULL', type: Type.NULL}
        }
    }

    and = (entorno) => {
        let valor1 = this.exp1.execute(entorno)
        let valor2 = this.exp2.execute(entorno)
        this.tipo = Tipo.BOOL
        return {valor: valor1.valor && valor2.valor,tipo: this.tipo}
    }

    or = (entorno) => {
        let valor1 = this.exp1.execute(entorno)
        let valor2 = this.exp2.execute(entorno)
        this.tipo = Tipo.BOOL
        return {valor: valor1.valor || valor2.valor,tipo: this.tipo}
    }

    not = (entorno) => {
        let valor = this.exp2.execute(entorno)
        this.tipo = Tipo.BOOL
        return {valor: !valor.valor,tipo: this.tipo}
    }

    ast = () => {
        const nodo = new Nodo(this.signo)
        if(this.signo !== '!') {
            nodo.insertarHijo(this.exp1.ast())
        }
        nodo.insertarHijo(this.exp2.ast())
        return nodo
    }
}

module.exports = { Logico }