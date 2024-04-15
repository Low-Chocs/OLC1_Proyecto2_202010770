const Tipo = {
    INT:     0,
    DOUBLE:  1,
    BOOLEAN: 2,
    CHAR:    3,
    STRING:  4,
    ARRAY:   5,
    NULL:    6,
}

const TipoRetorno = { value: null, type: Tipo }

module.exports = {
    Tipo,
    TipoRetorno
}