const analizador = require("../Analizador/Parser.js");

class Controller {
    running = (_, res) => {
        res.send('Interpreter is running!!!')
    }

    test = (req, res) => {
        const { ruta } = req.body;
        var fs = require('fs')
        fs.readFile(ruta, (err, data) => {
            if(err) {
                res.json({message: "Error al analizar", salida: err})
            }
            console.log(data.toString(), '\n')
            let resultado = analizador.parse(data.toString())
            res.json({message: "Funcion analizar", salida: resultado})
        })
    }

    parser = (req, res) => {
        const { entrada } = req.body;
        let resultado = analizador.parse(entrada);
        res.json({message: "Funcion analizar", salida: resultado})
    }
}

module.exports = { Controller }