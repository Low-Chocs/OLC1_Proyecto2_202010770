
const API_URL = "localhost:4000"

const xhr =  new XMLHttpRequest();

/*
function onrequest(){
    if(this.readyState == 4 && this.status == 200){

        console.log("esto",this.response);
    }
}
*/
var json;
let ast;


function Ejecutar(){
    texto = document.getElementById('textarea1');
    texto_a_enviar = texto.value;
    const data = {
        ruta: texto_a_enviar
    };
    
    // Configurar la opción para la petición
    const options = {
        method: 'POST', // Método de la petición
        headers: {
            'Content-Type': 'application/json' // Tipo de contenido que se está enviando
        },
        body: JSON.stringify(data) // Convertir el objeto a formato JSON
    };
    
    // Realizar la petición utilizando fetch
    fetch('http://localhost:4000/test', options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema al realizar la solicitud.');
            }
            return response.json(); // Convertir la respuesta a formato JSON
        })
        .then(data => {
            // Manejar la respuesta del servidor
            console.log(data);
            const consola = data.salida.consola;
            let elemento_consola = document.getElementById('textarea2');
            elemento_consola.value = consola;
            const ast = data.salida.ast;
            showarbol(ast);
            const tabla_de_simbolos = data.salida.tablasimbolos.simbolos;
            console.log(tabla_de_simbolos.length);
            const errores = data.salida.errores;
            tabla_simbolos(tabla_de_simbolos);
            ErroresTabla(errores);
           
            
        })
        .catch(error => {
            // Capturar errores
            console.error('Error:', error);
        });
}





function abrirArchivo(event) {
    event.preventDefault();

    let areatext1 = document.getElementById('textarea1');

    // Obtener el elemento del input de archivo
    var inputFile = document.getElementById('inputFile');

    // Obtener el archivo seleccionado
    var file = inputFile.files[0];

    // Crear un objeto FileReader para leer el contenido del archivo
    var reader = new FileReader();

    // Configurar el evento onload del FileReader para manejar la lectura del archivo
    reader.onload = function() {
        // Obtener el contenido del archivo como texto
        var fileContent = reader.result;

        // Hacer lo que necesites con el contenido del archivo, por ejemplo:
        console.log(fileContent);
        areatext1.value = fileContent;
    };

    // Leer el contenido del archivo como texto
    reader.readAsText(file);





}   


function guardar(){
    // Obtener el elemento del input de archivo
    var inputFile = document.getElementById('inputFile');

    // Obtener el archivo seleccionado por el usuario
    var file = inputFile.files[0];

    // Crear un objeto FileReader
    var reader = new FileReader();

    // Escuchar el evento 'load' del lector
    reader.onload = function(event) {
        // Obtener el contenido del archivo
        var contenido = document.getElementById('textarea1').value;

        // Crear un objeto Blob
        var blob = new Blob([contenido], {type: file.type});

        // Guardar el archivo utilizando FileSaver.js
        saveAs(blob, file.name);
};

// Leer el archivo seleccionado
reader.readAsBinaryString(file);


}

function ErroresTabla(errores) {
    
    let contador = 0;

    $('#tablaer tbody').empty();
    $('#tablaer tfoot').empty();

    for (let i = 0; i < errores.length; i++) {
        let item = errores[i];
        contador++;

        $('#tablaer tbody').append(`
            <tr>
                <td>${i + 1}</td>
                <td>${item.tipo}</td>
                <td>${item.descripcion}</td>
                <td>${item.linea}</td>
                <td>${item.columna}</td>
            </tr>
        `);
    }

    $('#tablaer tfoot').html(`
        <tr>
            <td colspan="3">Total de errores: ${contador}</td>
        </tr>
    `);
}



function tabla_simbolos(simbols) {
    
   
    let contador = 0;

    // Limpiar el contenido actual del tbody y tfoot de la tabla
    console.log(simbols.length);

    for (let i = 0; i < simbols.length; i++) {
        console.log("PASE")
        let item = simbols[i];
        contador++;

        // Agregar una fila a la tabla por cada símbolo
        $('#tabla_simbol tbody').append(`
            <tr>
                <td>${i + 1}</td>
                <td>${item.nombre}</td>
                <td>${item.tipoID}</td>
                <td>${item.tipo}</td>
                <td>${item.nameEnv}</td>
                <td>${item.linea}</td>
                <td>${item.columna}</td>
            </tr>
        `);
    }

    // Agregar el total de símbolos al pie de la tabla
    $('#tabla_simbol tfoot').html(`
        <tr>
            <td colspan="3">Total de simbolos: ${contador}</td>
        </tr>
    `);
}


function showarbol(ast){

    let body = ast;

    d3.select("#graph").graphviz()
        .renderDot(body);


}


function errores() {
    document.getElementById('tabla').style.display="none";
    document.getElementById('trees').style.display="none";
    document.getElementById('home').style.display="none";
    document.getElementById('errores').style.display="block";
}

function home(){
    document.getElementById('tabla').style.display="none";
    document.getElementById('trees').style.display="none";
    document.getElementById('errores').style.display="none";
    document.getElementById('home').style.display="block";
}

function arboles(){
    document.getElementById('tabla').style.display="none";
    document.getElementById('home').style.display="none";
    document.getElementById('errores').style.display="none";
    document.getElementById('trees').style.display="block";

}

function tablas(){
    document.getElementById('trees').style.display="none";
    document.getElementById('home').style.display="none";
    document.getElementById('errores').style.display="none";
    document.getElementById('tabla').style.display="block";
}


/*
xhr.addEventListener("load", onrequest);
xhr.open("GET", `${API_URL}/interprete/ping`);
xhr.send();

*/