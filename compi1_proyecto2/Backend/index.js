const parser = require("./Parser/parser.js");


let entrada = `println("Hola mundo");`;

let resultado = parser.parse(entrada);

console.log(resultado);