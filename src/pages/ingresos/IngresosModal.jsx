import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs"; // ES 2015
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import InfoModal from "../../componets/Informacion";
import axios from "../../api/direct";
import { axiosFetch } from "../../hoocks/useAxios";
import * as RiIcons from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../ab.css";

function IngresoModal({ tittle, onClose, registro, onConfirm }) {
  const [show, setShow] = useState(false);
  const [errores, setErrores] = useState([]);
  const [sussecAdd, setSussecAdd] = useState(false);
  const [calendario, setCalendario] = useState(false);
  const [selectTipoIngreso, setSelectTipoIngreso] = useState([]);
  const [selectCondicion, setSelectCondicion] = useState([]);
  const [dateValue, setDateValue] = useState(new Date());
  const [posts, setPosts] = useState([]);
  const [bodymgs, setBodymgs] = useState([]);
  const [login, setLogin] = useState(false);
  let navigate = useNavigate();

  const handleClose = () => [setShow(false), onClose()];

  const handleShow = () => setShow(true);
  const user = useSelector((state) => state.users.value);

  const [inputField, setInputField] = useState({
    id: "",
    fechaIngreso: "",
    descripcion: "",
    tipoIngreso: "",
    tipoIngresoDescrip: "",
    condicion: "",
    condicionDescrip: "",
    monto: 0,
  });

  const [informacionModal, setInformacionModal] = useState({
    isOpen: false,
    title: "",
    body: "",
  });

  const endpoint = "/api/gestion/ingreso";
  const validar = async (names) => {
    const errors = [];
    setErrores([]);
    let cantErr = 0;
    if (!names.monto || !isNaN(names.monyo)) {
      cantErr = cantErr + 1;
      errors.monto = "Campo Requerido";
    }
    setErrores(errors);
    return cantErr;
  };

  const formatDate = (date) => {
    return dayjs(date).format("DD/MM/YYYY");
  };

  const acceesoControl = () => {
    navigate("/", { state: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fechaIngreso, descripcion, tipoIngreso, condicion, monto } =
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
      let descripTipo = "";
      selectTipoIngreso.map((option) => {
        if (option.id === tipoIngreso.value) {
          descripTipo = option.descripcion;
        }
      });
      let descripCond = "";
      selectCondicion.map((option) => {
        if (option.id === condicion.value) {
          descripCond = option.descripcion;
        }
      });
      let formData = {
        email: user[0].email,
        fechaIngreso: fechaIngreso.value,
        descripcion: descripcion.value,
        tipoIngreso: tipoIngreso.value,
        tipoIngresoDescrip: descripTipo,
        condicion: condicion.value,
        condicionDescrip: descripCond,
        monto: monto.value,
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
            //  dispatch(addUser(formData));
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
              fechaIngreso: "",
              descripcion: "",
              tipoIngreso: "",
              condicion: "",
              monto: 0,
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

  const getIngraso = async () => {
    const endpoint = "/api/admin/tipoIngreso";
    const options = {
      limit: 1000,
      offset: 0,
      page: 1,
      sch: "",
      email: user[0].email,
    };
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: endpoint,
      requestConfig: {
        params: options,
      },
    }).then((response) => {
      if (response.status === "200") {
        setSelectTipoIngreso(response.data.tipoIngresos);
      }
    });
  };

  const getCondicion = async () => {
    const endpoint = "/api/admin/condicion";
    const options = {
      limit: 1000,
      offset: 0,
      page: 1,
      sch: "",
      tipo: "ingresos",
      email: user[0].email,
    };
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: endpoint,
      requestConfig: {
        params: options,
      },
    }).then((response) => {
      if (response.status === "200") {
        setSelectCondicion(response.data.condiciones);
      }
    });
  };

  const inputsHandler = (e) => {
    setInputField((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    validar(inputField);
  };

  const initializeConnect = () => {
    inputField.fechaIngreso = new Date();
    getIngraso();
    getCondicion();
  };

  const cambioFecha = () => {
    setCalendario(true);
  };

  const setFecha = (value) => {
    inputField.fechaIngreso = value;
    setCalendario(false);
  };

  const getIngreso = async (reg) => {
    const newUrl = `${endpoint}/${reg} `;
    await axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: newUrl,
      requestConfig: {},
    }).then((posts) => {
      if (posts.status === "200" && "304") {
        setInputField(posts.data);
      } else {
        setSussecAdd(true);
        setBodymgs(posts.msg);
      }
    });
  };

  useEffect(() => {
    if (!user[0]) {
      setLogin(false);
    } else {
      if (registro) {
        getIngreso(registro);
      }
      initializeConnect();
      handleShow();
      setLogin(true);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (login) {
      if (sussecAdd) {
        setInformacionModal({
          isOpen: true,
          title: "Resultado de la Ejecución",
          body: bodymgs,
        });
        setSussecAdd(false);
        setPosts("");
      }
      setPosts("");
    }
    // eslint-disable-next-line
  }, [sussecAdd]);
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
          aria-labelledby="contained-modal-title-vcenter"
          centered
        />
      )}

      {login && (
        <div className=" shadow fsize">
          <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
              <Modal.Title>
                <h3 className="fsize">{tittle}</h3>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-1">
                  <Form.Group as={Col} md="4">
                    <Form.Label>
                      {" "}
                      <strong>Fecha Factura</strong>
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        required
                        type="text"
                        name="fechaIngreso"
                        id="fechaIngreso"
                        onChange={(value) => setFecha(value)}
                        value={formatDate(inputField.fechaIngreso)}
                      />{" "}
                      <Form.Control.Feedback type="invalid">
                        {errores.fechaIngreso}
                      </Form.Control.Feedback>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={cambioFecha}
                      >
                        <RiIcons.FiCalendar />
                      </Button>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} md="8">
                    <Form.Label>
                      {" "}
                      <strong>Tipo de Ingreso</strong>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="tipoIngreso"
                      defaultValue={inputField.tipoIngreso}
                      onChange={inputsHandler}
                    >
                      {selectTipoIngreso.map((option) =>
                        option.id === parseInt(inputField.tipoIngreso) ? (
                          <option key={option.id} value={option.id} selected>
                            {option.descripcion}
                          </option>
                        ) : (
                          <option key={option.id} value={option.id}>
                            {option.descripcion}
                          </option>
                        )
                      )}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errores.tipoIngreso}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3" rows={2}>
                  <Form.Group as={Col} md="12">
                    <Form.Label>
                      {" "}
                      <strong>Descripción</strong>
                    </Form.Label>
                    <Form.Control
                      required
                      placeholder="Indique la Descripción del Ingreso"
                      name="descripcion"
                      as="textarea"
                      rows={3}
                      id="descripcion"
                      onChange={inputsHandler}
                      value={inputField.descripcion}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errores.descripcion}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-1">
                  <Form.Group as={Col} md="8">
                    <Form.Label>
                      {" "}
                      <strong>Condición del Ingreso</strong>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      isInvalid={!!errores.condicion}
                      name="condicion"
                      defaultValue={inputField.condicion}
                      onChange={inputsHandler}
                    >
                      {selectCondicion.map((option) =>
                        option.id === parseInt(inputField.condicion) ? (
                          <option key={option.id} value={option.id} selected>
                            {option.descripcion}
                          </option>
                        ) : (
                          <option key={option.id} value={option.id}>
                            {option.descripcion}
                          </option>
                        )
                      )}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errores.condicion}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="4">
                    <Form.Label>
                      {" "}
                      <strong>Importe o Monto</strong>
                    </Form.Label>
                    <Form.Control
                      className="d-flex justify-content-end text-end"
                      required
                      placeholder="Indique el valor del servicio"
                      type="text"
                      name="monto"
                      id="monto"
                      isInvalid={!!errores.monto}
                      onChange={inputsHandler}
                      value={inputField.monto}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errores.monto}
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
      )}
      {calendario && (
        <div className="m-5 shadow fsize d-flex align-items-center fullscreen-modal">
          <Modal
            show={show}
            onHide={setCalendario}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <h3 className="fsize"></h3>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Calendar
                //  minDate={new Date()}
                //     selectRange={true}
                onChange={(value) => setFecha(value)}
                value={dateValue}
              />
            </Modal.Body>
          </Modal>
        </div>
      )}
      {informacionModal.isOpen && (
        <InfoModal
          titulo={informacionModal.title}
          descripcion={informacionModal.body}
          onClose={() => {
            setInformacionModal({ isOpen: false, title: "", body: "" });
          }}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        />
      )}
    </>
  );
}

export default IngresoModal;
