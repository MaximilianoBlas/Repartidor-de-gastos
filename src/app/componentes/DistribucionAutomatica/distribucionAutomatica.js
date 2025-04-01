"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  cambiarAmigos,
  cambiarCompras,
  cambiarComprasRepartidas,
  cambiarDAutomatica,
} from "@/app/reduxToolkit/slice";
import { button } from "../../style/style.module.scss";
import { Repartir } from "@/app/Hooks/repartirDinero";
import { useState } from "react";

export const DistribucionAutomatica = () => {
  const dispatch = useDispatch();

  let { amigos } = useSelector((state) => state.valores);
  let { compras } = useSelector((state) => state.valores);
  // let { dAutomatica } = useSelector((state) => state.valores);
  let nuevoAmigo = amigos;
  let amigosConQuienesRepartir = {};

  amigos.map((amigo) => {
    amigosConQuienesRepartir[amigo.amigo] = true;
  });
  const distribucionAutomatica = () => {
    compras.forEach((compra) => {
      nuevoAmigo = Repartir(
        nuevoAmigo,
        amigosConQuienesRepartir,
        compra,
        compras
      );
      dispatch(cambiarComprasRepartidas(compra));
    });
    dispatch(cambiarAmigos(nuevoAmigo));
    // dispatch(cambiarDAutomatica());
    dispatch(cambiarCompras([]));
  };

  return (
    <button
      // disabled={dAutomatica}
      id="button"
      className={button}
      onClick={distribucionAutomatica}
    >
      Distribución automatica
    </button>
  );
};
