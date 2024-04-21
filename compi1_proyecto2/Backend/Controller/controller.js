const { Entorno } = require('../Clases/Entorno/Entorno')
const { Execute } = require('../Clases/Instrucciones/Execute')
const { Nodo } = require('../Clases/AST/Nodo')
const { errores, getConsole, reiniciarSalidas } = require('../Clases/Utilities/Salida')
const { tablaSimbolos } = require('../Clases/Entorno/TablaSimbolos')
const analizador = require("../Analizador/Parser.js");

class Controller {
    running = (_, res) => {
        res.send('Interpreter is running!!!')
    }

    escribirAST = (dot) => {
        const fs = require('fs')
        fs.writeFile('../../AST.dot', dot, (_) => {})
    }

    interpretar = (instrucciones) => {
        try {
            tablaSimbolos.splice()
            reiniciarSalidas()
            const entornoGlobal = new Entorno(null, 'Global')
            var execute = null
            var ast = new Nodo('INSTRUCCIONES')
            for(const instruccion of instrucciones) {
                try {
                    if(instruccion instanceof Execute) {
                        execute = instruccion
                    } else {
                        instruccion.execute(entornoGlobal)
                    }
                    ast.insertarHijo(instruccion.ast())
                } catch(error) {}
            }
            if(execute) {
                execute.execute(entornoGlobal)
            }
            
            this.escribirAST(ast.obtenerGrafo())
            console.log(ast.obtenerGrafo())
            return {
                consola: getConsole(),
                ast: ast.obtenerGrafo(),
                tablasimbolos: tablaSimbolos,
                errores: errores,
            }
        } catch(error) {
            return {
                consola: error,
                ast: error,
                tablasimbolos: error,
                errores: error,
            }
        }
    }

    test = (req, res) => {
        const { ruta } = req.body;
        
        
        let resultado = analizador.parse(ruta.toString())
        let interpretacion = this.interpretar(resultado)
        res.json({message: "Funcion analizar", salida: interpretacion})
        
    }

    parser = (req, res) => {
        const { entrada } = req.body;
        let resultado = analizador.parse(entrada);
        let interpretacion = this.interpretar(resultado)
        res.json({message: "Funcion analizar", salida: interpretacion})
    }
}

module.exports = { Controller }