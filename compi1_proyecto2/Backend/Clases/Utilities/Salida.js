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

function reiniciarSalidas() {
    consola = ''
    errores.splice(0, errores.length)
}

module.exports = {
    consola,
    errores,
    getConsole,
    reiniciarSalidas,
};