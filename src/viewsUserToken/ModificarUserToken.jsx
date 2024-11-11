import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { updateUserToken } from '../controller/apiController';

function ModificarUserToken() {
    const location = useLocation();
    const { selectedUserToken } = location.state || {};
    const idUserToken = selectedUserToken.Id;
    const defaultUserName = selectedUserToken.userName;
    const defaultToken = selectedUserToken.token;
    const [userName, setUserName] = useState(defaultUserName);
    const [token, setToken] = useState(defaultToken);
    const navigate = useNavigate();

    if (!selectedUserToken) {
        return <h2>No se seleccionó ninguna nota</h2>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("pulsado");
        console.log("Nuevo userName:", title);
        console.log("Nuevo token:", textContent);

        updateNote(idNote, { title, code, textContent, date })
            .then(() => navigate('/'))
            .catch((error) => console.error('Error al modificar la usuario y el token', error));
    };

    return (
        <>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Row>
                            <Col md={8}>
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Label>Token</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                    required
                                />
                            </Col>
                        </Row>
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
    )
}

export default ModificarUserToken;