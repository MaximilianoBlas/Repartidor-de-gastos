"use client"

import { useDispatch, useSelector } from "react-redux";
import { cambiarCompraPorRepartir, cambiarMatrizFinal, cambiarTableroCompleto } from "../reduxToolkit/slice";

export const RepartirDinero = () => {

const dispatch = useDispatch();

let distribucionAutomatica = useSelector(
    (state) => state.valores.distribucionAutomatica
);
let compraPorRepartirInterna = useSelector(
    (state) => state.valores.compraPorRepartirInterna
);
let compraARepartir = useSelector((state) => state.valores.compraARepartir);
let amigo = useSelector((state) => state.valores.amigo);
let amigos = useSelector((state) => state.valores.amigos);
let elegido = useSelector((state) => state.valores.elegido);
let elegidos = useSelector((state) => state.valores.elegidos);
let elegidosInterno = useSelector((state) => state.valores.elegidosInterno);
let compraPorRepartir = useSelector((state) => state.valores.compraPorRepartir);
let compras = useSelector((state) => state.valores.compras);
let tableroCompleto = useSelector((state) => state.valores.tableroCompleto);

console.log("tableroCompleto - repartir dinero", tableroCompleto);

    console.log("entra a repartir dinero");
    console.log("elegido", elegido);
    console.log("elegidos", elegidos);
    console.log("amigos", amigos);
    console.log("compras", compras);

    console.log(typeof distribucionAutomatica);

    console.log("compra por repartir", compraPorRepartir);
    console.log("tablero completo", tableroCompleto);
    let amigosParaRepartir = [],
        montoARepartir;
    tableroCompleto[0].forEach((e, i) => {
        if (elegido[e] || (elegidosInterno && elegidosInterno[e])) {
            console.log("entra al if el muy guacho");
            amigosParaRepartir = [...amigosParaRepartir, [e, i]];
        }
    });
    if (
        distribucionAutomatica &&
        typeof distribucionAutomatica !== "function"
    ) {

        console.log("entra al if", compraPorRepartirInterna);

        console.log("amigos para repartir", amigosParaRepartir);

        montoARepartir = Math.trunc(
            compraPorRepartirInterna[0] / (amigosParaRepartir.length + 1)
        );

        console.log("monto a repartir", montoARepartir);

        tableroCompleto = tableroCompleto.map((ele, index) => {
            return ele.map((e, i) => {
                if (index == compraPorRepartirInterna[3]) {
                    console.log(compraPorRepartirInterna[3]);
                    for (let j = 0; j < amigosParaRepartir.length; j++) {
                        if (i == amigosParaRepartir[j][1]) {
                            return (e = montoARepartir);
                        }
                    }
                    return e;
                } else return e;
            });
        });
        console.log("tablero completo", tableroCompleto);
    } else {
        console.log("compra a repartir", compraARepartir);
        dispatch(cambiarCompraPorRepartir(compraARepartir));
        // compraPorRepartir = compraARepartir;
        console.log(compraPorRepartir);

        montoARepartir = Math.trunc(
            compraPorRepartir[0] / (amigosParaRepartir.length + 1)
        );

        console.log("monto a repartir", montoARepartir);

        console.log(compraPorRepartir);

        tableroCompleto = tableroCompleto.map((ele, index) => {
            return ele.map((e, i) => {
                if (index == compraPorRepartir[3]) {
                    console.log(compraPorRepartir[3]);
                    for (let j = 0; j < amigosParaRepartir.length; j++) {
                        if (i == amigosParaRepartir[j][1]) {
                            return (e = montoARepartir);
                        }
                    }
                    return e;
                } else return e;
            });
        });
    }

    console.log("llego a la mitad de repartir dinero");
    let totales = [],
        totalDeTodo = 0;

    console.log(tableroCompleto);
    tableroCompleto = tableroCompleto.map((e, index) => {
        let totalesPorComida = 0;
        return e.map((e, i) => {
            if (!index && i && i < amigos.length + 1) {
                totales[i] = 0;
                return e;
            }
            if (index === compras + 1 && i && i < amigos.length + 1) {
                e = totales[i];
                totalDeTodo += e;
            }
            if (index === compras + 1 && i === amigos.length + 1) {
                e = totalDeTodo;
            }
            if (index && index < compras + 1 && i && i < amigos.length + 1) {
                totalesPorComida += e;
            }

            if (index && index < compras + 1 && i === amigos.length + 1) {
                return (e = totalesPorComida);
            }
            if (index && i) {
                totales[i] += e;
                return e;
            }
            return e;
        });
    });

    console.log(
        "tablero completo a finales de repartir dinero",
        tableroCompleto
    );

    dispatch(cambiarMatrizFinal(tableroCompleto));
    dispatch(cambiarTableroCompleto(tableroCompleto));

    return tableroCompleto
};