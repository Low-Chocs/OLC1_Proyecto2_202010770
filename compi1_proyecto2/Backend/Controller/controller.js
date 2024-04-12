const analizador = require("../Analizador/Parser.js");

class Controller {
    running = (_, res) => {
        res.send('Interpreter is running!!!')
    }

    parser = (req, res) => {
        const entrada = req.body.entrada;
        let resultado = analizador.parse(entrada);
        res.json({message: "Funcion analizar", salida: resultado})
    }
}

module.exports = Controller