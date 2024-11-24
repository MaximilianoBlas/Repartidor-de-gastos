"use client";

import {
  cambiarCompraARepartir,
  cambiarCompraPorRepartir,
  cambiarElegido,
  cambiarElegidos,
} from "@/app/reduxToolkit/slice";
import { useDispatch, useSelector } from "react-redux";
import { RepartidorInput } from "../../style/style.module.scss";

export const CompraADividir = () => {
  const dispatch = useDispatch();
  let amigos = useSelector((state) => state.valores.amigos);
  let compras = useSelector((state) => state.valores.compras);

  const selectEvent = (e) => {
    const compra = compras[e.target.selectedIndex - 1];

    dispatch(cambiarCompraPorRepartir(compra));

    // compraPorRepartir = (
    //     e.target[e.nativeEvent.srcElement.selectedIndex].attributes[0].value +
    //     `,${e.nativeEvent.srcElement.selectedIndex}`
    // ).split(",");

    // dispatch(
    //   cambiarCompraARepartir(
    //     (
    //       e.target[e.nativeEvent.srcElement.selectedIndex].attributes[0].value +
    //       `,${e.nativeEvent.srcElement.selectedIndex}`
    //     ).split(",")
    //   )
    // );

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
    dispatch(
      cambiarElegido({
        ...amigosConQuienesRepartir,
      })
    );

    let elegidosInterno;

    // for (let i = 0; i < amigos.length; i++) {
    //   amigosConQuienesRepartir = document.getElementById(amigos[i].amigo);
    //   if (amigoComprador === amigos[i].amigo) {
    //     // console.log("amigo comprador", amigoComprador);
    //     // console.log("amigo en la posicion del index", amigos[i].amigo);
    //     // console.log(
    //     //     "amigo con quienres repartir",
    //     //     amigosConQuienesRepartir
    //     // );
    //     amigosConQuienesRepartir.checked = false;

    //     // setElegidos({
    //     //     ...elegidos,
    //     //     [amigos[i].amigo]: false,
    //     // });
    //     elegidosInterno = {
    //       ...elegidosInterno,
    //       [amigos[i].amigo]: false,
    //     };
    //   } else {
    //     // console.log("amigo comprador", amigoComprador);
    //     // console.log("amigo en la posicion del index", amigos[i].amigo);
    //     // console.log(
    //     //     "amigo con quienres repartir",
    //     //     amigosConQuienesRepartir
    //     // );
    //     amigosConQuienesRepartir.checked = true;

    //     ///////////////////////////////////
    //     // setElegidos({
    //     //     ...elegidos,
    //     //     [amigos[i].amigo]: true,
    //     // });

    //     elegidosInterno = {
    //       ...elegidosInterno,
    //       [amigos[i].amigo]: true,
    //     };
    //   }
    //   // console.log(amigos[i].amigo);
    //   // console.log("los elegidos", elegidos);
    // }
    // console.log("elegidos interno", elegidosInterno);
    // if (elegidosInterno) {
    //   dispatch(cambiarElegidos(elegidosInterno));
    //   dispatch(cambiarElegido({ ...elegidosInterno }));
    // // }
    // dispatch(cambiarElegidos(elegidos));
  };

  return (
    <select
      className={RepartidorInput}
      name="ditribucion"
      id="distribucion"
      key="distribucion"
      onChange={(e) => selectEvent(e)}
    >
      <option value="elige" key="elegi">
        Elige el producto a distribuir
      </option>
      {compras &&
        compras.map((e, i) => {
          return (
            <option
              name={[e.precio, e.amigo, e.compra]}
              id={i}
              value={e.compra}
              key={i}
            >
              {e.compra} comprado/a por {e.amigo}
            </option>
          );
        })}
    </select>
  );
};
