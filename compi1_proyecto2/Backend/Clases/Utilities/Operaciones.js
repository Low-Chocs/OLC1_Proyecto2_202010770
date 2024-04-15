const { Tipo } = require('./Tipo')

const sum = [
    [Tipo.INT,    Tipo.DOUBLE, Tipo.INT,    Tipo.INT,    Tipo.STRING],
    [Tipo.DOUBLE, Tipo.DOUBLE, Tipo.DOUBLE, Tipo.DOUBLE, Tipo.STRING],
    [Tipo.INT,    Tipo.DOUBLE, Tipo.NULL,   Tipo.NULL,   Tipo.STRING],
    [Tipo.INT,    Tipo.DOUBLE, Tipo.NULL,   Tipo.STRING, Tipo.STRING],
    [Tipo.STRING, Tipo.STRING, Tipo.STRING, Tipo.STRING, Tipo.STRING]
]

const res = [
    [Tipo.INT,    Tipo.DOUBLE, Tipo.INT,    Tipo.INT,    Tipo.NULL],
    [Tipo.DOUBLE, Tipo.DOUBLE, Tipo.DOUBLE, Tipo.DOUBLE, Tipo.NULL],
    [Tipo.INT,    Tipo.DOUBLE, Tipo.NULL,   Tipo.NULL,   Tipo.NULL],
    [Tipo.INT,    Tipo.DOUBLE, Tipo.NULL,   Tipo.NULL,   Tipo.NULL],
    [Tipo.NULL,   Tipo.NULL,   Tipo.NULL,   Tipo.NULL,   Tipo.NULL]
]

const mul = [
    [Tipo.INT,    Tipo.DOUBLE, Tipo.NULL, Tipo.INT,    Tipo.NULL],
    [Tipo.DOUBLE, Tipo.DOUBLE, Tipo.NULL, Tipo.DOUBLE, Tipo.NULL],
    [Tipo.NULL,   Tipo.NULL,   Tipo.NULL, Tipo.NULL,   Tipo.NULL],
    [Tipo.INT,    Tipo.DOUBLE, Tipo.NULL, Tipo.NULL,   Tipo.NULL],
    [Tipo.NULL,   Tipo.NULL,   Tipo.NULL, Tipo.NULL,   Tipo.NULL]
]

const div = [
    [Tipo.DOUBLE, Tipo.DOUBLE, Tipo.NULL, Tipo.DOUBLE, Tipo.NULL],
    [Tipo.DOUBLE, Tipo.DOUBLE, Tipo.NULL, Tipo.DOUBLE, Tipo.NULL],
    [Tipo.NULL,   Tipo.NULL,   Tipo.NULL, Tipo.NULL,   Tipo.NULL],
    [Tipo.DOUBLE, Tipo.DOUBLE, Tipo.NULL, Tipo.NULL,   Tipo.NULL],
    [Tipo.NULL,   Tipo.NULL,   Tipo.NULL, Tipo.NULL,   Tipo.NULL]
]

const pow = [
    [Tipo.INT,    Tipo.DOUBLE, Tipo.NULL, Tipo.NULL, Tipo.NULL],
    [Tipo.DOUBLE, Tipo.DOUBLE, Tipo.NULL, Tipo.NULL, Tipo.NULL],
    [Tipo.NULL,   Tipo.NULL,   Tipo.NULL, Tipo.NULL, Tipo.NULL],
    [Tipo.NULL,   Tipo.NULL,   Tipo.NULL, Tipo.NULL, Tipo.NULL],
    [Tipo.NULL,   Tipo.NULL,   Tipo.NULL, Tipo.NULL, Tipo.NULL]
]

const mod = [
    [Tipo.DOUBLE, Tipo.DOUBLE, Tipo.NULL, Tipo.NULL, Tipo.NULL],
    [Tipo.DOUBLE, Tipo.DOUBLE, Tipo.NULL, Tipo.NULL, Tipo.NULL],
    [Tipo.NULL,   Tipo.NULL,   Tipo.NULL, Tipo.NULL, Tipo.NULL],
    [Tipo.NULL,   Tipo.NULL,   Tipo.NULL, Tipo.NULL, Tipo.NULL],
    [Tipo.NULL,   Tipo.NULL,   Tipo.NULL, Tipo.NULL, Tipo.NULL]
]

module.exports = {
    sum,
    res,
    mul,
    div,
    pow,
    mod
}