import {configureStore} from '@reduxjs/toolkit';
import mensagemSlice from './mensagemReducer';
import usuarioSlice from './usuarioReducer';

const store = configureStore({
    reducer:{
        mensagens: mensagemSlice,
        usuario: usuarioSlice
    }
});

export default store;