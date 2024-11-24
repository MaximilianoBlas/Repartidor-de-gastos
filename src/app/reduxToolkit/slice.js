"use cliente";

import { createSlice } from "@reduxjs/toolkit";

export const Slice = createSlice({
  name: "valores",
  initialState: {
    // amigo: "",
    amigos: [],
    // compra: { compra: "", precio: "", amigo: "" },
    compraARepartir: ``,
    matrizFinal: [],
    elegido: {},
    elegidos: {},
    compraPorRepartir: "",
    compras: [],
    count: 0,
    contadorDeCompras: 0,
    colores: {},
    tableroCompleto: [],
    elegidosInterno: 0,
    grilla: [],
    distribucionAutomatica: false,
    compraPorRepartirInterna: false,
  },
  reducers: {
    cambiarAmigo: (state, action) => {
      state.amigo = action.payload;
    },
    cambiarAmigos: (state, action) => {
      state.amigos = action.payload;
    },
    cambiarCompra: (state, action) => {
      state.compra = action.payload;
    },
    cambiarCompraARepartir: (state, action) => {
      state.compraARepartir = action.payload;
    },
    cambiarMatrizFinal: (state, action) => {
      state.matrizFinal = action.payload;
    },
    cambiarElegido: (state, action) => {
      state.elegido = action.payload;
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
    cambiarCount: (state, action) => {
      state.count = action.payload;
    },
    cambiarContadorDeCompras: (state, action) => {
      state.contadorDeCompras = action.payload;
    },
    cambiarColores: (state, action) => {
      state.colores = action.payload;
    },
    cambiarTableroCompleto: (state, action) => {
      state.tableroCompleto = action.payload;
    },
    cambiarElegidosInterno: (state, action) => {
      state.elegidosInterno = action.payload;
    },
    cambiarGrilla: (state, action) => {
      state.grilla = action.payload;
    },
  },
});

export const {
  cambiarAmigo,
  cambiarAmigos,
  cambiarCompra,
  cambiarCompraARepartir,
  cambiarMatrizFinal,
  cambiarElegido,
  cambiarElegidos,
  cambiarCompraPorRepartir,
  agregarCompras,
  cambiarCount,
  cambiarContadorDeCompras,
  cambiarColores,
  cambiarTableroCompleto,
  cambiarElegidosInterno,
  cambiarGrilla,
} = Slice.actions;

export default Slice.reducer;
