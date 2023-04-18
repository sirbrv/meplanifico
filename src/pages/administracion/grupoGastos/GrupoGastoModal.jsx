import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InfoModal from "../../../componets/Informacion";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../api/direct";
import { axiosFetch } from "../../../hoocks/useAxios";
import "../../ab.css";
function GrupoGastoModal({
  tittle,
  onClose,
  registro,
  onConfirm,
  dataSelect,
  help,
}) {
  const [show, setShow] = useState(false);
  const [errores, setErrores] = useState([]);
  const [sussecAdd, setSussecAdd] = useState(false);
  const [posts, setPosts] = useState([]);
  const [bodymgs, setBodymgs] = useState([]);

  // const dispatch = useDispatch();

  const handleClose = () => [setShow(false), onClose()];

  const handleShow = () => setShow(true);

  const user = useSelector((state) => state.users.value);

  const [inputField, setInputField] = useState({
    id: "",
    email: user[0].email,
    descripcion: "",
  });

  const [informacionModal, setInformacionModal] = useState({
    isOpen: false,
    title: "",
    body: "",
  });

  const endpoint = "/api/admin/grupoGasto";

  const validar = async (names) => {
    const errors = [];
    setErrores([]);
    let cantErr = 0;

    if (!names.descripcion || names.descripcion === "") {
      cantErr = cantErr + 1;
      errors.descripcion = "Campo Requerído";
    } else if (names.descripcion.length < 2) {
      cantErr = cantErr + 1;
      errors.descripcion = "Ingrese 5 caractéres o más";
    }

    setErrores(errors);
    return cantErr;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { descripcion } = e.target.elements;
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
        email: user[0].email,
        descripcion: descripcion.value,
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
              email: user[0].email,
              descripcion: "",
            }));
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

  const getGrupoGasto = async (reg) => {
    const newUrl = `${endpoint}/${reg} `;
    await axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: newUrl,
      requestConfig: {},
    }).then((posts) => {
      if (posts.status === "200" || "304") {
        setInputField(() => ({
          id: posts.data.id,
          email: posts.data.email,
          descripcion: posts.data.descripcion,
        }));
      } else {
        setSussecAdd(true);
        setBodymgs(posts.msg);
      }
    });
  };

  useEffect(() => {
    if (registro) {
      getGrupoGasto(registro);
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
      setPosts("");
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
              {/* <Row className="mb-1">
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
              </Row> */}

              <Row className="mb-3" rows={2}>
                <Form.Group as={Col} md="12">
                  <Form.Label>
                    {" "}
                    <strong>Descripción</strong>
                  </Form.Label>
                  <Form.Control
                    required
                    placeholder="Ingrese la Descripción"
                    type="text"
                    name="descripcion"
                    id="descripcion"
                    isInvalid={!!errores.descripcion}
                    onChange={inputsHandler}
                    value={inputField.descripcion}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.descripcion}
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
export default GrupoGastoModal;
