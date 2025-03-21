"use client";

import { useDispatch, useSelector } from "react-redux";
import { cambiarAmigos, cambiarDAutomatica } from "@/app/reduxToolkit/slice";
import { button } from "../../style/style.module.scss";
import { Repartir } from "@/app/Hooks/repartirDinero";
import { useState } from "react";

export const DistribucionAutomatica = () => {
  const dispatch = useDispatch();

  let amigos = useSelector((state) => state.valores.amigos);
  let compras = useSelector((state) => state.valores.compras);
  let dAutomatica = useSelector((state) => state.valores.dAutomatica);
  let nuevoAmigo = amigos;
  let amigosConQuienesRepartir = {};

  amigos.map((amigo) => {
    amigosConQuienesRepartir[amigo.amigo] = true;
  });
  const distribucionAutomatica = () => {
    compras.forEach((compra) => {
      nuevoAmigo = Repartir(nuevoAmigo, amigosConQuienesRepartir, compra);
    });
    dispatch(cambiarAmigos(nuevoAmigo));
    dispatch(cambiarDAutomatica());
  };

  return (
    <button
      disabled={dAutomatica}
      id="button"
      className={button}
      onClick={distribucionAutomatica}
    >
      Distribución automatica
    </button>
  );
};
