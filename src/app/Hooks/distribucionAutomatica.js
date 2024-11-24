"use client"

import repartirDinero from "./repartirDinero";

const distribucionAutomatica = (
    compras,
    setCompraPorRepartir,
    compraPorRepartir,
    amigos,
    amigo,
    elegidos,
    setElegidos,
    elegido,
    setElegido,
    elegidosInterno,
    compraARepartir,
    tableroCompleto,
    setMatrizFinal
) => {
    let distribucionAutomatica = true;
    console.log(compras);
    for (let i = 1; i < compras + 1; i++) {
        let compra = document.getElementById(i);
        console.log(compra);
        console.log(compra.getAttribute("name") + "," + compra.id);
        // montoADividir(document.getElementById(i));

        setCompraPorRepartir(
            (compra.getAttribute("name") + "," + compra.id).split(",")
        );

        let compraPorRepartirInterna = (
            compra.getAttribute("name") +
            "," +
            compra.id
        ).split(",");

        console.log(compraPorRepartir);
        // compraPorRepartir = (
        //     compra.getAttribute("name") +
        //     "," +
        //     compra.id
        // ).split(",");
        let amigoComprador = compra.getAttribute("name").split(",")[1];
        console.log(amigoComprador);

        let amigosConQuienesRepartir;

        for (let i = 0; i < amigos.length; i++) {
            amigosConQuienesRepartir = document.getElementById(amigos[i].amigo);
            if (amigoComprador === amigos[i].amigo) {
                console.log(amigosConQuienesRepartir);
                amigosConQuienesRepartir.checked = false;
                setElegidos({
                    ...elegidos,
                    [amigos[i].amigo]: false,
                });

                //////////////////////////////////////////////////
                elegidosInterno = {
                    ...elegidosInterno,
                    [amigos[i].amigo]: false,
                };
            } else {
                amigosConQuienesRepartir.checked = true;
                setElegidos({
                    ...elegidos,
                    [amigos[i].amigo]: true,
                });
                elegidosInterno = {
                    ...elegidosInterno,
                    [amigos[i].amigo]: true,
                };
            }
            // console.log(amigos[i].amigo);
            // console.log(elegidos);
        }
        console.log(elegidos);
        tableroCompleto = repartirDinero(
            distribucionAutomatica,
            elegidosInterno,
            elegido,
            elegidos,
            compraPorRepartir,
            tableroCompleto,
            compras,
            setMatrizFinal,
            compraARepartir,
            setCompraPorRepartir,
            amigos,
            compraPorRepartirInterna
        );
    }
    setElegido({ ...elegido, ...elegidos });
};

export default distribucionAutomatica