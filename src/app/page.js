"use client";
import React, { useState } from "react";
import { mainContainer, divContainer,RepartidorInput,checkbox,label,container,button } from "./style/style.module.scss";
export default function Home() {
    const [amigos, setAmigos] = useState([]);
    const [amigo, setAmigo] = useState("");
    const [elegido, setElegido] = useState({});
    const [compra, setCompra] = useState({ compra: "", precio: "", amigo: "" });
    const [compraARepartir, setCompraARepartir] = useState();
    const [matrizFinal, setMatrizFinal] = useState([]);


    let count = 0,
        contadorDeCompras = 0,
        elegidos = {},
        compraPorRepartir;
    let compras = 0,
        colores = {},
        tableroCompleto = [];
    amigos.map((e) => {
        if (e.compra) {
            return (compras += e.compra.length);
        }
    });

    const grilla = Array.from({ length: compras && compras + 2 }, () =>
        Array.from({ length: amigos && amigos.length + 2 }, () => 0)
    );

    const completarTablero = () => {
        // console.log("entro a completar tablero", grilla);

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
                    if (!i && index === compras.length + 1)
                        e = "Totales por amigo";

                    if (!i && !index) e = "";
                    if (i === amigos.length + 1 && index === compras.length + 1)
                        e = "";
                    if (i === amigos.length + 1 && !index)
                        e = "Totales por compra";

                    return e;
                })
            );
        }
    };
    completarTablero();
    const agregarAmigo = (e) => {
        setAmigos([...amigos, { amigo }]);
        setAmigo("");
        let inputAmigos = document.getElementById("amigos");
        inputAmigos.focus();
    };
    const agregarCompra = (e) => {
        amigos.map((e, i) => {
            if (e.amigo === compra.amigo) {
                if (amigos[i]["compra"]) {
                    amigos[i]["compra"].push({ ...compra });
                    return setAmigos([...amigos]);
                } else {
                    amigos[i]["compra"] = [{ ...compra }];
                    return setAmigos([...amigos]);
                }
            }
        });
        compra.compra = "";
        compra.precio = "";
        compra.amigo = "";
        let inputCompra = document.getElementById("compra");
        inputCompra.focus();
    };

    const amigosParaRepartir = (e) => {
        // console.log(e.target.checked && e.target.name);
        setElegido({ ...elegido, [e.target.name]: e.target.checked });
        // console.log(elegido);
    };
    // console.log("Elegidos para repartir", elegido);

    // console.log(amigos);

    const montoADividir = (e) => {
        console.log(e);
        compraPorRepartir = (
            e.target[e.nativeEvent.srcElement.selectedIndex].attributes[0]
                .value + `,${e.nativeEvent.srcElement.selectedIndex}`
        ).split(",");

        console.log(
            "apenas hago la compra por repartir, porque no es un arreglo",
            compraPorRepartir
        );

        setCompraARepartir(
            (
                e.target[e.nativeEvent.srcElement.selectedIndex].attributes[0]
                    .value + `,${e.nativeEvent.srcElement.selectedIndex}`
            ).split(",")
        );
        console.log(
            e.target[e.nativeEvent.srcElement.selectedIndex].attributes[0]
                .value + `,${e.nativeEvent.srcElement.selectedIndex}`
        );
        let amigoComprador =
            e.target[
                e.nativeEvent.srcElement.selectedIndex
            ].attributes[0].value.split(",")[1];
        console.log(amigoComprador);

        let amigosConQuienesRepartir;

        for (let i = 0; i < amigos.length; i++) {
            amigosConQuienesRepartir = document.getElementById(amigos[i].amigo);
            if (amigoComprador === amigos[i].amigo) {
                console.log("amigo comprador", amigoComprador);
                console.log("amigo en la posicion del index", amigos[i].amigo);
                console.log(
                    "amigo con quienres repartir",
                    amigosConQuienesRepartir
                );
                amigosConQuienesRepartir.checked = false;
                elegidos = {
                    ...elegidos,
                    [amigos[i].amigo]: false,
                };
            } else {
                console.log("amigo comprador", amigoComprador);
                console.log("amigo en la posicion del index", amigos[i].amigo);
                console.log(
                    "amigo con quienres repartir",
                    amigosConQuienesRepartir
                );
                amigosConQuienesRepartir.checked = true;
                elegidos = {
                    ...elegidos,
                    [amigos[i].amigo]: true,
                };
            }
            // console.log(amigos[i].amigo);
            console.log("los elegidos", elegidos);
        }
        setElegido({ ...elegido, ...elegidos });
        return elegidos;
    };
    console.log("los elegidos", elegido);

    const repartirDinero = (e) => {
        let amigosParaRepartir = [];
        tableroCompleto[0].forEach((e, i) => {
            if (elegidos[e] || elegido[e]) {
                console.log("entra al if el muy guacho");
                amigosParaRepartir = [...amigosParaRepartir, [e, i]];
            }
        });
        if (!compraPorRepartir) {
            compraPorRepartir = compraARepartir;
        }
        let montoARepartir = Math.trunc(
            compraPorRepartir[0] / (amigosParaRepartir.length + 1)
        );
        console.log("monto a repartir", montoARepartir);

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
        let totales = [],
            totalDeTodo = 0;
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
                if (
                    index &&
                    index < compras + 1 &&
                    i &&
                    i < amigos.length + 1
                ) {
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
        setMatrizFinal(tableroCompleto);
    };

    // console.log("Tablero Completo", tableroCompleto);

    const distribucionAutomatica = () => {
        console.log(compras);
        for (let i = 1; i < compras + 1; i++) {
            let compra = document.getElementById(i);
            console.log(compra);
            console.log(compra.getAttribute("name") + "," + compra.id);
            // montoADividir(document.getElementById(i));
            compraPorRepartir = (
                compra.getAttribute("name") +
                "," +
                compra.id
            ).split(",");
            let amigoComprador = compra.getAttribute("name").split(",")[1];
            console.log(amigoComprador);

            let amigosConQuienesRepartir;

            for (let i = 0; i < amigos.length; i++) {
                amigosConQuienesRepartir = document.getElementById(
                    amigos[i].amigo
                );
                if (amigoComprador === amigos[i].amigo) {
                    amigosConQuienesRepartir.checked = false;
                    elegidos = {
                        ...elegidos,
                        [amigos[i].amigo]: false,
                    };
                } else {
                    amigosConQuienesRepartir.checked = true;
                    elegidos = {
                        ...elegidos,
                        [amigos[i].amigo]: true,
                    };
                }
                // console.log(amigos[i].amigo);
                // console.log(elegidos);
            }
            console.log(elegidos);
            repartirDinero();
        }
        setElegido({ ...elegido, ...elegidos });
    };

    return (
        <div className={mainContainer}>
            <h1>Repartidor de gastos</h1>
            <div className={divContainer}>
                <div className={container}>
                    <h2>Agregar Amigo</h2>
                    <input
                        className={RepartidorInput}
                        autoFocus
                        type="text"
                        name="amigos"
                        id="amigos"
                        value={amigo}
                        onChange={(e) => setAmigo(e.target.value)}
                    />
                    <button
                        className={button}
                        onKeyDown={(e) => {
                            if (
                                e.code === "Enter" ||
                                e.code === "NumpadEnter"
                            ) {
                                // console.log(e.code);
                                return agregarAmigo(e);
                            }
                        }}
                        onClick={() => agregarAmigo()}
                    >
                        Sumar
                    </button>
                </div>

                <div className={container}>
                    <h2>Agregar Compras</h2>
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
                    <button className={button} onClick={() => agregarCompra()}>
                        Sumar
                    </button>
                </div>

                <div className={container}>
                    <h2>Distribuir</h2>

                    <button
                        className={button}
                        onClick={(e) => distribucionAutomatica()}
                    >
                        Distribucion automatica
                    </button>

                    <select
                        className={RepartidorInput}
                        name="ditribucion"
                        id="distribucion"
                        key="distribucion"
                        onChange={(e) => montoADividir(e)}
                    >
                        <option value="elige" key="elegi">
                            Elige el producto a distribuir
                        </option>
                        {amigos.map((e) => {
                            return (
                                e.compra &&
                                e.compra.map((e, i) => {
                                    contadorDeCompras++;

                                    return (
                                        <option
                                            name={[e.precio, e.amigo, e.compra]}
                                            id={contadorDeCompras}
                                            value={e.compra}
                                            key={count}
                                        >
                                            {e.compra} comprado/a por {e.amigo}
                                        </option>
                                    );
                                })
                            );
                        })}
                    </select>

                    <h3>Dividido entre</h3>
                    {amigos.map((e, i) => {
                        count++;
                        return (
                            <div key={i}>
                                <label className={label} htmlFor={e.amigo}>
                                    {e.amigo}
                                </label>
                                <input
                                    className={checkbox}
                                    onChange={(e) => amigosParaRepartir(e)}
                                    type="checkbox"
                                    name={e.amigo}
                                    key={count}
                                    id={e.amigo}
                                />
                            </div>
                        );
                    })}
                    <button
                        className={button}
                        onClick={(e) => repartirDinero(e)}
                    >
                        Dividir
                    </button>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: `${(
                                99 / (amigos.length + 2) +
                                "vw "
                            ).repeat(amigos.length + 2)}`,
                            gridTemplateRows: `${(
                                88 / (compras > 0 && compras + 1) +
                                "vh "
                            ).repeat(compras > 0 && compras + 1)}`,
                            margin: "15vh 67vw 0 0",
                        }}
                    >
                        {tableroCompleto &&
                            tableroCompleto.map((e, index) => {
                                return e.map((e, i) => {
                                    if (index === 0 || i === 0)
                                        colores = "#abd1c6";
                                    else if (
                                        (index === compras + 1 && i !== 0) ||
                                        (index !== 0 && i === amigos.length + 1)
                                    )
                                        colores = "#f9bc60";
                                    else colores = "#004643";
                                    // if (vuelta === 0) {
                                    //     colores = {
                                    //         ...colores,
                                    //         [i]: `rgb(${
                                    //             Math.floor(Math.random() * 256) +
                                    //             "," +
                                    //             Math.floor(Math.random() * 256) +
                                    //             "," +
                                    //             Math.floor(Math.random() * 256)
                                    //         })`,
                                    //     };
                                    // }
                                    return (
                                        <div
                                            key={i}
                                            style={{
                                                backgroundColor: colores,
                                                border: "1px solid white ",
                                                fontSize: "35px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            {e}
                                        </div>
                                    );
                                });
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
}
