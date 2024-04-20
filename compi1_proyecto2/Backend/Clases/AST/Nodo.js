class Nodo {
    constructor(etiqueta) {
        this.etiqueta = etiqueta;
        this.hijos = [];
    }

    obtenerGrafo = () => {
        return `digraph AST {\n\tgraph[fontname="Arial" labelloc="t"];\n\tnode[fontname="Arial" fontsize="8" width="0" height="0"];\n\tedge[fontname="Arial"];${this.graficarNodos('i')}\n}`;
    }

    graficarNodos = (etiqueta) => {
        var dot = `\n\tnode_${etiqueta}[label = "${this.etiqueta}"];`;
        for (var i = 0; i < this.hijos.length; i++) {
            dot += this.hijos[i].graficarNodos(etiqueta + i);
            dot += `\n\tnode_${etiqueta} -> node_${etiqueta + i};`;
        }
        return dot;
    }

    insertarHijo = (hijo) => {
        this.hijos.push(hijo);
    }
}

module.exports = { Nodo }