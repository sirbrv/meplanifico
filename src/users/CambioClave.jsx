import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import InfoCard from "../../../componets/Informacion";
import axios from "../../../api/direct";
import { axiosFetch } from "../../../hoocks/useAxios";
import { useNavigate } from "react-router-dom";
import "../../ab.css";

function CambioClave({ tittle, onClose, registro, onConfirm }) {
  const [errores, setErrores] = useState([]);
  const [sussecAdd, setSussecAdd] = useState(false);
  const [bodymgs, setBodymgs] = useState([]);

  let navigate = useNavigate();

  const [inputField, setInputField] = useState({
    id: "",
    IdUsuario: "",
    claveUsuario: "",
    claveNueva: "",
    claveRepetida: "",
  });

  const [informacionCard, setInformacionCard] = useState({
    isOpen: false,
    title: "",
    body: "",
  });

  const endpoint = "/api/admin/user/cambio";

  const validar = async (names) => {
    const errors = [];
    setErrores([]);
    let cantErr = 0;

    if (!names.IdUsuario || names.IdUsuario === "") {
      cantErr = cantErr + 1;
      errors.IdUsuario = "Campo Requerido";
    } else if (names.IdUsuario.length < 5) {
      cantErr = cantErr + 1;
      errors.IdUsuario = "Ingrese 5 caracteres o mas";
    }

    if (!names.claveUsuario || names.claveUsuario === "") {
      cantErr = cantErr + 1;
      errors.claveUsuario = "Campo Requerido";
    } else if (!/^(?=.*\d)(?=.*[a-z])\w{8,}$/.test(names.claveUsuario)) {
      cantErr = cantErr + 1;
      errors.claveUsuario =
        "Debe contener almenos 8 caracteres con 2 números y 2 letras minúsculas.";
    }

    if (!names.claveNueva || names.claveNueva === "") {
      cantErr = cantErr + 1;
      errors.claveNueva = "Campo Requerido";
    } else if (!/^(?=.*\d)(?=.*[a-z])\w{8,}$/.test(names.claveNueva)) {
      cantErr = cantErr + 1;
      errors.claveNueva =
        "Debe contener almenos 8 caracteres con 2 números y 2 letras minúsculas.";
    }

    if (!names.claveRepetida || names.claveRepetida === "") {
      cantErr = cantErr + 1;
      errors.claveRepetida = "Campo Requerido";
    } else if (names.claveNueva !== names.claveRepetida) {
      cantErr = cantErr + 1;
      errors.claveRepetida =
        "La Contraseña Repetida debe ser igual a la Nueva Contraseña..";
    }

    setErrores(errors);
    return cantErr;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { IdUsuario, claveUsuario, claveNueva } = e.target.elements;
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
        IdUsuario: IdUsuario.value,
        claveUsuario: claveUsuario.value,
        claveNueva: claveNueva.value,
      };
      let newMethod = "post";
      let newUrl = `${endpoint} `;

      await axiosFetch({
        axiosInstance: axios,
        method: newMethod,
        url: newUrl,
        requestConfig: {
          data: formData,
        },
      })
        .then((posts) => {
          if (posts.status === "200") {
            //  dispatch(addUser(formData)); */

            if (posts.msg === undefined) {
              setSussecAdd(true);
              setBodymgs(posts.msg);
            } else {
              setSussecAdd(true);
              setBodymgs(posts.msg);
            }
            navigate("/acceso/login", {});
          }
          if (posts.msg === undefined) {
            setSussecAdd(true);
            setBodymgs(posts);
          } else {
            setSussecAdd(true);
            setBodymgs(posts.msg);
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

    // validar(inputField);
  };

  useEffect(() => {
    if (sussecAdd) {
      setInformacionCard({
        isOpen: true,
        title: "Sesión de Ingreso",
        body: bodymgs,
      });
      setSussecAdd(false);
    }
    // eslint-disable-next-line
  }, [sussecAdd]);

  return (
    <div className="userConteiner">
      <Row className="d-flex justify-content-center">
        <Card className="row card-login">
          <Card.Header>
            <Card.Title>
              <h4 className="text-center">Cambio de Clave</h4>
            </Card.Title>
          </Card.Header>
          <Form noValidate onSubmit={handleSubmit}>
            <Card.Body>
              <Row className="mb-1 mt-3">
                <Form.Group>
                  <Form.Label>
                    {" "}
                    <strong>ID Usuario</strong>
                  </Form.Label>
                  <Form.Control
                    required
                    placeholder="Ingrese su Id de Usuario"
                    type="text"
                    name="IdUsuario"
                    id="IdUsuario"
                    onChange={inputsHandler}
                    isInvalid={!!errores.IdUsuario}
                    value={inputField.IdUsuario}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.IdUsuario}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-1">
                <Form.Group>
                  <Form.Label>
                    {" "}
                    <strong>Constraseña Actual</strong>
                  </Form.Label>
                  <Form.Control
                    className="d-flex justify-content-end text-start"
                    required
                    placeholder="Indique su Contraseña"
                    type="password"
                    name="claveUsuario"
                    id="claveUsuario"
                    isInvalid={!!errores.claveUsuario}
                    onChange={inputsHandler}
                    value={inputField.claveUsuario}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.claveUsuario}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-1">
                <Form.Group>
                  <Form.Label>
                    {" "}
                    <strong>Nueva Constraseña</strong>
                  </Form.Label>
                  <Form.Control
                    className="d-flex justify-content-end text-start"
                    required
                    placeholder="Indique su Nueva Contraseña"
                    type="password"
                    name="claveNueva"
                    id="claveNueva"
                    isInvalid={!!errores.claveNueva}
                    onChange={inputsHandler}
                    value={inputField.claveNueva}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.claveNueva}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-1">
                <Form.Group>
                  <Form.Label>
                    {" "}
                    <strong>Repita la Constraseña</strong>
                  </Form.Label>
                  <Form.Control
                    className="d-flex justify-content-end text-start"
                    required
                    placeholder="Repita la Contraseña Nueva"
                    type="password"
                    name="claveRepetida"
                    id="claveRepetida"
                    isInvalid={!!errores.claveRepetida}
                    onChange={inputsHandler}
                    value={inputField.claveRepetida}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.claveRepetida}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <hr />
              <Row className="p-2 d-flex justify-content-between">
                <Col className="d-flex justify-content-start">
                  <Button
                    ///  navigate("../success", { replace: true });
                    variant="danger"
                    onClick={() => navigate("/acceso/login", {})}
                    size="sm"
                  >
                    Cancelar
                  </Button>
                </Col>
                <Col className="d-flex justify-content-end">
                  <Button variant="primary" type="submit" size="sm">
                    Enviar
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Form>
        </Card>
      </Row>

      {informacionCard.isOpen && (
        <InfoCard
          titulo={informacionCard.title}
          descripcion={informacionCard.body}
          onClose={() => {
            setInformacionCard({ isOpen: false, title: "", body: "" });
          }}
        />
      )}
    </div>
  );
}
export default CambioClave;
