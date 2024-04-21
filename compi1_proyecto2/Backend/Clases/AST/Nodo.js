class Nodo {
    constructor(etiqueta) {
        this.etiqueta = etiqueta;
        this.hijos = [];
    }

    obtenerGrafo = () => {
        return `digraph AST {\n\tgraph[fontname="Arial" labelloc="t"];\n\tnode[fontname="Arial" fontsize="8" width="0" height="0"];\n\tedge[fontname="Arial"];${this.graficarNodos(0, '')}\n}`;
    }

    graficarNodos = (contador, etiqueta) => {
        var dot = `\n\tnode${contador}${etiqueta}[label = "${this.etiqueta}"];`;
        for (var i = 0; i < this.hijos.length; i++) {
            dot += this.hijos[i].graficarNodos(contador + 1, etiqueta + i);
            dot += `\n\tnode${contador}${etiqueta} -> node${contador + 1}${etiqueta + i};`;
        }
        return dot;
    }

    insertarHijo = (hijo) => {
        this.hijos.push(hijo);
    }
}

module.exports = { Nodo }