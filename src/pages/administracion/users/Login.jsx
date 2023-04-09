import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import InfoCard from "../../../componets/Informacion";
import { useDispatch } from "react-redux";
//import { addLogin } from "../../../feachures/LoginSlice";
import axios from "../../../api/direct";
import { axiosFetch } from "../../../hoocks/useAxios";
import "../../ab.css";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../../../feachures/users/UsersSlice";

function LoginSistema({ onClose, onConfirma }) {
  const [show, setShow] = useState(false);
  const [errores, setErrores] = useState([]);
  const [sussecAdd, setSussecAdd] = useState(false);
  const [bodymgs, setBodymgs] = useState([]);
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const handleShow = () => setShow(true);
  const [inputField, setInputField] = useState({
    id: "",
    IdUsuario: "",
    claveUsuario: "",
  });

  const [informacionCard, setInformacionCard] = useState({
    isOpen: false,
    title: "",
    body: "",
  });

  const endpoint = "/api/admin/user/login";

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
    setErrores(errors);
    return cantErr;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { IdUsuario, claveUsuario } = e.target.elements;
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
      };
      let newMethod = "POST";
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
            if (posts.msg === undefined) {
              setSussecAdd(false);
              setBodymgs(posts.msg);
            } else {
              setBodymgs(posts.msg);
            }
            setSussecAdd(false);
            dispatch(addUser(posts.data));
            //  dispatch(addLogin(posts.data));
            ///onConfirma(posts.data);

            navigate("/", { state: posts.data });
          } else {
            if (posts.msg) {
              setSussecAdd(true);
              setBodymgs(posts.msg);
            } else {
              setSussecAdd(true);
              setBodymgs(posts);
            }
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
    handleShow();
    // eslint-disable-next-line
  }, [sussecAdd]);

  return (
    <div className="userConteiner">
      {show && (
        <Row className="d-flex justify-content-center">
          <Card className="row card-login">
            <Card.Header>
              <Card.Title>
                <h4 className="text-center">Inicio de Sesión</h4>
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

                <Row className="mb-5">
                  <Form.Group>
                    <Form.Label>
                      {" "}
                      <strong>Constraseña</strong>
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
                <hr />
                <Row className="p-2 d-flex justify-content-between">
                  <Col className="d-flex justify-content-start">
                    <Row>
                      <Button
                        variant="danger"
                        onClick={() => navigate("/acceso/cambioClave", {})}
                        size="sm"
                      >
                        Cancelar
                      </Button>
                    </Row>
                  </Col>
                  <Col className="d-flex justify-content-end">
                    <Button variant="primary" type="submit" size="sm">
                      Enviar
                    </Button>
                  </Col>
                </Row>
                <Row className="p-0 sizeCambio">
                  <Col sx="8">
                    <Link to="/acceso/cambioClave">Cambiar Clave</Link>
                  </Col>
                  <Col sx="4">
                    <Link to="/admin/users">Registrarse</Link>
                  </Col>
                </Row>
              </Card.Body>
            </Form>
          </Card>
        </Row>
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
    </div>
  );
}
export default LoginSistema;
