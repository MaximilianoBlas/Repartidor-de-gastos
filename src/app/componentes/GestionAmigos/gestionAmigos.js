"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cambiarCompras, cambiarAmigos } from "../../reduxToolkit/slice";
import {
  RepartidorInput,
  container,
  button,
  friendsList,
  xButton,
  friendsListContainer,
} from "../../style/style.module.scss";

export const GestionAmigos = () => {
  const dispatch = useDispatch();
  const [amigo, setAmigo] = useState("");
  const { amigos } = useSelector((state) => state.valores);
  const { compras } = useSelector((state) => state.valores);

  const agregarAmigo = () => {
    if (amigo.length) {
      dispatch(cambiarAmigos([...amigos, { amigo }]));
      setAmigo("");
      let inputAmigos = document && document.getElementById("amigos");
      inputAmigos && inputAmigos.focus();
    }
  };

  const eliminarAmigo = (amigoAEliminar) => {
    let nuevosAmigos = amigos.filter((amigo) => amigo.amigo !== amigoAEliminar);
    let comprasFiltradas = compras.filter(
      (compra) => compra.amigo !== amigoAEliminar
    );
    dispatch(cambiarAmigos(nuevosAmigos));
    dispatch(cambiarCompras(comprasFiltradas));
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
      <div className={friendsListContainer}>
        {amigos.length > 0 &&
          amigos.map((amigo, i) => (
            <div className={friendsList} key={i}>
              <h3>{amigo.amigo}</h3>
              <button
                id={amigo.amigo}
                onClick={(e) => eliminarAmigo(e.target.id)}
                className={xButton}
              >
                X
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
