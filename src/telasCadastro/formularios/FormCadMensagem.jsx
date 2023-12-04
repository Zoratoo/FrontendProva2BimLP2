import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, FloatingLabel, Spinner } from "react-bootstrap";
import { incluirMensagem, atualizarMensagem } from '../../redux/mensagemReducer';
import { useSelector, useDispatch } from "react-redux";
import { buscarUsuarios } from "../../redux/usuarioReducer";
import ESTADO from "../../recursos/estado";
import { toast } from "react-toastify";

export default function FormCadMensagem(props) {
    const mensagemVazia = {
        id: '0',
        dataHora: '',
        lida: false,
        mensagem: '',
        usuario: {
            id: '0',
            nickname: '',
            urlAvatar: '',
            dataIngresso: '',
            mensagens: []
        }
    }
    const estadoInicialMensagem = props.mensagemParaEdicao;
    const [mensagem1, setMensagem1] = useState(estadoInicialMensagem);
    const [formValidado, setFormValidado] = useState(false);

    const {
        estado: estadoUsu,
        mensagem: mensagemUsu,
        usuarios
    } = useSelector((state) => state.usuario);

    const { estado, mensagem, mensagens } = useSelector((state) => state.mensagens);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(buscarUsuarios());
    }, [dispatch]);

    function manipularMudancas(e) {
        const componente = e.currentTarget;
        setMensagem1({ ...mensagem1, [componente.name]: componente.value });
    }

    function selecionarUsuario(e) {
        const componente = e.currentTarget;
        setMensagem1({
            ...mensagem1, usuario: {
                "id": componente.value,
                "nickname": componente.options[componente.selectedIndex].text,
                "urlAvatar": componente.options[componente.selectedIndex].text,
                "dataIngresso": componente.options[componente.selectedIndex].text,
                mensagens: []
            }
        });
    }

    function manipularSubmissao(e) {
        const form = e.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                dispatch(incluirMensagem(mensagem1));
            }
            else {
                dispatch(atualizarMensagem(mensagem1));
                props.setModoEdicao(false);
                props.setMensagemParaEdicao(mensagemVazia);
            }
            setMensagem1(mensagemVazia);
            setFormValidado(false);
        }
        else {
            setFormValidado(true);
        }

        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <Container>
            {estado === ESTADO.ERRO ?
                toast.error(({ closeToast }) =>
                    <div>
                        <p>{mensagem}</p>

                    </div>
                    , { toastId: estado })
                :
                null
            }
            {
                estado === ESTADO.PENDENTE ?
                    toast(({ closeToast }) =>
                        <div>
                            <Spinner animation="border" role="status"></Spinner>
                            <p>Processando a requisição...</p>
                        </div>
                        , { toastId: estado })
                    :
                    null
            }
            {
                estado === ESTADO.OCIOSO ?
                    setTimeout(() => {
                        toast.dismiss();
                    }, 2000)
                    :
                    null
            }
            <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Mensagem:"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Informe a Mensagem"
                                    id="mensagem"
                                    name="mensagem"
                                    value={mensagem1.mensagem}
                                    onChange={manipularMudancas}
                                    required />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe a mensagem!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <FloatingLabel controlId="floatingSelect" label="Usuarios:">
                            <Form.Select
                                aria-label="Usuarios"
                                id='usuario'
                                name='usuario'
                                onChange={selecionarUsuario}
                                value={mensagem1.usuario.id}
                                requerid>
                                <option value="0" selected>Selecione um usuario</option>
                                {
                                    usuarios?.map((usuario) =>
                                        <option key={usuario.id} value={usuario.id}>
                                            {usuario.nickname}
                                        </option>
                                    )
                                }
                            </Form.Select>
                            {estadoUsu === ESTADO.PENDENTE ?
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Carregando usuarios...</span>
                                </Spinner>
                                :
                                null
                            }
                            {
                                estadoUsu === ESTADO.ERRO ?
                                    <p>Erro ao carregar os usuarios: {mensagemUsu}</p>
                                    :
                                    null
                            }
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} offset={5} className="d-flex justify-content-end">
                        <Button type="submit" variant={"primary"}>{props.modoEdicao ? "Alterar" : "Cadastrar"}</Button>
                    </Col>
                    <Col md={6} offset={5}>
                        <Button type="button" variant={"secondary"} onClick={() => {
                            props.exibirFormulario(false)
                        }
                        }>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}