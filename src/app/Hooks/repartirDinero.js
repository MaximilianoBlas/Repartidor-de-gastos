"use client";

export const Repartir = (amigos, elegidos, compraPorRepartir) => {
  const montoADividir = compraPorRepartir.precio;
  const elegidosFiltrados = Object.keys(elegidos).filter(
    (elegido) => elegidos[elegido]
  );

  let montoAPagarPorAmigo = montoADividir / elegidosFiltrados.length;

  let diferenciaARestar, amigoARestar;
  let arrayPagoARestar = [];
  let arrayPagoAEliminar = [];

  let amigosActualizado = amigos.map((amigo) => {
    if (elegidos[amigo.amigo]) {
      let amigoAQuienPagar = amigos.find(
        (acreedor) =>
          acreedor.amigo === compraPorRepartir.amigo &&
          acreedor.amigo !== amigo.amigo
      );

      if (amigoAQuienPagar && amigoAQuienPagar.pagar) {
        let deuda = amigoAQuienPagar.pagar.find(
          (pago) => pago.pagarA === amigo.amigo
        );

        if (deuda) {
          if (Math.trunc(montoAPagarPorAmigo) > deuda.monto) {
            let diferencia = Math.trunc(montoAPagarPorAmigo) - deuda.monto;

            arrayPagoAEliminar.push(deuda);

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
            diferenciaARestar = deuda.monto - Math.trunc(montoAPagarPorAmigo);
            let nuevaDeuda = { ...deuda, diferenciaARestar };

            arrayPagoARestar.push(nuevaDeuda);
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

  if (arrayPagoAEliminar.length > 0) {
    arrayPagoAEliminar.map((pagoAEliminar) => {
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
    });
  }

  if (arrayPagoARestar.length > 0) {
    arrayPagoARestar.map((pagoARestar, indice) => {
      amigosActualizado = amigosActualizado.map((amigo) => {
        if (amigo.amigo === amigoARestar.amigo) {
          let nuevoPago = amigo.pagar.map((pago) => {
            if (
              pago.pagarA === pagoARestar.pagarA &&
              pago.compra === pagoARestar.compra
            ) {
              return {
                pagarA: pagoARestar.pagarA,
                monto: pagoARestar.diferenciaARestar,
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
    });
  }

  return amigosActualizado;
};
