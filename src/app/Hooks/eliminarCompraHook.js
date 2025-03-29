export default function eliminarCompraHook(selectorAmigos, compras, compra) {
  let comprasHook = compras;
  let compraAEliminar = compra.split(",");
  let amigos = selectorAmigos.map((e) => {
    return { ...e };
  });

  console.log(selectorAmigos, "amigos en eliminar compra");
  console.log(compras, "compras en eliminar compras");
  console.log(compra, "compra en eliminar compras");

  const arrayFilter = (array) => {
    return array.filter(
      (compra, i) =>
        compra.compra !== compraAEliminar[0] ||
        compra.precio !== compraAEliminar[1] ||
        compra.amigo !== compraAEliminar[2]
    );
  };

  comprasHook = arrayFilter(comprasHook);

  amigos.map((e, i) => {
    if (e.amigo === compraAEliminar[2]) {
      if (e.compra.length > 1) {
        let compraFiltrada = arrayFilter(e.compra);
        amigos[i]["compra"] = compraFiltrada;
        amigos = [...amigos];
      } else amigos[i] = { amigo: e.amigo, pagar: e.pagar };
    }
  });

  return { comprasHook: comprasHook, amigos: amigos };
}
