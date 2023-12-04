import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ESTADO from "../recursos/estado";
const urlBase = "https://backend-bcc-2-b.vercel.app/mensagem";

export const buscarMensagens = createAsyncThunk('buscarMensagens', async () => {
    try {
        const resposta = await fetch(urlBase, { method: "GET" });
        const dados = await resposta.json();
        if (dados.status) {
            return {
                status: dados.status,
                mensagem: "",
                listaMensagens: dados.listaMensagens
            }
        }
        else {
            return {
                status: dados.status,
                mensagem: dados.mensagem,
                listaMensagens: []
            }
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: "Erro ao recuperar mensagens:" + erro.message,
            listaMensagens: []
        }
    }
});

export const incluirMensagem = createAsyncThunk('incluirMensagem', async (mensagem1) => {
    try {
        const resposta = await fetch(urlBase, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mensagem1)
        });
        const dados = await resposta.json();
        if (dados.status) {
            mensagem1.id = dados.codigoGerado
            return {
                status: dados.status,
                mensagem1,
                mensagem: dados.mensagem
            }
        }
        else {
            return {
                status: dados.status,
                mensagem: dados.mensagem
            }
        }
    }
    catch (erro) {
        return {
            status: false,
            mensagem: "Não foi possível enviar mensagem: " + erro.message
        }
    }
});

export const atualizarMensagem = createAsyncThunk('atualizarMensagem', async (mensagem1) => {
    try {
        const resposta = await fetch(urlBase, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mensagem1)
        });
        const dados = await resposta.json();
        if (dados.status) {
            return {
                status: dados.status,
                mensagem1,
                mensagem: dados.mensagem
            }
        }
        else {
            return {
                status: dados.status,
                mensagem: dados.mensagem
            }
        }
    }
    catch (erro) {
        return {
            status: false,
            mensagem: "Não foi possível atualizar mensagem: " + erro.message
        }
    }
});

export const removerMensagem = createAsyncThunk('removerMensagem', async (mensagem1) => {
    try {
        const resposta = await fetch(urlBase, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: mensagem1
        });
        const dados = await resposta.json();
        if (dados.status) {
            return {
                status: dados.status,     
                mensagem: dados.mensagem,
                mensagem1,
            }
        }
        else {
            return {
                status: dados.status,
                mensagem: dados.mensagem
            }
        }
    }
    catch (erro) {
        return {
            status: false,
            mensagem: "Não foi possível excluir a mensagem: " + erro.message
        }
    }
});

const estadoInicial = {
    estado: ESTADO.OCIOSO,
    mensagem: "",
    mensagens: []
}

const mensagemSlice = createSlice({
    name: 'mensagem',
    initialState: estadoInicial,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(buscarMensagens.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = 'Buscando mensagens...';
        }).addCase(buscarMensagens.fulfilled, (state, action) => {
            if (action.payload.status) {
                state.estado = ESTADO.OCIOSO;
                state.mensagem = "Mensagens recuperadas do backend!";
                state.mensagens = action.payload.listaMensagens;
            }
            else {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                state.mensagens = [];
            }
        }).addCase(buscarMensagens.rejected, (state, action) => {
            state.estado = ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.mensagens = [];
        }).addCase(incluirMensagem.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = 'Processando a requisição...'
        }).addCase(incluirMensagem.fulfilled, (state, action) => {
            if (action.payload.status) {
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                state.mensagens.push(action.payload.mensagem);
            }
            else {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            }
        }).addCase(incluirMensagem.rejected, (state, action) => {
            state.estado = ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
        }).addCase(atualizarMensagem.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = 'Processando a requisição...'
        }).addCase(atualizarMensagem.fulfilled, (state, action) => {
            if (action.payload.status) {
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                const indice = state.mensagens.findIndex((mensagem) => mensagem.id === action.payload.mensagem.id);
                state.mensagem[indice] = action.payload.mensagem;
            }
            else {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            }
        }).addCase(atualizarMensagem.rejected, (state, action) => {
            state.estado = ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
        }).addCase(removerMensagem.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = 'Processando a requisição...'
        }).addCase(removerMensagem.fulfilled, (state, action) => {
            if (action.payload.status) {
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                state.mensagens = state.mensagens.filter((mensagem) => mensagem.id !== action.payload.mensagem.id);
            }
            else {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            }
        }).addCase(removerMensagem.rejected, (state, action) => {
            state.estado = ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
        })
    }
});

export default mensagemSlice.reducer;
//