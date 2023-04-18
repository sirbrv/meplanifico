import React, { useState, useEffect } from "react";
import InfoModal from "../componets/Informacion";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../feachures/users/UsersSlice";
import { axiosFetch } from "../hoocks/useAxios";
import axios from "../api/direct";

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "./ab.css";

function Registrer({ tittle, onClose, registro, onConfirm }) {
  const [show, setShow] = useState(false);
  const [errores, setErrores] = useState([]);
  const [sussecAdd, setSussecAdd] = useState(false);
  const [bodymgs, setBodymgs] = useState([]);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = () => {
    setShow(false);
    navigate("/", {});
  };
  const handleShow = () => setShow(true);

  const [inputField, setInputField] = useState({
    id: "",
    IdUsuario: "",
    nombre: "",
    email: "",
    rut: "",
    userPassword: "",
    numTelefono: "",
    rol: "",
    direccion: "",
  });

  const selectData = [
    { value: "user", descrip: "Usuário" },
    { value: "admin", descrip: "Administración" },
  ];

  const [informacionModal, setInformacionModal] = useState({
    isOpen: false,
    title: "",
    body: "",
  });

  const endpoint = "/api/admin/user";

  const validar = async (names) => {
    const errors = [];
    setErrores([]);
    let cantErr = 0;
    if (!names.IdUsuario || names.IdUsuario === "") {
      cantErr = cantErr + 1;
      errors.IdUsuario = "Campo Requerido";
    } else if (names.IdUsuario.length < 2) {
      cantErr = cantErr + 1;
      errors.IdUsuario = "Ingrese 2 caracteres o mas";
    }
    if (!names.nombre || names.nombre === "") {
      cantErr = cantErr + 1;
      errors.nombre = "Campo Requerido";
    } else if (names.nombre.length < 5) {
      cantErr = cantErr + 1;
      errors.nombre = "Ingrese 5 caracteres o mas";
    }
    if (!names.rut || names.rut === "") {
      cantErr = cantErr + 1;
      errors.rut = "Campo Requerido";
    } else if (!/^\d{2}\d{3}\d{3}$/.test(names.rut)) {
      cantErr = cantErr + 1;
      errors.rut = "Número de RUT no válida. Formato (99.999.999) ";
    }
    if (!names.email || names.email === "") {
      cantErr = cantErr + 1;
      errors.email = "Campo Requerido";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(names.email)) {
      cantErr = cantErr + 1;
      errors.email = "La dirección de Correo Electrónico es inválida";
    }

    if (!names.userPassword || names.userPassword === "") {
      cantErr = cantErr + 1;
      errors.userPassword = "Campo Requerido";
    } else if (names.userPassword.length < 7) {
      cantErr = cantErr + 1;
      errors.userPassword = "Ingrese 8 caracteres o mas";
    }

    setErrores(errors);
    return cantErr;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      IdUsuario,
      nombre,
      email,
      rut,
      userPassword,
      numTelefono,
      rol,
      direccion,
    } = e.target.elements;
    setInputField((inputField) => ({
      ...inputField,
      [e.target.name]: e.target.value,
    }));
    setSussecAdd(false);
    let validError = await validar(inputField);
    if (validError > 0) {
      setBodymgs("Debe corregir los campos con errores");
      //    setSussecAdd(true);
    }
    if (validError === 0) {
      let formData = {
        IdUsuario: IdUsuario.value,
        nombre: nombre.value,
        email: email.value,
        rut: rut.value,
        userPassword: userPassword.value,
        numTelefono: numTelefono.value,
        rol: rol.value,
        direccion: direccion.value,
      };

      let newMethod = "POST";
      let newUrl = `${endpoint} `;

      if (registro) {
        newMethod = "PUT";
        newUrl = `${endpoint}/${registro} `;
      }

      axiosFetch({
        axiosInstance: axios,
        method: newMethod,
        url: newUrl,
        requestConfig: {
          data: formData,
        },
      })
        .then((response) => {
          if (response.status === "201" || response.status === "200") {
            setInputField(() => ({
              id: "",
              IdUsuario: "",
              nombre: "",
              email: "",
              rut: "",
              numTelefono: "",
              rol: "",
              direccion: "",
              userPassword: "",
            }));
            dispatch(addUser(formData));
            setSussecAdd(true);
            setBodymgs(response.msg);
            //    onConfirm();
          } else {
            setSussecAdd(true);
            setBodymgs(response.msg);
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
    handleShow();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (sussecAdd) {
      setInformacionModal({
        isOpen: true,
        title: "Resultado de la Ejecución",
        body: bodymgs,
      });
      setSussecAdd(false);
    }
    // eslint-disable-next-line
  }, [sussecAdd]);
  return (
    <>
      <div className="m-5 ">
        <Modal
          show={show}
          onHide={handleClose}
          size="lg"
          dialogClassName=" d-flex justify-content-center "
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h3 className="">Registro de Usuários</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-1">
                <Form.Group as={Col} md="6">
                  <Form.Label>
                    {" "}
                    <strong>Id Usuario</strong>
                  </Form.Label>
                  <Form.Control
                    required
                    placeholder="iD de Identificación"
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
                <Form.Group as={Col} md="6">
                  <Form.Label>
                    {" "}
                    <strong>Documento</strong>
                  </Form.Label>
                  <Form.Control
                    required
                    placeholder="Número de documento."
                    type="text"
                    name="rut"
                    id="rut"
                    onChange={inputsHandler}
                    isInvalid={!!errores.rut}
                    value={inputField.rut}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.rut}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-1">
                <Form.Group as={Col} md="12">
                  <Form.Label>
                    {" "}
                    <strong>Nombre</strong>
                  </Form.Label>
                  <Form.Control
                    required
                    placeholder="Ingrese Nombre y Apellido"
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
                    <strong>Contraseña</strong>
                  </Form.Label>
                  <Form.Control
                    required
                    placeholder="Ingrese la Contraseña"
                    type="password"
                    name="userPassword"
                    id="userPassword"
                    isInvalid={!!errores.userPassword}
                    onChange={inputsHandler}
                    value={inputField.userPassword}
                    autoComplete="off"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.userPassword}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>
                    {" "}
                    <strong>numTelefono</strong>
                  </Form.Label>
                  <Form.Control
                    required
                    placeholder="Número de Telefono"
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
                {/* </Row>

              <Row className="mb-1"> */}
                <Form.Group as={Col} md="6">
                  <Form.Label>
                    {" "}
                    <strong>Rol del Usuario</strong>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    isInvalid={!!errores.rol}
                    defaultValue={inputField.rol}
                    name="rol"
                    onChange={inputsHandler}
                  >
                    {selectData.map((option) =>
                      option.value === inputField.rol ? (
                        <option
                          key={option.value}
                          value={option.value}
                          selected
                        >
                          {option.descrip}
                        </option>
                      ) : (
                        <option key={option.value} value={option.value}>
                          {option.descrip}
                        </option>
                      )
                    )}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errores.rol}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-5" rows={3}>
                <Form.Group as={Col} md="12">
                  <Form.Label>
                    {" "}
                    <strong>Dirección</strong>
                  </Form.Label>
                  <Form.Control
                    required
                    placeholder="Ingrese la Dirección de Habitación"
                    type="texarea"
                    name="direccion"
                    id="direccion"
                    isInvalid={!!errores.direccion}
                    onChange={inputsHandler}
                    value={inputField.direccion}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.direccion}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <hr />
              <Row className="p-2 d-flex justify-content-between">
                <Col className="d-flex justify-content-start">
                  <Button variant="danger" onClick={handleClose}>
                    Cancelar
                  </Button>
                </Col>
                <Col className="d-flex justify-content-end">
                  <Button variant="primary" type="submit">
                    Guardar
                  </Button>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>
      </div>

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
export default Registrer;
