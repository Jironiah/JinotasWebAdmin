import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addNota } from '../controller/apiController';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function CrearNota() {
    const [title, setTitle] = useState("");
    const [textContent, setTextContent] = useState("");
    const [code, setCode] = useState(0);
    const [userFrom, setUserFrom] = useState("");
    const date = new Date().toISOString().split('T')[0].replace(/-/g, '/');
    const navigate = useNavigate();

    useEffect(() => {
        const nuevoUUID = uuidv4();
        setCode(generarHashCode(nuevoUUID));
    }, []);

    const generarHashCode = (uuid) => {
        let hash = 0;
        for (let i = 0; i < uuid.length; i++) {
            hash = (hash << 5) - hash + uuid.charCodeAt(i);
            hash |= 0;
        }
        return hash;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Nuevo título:", title);
        console.log("Nuevo contenido:", textContent);
        console.log("Nuevo code (hash code):", code);
        console.log("Nuevo userFrom;", userFrom);
        console.log("Nueva date:", date);

        addNota({ title, code, textContent, date, userFrom })
            .then(() => navigate('/'))
            .catch((error) => console.error('Error al crear una nota', error));
    };

    return (
        <>
            <Container fluid style={{ padding: '20px', maxWidth: '800px' }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4" controlId="titulo">
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
                                <Form.Label>De</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={userFrom}
                                    onChange={(e) => setUserFrom(e.target.value)}
                                    required
                                />
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="contenido">
                        <Form.Label>Contenido</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            value={textContent}
                            onChange={(e) => setTextContent(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Row className="mt-3">
                        <Col xs="auto">
                            <Button variant="primary" type="submit">
                                Crear
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

export default CrearNota;
