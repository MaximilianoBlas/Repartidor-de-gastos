import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineInfoCircle } from "react-icons/ai";
import {
  modal,
  closeButtonContainer,
  xButton,
  modalContent,
  modalContentContainer,
  stylePageButton,
} from "../../style/style.module.scss";

export default function HistorialCompras() {
  const [compras, setCompras] = useState(false);

  const { comprasRepartidas } = useSelector((state) => state.valores);
  console.log(comprasRepartidas);

  console.log(compras);
  const abrirCartel = () => {
    setCompras(!compras);
  };
  return (
    <div>
      {compras && (
        <div className={modal}>
          <div className={closeButtonContainer}>
            <button className={xButton} onClick={() => setCompras(!compras)}>
              X
            </button>
          </div>
          <h2>Compras repartidas</h2>
          <div className={modalContentContainer}>
            <div className={modalContent}>
              <h3>Compra</h3>
              <h3>Precio</h3>
              <h3>Amigo</h3>
            </div>

            {comprasRepartidas.map((compra, i) => {
              return (
                <div className={modalContent}>
                  <h3>{compra.compra}</h3>
                  <h3>{compra.precio}</h3>
                  <h3>{compra.amigo}</h3>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <button className={stylePageButton} onClick={abrirCartel}>
        <AiOutlineInfoCircle fontSize={30} />
      </button>
    </div>
  );
}
