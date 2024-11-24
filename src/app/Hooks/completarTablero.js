"use client";

import { useDispatch, useSelector } from "react-redux";
import { cambiarTableroCompleto } from "../reduxToolkit/slice";

export const CompletarTablero = (grilla) => {
  // console.log("entro a completar tablero", grilla);

  let amigos = useSelector((state) => state.valores.amigos);
  //  let grilla = useSelector((state) => state.valores.grilla);
  let matrizFinal = useSelector((state) => state.valores.matrizFinal);
  let tableroCompleto = useSelector((state) => state.valores.tableroCompleto);
  let tableroDeControl = tableroCompleto;

  console.log(grilla);

  const dispatch = useDispatch();

  let compras = [];

  let i = 0,
    j = 0,
    boolean = true;
  while (boolean) {
    // console.log("entra al while ", "i ", i, "j ", j);
    if (amigos[i]) {
      // console.log("amigo tiene algo");
      if (amigos[i].compra) {
        // console.log("amigo tiene compra");
        if (amigos[i].compra.length > 1) {
          // console.log("la compra tiene mas de una compra");
          if (amigos[i].compra[j]) {
            // console.log(
            //     "entra para guardar la compra de la compra"
            // );
            compras.push(amigos[i].compra[j]);
            j++;
          } else i++;
        } else {
          compras.push(amigos[i].compra[0]);
          i++;
        }
      } else if (amigos.length === i) boolean = false;
      else i++;
    } else boolean = false;
  }
  // console.log("esto es compra", compras);
  // console.log("grilla antes de rellenar el tablero inicial", grilla);
  // console.log("esta es la matrizFinal", matrizFinal);
  if (matrizFinal.length) {
    tableroCompleto = matrizFinal;
  } else {
    tableroCompleto = grilla.map((e, index) =>
      e.map((e, i) => {
        if (i && !index && i <= amigos.length) {
          return (e = amigos[i - 1].amigo);
        }

        if (!i && index && index <= compras.length) {
          return (e = `${compras[index - 1].compra} ${
            compras[index - 1].precio
          } ${compras[index - 1].amigo}`);
        }
        if (!i && index === compras.length + 1) e = "Totales por amigo";

        if (!i && !index) e = "";
        if (i === amigos.length + 1 && index === compras.length + 1) e = "";
        if (i === amigos.length + 1 && !index) e = "Totales por compra";

        return e;
      })
    );
  }
  if (tableroCompleto.length !== tableroDeControl.length) {
    dispatch(cambiarTableroCompleto(tableroCompleto));
  }
  if (tableroCompleto[0]) {
    if (tableroDeControl[0]) {
      if (tableroCompleto[0].length !== tableroDeControl[0].length) {
        dispatch(cambiarTableroCompleto(tableroCompleto));
      }
    }
  }

  // if (tableroDeControl[0]) {
  //      if (tableroCompleto[0].length !== tableroDeControl[0].length) {
  //          dispatch(cambiarTableroCompleto(tableroCompleto));
  //      }
  // }
  console.log(tableroCompleto);
  return tableroCompleto;
};
