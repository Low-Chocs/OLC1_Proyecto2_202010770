let consola = ''
let errores = []

function getConsole() {
    let out = consola
    if (errores.length > 0) {
        out += (out !== '' ? '\n\n' : '') + '↳ ERRORES\n'
        out += errores.join('\n')
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