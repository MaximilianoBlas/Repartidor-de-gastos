"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cambiarAmigo, cambiarAmigos } from "../../reduxToolkit/slice";
import {
  RepartidorInput,
  container,
  button,
} from "../../style/style.module.scss";

export const AgregarAmigo = () => {
  const dispatch = useDispatch();
  const [amigo, setAmigo] = useState();
  //   const amigo = useSelector((state) => state.valores.amigo);
  const amigos = useSelector((state) => state.valores.amigos);

  const agregarAmigo = () => {
    dispatch(cambiarAmigos([...amigos, { amigo }]));
    setAmigo("");
    // dispatch(cambiarAmigo(""));
    // if (process.browser) {
    //   let inputAmigos = document && document.getElementById("amigos");
    //   inputAmigos && inputAmigos.focus();
    // }
    let inputAmigos = document && document.getElementById("amigos");
    inputAmigos && inputAmigos.focus();
  };

  return (
    <div className={container}>
      <h2>Agregar Amigo</h2>
      <input
        className={RepartidorInput}
        autoFocus
        type="text"
        name="amigos"
        id="amigos"
        value={amigo}
        onChange={(e) => setAmigo(e.target.value)}
      />
      <button className={button} onClick={agregarAmigo}>
        Sumar
      </button>
    </div>
  );
};
