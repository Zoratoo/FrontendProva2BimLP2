import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ESTADO from '../recursos/estado';
const urlBase = 'https://backend-bcc-2-b.vercel.app/usuario';

export const buscarUsuarios = createAsyncThunk('usuario/buscarUsuarios', async () => {
    try {
        const resposta = await fetch(urlBase, { method: 'GET' });
        const dados = await resposta.json();
        if (dados.status) {
            return {
                status: true,
                listaUsuarios: dados.listaUsuarios,
                mensagem: ''
            }
        }
        else {
            return {
                status: false,
                listaUsuarios: [],
                mensagem: 'Ocorreu um erro ao recuperar usuarios da base de dados.'
            }
        }
    } catch (erro) {
        return {
            status: false,
            listaUsuarios: [],
            mensagem: 'Ocorreu um erro ao recuperar as usuarios da base de dados:' + erro.message
        }
    }
});

export const adicionarUsuario = createAsyncThunk('usuario/adicionarUsuario', async (usuario) => {
    const resposta = await fetch(urlBase, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    }).catch(erro => {
        return {
            status: false,
            mensagem: 'Ocorreu um erro ao adicionar usuario:' + erro.message
        }
    });
    if (resposta.ok) {
        const dados = await resposta.json();
        return {
            status: dados.status,
            mensagem: dados.mensagem,
            usuario
        }
    }
    else {
        return {
            status: false,
            mensagem: 'Ocorreu um erro ao adicionar usuario.',
            usuario
        }
    }
});

export const atualizarUsuario = createAsyncThunk('usuario/atualizarUsuario', async (usuario) => {
    const resposta = await fetch(urlBase, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    }).catch(erro => {
        return {
            status: false,
            mensagem: 'Ocorreu um erro ao atualizar usuario:' + erro.message
        }
    });
    if (resposta.ok) {
        const dados = await resposta.json();
        return {
            status: dados.status,
            mensagem: dados.mensagem,
            usuario

        }
    }
    else {
        return {
            status: false,
            mensagem: 'Ocorreu um erro ao atualizar usuario.',
            usuario

        }
    }
});

export const removerUsuario = createAsyncThunk('usuario/remover', async (usuario) => {
    const resposta = await fetch(urlBase, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    }).catch(erro => {
        return {
            status: false,
            mensagem: 'Ocorreu um erro ao remover a usuario:' + erro.message,
            usuario
        }
    });
    if (resposta.ok) {
        const dados = await resposta.json();
        return {
            status: dados.status,
            mensagem: dados.mensagem,
            usuario
        }
    }
    else {
        return {
            status: false,
            mensagem: 'Ocorreu um erro ao remover usuario.',
            usuario
        }
    }
});

const initialState = {
    estado: ESTADO.OCIOSO,
    mensagem: "",
    usuarios: [],
};

const usuarioSlice = createSlice({
    name: 'usuario',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(buscarUsuarios.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Buscando usuarios...";
        }).addCase(buscarUsuarios.fulfilled, (state, action) => {
            if (action.payload.status) {
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                state.usuarios = action.payload.listaUsuarios;
            } else {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            }
        }).addCase(buscarUsuarios.rejected, (state, action) => {
            state.estado = ESTADO.ERRO;
            state.mensagem = action.error.message;
        }).addCase(adicionarUsuario.fulfilled, (state, action) => {
            state.estado = ESTADO.OCIOSO;
            state.usuarios.push(action.payload.usuario);
            state.mensagem = action.payload.mensagem;
        }).addCase(adicionarUsuario.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Adicionando usuario...";
        }).addCase(adicionarUsuario.rejected, (state, action) => {
            state.mensagem = "Erro ao adicionar usuario: " + action.error.message;
            state.estado = ESTADO.ERRO;
        }).addCase(atualizarUsuario.fulfilled, (state, action) => {
            state.estado = ESTADO.OCIOSO;
            const indice = state.usuarios.findIndex(usuario => usuario.id === action.payload.usuario.id);
            state.usuarios[indice] = action.payload.usuario;
            state.mensagem = action.payload.mensagem;
        }).addCase(atualizarUsuario.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Atualizando usuario...";
        }).addCase(atualizarUsuario.rejected, (state, action) => {
            state.mensagem = "Erro ao atualizar usuario: " + action.error.message;
            state.estado = ESTADO.ERRO;
        }).addCase(removerUsuario.fulfilled, (state, action) => {
            state.estado = ESTADO.OCIOSO;
            state.mensagem = action.payload.mensagem;
            state.usuarios = state.usuarios.filter(usuario => usuario.id !== action.payload.usuario.id);
        }).addCase(removerUsuario.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Removendo usuario...";
        }).addCase(removerUsuario.rejected, (state, action) => {
            state.mensagem = "Erro ao remover usuario: " + action.error.message;
            state.estado = ESTADO.ERRO;
        })
    }
});

export default usuarioSlice.reducer;