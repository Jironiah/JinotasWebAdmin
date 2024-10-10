import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ModificarNota from './views/ModificarNota';
import TodasNotas from './views/TodasNotas';
import CrearNota from './views/CrearNota';

function App() {
  const PASSWORD = import.meta.env.VITE_PASSWORD_ENTRANCE;
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Contraseña incorrecta');
    }
  };

  return (
    <div>
      {!isAuthenticated && (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Card style={{ width: '20rem' }}>
            <Card.Header>Iniciar sesión</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Iniciar sesión
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      )}
      {isAuthenticated && (
        <Routes>
          <Route path="/" element={<TodasNotas />} />
          <Route path="/mostrarNota" element={<ModificarNota />} />
          <Route path="/crearNota" element={<CrearNota />} />
        </Routes>
      )}
    </div>
  );
}

export default App;