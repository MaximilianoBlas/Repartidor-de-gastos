export default function agregarCompraHook(
  selectorAmigos,
  compras,
  restaurante,
  compra
) {
  let comprasHook = compras;

  let amigos = selectorAmigos.map((e) => {
    return { ...e };
  });

  amigos.map((e, i) => {
    if (e.amigo === compra.amigo) {
      if (amigos[i]["compra"]) {
        amigos[i]["compra"] = [...amigos[i]["compra"], { ...compra }];
        amigos = [...amigos];
      } else {
        amigos[i]["compra"] = [{ ...compra }];
        amigos = [...amigos];
      }
    }
  });
  if (restaurante) {
    let nuevaCompra = compra;
    nuevaCompra.amigo = "restaurante";
    comprasHook = [...compras, nuevaCompra];
  } else {
    comprasHook = [...compras, compra];
  }

  return { comprasHook: comprasHook, amigos: amigos };
}
