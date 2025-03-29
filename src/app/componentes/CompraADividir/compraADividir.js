"use client";

import {
  cambiarCompraPorRepartir,
  cambiarElegidos,
  cambiarAmigos,
  cambiarCompras,
} from "@/app/reduxToolkit/slice";
import { useDispatch, useSelector } from "react-redux";
import {
  RepartidorInput,
  button,
  container,
} from "../../style/style.module.scss";
import { Repartir } from "@/app/Hooks/repartirDinero";
import eliminarCompraHook from "@/app/Hooks/eliminarCompraHook";
import { AmigosParaRepartir } from "../AmigosParaRepartir/amigosParaRepartir";

export const CompraADividir = () => {
  const dispatch = useDispatch();
  let { amigos } = useSelector((state) => state.valores);
  let { compras } = useSelector((state) => state.valores);
  let { elegidos } = useSelector((state) => state.valores);
  let { compraPorRepartir } = useSelector((state) => state.valores);

  const selectEvent = (e) => {
    let compra = compras[e.target.selectedIndex - 1];

    console.log(compra, "compra por repartir");

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

  const dividir = () => {
    if (compraPorRepartir.compra) {
      dispatch(
        cambiarAmigos(Repartir(amigos, elegidos, compraPorRepartir, compras))
      );
      let compra = Object.values(compraPorRepartir).join(",");
      let { comprasHook } = eliminarCompraHook(amigos, compras, compra);
      dispatch(cambiarCompras(comprasHook));
      dispatch(cambiarCompraPorRepartir({}));

      let select = document && document.getElementById("distribucion");
      if (select) select.value = "elige";
    }
  };

  return (
    <div className={container}>
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
      <div style={{ marginBottom: "8%" }}>
        <AmigosParaRepartir />
      </div>
      <button className={button} onClick={() => dividir()}>
        Dividir
      </button>
    </div>
  );
};
