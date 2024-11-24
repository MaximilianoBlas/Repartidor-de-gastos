"use client";

import { useDispatch, useSelector } from "react-redux";
// import { repartirDinero, RepartirDinero } from "../RepartirDinero/page";
import { useRepartirDinero } from "@/app/Hooks/repartirDinero";
import {
  cambiarCompraPorRepartir,
  cambiarElegido,
  cambiarElegidos,
} from "@/app/reduxToolkit/slice";
import { button } from "../../style/style.module.scss";
import { RepartirDinero } from "../RepartirDinero/page";
import { useEffect, useState } from "react";

export const DistribucionAutomatica = (
  setCompraPorRepartir,
  setMatrizFinal
) => {
  const dispatch = useDispatch();

  let amigos = useSelector((state) => state.valores.amigos);
  let elegido = useSelector((state) => state.valores.elegido);
  let elegidos = useSelector((state) => state.valores.elegidos);
  let elegidosInterno = useSelector((state) => state.valores.elegidosInterno);
  let compraPorRepartir = useSelector(
    (state) => state.valores.compraPorRepartir
  );
  let compras = useSelector((state) => state.valores.compras);
  let tableroCompleto = useSelector((state) => state.valores.tableroCompleto);

  const distribucionAutomatica = () => {
    for (let i = 0; i < compras.length; i++) {
      let compra = compras[i];

      dispatch(cambiarCompraPorRepartir(compra));

      let amigoComprador = compra.amigo;

      let amigosConQuienesRepartir = {};

      amigos.map((amigo) => {
        // if (amigo.amigo === amigoComprador)
        amigosConQuienesRepartir[amigo.amigo] = true;
        // else amigosConQuienesRepartir[amigo.amigo] = true;
      });

      dispatch(
        cambiarElegidos({
          ...amigosConQuienesRepartir,
        })
      );

      //   for (let i = 0; i < amigos.length; i++) {
      //     amigosConQuienesRepartir = document.getElementById(amigos[i].amigo);
      //     if (amigoComprador === amigos[i].amigo) {
      //       amigosConQuienesRepartir.checked = false;
      //       dispatch(
      //         cambiarElegidos({
      //           ...elegidos,
      //           [amigos[i].amigo]: false,
      //         })
      //       );
      //       //////////////////////////////////////////////////
      //       elegidosInterno = {
      //         ...elegidosInterno,
      //         [amigos[i].amigo]: false,
      //       };
      //     } else {
      //       amigosConQuienesRepartir.checked = true;
      //       dispatch(
      //         cambiarElegidos({
      //           ...elegidos,
      //           [amigos[i].amigo]: true,
      //         })
      //       );
      //       elegidosInterno = {
      //         ...elegidosInterno,
      //         [amigos[i].amigo]: true,
      //       };
      //     }
      //   }
    }
    dispatch(cambiarElegido({ ...elegido, ...elegidos }));
  };
  return (
    <button className={button} onClick={distribucionAutomatica}>
      Distribucion automatica
    </button>
  );
};
