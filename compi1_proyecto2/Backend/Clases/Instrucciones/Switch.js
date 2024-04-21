const { Instruccion } = require("../Abstractas/Instruccion")
const { Entorno } = require("../Entorno/Entorno")
const { TipoInst } = require("../Utilities/TipoInst")
const { TipoExp } = require("../Utilities/TipoExp")
const { Nodo } = require('../AST/Nodo')

class Switch extends Instruccion {
    constructor(linea, columna, argumento, casos, default_) {
        super(linea, columna, TipoInst.SWITCH)
        this.argumento = argumento
        this.casos = casos
        this.default_ = default_
    }

    execute = (entorno) => {
        const entornoSwitch = new Entorno(entorno, entorno.nombre)
        if(this.casos) {
            const argumento = this.argumento.execute(entorno)
            for(const caso of this.casos) {
                caso.setCaso(argumento)
                const caso_exe = caso.execute(entornoSwitch)
                if(caso_exe) {
                    if(caso_exe.valor === TipoExp.RETURN) {
                        return
                    }
                    else if(caso_exe.valor === TipoInst.BREAK) {
                        return
                    }
                    return caso_exe
                }
            }
        }
        if(this.default_) {
            const default_ = this.default_.execute(entornoSwitch)
            if(default_) {
                if(default_.valor === TipoExp.RETURN) {
                    return
                }
                else if(default_.valor === TipoInst.BREAK) {
                    return
                }
                return default_
            }
        }
    }

    ast = () => {
        const nodo = new Nodo('SWITCH')
        if(this.casos) {
            for(const caso of this.casos) {
                nodo.insertarHijo(caso.ast())
            }
        }
        if(this.default_) {
            const default_ = new Nodo('DEFAULT')
            default_.insertarHijo(this.default_.ast())
            nodo.insertarHijo(default_)
        }
        return nodo
    }
}

module.exports = { Switch }