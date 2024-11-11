import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { deleteNota, getNotas } from '../controller/apiController';
import { Outlet, useNavigate } from 'react-router-dom';
import '../TodasNotas.css'; // Asegúrate de importar el archivo CSS

const TodasNotas = () => {
    const [note, setNote] = useState([]);
    const navigate = useNavigate();

    const recogerNotas = () => {
        getNotas()
            .then((data) => {
                setNote(data);
            })
            .catch((error) => {
                console.error('Error cargando notas', error);
                setNote([]);
            });
    };

    useEffect(() => {
        recogerNotas();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            recogerNotas();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleClickModificar = (nota) => {
        navigate('/mostrarNota', { state: { selectedNote: nota } });
    };

    const handleClickCrear = () => {
        navigate('/crearNota');
    };

    const handleClickEliminar = (codigo) => {
        deleteNota(codigo)
            .then(() => recogerNotas())
            .catch((error) => {
                console.error('Error eliminando la nota ' + codigo, error);
            });
    };

    return (
        <>
            <Container fluid className="mt-4">
                <Row className="titulo-notas">
                    <Col md={1} className="font-weight-bold text-center">Código</Col>
                    <Col md={2} className="font-weight-bold text-center">Título</Col>
                    <Col md={3} className="font-weight-bold text-center">Contenido</Col>
                    <Col md={2} className="font-weight-bold text-center">De</Col>
                    <Col md={2} className="font-weight-bold text-center">Para</Col>
                    <Col md={1} className="font-weight-bold text-center">Fecha</Col>
                    <Col md={1}></Col>
                </Row>
                {note.map((nota) => (
                    <Row key={nota.Id} className="nota-row align-items-center">
                        <Col md={1} onClick={() => handleClickModificar(nota)} className="nota-code text-center">
                            {nota.code}
                        </Col>
                        <Col md={2} className="text-center">{nota.title}</Col>
                        <Col md={3} className="truncate-text text-center">{nota.textContent}</Col>
                        <Col md={2} className="text-center">{nota.userFrom}</Col>
                        <Col md={2} className="text-center">{nota.userTo}</Col>
                        <Col md={1} className="text-center">{nota.date}</Col>
                        <Col md={1} className="d-flex flex-column align-items-center">
                            <Button
                                variant="warning"
                                onClick={() => handleClickModificar(nota)}
                                size="sm"
                                className="mb-2"
                            >
                                Modificar
                            </Button>
                            <Button variant="danger" onClick={() => handleClickEliminar(nota.Id)} size="sm">
                                Eliminar
                            </Button>
                        </Col>
                    </Row>
                ))}
                <Row className="mt-4">
                    <Col className="text-center">
                        <Button variant="primary" onClick={handleClickCrear}>
                            Crear Nota
                        </Button>
                    </Col>
                </Row>
            </Container>

            <Outlet />
        </>
    );
};

export default TodasNotas;
