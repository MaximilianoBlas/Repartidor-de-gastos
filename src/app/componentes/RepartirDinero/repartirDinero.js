"use client";

import { cambiarAmigos } from "@/app/reduxToolkit/slice";
import { useDispatch, useSelector } from "react-redux";
import { button } from "../../style/style.module.scss";
import { Repartir } from "@/app/Hooks/repartirDinero";

export const RepartirDinero = () => {
  const dispatch = useDispatch();

  let amigos = useSelector((state) => state.valores.amigos);
  let elegidos = useSelector((state) => state.valores.elegidos);
  let compraPorRepartir = useSelector(
    (state) => state.valores.compraPorRepartir
  );

  const buttonEvent = () => {
    dispatch(cambiarAmigos(Repartir(amigos, elegidos, compraPorRepartir)));
  };

  return (
    <button className={button} onClick={() => buttonEvent()}>
      Dividir
    </button>
  );
};
