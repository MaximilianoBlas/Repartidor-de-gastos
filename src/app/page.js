"use client";
import React, { useEffect, useState } from "react";
import {
  mainContainer,
  divContainer,
  container,
} from "./style/style.module.scss";
// import { CompletarTablero } from "./Hooks/completarTablero";
import { AgregarAmigo } from "./componentes/AgregarAmigos/page";
import { AgregarCompra } from "./componentes/AgregarCompra/page";
import { CompraADividir } from "./componentes/CompraADividir/page";
import { RepartirDinero } from "./componentes/RepartirDinero/page";
import { DistribucionAutomatica } from "./componentes/DistribucionAutomatica/page";
import { AmigosParaRepartir } from "./componentes/AmigosParaRepartir/amigosParaRepartir";
import { useDispatch, useSelector } from "react-redux";
import {
  cambiarAmigos,
  cambiarCompras,
  cambiarElegido,
  cambiarGrilla,
  cambiarAmigo,
} from "./reduxToolkit/slice";

export default function Home() {
  const dispatch = useDispatch();
  let amigos = useSelector((state) => state.valores.amigos);
  let compras = useSelector((state) => state.valores.compras);

  return (
    <div className={mainContainer}>
      <h1>Repartidor de gastos</h1>
      <div className={divContainer}>
        <AgregarAmigo />
        <AgregarCompra />
        <div className={container}>
          <h2>Distribuir</h2>

          <DistribucionAutomatica />

          <CompraADividir />
          <AmigosParaRepartir />

          <RepartirDinero />
        </div>
      </div>
      <div>
        {amigos[0] &&
          amigos[0].pagar &&
          amigos.map((amigo, indiceAmigo) => {
            return (
              amigo.pagar &&
              amigo.pagar.map((pago, indicePago) => {
                return (
                  amigo.amigo !== pago.pagarA && (
                    <h2
                      key={`${indiceAmigo}${indicePago}`}
                    >{`${amigo.amigo} paga a ${pago.pagarA} $${pago.monto}`}</h2>
                  )
                );
              })
            );
          })}
      </div>
    </div>
  );
}
