import React, { useState } from 'react';
import { Card, Form, Button, Tab, Tabs } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import ModificarNota from './viewsNotes/ModificarNota';
import TodasNotas from './viewsNotes/TodasNotas';
import CrearNota from './viewsNotes/CrearNota';
import TodosUserToken from './viewsUserToken/TodosUserToken';

function App() {
  const PASSWORD = import.meta.env.VITE_PASSWORD_ENTRANCE;
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const handleSelectTab = (key) => {
    // Cambiar de tab y navegar a la raíz
    navigate('/');
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
        <Tabs
          defaultActiveKey="notes"
          id="uncontrolled-tab-example"
          className="mb-3"
          onSelect={handleSelectTab} // Aquí vinculamos la función al evento onSelect
        >
          <Tab eventKey="notes" title="Notes">
            <Routes>
              <Route path="/" element={<TodasNotas />} />
              <Route path="/mostrarNota" element={<ModificarNota />} />
              <Route path="/crearNota" element={<CrearNota />} />
            </Routes>
          </Tab>
          <Tab eventKey="user_token" title="User y Token">
            <Routes>
              <Route path="/" element={<TodosUserToken />} />
            </Routes>
          </Tab>
        </Tabs>
      )}
    </div>
  );
}

export default App;
