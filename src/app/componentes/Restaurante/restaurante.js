"use client";

import { cambiarRestaurante } from "@/app/reduxToolkit/slice";
import { useDispatch } from "react-redux";
import { button } from "../../style/style.module.scss";

export const Restaurante = () => {
  const dispatch = useDispatch();

  const buttonEvent = () => {
    dispatch(cambiarRestaurante());
  };

  return (
    <button className={button} onClick={() => buttonEvent()}>
      Comer en restaurante
    </button>
  );
};
