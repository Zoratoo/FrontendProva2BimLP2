import TelaCadastroUsuario from "./telasCadastro/TelaCadastroUsuario";
import TelaCadastroMensagem from "./telasCadastro/TelaCadastroMensagem";
import TelaMenu from "./telasCadastro/TelaMenu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            {
              
            }
            <Route path="/mensagens" element={<TelaCadastroMensagem />} />
            <Route path="/usuarios" element={<TelaCadastroUsuario />} />
            <Route path="/FrontendProva2BimLP2/" element={<TelaMenu />} />
            {
              
            }
          </Routes>
        </BrowserRouter>
      </Provider>
      <ToastContainer/>
    </div>
  );
}

export default App;
