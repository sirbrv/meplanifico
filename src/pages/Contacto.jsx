import React, { useState, useEffect } from "react";
import { axiosFetch } from "../hoocks/useAxios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "../api/direct";
import InfoModal from "./../componets/Informacion";
import ChartMap from "./../componets/ChartMap";
import registro from "../assets/images/registro.png";

function Contacto() {
  const [show, setShow] = useState(false);
  const [errores, setErrores] = useState([]);
  const [sussecAdd, setSussecAdd] = useState(false);
  const [bodymgs, setBodymgs] = useState([]);

  const [inputField, setInputField] = useState({
    id: "",
    apellido: "",
    nombre: "",
    email: "",
    comentario: "",
    numTelefono: "",
  });

  const [informacionModal, setInformacionModal] = useState({
    isOpen: false,
    title: "",
    body: "",
  });

  const endpoint = "/api/admin/contact";

  const validar = async (names) => {
    const errors = [];
    setErrores([]);
    let cantErr = 0;
    if (!names.apellido || names.apellido === "") {
      cantErr = cantErr + 1;
      errors.apellido = "Campo Requerído";
    } else if (names.apellido.length < 5) {
      cantErr = cantErr + 1;
      errors.apellido = "Ingrese 5 caractéres o más";
    }
    if (!names.nombre || names.nombre === "") {
      cantErr = cantErr + 1;
      errors.nombre = "Campo Requerído";
    } else if (names.nombre.length < 5) {
      cantErr = cantErr + 1;
      errors.nombre = "Ingrese 5 caractéres o más";
    }
    if (!names.email || names.email === "") {
      cantErr = cantErr + 1;
      errors.email = "Campo Requerído";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(names.email)) {
      cantErr = cantErr + 1;
      errors.email = "La dirección de Correo Electrónico es inválida";
    }

    if (!names.numTelefono || names.numTelefono === "") {
      cantErr = cantErr + 1;
      errors.numTelefono = "Campo Requerído";
    } else if (names.numTelefono.length < 10) {
      cantErr = cantErr + 1;
      errors.numTelefono =
        "Número de teléfono no válido. Formato (999.999.999) ";
    }
    setErrores(errors);
    return cantErr;
  };

  const handleSubmit = async (e) => {
    console.log("Pasé por aqui...");
    e.preventDefault();
    const { apellido, nombre, email, comentario, numTelefono } =
      e.target.elements;
    setInputField((inputField) => ({
      ...inputField,
      [e.target.name]: e.target.value,
    }));
    setSussecAdd(false);
    let validError = await validar(inputField);
    if (validError > 0) {
      setBodymgs("Debe corregir los campos con errores");
      setSussecAdd(true);
    }

    if (validError === 0) {
      let formData = {
        apellido: apellido.value,
        nombre: nombre.value,
        email: email.value,
        numTelefono: numTelefono.value,
        comentario: comentario.value,
      };
      let newMethod = "POST";
      let newUrl = `${endpoint} `;
      console.log("Pasé por envio...", axios, newUrl, formData);

      await axiosFetch({
        axiosInstance: axios,
        method: newMethod,
        url: newUrl,
        requestConfig: {
          data: formData,
        },
      })
        .then((posts) => {
          console.log(posts);
          if (posts.status === "200") {
            if (posts.msg === undefined) {
              setSussecAdd(true);
              setBodymgs(posts.msg);
            } else {
              setSussecAdd(true);
              setBodymgs(posts.msg);
            }
          }
          if (posts.status === "201") {
            setInputField(() => ({
              id: "",
              apellido: "",
              nombre: "",
              email: "",
              comentario: "",
              numTelefono: "",
            }));
            setBodymgs(posts.msg);
            setSussecAdd(true);
            setShow(true);
          }
          if (posts.msg === undefined) {
            setSussecAdd(true);
            setBodymgs(posts.msg);
          } else {
            setBodymgs(posts.msg);
            setSussecAdd(true);
          }
        })
        .catch((err) => {
          setSussecAdd(true);
          setBodymgs(err);
        });
    }
  };

  const inputsHandler = (e) => {
    setInputField((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    validar(inputField);
  };

  useEffect(() => {
    if (sussecAdd) {
      if (show) {
        setShow(false);
        setInformacionModal({
          title: "Resultado de la Ejecución",
          isOpen: true,
          body: "Su comentário, fué ingresado de forma exitosa al sistema. La Revisaremos y le daremos pronta respuestas..",
        });
      } else {
        setInformacionModal({
          title: "Resultado de la Ejecución",
          isOpen: true,
          body: bodymgs,
        });
      }
      setSussecAdd(false);
    }
    // eslint-disable-next-line
  }, [sussecAdd]);

  return (
    <>
      <div className="siteMarco">
        <Row className="mb-5">
          <Form.Group as={Col} md="6">
            <h3>Contactenos</h3>
            <h1>Envianos un correo</h1>
            <p>
              Si requieres una aplicación como esta, para resulver alguna de tus
              necesidades, escríbenos un mensaje y a la brevedad nos pondremos
              en contacto..
            </p>
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-1">
                <Form.Group as={Col} md="6">
                  <Form.Label>
                    {" "}
                    <strong>Nombres</strong>
                  </Form.Label>
                  <Form.Control
                    required
                    placeholder="*Nombres"
                    type="text"
                    name="nombre"
                    id="nombre"
                    isInvalid={!!errores.nombre}
                    onChange={inputsHandler}
                    value={inputField.nombre}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.nombre}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>
                    {" "}
                    <strong>Apellidos</strong>
                  </Form.Label>
                  <Form.Control
                    required
                    placeholder="*Apellidos"
                    type="text"
                    name="apellido"
                    id="apellido"
                    onChange={inputsHandler}
                    isInvalid={!!errores.apellido}
                    value={inputField.apellido}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.apellido}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-1">
                <Form.Group as={Col} md="12">
                  <Form.Label>
                    {" "}
                    <strong>Correo Electrónico</strong>
                  </Form.Label>
                  <Form.Control
                    required
                    placeholder="Ingrese Correo Electrónico (correo@correo.com)"
                    type="email"
                    name="email"
                    id="email"
                    isInvalid={!!errores.email}
                    onChange={inputsHandler}
                    value={inputField.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-1">
                <Form.Group as={Col} md="6">
                  <Form.Label>
                    {" "}
                    <strong>Teléfono</strong>
                  </Form.Label>
                  <Form.Control
                    required
                    placeholder="Núm. Teléfono"
                    type="text"
                    name="numTelefono"
                    id="numTelefono"
                    isInvalid={!!errores.numTelefono}
                    onChange={inputsHandler}
                    value={inputField.numTelefono}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.numTelefono}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3" rows={4}>
                <Form.Group as={Col} md="12">
                  <Form.Label>
                    {" "}
                    <strong>Comentarios</strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="comentario"
                    id="comentario"
                    isInvalid={!!errores.comentario}
                    onChange={inputsHandler}
                    //    checked={inputField.terminos}
                    value={inputField.comentario}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.comentario}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <hr />
              <Row className="p-2 d-flex justify-content-between">
                <Button variant="primary" type="submit">
                  Contactanos
                </Button>
              </Row>
            </Form>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <div className="bg-image hover-overlay m-5 mx-auto img-fluid w-100">
              <img src={registro} alt="" height={60} className="img-fluid" />
              <a href="#!">
                <div
                  className="mask overlay"
                  style={{ backgroundColor: "rgba(57, 192, 237, 0.2)" }}
                ></div>
              </a>
            </div>
          </Form.Group>
        </Row>
      </div>
      <Row>
        <Form.Group as={Col} md="12">
          <ChartMap />
        </Form.Group>
      </Row>

      {informacionModal.isOpen && (
        <InfoModal
          titulo={informacionModal.title}
          descripcion={informacionModal.body}
          onClose={() => {
            setInformacionModal({ isOpen: false, title: "", body: "" });
          }}
        />
      )}
    </>
  );
}

export default Contacto;
