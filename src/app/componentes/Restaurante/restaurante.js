"use client";

import { cambiarRestaurante } from "@/app/reduxToolkit/slice";
import { useDispatch, useSelector } from "react-redux";
import { button } from "../../style/style.module.scss";

export const Restaurante = () => {
  const dispatch = useDispatch();
  const { restaurante } = useSelector((state) => state.valores);

  const buttonEvent = () => {
    dispatch(cambiarRestaurante());
  };

  return (
    <button
      style={{ padding: "0.5%" }}
      className={button}
      onClick={() => buttonEvent()}
    >
      {restaurante ? "Comer con amigos" : "Comer en restaurente"}
    </button>
  );
};
