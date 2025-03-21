"use client";
import React, { useEffect, useState } from "react";
import {
  mainContainer,
  divContainer,
  container,
  p,
  stylePage,
  stylePageButton,
  lighttheme,
  darktheme,
  responseContainer,
  restaurantMode,
} from "./style/style.module.scss";
import { GoSun } from "react-icons/go";
import { MdModeNight } from "react-icons/md";
import { AgregarAmigo } from "./componentes/AgregarAmigos/agregarAmigos";
import { AgregarCompra } from "./componentes/AgregarCompra/agregarCompra";
import { CompraADividir } from "./componentes/CompraADividir/compraADividir";
import { RepartirDinero } from "./componentes/RepartirDinero/repartirDinero";
import { AmigosParaRepartir } from "./componentes/AmigosParaRepartir/amigosParaRepartir";
import { DistribucionAutomatica } from "./componentes/DistribucionAutomatica/distribucionAutomatica";
import { useSelector } from "react-redux";
import { Restaurante } from "./componentes/Restaurante/restaurante";

export default function Home() {
  let amigos = useSelector((state) => state.valores.amigos);
  const [valueStyle, setValueStyle] = useState(true);

  useEffect(() => {
    if (valueStyle) document.body.className = lighttheme;
    else document.body.className = darktheme;
  }, [valueStyle]);
  7;

  return (
    <div className={mainContainer}>
      <div className={stylePage}>
        <button
          onClick={() => setValueStyle(!valueStyle)}
          className={stylePageButton}
        >
          {valueStyle ? <GoSun fontSize={20} /> : <MdModeNight fontSize={20} />}
        </button>
      </div>
      <h1>Repartidor de gastos</h1>
      <div className={divContainer}>
        <div className={container}>
          <Restaurante />
          <AgregarAmigo />
        </div>
        <AgregarCompra />
        <div className={container}>
          <h2>Distribuir</h2>
          <DistribucionAutomatica />
          <CompraADividir />
          <AmigosParaRepartir />
          <RepartirDinero />
        </div>
      </div>
      <div className={responseContainer}>
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
                    } le paga a ${
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
