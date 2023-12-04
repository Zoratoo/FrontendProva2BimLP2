import { Button, Container, Spinner, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { buscarMensagens } from "../../redux/mensagemReducer";
import { removerMensagem } from "../../redux/mensagemReducer";
import ESTADO from "../../recursos/estado";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function BatePapo(props) {
    const { estado, mensagem, mensagens } = useSelector(state => state.mensagens);
    const dispatch = useDispatch();
    function excluirMensagem(mensagem1) {
        if (window.confirm('Deseja realmente excluir essa mensagem?')) {
            dispatch(removerMensagem(mensagem1));
        }
    }

    function apagarMensagens() {
        setTimeout(() => {
            toast.dismiss();
        }, 2000)
        return null;
    }

    useEffect(() => {
        dispatch(buscarMensagens());
    }, [dispatch]);

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
                    apagarMensagens()
                    :
                    null
            }
            <Button type="button" onClick={() => {
                props.exibirFormulario(true);
            }}>Nova Mensagem</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Avatar</th>
                        <th>Nickname</th>
                        <th>Mensagem</th>
                        <th>Horário</th>
                        <th>Lida</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        mensagens?.map((mensagem) => {
                            return (<tr key={mensagem.id}>
                                <td>{mensagem.usuario.id}</td>
                                <td>
                                    <img src={mensagem.usuario.urlAvatar} alt="Avatar do Usuário" width={50}
                                        height={50} />
                                </td>
                                <td>{mensagem.usuario.nickname}</td>
                                <td>{mensagem.mensagem}</td>
                                <td>{mensagem.dataHora}</td>
                                <td>{mensagem.lida}</td>
                                <td>
                                    <Button variant="danger" onClick={() => {
                                        excluirMensagem(mensagem);
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-trash"
                                            viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                        </svg>
                                    </Button> {' '}
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </Table>
        </Container>
    );
}
