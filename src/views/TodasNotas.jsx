import { Container, Row, Col, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { deleteNota, getNotas } from '../controller/apiController';
import { Outlet, useNavigate } from 'react-router-dom';

const TodasNotas = () => {
    const [note, setNote] = useState([]);
    const navigate = useNavigate();

    const estiloTitulos = {
        fontSize: "30px"
    };

    const recogerNotas = () => {
        getNotas()
            .then((data) => {
                setNote(data);
            })
            .catch((error) => {
                console.error('Error cargando notas', error);
                setNote([]);
            });
    }

    useEffect(() => {
        recogerNotas();
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
    }

    return (
        <>
            <Container>
                <Row style={estiloTitulos}>
                    <Col>Código</Col>
                    <Col>Título</Col>
                    <Col>Contenido</Col>
                    <Col>Fecha</Col>
                    <Col></Col>
                </Row>
                {note.map((nota) =>
                    <Row key={nota.Id} className='fila'>
                        <Col onClick={() => handleClickModificar(nota)} >
                            {nota.code}
                        </Col>
                        <Col>{nota.title}</Col>
                        <Col>{nota.textContent}</Col>
                        <Col>{nota.date}</Col>
                        <Col><Button variant='primary' onClick={() => handleClickEliminar(nota.Id)}> Eliminar Nota </Button></Col>
                    </Row>
                )}
                <Button variant='primary' onClick={handleClickCrear}>
                    Crear Nota
                </Button>
            </Container>

            <Outlet />
        </>
    );
}

export default TodasNotas;
