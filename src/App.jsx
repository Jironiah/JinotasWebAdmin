import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ModificarNota from './views/ModificarNota';
import TodasNotas from './views/TodasNotas';
import CrearNota from './views/CrearNota';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TodasNotas />} />
        <Route path="/mostrarNota" element={<ModificarNota />} />
        <Route path="/crearNota" element={<CrearNota />} />
      </Routes>
    </>
  )
}

export default App;
