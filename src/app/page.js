"use client";
import React, { useEffect, useState } from "react";
import {
  mainContainer,
  divContainer,
  container,
  p,
} from "./style/style.module.scss";
// import { CompletarTablero } from "./Hooks/completarTablero";
import { AgregarAmigo } from "./componentes/AgregarAmigos/agregarAmigos";
import { AgregarCompra } from "./componentes/AgregarCompra/agregarCompra";
import { CompraADividir } from "./componentes/CompraADividir/compraADividir";
import { RepartirDinero } from "./componentes/RepartirDinero/repartirDinero";
import { AmigosParaRepartir } from "./componentes/AmigosParaRepartir/amigosParaRepartir";
import { DistribucionAutomatica } from "./componentes/DistribucionAutomatica/distribucionAutomatica";
import { useDispatch, useSelector } from "react-redux";

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
                    <p className={p} key={`${indiceAmigo}${indicePago}`}>{`${
                      amigo.amigo.charAt(0).toUpperCase() + amigo.amigo.slice(1)
                    } paga a ${
                      pago.pagarA.charAt(0).toUpperCase() + pago.pagarA.slice(1)
                    } $${pago.monto} por el producto "${pago.compra}"`}</p>
                  )
                );
              })
            );
          })}
      </div>
    </div>
  );
}
