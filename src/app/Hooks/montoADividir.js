"use client"

export const montoADividir = (
    e,
    setCompraARepartir,
     amigos,
     elegidos, elegido,
     setElegido, setElegidos, setCompraPorRepartir
    
) => {
    console.log(e);
    console.log("legidos dentro de monto a dividir", elegidos );

    /////////////////////////////////////////////////////////
    setCompraPorRepartir(
        (
            e.target[e.nativeEvent.srcElement.selectedIndex].attributes[0]
                .value + `,${e.nativeEvent.srcElement.selectedIndex}`
        ).split(",")
    );
    // compraPorRepartir = (
    //     e.target[e.nativeEvent.srcElement.selectedIndex].attributes[0].value +
    //     `,${e.nativeEvent.srcElement.selectedIndex}`
    // ).split(",");

    // console.log(
    //     "apenas hago la compra por repartir, porque no es un arreglo",
    //     compraPorRepartir
    // );

    setCompraARepartir(
        (
            e.target[e.nativeEvent.srcElement.selectedIndex].attributes[0]
                .value + `,${e.nativeEvent.srcElement.selectedIndex}`
        ).split(",")
    );
    // console.log(
    //     e.target[e.nativeEvent.srcElement.selectedIndex].attributes[0]
    //         .value + `,${e.nativeEvent.srcElement.selectedIndex}`
    // );
    let amigoComprador =
        e.target[
            e.nativeEvent.srcElement.selectedIndex
        ].attributes[0].value.split(",")[1];
    // console.log(amigoComprador);

    let amigosConQuienesRepartir, elegidosInterno;

    for (let i = 0; i < amigos.length; i++) {
        amigosConQuienesRepartir = document.getElementById(amigos[i].amigo);
        if (amigoComprador === amigos[i].amigo) {
            // console.log("amigo comprador", amigoComprador);
            // console.log("amigo en la posicion del index", amigos[i].amigo);
            // console.log(
            //     "amigo con quienres repartir",
            //     amigosConQuienesRepartir
            // );
            amigosConQuienesRepartir.checked = false;

            // setElegidos({
            //     ...elegidos,
            //     [amigos[i].amigo]: false,
            // });
            elegidosInterno = {
                ...elegidosInterno,
                [amigos[i].amigo]: false,
            };
        } else {
            // console.log("amigo comprador", amigoComprador);
            // console.log("amigo en la posicion del index", amigos[i].amigo);
            // console.log(
            //     "amigo con quienres repartir",
            //     amigosConQuienesRepartir
            // );
            amigosConQuienesRepartir.checked = true;

            ///////////////////////////////////
            // setElegidos({
            //     ...elegidos,
            //     [amigos[i].amigo]: true,
            // });

            elegidosInterno = {
                ...elegidosInterno,
                [amigos[i].amigo]: true,
            };
        }
        // console.log(amigos[i].amigo);
        // console.log("los elegidos", elegidos);
    }
    console.log("elegidos interno", elegidosInterno);
    setElegidos(elegidosInterno)
    setElegido({ ...elegidosInterno });
    return elegidos;
};
