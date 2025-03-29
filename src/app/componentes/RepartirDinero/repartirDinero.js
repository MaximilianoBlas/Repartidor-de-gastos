"use client";

import {
  cambiarAmigos,
  cambiarCompraPorRepartir,
  cambiarCompras,
} from "@/app/reduxToolkit/slice";
import { useDispatch, useSelector } from "react-redux";
import { button } from "../../style/style.module.scss";
import { Repartir } from "@/app/Hooks/repartirDinero";
import eliminarCompraHook from "@/app/Hooks/eliminarCompraHook";

export const RepartirDinero = () => {
  const dispatch = useDispatch();

  let { amigos } = useSelector((state) => state.valores);
  let { elegidos } = useSelector((state) => state.valores);
  let { compraPorRepartir } = useSelector((state) => state.valores);
  let { compras } = useSelector((state) => state.valores);
  const dividir = () => {
    if (compraPorRepartir.compra) {
      dispatch(
        cambiarAmigos(Repartir(amigos, elegidos, compraPorRepartir, compras))
      );
      let compra = Object.values(compraPorRepartir).join(",");
      let { comprasHook } = eliminarCompraHook(amigos, compras, compra);
      dispatch(cambiarCompras(comprasHook));
      dispatch(cambiarCompraPorRepartir({}));
    }
  };

  return (
    <button className={button} onClick={() => dividir()}>
      Dividir
    </button>
  );
};
