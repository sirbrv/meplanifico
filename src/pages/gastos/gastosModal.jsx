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
import "../ab.css";
function GastoModal({ tittle, onClose, registro, onConfirm }) {
  const [show, setShow] = useState(false);
  const [errores, setErrores] = useState([]);
  const [sussecAdd, setSussecAdd] = useState(false);
  const [calendario, setCalendario] = useState(false);
  const [selectTipoGasto, setSelectTipoGasto] = useState([]);
  const [selectCondicion, setSelectCondicion] = useState([]);
  const [dateValue, setDateValue] = useState(new Date());
  const [posts, setPosts] = useState([]);
  const [bodymgs, setBodymgs] = useState([]);

  const handleClose = () => [setShow(false), onClose()];

  const handleShow = () => setShow(true);
  const user = useSelector((state) => state.users.value);

  const [inputField, setInputField] = useState({
    id: "",
    fechaGasto: "",
    descripcion: "",
    tipoGasto: "",
    tipoGastoDescrip: "",
    condicion: "",
    condicionDescrip: "",
    monto: 0,
  });

  const [informacionModal, setInformacionModal] = useState({
    isOpen: false,
    title: "",
    body: "",
  });

  const endpoint = "/api/gestion/gasto";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fechaGasto, descripcion, tipoGasto, condicion, monto } =
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
      selectTipoGasto.map((option) => {
        if (option.id == parseInt(tipoGasto.value)) {
          descripTipo = option.descripcion;
        }
      });
      let descripCond = "";
      selectCondicion.map((option) => {
        if (option.id == parseInt(condicion.value)) {
          descripCond = option.descripcion;
        }
      });

      let formData = {
        email: user[0].email,
        fechaGasto: fechaGasto.value,
        descripcion: descripcion.value,
        tipoGasto: tipoGasto.value,
        tipoGastoDescrip: descripTipo,
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
              fechaGasto: "",
              descripcion: "",
              tipoGasto: "",
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

  const getGastos = async () => {
    const endpoint = "/api/admin/tipogasto";
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
        setSelectTipoGasto(response.data.tipoGastos);
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
      tipo: "gastos",
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
    inputField.fechaGasto = new Date();
    getGastos();
    getCondicion();
  };

  const cambioFecha = () => {
    setCalendario(true);
  };

  const setFecha = (value) => {
    inputField.fechaGasto = value;
    setCalendario(false);
  };

  const getGasto = async (reg) => {
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
    if (registro) {
      getGasto(registro);
    }
    initializeConnect();

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
      <div className=" shadow fsize">
        <Modal show={show} onHide={handleClose} size="lg">
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
                      name="fechaGasto"
                      id="fechaGasto"
                      onChange={(value) => setFecha(value)}
                      value={formatDate(inputField.fechaGasto)}
                    />{" "}
                    <Form.Control.Feedback type="invalid">
                      {errores.fechaGasto}
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
                    <strong>Tipo de Gasto</strong>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="tipoGasto"
                    defaultValue={inputField.tipoGasto}
                    onChange={inputsHandler}
                  >
                    {selectTipoGasto.map((option) =>
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

              <Row className="mb-3" rows={2}>
                <Form.Group as={Col} md="12">
                  <Form.Label>
                    {" "}
                    <strong>Descripción</strong>
                  </Form.Label>
                  <Form.Control
                    required
                    placeholder="Indique la Descripción del Gasto"
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
                    <strong>Condición del Gasto</strong>
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
      {calendario && (
        <div className="m-5 shadow fsize d-flex align-items-center fullscreen-modal">
          <Modal show={show} onHide={setCalendario} size="sm">
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

export default GastoModal;
