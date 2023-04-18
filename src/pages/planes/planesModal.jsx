import React, { useState, useEffect } from "react";
import InfoModal from "../../componets/Informacion";
import { selectYear, selectMes } from "../../componets/ControlFecha";

import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import axios from "../../api/direct";
import { axiosFetch } from "../../hoocks/useAxios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs"; // ES 2015
import * as RiIcons from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../ab.css";

function PlanesModal({ tittle, onClose, registro, onConfirm }) {
  const [show, setShow] = useState(false);
  const [errores, setErrores] = useState([]);
  const [sussecAdd, setSussecAdd] = useState(false);
  const [calendario, setCalendario] = useState(false);
  const [selecttipoGasto, setSelecttipoGasto] = useState([]);
  const [selectGrupoGasto, setSelectGrupoGasto] = useState([]);
  const [dateValue, setDateValue] = useState(new Date());
  const [bodymgs, setBodymgs] = useState([]);
  const [login, setLogin] = useState(false);
  let navigate = useNavigate();
  const fechaActual = new Date();
  const mesActual = fechaActual.getMonth();
  const yearActual = fechaActual.getFullYear();
  const handleClose = () => [setShow(false), onClose()];
  const handleShow = () => setShow(true);
  const user = useSelector((state) => state.users.value);

  const [inputField, setInputField] = useState({
    fechaPlanes: "",
    id: "",
    year: "",
    mes: "",
    tipoGasto: "",
    tipoGastoDescrip: "",
    grupoGasto: "",
    grupoGastoDescrip: "",
    planDescripcion: "",
    monto: 0,
  });

  const [informacionModal, setInformacionModal] = useState({
    isOpen: false,
    title: "",
    body: "",
  });

  const endpoint = "/api/gestion/plan";

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
    const {
      fechaPlanes,
      year,
      mes,
      tipoGasto,
      grupoGasto,
      planDescripcion,
      monto,
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
      let descripTipo = "";
      let descripGrupo = "";
      selecttipoGasto.map((option) => {
        if (option.id === parseInt(tipoGasto.value)) {
          descripTipo = option.descripcion;
        }
      });
      selectGrupoGasto.map((option) => {
        if (option.id === parseInt(grupoGasto.value)) {
          descripGrupo = option.descripcion;
        }
      });
      let formData = {
        email: user[0].email,
        fechalanes: fechaPlanes.value,
        year: year.value,
        mes: mes.value,
        tipoGasto: tipoGasto.value,
        tipoGastoDescrip: descripTipo,
        grupoGasto: grupoGasto.value,
        grupoGastoDescrip: descripGrupo,
        descripcion: planDescripcion.value,
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
              fechaPlanes: "",
              year: 0,
              mes: "",
              tipoGasto: "",
              tipoGastoDescrip: "",
              grupoGasto: "",
              grupoGastoDescrip: "",
              planDescripcion: "",
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

  const tipoGasto = async () => {
    const endpoint = "/api/admin/tipoGasto";
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
        setSelecttipoGasto(response.data.tipoGastos);
      }
    });
  };

  const grupoGastos = async () => {
    const endpoint = "/api/admin/grupoGasto";
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
        setSelectGrupoGasto(response.data.grupoGastos);
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
    inputField.fechaPlanes = new Date();
    inputField.mes = mesActual + 1;
    inputField.year = yearActual;
    tipoGasto();
    grupoGastos();
  };

  const cambioFecha = () => {
    setCalendario(true);
  };

  const setFecha = (value) => {
    inputField.fechaPlanes = value;
    setCalendario(false);
  };

  const getPlanes = async (reg) => {
    const newUrl = `${endpoint}/${reg} `;
    await axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: newUrl,
      requestConfig: {},
    }).then((posts) => {
      if (posts.status === "200" && "304") {
        setInputField({
          fechaPlanes: posts.data.fechaPlanes,
          id: posts.data.id,
          year: posts.data.year,
          mes: posts.data.mes,
          tipoGasto: posts.data.tipoGasto,
          tipoGastoDescrip: posts.data.tipoGastoDescrip,
          grupoGasto: posts.data.grupoGasto,
          grupoGastoDescrip: posts.data.grupoGastoDescrip,
          planDescripcion: posts.data.descripcion,
          monto: posts.data.monto,
        });
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
        getPlanes(registro);
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
      }
    }
    // eslint-disable-next-line
  }, [sussecAdd]);
  return (
    <>
      {!login && (
        <InfoModal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          titulo={"Control de Acceso"}
          descripcion={
            "Para tener acceso a las opciones del Sistema, debes iniciar sesión.."
          }
          onClose={() => {
            acceesoControl();
          }}
        />
      )}

      {login && (
        <div className=" shadow fsize">
          <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
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
                      <strong>Fecha</strong>
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        required
                        type="text"
                        name="fechaPlanes"
                        id="fechaPlanes"
                        //               onChange={(value) => setFecha(value)}
                        defaultValue={formatDate(inputField.fechaPlanes)}
                        //    disabled
                      />{" "}
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={cambioFecha}
                      >
                        <RiIcons.FiCalendar />
                      </Button>
                    </InputGroup>
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group as={Col} xs="6">
                    <Form.Label>
                      {" "}
                      <strong>Año</strong>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      isInvalid={!!errores.year}
                      name="year"
                      value={inputField.year}
                      onChange={inputsHandler}
                    >
                      {selectYear.map((option) =>
                        option.year === yearActual ? (
                          <option key={option.id} defaultValue={option.year}>
                            {option.year}
                          </option>
                        ) : (
                          <option key={option.id} defaultValue={option.year}>
                            {option.year}
                          </option>
                        )
                      )}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} xs="6">
                    <Form.Label>
                      {" "}
                      <strong>Mes</strong>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      isInvalid={!!errores.mes}
                      name="mes"
                      value={inputField.mes}
                      onChange={inputsHandler}
                    >
                      {selectMes.map((option) =>
                        option.id === parseInt(inputField.mes) ? (
                          <option key={option.id} value={option.id}>
                            {option.mes}
                          </option>
                        ) : (
                          <option key={option.id} value={option.id}>
                            {option.mes}
                          </option>
                        )
                      )}
                    </Form.Control>
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group as={Col} md="6">
                    <Form.Label>
                      {" "}
                      <strong>Tipo de Gasto</strong>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="tipoGasto"
                      value={inputField.tipoGasto}
                      onChange={inputsHandler}
                    >
                      <option key={0} value={0}></option>
                      {selecttipoGasto.map((option) =>
                        option.id === parseInt(inputField.tipoGasto) ? (
                          <option key={option.id} value={option.id}>
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
                      {errores.tipoGasto}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <Form.Label>
                      {" "}
                      <strong>Grupo de Gasto</strong>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="grupoGasto"
                      value={inputField.grupoGasto}
                      onChange={inputsHandler}
                    >
                      <option key={0} value={0}></option>
                      {selectGrupoGasto.map((option) =>
                        option.id === parseInt(inputField.grupoGasto) ? (
                          <option key={option.id} value={option.id}>
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
                      {errores.grupoGasto}
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
                      placeholder="Indique Descripción "
                      name="planDescripcion"
                      as="textarea"
                      rows={3}
                      id="planDescripcion"
                      onChange={inputsHandler}
                      value={inputField.planDescripcion}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errores.planDescripcion}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-1">
                  <Form.Group as={Col} md="6">
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
        />
      )}
    </>
  );
}

export default PlanesModal;
