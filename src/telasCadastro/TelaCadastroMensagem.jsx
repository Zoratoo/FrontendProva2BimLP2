import { Container } from "react-bootstrap";
import Pagina from "../templates/Pagina";
import FormCadMensagem from "./formularios/FormCadMensagem";
import { useState } from "react";
import BatePapo from "./batepapo/BatePapo";

export default function TelaCadastroUsuario(props) {
    const [exibirFormulario, setExibirFormulario] = useState(false);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [mensagemParaEdicao, setMensagemParaEdicao] = useState({
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
    });

    return (
        <Container>
            <Pagina>
                {
                    exibirFormulario ? 
                    <FormCadMensagem exibirFormulario={setExibirFormulario}
                                    setExibirFormulario={setExibirFormulario}
                                    modoEdicao={modoEdicao}
                                    setModoEdicao={setModoEdicao}
                                    mensagemParaEdicao={mensagemParaEdicao}
                                    setMensagemParaEdicao={setMensagemParaEdicao}/> 
                    : 
                    <BatePapo exibirFormulario={setExibirFormulario}
                                    setExibirFormulario={setExibirFormulario}
                                    modoEdicao={modoEdicao}
                                    mensagemParaEdicao={mensagemParaEdicao}
                                    setMensagemParaEdicao={setMensagemParaEdicao}/>
                }
            </Pagina>
        </Container>
    )
}