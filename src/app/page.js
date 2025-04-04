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
import { GestionAmigos } from "./componentes/GestionAmigos/gestionAmigos";
import { GestionCompra } from "./componentes/GestionCompra/gestionCompra";
import { CompraADividir } from "./componentes/CompraADividir/compraADividir";
// import { RepartirDinero } from "./componentes/RepartirDinero/repartirDinero";
// import { AmigosParaRepartir } from "./componentes/AmigosParaRepartir/amigosParaRepartir";
import { DistribucionAutomatica } from "./componentes/DistribucionAutomatica/distribucionAutomatica";
import { useSelector } from "react-redux";
import { Restaurante } from "./componentes/Restaurante/restaurante";
import HistorialCompras from "./componentes/HistorialCompras/historialCompras";

export default function Home() {
  let amigos = useSelector((state) => state.valores.amigos);
  const [valueStyle, setValueStyle] = useState(true);
  const { comprasRepartidas } = useSelector((state) => state.valores);

  console.log(comprasRepartidas);

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
      <Restaurante />
      <div className={divContainer}>
        <div className={container}>
          <GestionAmigos />
        </div>
        <GestionCompra />
        <div className={container}>
          <h2>Distribuir</h2>
          <DistribucionAutomatica />
          <CompraADividir />
          {/* <AmigosParaRepartir /> */}
          {/* <RepartirDinero /> */}
        </div>
      </div>
      {comprasRepartidas.length > 0 && <HistorialCompras />}
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
