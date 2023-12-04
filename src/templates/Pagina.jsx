import Cabecalho from "./Cabecalho";
import Menu from "./Menu";

export default function Pagina(props) {
    return (
        <>
            <Cabecalho conteudo='Sistema mensagens' />
            <Menu />
            <div>
                {
                    
                }
                {props.children} 
            </div>
        </>
    )
}

