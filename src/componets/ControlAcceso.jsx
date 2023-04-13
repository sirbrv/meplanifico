import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//  ***** Call to Redux ****************** //
import { useSelector } from "react-redux";

//  ***** Call to Aplication ****************** //
import InfoModal from "./Informacion";
import "../App.css";

function ControlAcceso() {
  const user = useSelector((state) => state.users.value);
  const [login, setLogin] = useState(false);
  let navigate = useNavigate();

  //*************  Funciones  de paginación *********** */
  const acceesoControl = () => {
    navigate("/", { state: "", user: user });
  };

  useEffect(() => {
    if (!user[0]) {
      setLogin(false);
    } else {
      setLogin(true);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {!login && (
        <InfoModal
          titulo={"Control de Acceso"}
          descripcion={
            "Para tener acceso a las opciones del Sistema, debes iniciar sesión.."
          }
          onClose={() => {
            acceesoControl();
          }}
        />
      )}
    </>
  );
}

export default ControlAcceso;
