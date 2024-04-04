import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
let resultado = "";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        
      </header>
      {/* Renderiza el componente TextAreaWithButton */}
      <TextAreaWithButton />
    </div>
  );
}

function TextAreaWithButton() {
  
  const [text, setText] = useState('');
  const [otherText, setOtherText] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
      setText(event.target.result);
    };
    
    reader.readAsText(file);
  };

  const handlePrintText = () => {
    resultado = parser.parse(text);
    console.log(resultado);
  };

  return (
    <div className="container">
      <textarea
        className="textarea"

        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe o carga tu texto aquí por favor..."
      />
      <textarea
        className="textarea"
        value={otherText}
        onChange={(e) => setOtherText(e.target.value)}
        placeholder="Otro textarea"
      />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handlePrintText}>Imprimir en Consola</button>
      
    </div>
  );
}



export default App;
