"use client";

import { cambiarAmigos, agregarCompras } from "@/app/reduxToolkit/slice";
import { useDispatch, useSelector } from "react-redux";
import {
  RepartidorInput,
  container,
  button,
} from "../../style/style.module.scss";
import { useState } from "react";

export const AgregarCompra = () => {
  const dispatch = useDispatch();

  let selectorAmigos = useSelector((state) => state.valores.amigos);
  let compras = useSelector((state) => state.valores.compras);
  let restaurante = useSelector((state) => state.valores.restaurante);
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
    amigos.map((e, i) => {
      if (e.amigo === compra.amigo) {
        if (amigos[i]["compra"]) {
          amigos[i]["compra"] = [...amigos[i]["compra"], { ...compra }];
          return dispatch(cambiarAmigos([...amigos]));
        } else {
          amigos[i]["compra"] = [{ ...compra }];
          return dispatch(cambiarAmigos([...amigos]));
        }
      }
    });
    if (restaurante) {
      let nuevaCompra = compra;
      nuevaCompra.amigo = "restaurante";
      dispatch(agregarCompras([...compras, nuevaCompra]));
      let inputCompra = document && document.getElementById("compra");
      inputCompra && inputCompra.focus();
    } else {
      dispatch(agregarCompras([...compras, compra]));
      let inputAmigo = document && document.getElementById("amigo");
      inputAmigo && inputAmigo.focus();
    }

    setCompra({ compra: "", precio: "", amigo: "" });
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
    </div>
  );
};
