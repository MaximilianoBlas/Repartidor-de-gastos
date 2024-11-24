"use client"

export const agregarCompra = (amigos,setAmigos,  compra, setCompra) => {
    amigos.map((e, i) => {
        if (e.amigo === compra.amigo) {
            if (amigos[i]["compra"]) {
                amigos[i]["compra"].push({ ...compra });
                return setAmigos([...amigos]);
            } else {
                amigos[i]["compra"] = [{ ...compra }];
                return setAmigos([...amigos]);
            }
        }
    });
    setCompra({compra: "",precio:"",amigo:""})
    let inputCompra = document.getElementById("compra");
    inputCompra.focus();

    return 
};
