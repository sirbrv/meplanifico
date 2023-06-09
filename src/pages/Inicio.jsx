import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import InfoCard from "../componets/Informacion";
//import axios from "../api/direct";
import { useSelector } from "react-redux";
//import { axiosFetch } from "../hoocks/useAxios";
import { useLocation } from "react-router-dom";
import LoginSistema from "./administracion/users/Login";
import registro from "../assets/images/registro.png";
import "../App.css";

function Inicio() {
  const [login, setLogin] = useState(false);
  const user = useSelector((state) => state.users.value);
  const location = useLocation();

  const [informacionCard, setInformacionCard] = useState({
    isOpen: false,
    title: "",
    body: "",
  });

  useEffect(() => {
    if (!user[0]) {
      location.state ? setLogin(true) : setLogin(false);
    } else {
      setLogin(true);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!user[0]) {
      location.state ? setLogin(true) : setLogin(false);
    } else {
      setLogin(true);
    }
    // inicializafuncion();
    // eslint-disable-next-line
  }, [location]);

  return (
    <>
      {!login && (
        <LoginSistema
          onClose={() => {
            setLogin(false);
          }}
          onConfirma={() => {
            setLogin(true);
          }}
        />
      )}

      {login && (
        <>
          <div>
            <Card.Img src={registro} alt="" height={60} className="img-fluid" />
          </div>
        </>
      )}

      {informacionCard.isOpen && (
        <InfoCard
          titulo={informacionCard.title}
          descripcion={informacionCard.body}
          onClose={() => {
            setInformacionCard({ isOpen: false, title: "", body: "" });
          }}
        />
      )}
    </>
  );
}

export default Inicio;
