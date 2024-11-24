"use client"

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { cambiarAmigo, cambiarAmigos } from '../reduxToolkit/slice';

export  const AgregarAmigo = () => {
     const dispatch = useDispatch()
    
    const amigo = useSelector(state => state.valores.amigo)
    const amigos = useSelector((state) => state.valores.amigos);

    console.log(amigo);
        useEffect(()=>{
            dispatch(cambiarAmigos([...amigos, { amigo }]));
             dispatch(cambiarAmigo("")); 
        },[])

    // setAmigos([...amigos, { amigo }]);
    // setAmigo("");
    // let inputAmigos = document.getElementById("amigos");
    // inputAmigos.focus();

    return;
}
