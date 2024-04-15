const { Entorno } = require('../Clases/Entorno/Entorno')
const { Execute } = require('../Clases/Instrucciones/Execute')
const { errores, getConsole, reiniciarSalidas } = require('../Clases/Utilities/Salida')
const { tablaSimbolos } = require('../Clases/Entorno/TablaSimbolos')
const analizador = require("../Analizador/Parser.js");

class Controller {
    running = (_, res) => {
        res.send('Interpreter is running!!!')
    }

    interpretar = (instrucciones) => {
        try {
            tablaSimbolos.splice()
            reiniciarSalidas()
            const entornoGlobal = new Entorno(null, 'Global')
            var execute = null
            for(const instruccion of instrucciones) {
                try {
                    if(instruccion instanceof Execute) {
                        execute = instruccion
                    } else {
                        instruccion.execute(entornoGlobal)
                    }
                } catch(error) {}
            }
            if(execute) {
                execute.execute(entornoGlobal)
            }
            console.log(getConsole())
            return {
                consola: getConsole(),
                ast: '',
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
        var fs = require('fs')
        fs.readFile(ruta, (err, data) => {
            if(err) {
                res.json({message: "Error al analizar", salida: err})
            }
            let resultado = analizador.parse(data.toString())
            let interpretacion = this.interpretar(resultado)
            res.json({message: "Funcion analizar", salida: interpretacion})
        })
    }

    parser = (req, res) => {
        const { entrada } = req.body;
        let resultado = analizador.parse(entrada);
        let interpretacion = this.interpretar(resultado)
        res.json({message: "Funcion analizar", salida: interpretacion})
    }
}

module.exports = { Controller }