import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { deleteUserToken, getUserToken } from '../controller/apiController';
import { Outlet, useNavigate } from 'react-router-dom';
import '../TodosUserToken.css'; // Asegúrate de crear e importar este archivo CSS

function TodosUserToken() {
    const [userToken, setUserToken] = useState([]);
    const navigate = useNavigate();

    const recogerUserToken = () => {
        getUserToken()
            .then((data) => {
                setUserToken(data);
            })
            .catch((error) => {
                console.error('Error cargando usuarios y tokens', error);
                setUserToken([]);
            });
    };

    useEffect(() => {
        recogerUserToken();
        const interval = setInterval(() => {
            recogerUserToken();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleClickModificar = (userToken) => {
        navigate('/mostrarUserToken', { state: { selectedUserToken: userToken } });
    };

    const handleClickCrear = () => {
        navigate('/crearUserToken');
    };

    const handleClickEliminar = (codigo) => {
        deleteUserToken(codigo)
            .then(() => recogerUserToken())
            .catch((error) => {
                console.error('Error eliminando el usuario y token ' + codigo, error);
            });
    };

    return (
        <>
            <Container fluid className="mt-4 px-3">
                <Row className="header-row">
                    <Col className="header-col">Usuario</Col>
                    <Col className="header-col">Token</Col>
                    <Col className="header-col"></Col>
                </Row>
                {userToken.map((userToken) => (
                    <Row key={userToken.Id} className="fila align-items-center mb-3">
                        <Col onClick={() => handleClickModificar(userToken)} className="user-col text-center pointer">
                            {userToken.userName}
                        </Col>
                        <Col className="token-col text-center">{userToken.token}</Col>
                        <Col className="text-center">
                            <Button variant="primary" size="sm" onClick={() => handleClickEliminar(userToken.Id)}>
                                Eliminar
                            </Button>
                        </Col>
                    </Row>
                ))}
            </Container>

            <Outlet />
        </>
    );
}

export default TodosUserToken;
