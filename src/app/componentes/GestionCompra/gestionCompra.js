"use client";

import { cambiarAmigos, cambiarCompras } from "@/app/reduxToolkit/slice";
import { useDispatch, useSelector } from "react-redux";
import {
  RepartidorInput,
  container,
  button,
  friendsList,
  xButton,
  friendsListContainer,
} from "../../style/style.module.scss";
import { useState } from "react";
import agregarCompraHook from "@/app/Hooks/agregarCompraHook";
import eliminarCompraHook from "@/app/Hooks/eliminarCompraHook";

export const GestionCompra = () => {
  const dispatch = useDispatch();

  let selectorAmigos = useSelector((state) => state.valores.amigos);
  let { compras } = useSelector((state) => state.valores);
  let { restaurante } = useSelector((state) => state.valores);
  let amigos = selectorAmigos.map((e) => {
    return { ...e };
  });
  const [compra, setCompra] = useState({ compra: "", precio: "", amigo: "" });
  let count = 0;

  const onChange = (e) => {
    setCompra({
      ...compra,
      [e.target.name]: e.target.value,
    });
  };

  const agregarCompra = () => {
    if (compra.compra.length && compra.precio.length && compra.amigo.length) {
      let { comprasHook, amigos } = agregarCompraHook(
        selectorAmigos,
        compras,
        restaurante,
        compra
      );
      dispatch(cambiarAmigos(amigos));
      dispatch(cambiarCompras(comprasHook));

      if (restaurante) {
        let inputCompra = document && document.getElementById("compra");
        inputCompra && inputCompra.focus();
      } else {
        let inputAmigo = document && document.getElementById("amigo");
        inputAmigo && inputAmigo.focus();
      }

      setCompra({ compra: "", precio: "", amigo: "" });
    }
  };

  const eliminarCompra = (compra) => {
    let { comprasHook, amigos } = eliminarCompraHook(
      selectorAmigos,
      compras,
      compra
    );
    dispatch(cambiarAmigos(amigos));
    dispatch(cambiarCompras(comprasHook));
  };

  return (
    <div className={container}>
      <h2>Agregar Compras</h2>
      {!restaurante && (
        <div>
          <h3>Amigo que compro</h3>
          <select
            className={RepartidorInput}
            name="amigo"
            id="amigo"
            value={compra.amigo}
            onChange={(e) => onChange(e)}
          >
            <option value="cartel">Elige el amigo</option>
            {amigos.map((e, i) => {
              count++;
              return (
                <option value={e.amigo} key={count}>
                  {e.amigo}
                </option>
              );
            })}
          </select>
        </div>
      )}
      <h3>Producto</h3>
      <input
        className={RepartidorInput}
        type="text"
        name="compra"
        id="compra"
        value={compra.compra}
        onChange={(e) => onChange(e)}
      />
      <h3>Precio</h3>
      <input
        className={RepartidorInput}
        type="number"
        name="precio"
        value={compra.precio}
        onChange={(e) => onChange(e)}
      />

      <button className={button} onClick={() => agregarCompra()}>
        Sumar
      </button>
      <div className={friendsListContainer}>
        {compras.length > 0 &&
          compras.map((compra, i) => (
            <div className={friendsList} key={i}>
              <h3>
                {`${compra.compra} a $${compra.precio} `} <br />
                {`por ${compra.amigo}`}
              </h3>
              <button
                name={`${compra.compra},${compra.precio},${compra.amigo}`}
                onClick={(e) => eliminarCompra(e.target.name)}
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
