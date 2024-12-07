"use client";

import { useDispatch, useSelector } from "react-redux";
import { cambiarAmigos } from "@/app/reduxToolkit/slice";
import { button } from "../../style/style.module.scss";
import { Repartir } from "@/app/Hooks/repartirDinero";

export const DistribucionAutomatica = () => {
  const dispatch = useDispatch();

  let amigos = useSelector((state) => state.valores.amigos);
  let compras = useSelector((state) => state.valores.compras);
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
  };

  return (
    <button className={button} onClick={distribucionAutomatica}>
      Distribución automatica
    </button>
  );
};
