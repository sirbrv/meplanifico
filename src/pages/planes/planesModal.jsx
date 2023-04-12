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

function PlanesModal({ tittle, onClose, registro, onConfirm }) {
  const [show, setShow] = useState(false);
  const [errores, setErrores] = useState([]);
  const [sussecAdd, setSussecAdd] = useState(false);
  const [calendario, setCalendario] = useState(false);
  const [selecttipoGasto, setSelecttipoGasto] = useState([]);
  const [dateValue, setDateValue] = useState(new Date());
  const [posts, setPosts] = useState([]);
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
    const { fechaPlanes, year, mes, tipoGasto, monto } = e.target.elements;
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
      selecttipoGasto.map((option) => {
        if (option.id === parseInt(tipoGasto.value)) {
          descripTipo = option.descripcion;
        }
      });
      let formData = {
        email: user[0].email,
        fechalanes: fechaPlanes.value,
        year: year.value,
        mes: mes.value,
        tipoGasto: tipoGasto.value,
        tipoGastoDescrip: descripTipo,
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
              year: "",
              mes: "",
              tipoGasto: "",
              tipoGastoDescrip: "",
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

                  <Form.Group as={Col} md="8">
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
                      {selecttipoGasto.map((option) =>
                        option.id === parseInt(inputField.tipoGasto) ? (
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
                      {errores.tipoGasto}
                    </Form.Control.Feedback>
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
                          <option
                            key={option.id}
                            defaultValue={option.year}
                            selected
                          >
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
                          <option key={option.id} value={option.id} selected>
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

const selectYear = [
  { id: 0, year: "2020" },
  { id: 1, year: "2021" },
  { id: 2, year: "2022" },
  { id: 3, year: "2023" },
  { id: 4, year: "2024" },
  { id: 5, year: "2025" },
  { id: 6, year: "2026" },
  { id: 7, year: "2027" },
  { id: 8, year: "2028" },
  { id: 9, year: "2029" },
  { id: 10, year: "2030" },
  { id: 11, year: "2031" },
  { id: 12, year: "2032" },
  { id: 13, year: "2033" },
  { id: 14, year: "2034" },
  { id: 15, year: "2035" },
  { id: 16, year: "2036" },
  { id: 17, year: "2037" },
  { id: 18, year: "2008" },
  { id: 19, year: "2039" },
  { id: 20, year: "2040" },
];

const selectMes = [
  { id: 1, mes: "Enero" },
  { id: 2, mes: "Febrero" },
  { id: 3, mes: "Marzo" },
  { id: 4, mes: "Abríl" },
  { id: 5, mes: "Mayo" },
  { id: 6, mes: "Júnio" },
  { id: 7, mes: "Julio" },
  { id: 8, mes: "Agosto" },
  { id: 9, mes: "Septiembre" },
  { id: 10, mes: "Octubre" },
  { id: 11, mes: "Noviembre" },
  { id: 12, mes: "Diciembre" },
];

export default PlanesModal;
