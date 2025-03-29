"use client";

import { checkbox, label } from "../../style/style.module.scss";
import { cambiarElegidos } from "@/app/reduxToolkit/slice";
import { useDispatch, useSelector } from "react-redux";

export const AmigosParaRepartir = () => {
  const dispatch = useDispatch();
  let { amigos } = useSelector((state) => state.valores);
  let { elegidos } = useSelector((state) => state.valores);

  const checkboxEvent = (e) => {
    dispatch(
      cambiarElegidos({ ...elegidos, [e.target.name]: e.target.checked })
    );
  };

  return (
    <div>
      {amigos.map((amigo, i) => {
        return (
          <div key={i}>
            <label className={label} htmlFor={amigo.amigo}>
              {amigo.amigo}
            </label>
            {elegidos[amigo.amigo] ? (
              <input
                className={checkbox}
                onChange={(e) => checkboxEvent(e)}
                type="checkbox"
                name={amigo.amigo}
                key={i}
                id={amigo.amigo}
                checked
              />
            ) : (
              <input
                className={checkbox}
                onChange={(e) => checkboxEvent(e)}
                type="checkbox"
                name={amigo.amigo}
                key={i}
                id={amigo.amigo}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
