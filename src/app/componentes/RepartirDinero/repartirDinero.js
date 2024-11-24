"use client";

import { cambiarAmigos } from "@/app/reduxToolkit/slice";
import { useDispatch, useSelector } from "react-redux";
import { button } from "../../style/style.module.scss";

export const RepartirDinero = () => {
  const dispatch = useDispatch();

  let amigos = useSelector((state) => state.valores.amigos);

  let elegidos = useSelector((state) => state.valores.elegidos);

  let compraPorRepartir = useSelector(
    (state) => state.valores.compraPorRepartir
  );

  const repartirDinero = () => {
    console.log(elegidos);
    const montoADividir = compraPorRepartir.precio;
    const elegidosFiltrados = Object.keys(elegidos).filter(
      (elegido) => elegidos[elegido]
    );

    let montoAPagarPorAmigo = montoADividir / elegidosFiltrados.length;

    let pagoARestar, diferenciaARestar, amigoARestar, pagoAEliminar;

    let amigosActualizado = amigos.map((amigo) => {
      if (elegidos[amigo.amigo]) {
        // comprobamos si a quien hay que pagarle no tiene ya una deuda con este amigo

        let amigoAQuienPagar = amigos.find(
          (acreedor) =>
            acreedor.amigo === compraPorRepartir.amigo &&
            acreedor.amigo !== amigo.amigo
        );

        console.log("amigoAQuienPagar", amigoAQuienPagar);

        if (amigoAQuienPagar && amigoAQuienPagar.pagar) {
          let deuda = amigoAQuienPagar.pagar.find(
            (pago) => pago.pagarA === amigo.amigo
          );

          console.log("deuda", deuda);

          if (deuda) {
            if (Math.trunc(montoAPagarPorAmigo) > deuda.monto) {
              // yo debo mas que el fede a mi
              let diferencia = Math.trunc(montoAPagarPorAmigo) - deuda.monto;

              pagoAEliminar = deuda;
              amigoARestar = amigoAQuienPagar;

              return {
                ...amigo,
                pagar: [
                  ...amigo.pagar,
                  {
                    pagarA: compraPorRepartir.amigo,
                    monto: diferencia,
                    compra: compraPorRepartir.compra,
                  },
                ],
              };
            } else {
              // el fede me debe mas que yo a el
              diferenciaARestar = deuda.monto - Math.trunc(montoAPagarPorAmigo);
              pagoARestar = deuda;
              amigoARestar = amigoAQuienPagar;

              return {
                ...amigo,
              };
            }
          }
        }
        if (amigo.pagar) {
          let amigoRepetido;

          amigo.pagar.forEach((pago, i) => {
            if (pago.pagarA === compraPorRepartir.amigo) amigoRepetido = i;
          });

          if (amigoRepetido !== undefined) {
            let nuevoPago = amigo.pagar.map((pago) => {
              if (pago.pagarA === compraPorRepartir.amigo)
                return {
                  pagarA: compraPorRepartir.amigo,
                  monto:
                    Math.trunc(montoAPagarPorAmigo) +
                    amigo.pagar[amigoRepetido].monto,
                  compra:
                    amigo.pagar[amigoRepetido].compra +
                    "," +
                    compraPorRepartir.compra,
                };
              else return pago;
            });

            let nuevoAmigo = { ...amigo, pagar: [...nuevoPago] };

            return nuevoAmigo;
          } else {
            return {
              ...amigo,
              pagar: [
                ...amigo.pagar,
                {
                  pagarA: compraPorRepartir.amigo,
                  monto: Math.trunc(montoAPagarPorAmigo),
                  compra: compraPorRepartir.compra,
                },
              ],
            };
          }
        } else {
          return {
            ...amigo,
            pagar: [
              {
                pagarA: compraPorRepartir.amigo,
                monto: Math.trunc(montoAPagarPorAmigo),
                compra: compraPorRepartir.compra,
              },
            ],
          };
        }
      } else {
        return {
          ...amigo,
        };
      }
    });

    if (pagoAEliminar) {
      amigosActualizado = amigosActualizado.map((amigo) => {
        if (amigo.amigo === amigoARestar.amigo) {
          let nuevoPago = amigo.pagar.filter(
            (pago) =>
              pago.pagarA !== pagoAEliminar.pagarA &&
              pago.compra !== pagoAEliminar.compra
          );

          let nuevoAmigo = { ...amigo, pagar: [...nuevoPago] };

          return nuevoAmigo;
        } else {
          return { ...amigo };
        }
      });
    }

    if (pagoARestar) {
      amigosActualizado = amigosActualizado.map((amigo) => {
        if (amigo.amigo === amigoARestar.amigo) {
          let nuevoPago = amigo.pagar.map((pago) => {
            if (
              pago.pagarA === pagoARestar.pagarA &&
              pago.compra === pagoARestar.compra
            ) {
              return {
                pagarA: pagoARestar.pagarA,
                monto: diferenciaARestar,
                compra: pagoARestar.compra,
              };
            } else return pago;
          });

          let nuevoAmigo = { ...amigo, pagar: [...nuevoPago] };

          return nuevoAmigo;
        } else {
          return { ...amigo };
        }
      });
    }

    console.log(amigosActualizado);

    dispatch(cambiarAmigos(amigosActualizado));
  };
  return (
    <button className={button} onClick={() => repartirDinero()}>
      Dividir
    </button>
  );
};
