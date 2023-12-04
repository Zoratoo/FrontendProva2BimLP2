import { Container } from "react-bootstrap";
import Pagina from "../templates/Pagina";
import FormCadUsuario from "./formularios/FormCadUsuario";
import { useState } from "react";

export default function TelaCadastroUsuario(props) {
    const [exibirFormulario, setExibirFormulario] = useState(false);
    const [usuarioParaEdicao, setUsuarioParaEdicao] = useState({
        id: '0',
        nickname: '',
        urlAvatar: '',
        dataIngresso: '',
        mensagens: []
    });
    const [modoEdicao, setModoEdicao] = useState(false);

    return (
        <Container>
            <Pagina>
                {
                    exibirFormulario ? <FormCadUsuario exibirFormulario={setExibirFormulario}
                        usuarioParaEdicao={usuarioParaEdicao}
                        setUsuarioParaEdicao={setUsuarioParaEdicao}
                        modoEdicao={modoEdicao}
                        setModoEdicao={setModoEdicao}
                    />
                        :
                        <FormCadUsuario exibirFormulario={setExibirFormulario}
                            usuarioParaEdicao={usuarioParaEdicao}
                            setUsuarioParaEdicao={setUsuarioParaEdicao}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                        />
                }
            </Pagina>
        </Container>
    )
}