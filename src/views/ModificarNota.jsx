import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { updateNote } from '../controller/apiController';

function ModificarNota() {
  const location = useLocation();
  const { selectedNote } = location.state || {};
  const idNote = selectedNote.Id
  const code = selectedNote.code
  const date = selectedNote.date
  const defaultTitle = selectedNote.title
  const defaultTextContent = selectedNote.textContent
  const defaultUserTo = selectedNote.userTo
  const [title, setTitle] = useState(defaultTitle)
  const [textContent, setTextContent] = useState(defaultTextContent)
  const [userTo, setUserTo] = useState(defaultUserTo)
  const navigate = useNavigate();

  if (!selectedNote) {
    return <h2>No se seleccionó ninguna nota</h2>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("pulsado");
    console.log("Nuevo título:", title);
    console.log("Nuevo contenido:", textContent);

    updateNote(idNote, { title, code, textContent, date })
      .then(() => navigate('/'))
      .catch((error) => console.error('Error al modificar la nota', error));
  };

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
                <Form.Label>Para </Form.Label>
                <Form.Control
                  type="text"
                  value={userTo}
                  onChange={(e) => setUserTo(e.target.value)}
                  required
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Contenido</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Crear
          </Button>
        </Form>

        <Button variant="primary" onClick={() => navigate('/')} className="botonVolver">
          Volver
        </Button>
      </Container>
    </>
  );

}

export default ModificarNota;