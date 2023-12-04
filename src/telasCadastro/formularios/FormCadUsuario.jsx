import { useState } from 'react';
import { toast } from 'react-toastify';
import { Container, Form, Row, Col, Button, FloatingLabel, Spinner } from 'react-bootstrap';
import { adicionarUsuario, atualizarUsuario } from '../../redux/usuarioReducer';
import { useSelector, useDispatch } from 'react-redux';
import ESTADO from '../../recursos/estado';

export default function FormCadUsuarios(props) {
    const usuarioVazio = {
        id: 0,
        nickname: '',
        urlAvatar: '',
        dataIngresso: '',
        mensagens: []
    }
    const estadoInicialUsuario = props.usuarioParaEdicao;
    const [usuario, setUsuario] = useState(estadoInicialUsuario);
    const [formValidado, setFormValidado] = useState(false);
    const { estado, mensagem, usuarios } = useSelector((state) => state.usuario);
    const dispatch = useDispatch();

    function manipularMudancas(e) {
        const componente = e.currentTarget;
        setUsuario({ ...usuario, [componente.name]: componente.value });
    }


    function manipularSubmissao(e) {
        const form = e.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                dispatch(adicionarUsuario(usuario));
            }
            else {
                dispatch(atualizarUsuario(usuario));
                props.setModoEdicao(false);
                props.setUsuarioParaEdicao(usuarioVazio);
            }
            setUsuario(usuarioVazio);
            setFormValidado(false);
        }
        else {
            setFormValidado(true);
        }
        e.stopPropagation();
        e.preventDefault();
    }

    if (estado === ESTADO.ERRO) {
        toast.error(({ closeToast }) =>
            <div>
                <p>{mensagem}</p>

            </div>
            , { toastId: estado });
    }
    else if (estado === ESTADO.PENDENTE) {
        toast(({ closeToast }) =>
            <div>
                <Spinner animation="border" role="status"></Spinner>
                <p>Processando a requisição...</p>
            </div>
            , { toastId: estado });
    }
    else {
        toast.dismiss();
        return (
            <Container>
                <h2>Cadastro de usuarios</h2>
                <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="Id:"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="0"
                                        id="id"
                                        name="id"
                                        value={usuario.id}
                                        onChange={manipularMudancas}
                                        disabled />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Informe o id do usuário!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="nickname:"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Informe a nickname do usuario"
                                        id="nickname"
                                        name="nickname"
                                        value={usuario.nickname}
                                        onChange={manipularMudancas}
                                        required />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Informe a nickname do usuario!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>

                            <Form.Group>
                                <FloatingLabel
                                    label="URL da imagem:"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Informe a URL da imagem"
                                        id="urlAvatar"
                                        name="urlAvatar"
                                        value={usuario.urlAvatar}
                                        onChange={manipularMudancas}
                                        required />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Informe a URL!</Form.Control.Feedback>
                            </Form.Group>

                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} offset={5} className="d-flex">
                            <Button type="submit" variant={"primary"}>{props.modoEdicao ? "Alterar" : "Cadastrar"}</Button>
                        </Col>
                    </Row>

                </Form>
            </Container>
        );
    }
}