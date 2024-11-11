import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { updateNote } from '../controller/apiController';

function ModificarNota() {
  const location = useLocation();
  const { selectedNote } = location.state || {};
  const idNote = selectedNote?.Id;
  const code = selectedNote?.code;
  const date = selectedNote?.date;
  const defaultTitle = selectedNote?.title;
  const defaultTextContent = selectedNote?.textContent;
  const defaultUserTo = selectedNote?.userTo;
  const [title, setTitle] = useState(defaultTitle);
  const [textContent, setTextContent] = useState(defaultTextContent);
  const [userTo, setUserTo] = useState(defaultUserTo);
  const navigate = useNavigate();

  if (!selectedNote) {
    return <h2>No se seleccionó ninguna nota</h2>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateNote(idNote, { title, code, textContent, date, userTo })
      .then(() => navigate('/'))
      .catch((error) => console.error('Error al modificar la nota', error));
  };

  return (
    <>
      <Container fluid style={{ padding: '20px', maxWidth: '800px' }}> {/* Ajuste de padding y ancho máximo */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Row>
              <Col md={8}>
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Col>
              <Col md={4}>
                <Form.Label>Para</Form.Label>
                <Form.Control
                  type="text"
                  value={userTo}
                  onChange={(e) => setUserTo(e.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formContent">
            <Form.Label>Contenido</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              required
            />
          </Form.Group>

          <Row>
            <Col xs="auto">
              <Button variant="primary" type="submit">
                Guardar Cambios
              </Button>
            </Col>
            <Col xs="auto">
              <Button variant="secondary" onClick={() => navigate('/')} className="botonVolver">
                Volver
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}

export default ModificarNota;
