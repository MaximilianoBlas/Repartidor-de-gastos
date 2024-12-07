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
  },
});

export const {
  cambiarAmigos,
  cambiarElegidos,
  cambiarCompraPorRepartir,
  agregarCompras,
  cambiarColores,
  cambiarRestaurante,
} = Slice.actions;

export default Slice.reducer;
