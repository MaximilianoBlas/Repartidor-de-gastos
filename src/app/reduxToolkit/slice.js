"use cliente";

import { createSlice } from "@reduxjs/toolkit";

export const Slice = createSlice({
  name: "valores",
  initialState: {
    amigos: [],
    restaurante: false,
    elegidos: {},
    compraPorRepartir: "",
    compras: [],
    colores: {},
    dAutomatica: false,
  },
  reducers: {
    cambiarAmigos: (state, action) => {
      state.amigos = action.payload;
    },
    cambiarElegidos: (state, action) => {
      state.elegidos = action.payload;
    },
    cambiarCompraPorRepartir: (state, action) => {
      state.compraPorRepartir = action.payload;
    },
    agregarCompras: (state, action) => {
      state.compras = action.payload;
    },

    cambiarColores: (state, action) => {
      state.colores = action.payload;
    },
    cambiarRestaurante: (state) => {
      state.restaurante = !state.restaurante;
    },
    cambiarDAutomatica: (state) => {
      state.dAutomatica = !state.dAutomatica;
    },
  },
});

export const {
  cambiarAmigos,
  cambiarElegidos,
  cambiarCompraPorRepartir,
  agregarCompras,
  cambiarColores,
  cambiarRestaurante,
  cambiarDAutomatica,
} = Slice.actions;

export default Slice.reducer;
