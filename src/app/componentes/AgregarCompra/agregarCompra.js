"use client";

import {
  cambiarAmigos,
  cambiarCompra,
  agregarCompras,
  cambiarTableroCompleto,
} from "@/app/reduxToolkit/slice";
import { useDispatch, useSelector } from "react-redux";
import {
  RepartidorInput,
  container,
  button,
} from "../../style/style.module.scss";
import { useState } from "react";

export const AgregarCompra = ({ tableroCompleto }) => {
  const dispatch = useDispatch();

  let selectorAmigos = useSelector((state) => state.valores.amigos);
  let compras = useSelector((state) => state.valores.compras);
  let amigos = selectorAmigos.map((e) => {
    return { ...e };
  });
  const [compra, setCompra] = useState({ compra: "", precio: "", amigo: "" });
  let count = 0;

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
    setCompra({ compra: "", precio: "", amigo: "" });
    dispatch(agregarCompras([...compras, compra]));

    let inputAmigo = document && document.getElementById("amigo");
    inputAmigo && inputAmigo.focus();
  };

  return (
    <div className={container}>
      <h2>Agregar Compras</h2>
      <h3>Amigo que compro</h3>
      <select
        className={RepartidorInput}
        name="amigo"
        id="amigo"
        value={compra.amigo}
        onChange={(e) =>
          setCompra({
            ...compra,
            [e.target.name]: e.target.value,
          })
        }
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
      <h3>Producto</h3>
      <input
        className={RepartidorInput}
        type="text"
        name="compra"
        id="compra"
        value={compra.compra}
        onChange={(e) =>
          setCompra({
            ...compra,
            [e.target.name]: e.target.value,
          })
        }
      />
      <h3>Precio</h3>
      <input
        className={RepartidorInput}
        type="number"
        name="precio"
        value={compra.precio}
        onChange={(e) =>
          setCompra({
            ...compra,
            [e.target.name]: e.target.value,
          })
        }
      />

      <button className={button} onClick={() => agregarCompra()}>
        Sumar
      </button>
    </div>
  );
};
