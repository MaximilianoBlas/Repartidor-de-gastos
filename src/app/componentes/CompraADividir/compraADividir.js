"use client";

import {
  cambiarCompraPorRepartir,
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

    let amigosConQuienesRepartir = {};

    amigos.map((amigo) => {
      amigosConQuienesRepartir[amigo.amigo] = true;
    });

    dispatch(
      cambiarElegidos({
        ...amigosConQuienesRepartir,
      })
    );
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
