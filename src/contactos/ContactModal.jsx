import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InfoModal from "../../../componets/Informacion";
import axios from "../../../api/direct";
import { axiosFetch } from "../../../hoocks/useAxios";
import "../../ab.css";

function ContactoModal({ tittle, onClose, registro, onConfirm }) {
  const [show, setShow] = useState(false);
  const [errores, setErrores] = useState([]);
  const [sussecAdd, setSussecAdd] = useState(false);
  const [bodymgs, setBodymgs] = useState([]);

  const handleClose = () => [setShow(false), onClose()];

  const handleShow = () => setShow(true);

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
      errors.numTelefono = "Número de teléfono no válido. Formato (999.999.999) ";
    }

    /*    if (Object.keys(errors).length > 0) {
        setValidated(true);
    }
    // setCantErr(Object.keys(errors).length)
*/
    setErrores(errors);
    return cantErr;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      apellido,
      nombre,
      email,
      comentario,
      numTelefono,
    } = e.target.elements;
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

      if (registro) {
        newMethod = "PUT";
        newUrl = `${endpoint}/${registro} `;
      }
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
            onConfirm();
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
            //  dispatch(addUser(formData)); */
            setSussecAdd(true);
            setBodymgs(posts.msg);
            onConfirm();
          }

          if (posts.msg === undefined) {
            setSussecAdd(true);
            setBodymgs(posts.msg);
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

    validar(inputField);
  };

  const getContacto = async (reg) => {
    const newUrl = `${endpoint}/${reg} `;
    await axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: newUrl,
      requestConfig: {},
    }).then((posts) => {
      if (posts.status === "200" && "304") {
         setInputField(() => ({
          id: posts.data.id,
          apellido: posts.data.apellido,
          nombre: posts.data.nombre,
          email: posts.data.email,
          numTelefono: posts.data.numTelefono,
          comentario: posts.data.comentario,
        }));
      } else {
        setSussecAdd(true);
        setBodymgs(posts.msg);
      }
    });
  };

  useEffect(() => {
    if (registro) {
      getContacto(registro);
    }
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
      <div className="m-5 shadow fsize">
        <Modal show={show} onHide={handleClose} size="md">
          <Modal.Header closeButton>
            <Modal.Title>
              <h3 className="fsize">{tittle}</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                    <strong>Comentario</strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="comentario"
                    id="comentario"
                    isInvalid={!!errores.comentario}
                    onChange={inputsHandler}
                    value={inputField.comentario}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.comentario}
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
export default ContactoModal;
