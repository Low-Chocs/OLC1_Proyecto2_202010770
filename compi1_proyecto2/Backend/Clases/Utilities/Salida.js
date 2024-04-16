let consola = ''
let errores = []

function getConsole() {
    let out = consola
    if (errores.length > 0) {
        out += (out !== '' ? (out[out.length - 1] != '\n' ? '\n\n' : '\n') : '') + '↳ ERRORES\n'
        out += errores.map((e) => `${e.descripcion} ${e.linea}:${e.columna}`).join('\n')
    }
    return out
}

function setConsola(print) {
    consola += print
}

function reiniciarSalidas() {
    consola = ''
    errores.splice(0, errores.length)
}

module.exports = {
    setConsola,
    errores,
    getConsole,
    reiniciarSalidas,
};