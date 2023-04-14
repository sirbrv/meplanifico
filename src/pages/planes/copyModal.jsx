import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InfoModal from "../../componets/Informacion";
import axios from "../../api/direct";
import { axiosFetch } from "../../hoocks/useAxios";
import * as RiIcons from "react-icons/fi";
import { useSelector } from "react-redux";
import "../ab.css";

function CopyModel({ tittle, onClose, onConfirm }) {
  const [show, setShow] = useState(false);
  const [errores, setErrores] = useState([]);
  const [sussecAdd, setSussecAdd] = useState(false);
  const [bodymgs, setBodymgs] = useState([]);
  const fechaActual = new Date();
  const mesActual = fechaActual.getMonth();
  const yearActual = fechaActual.getFullYear();
  const user = useSelector((state) => state.users.value);
  const handleClose = () => [setShow(false), onClose()];
  const handleShow = () => setShow(true);

  const [inputField, setInputField] = useState({
    fechaPlanes: new Date(),
    id: "",
    year: "",
    mes: "",
    hyear: "",
    hmes: "",
    monto: 0,
  });

  const [inputSh, setInputSh] = useState({
    mes: "",
    year: "",
    hmes: "",
    hyear: "",
  });

  const [informacionModal, setInformacionModal] = useState({
    isOpen: false,
    title: "",
    body: "",
  });

  const endpoint = "/api/gestion/copyplan";

  const validar = async (names) => {
    const errors = [];
    setErrores([]);
    let cantErr = 0;
/*    if (!names.monto || !isNaN(names.monyo)) {
      cantErr = cantErr + 1;
      errors.monto = "Campo Requerido";
    } */
    setErrores(errors);
    return cantErr;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fechaPlanes, year, mes, hyear, hmes } = e.target.elements;
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
        fechalanes: new Date(),
        year: year.value,
        mes: mes.value,
        hyear: hyear.value,
        hmes: hmes.value,
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
              fechaPlanes: new Date(),
              year: "",
              mes: "",
              hyear: "",
              hmes: "",
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

  const initializeConnect = () => {
    inputField.fechaPlanes = new Date();
    inputField.mes = mesActual;
    inputField.year = yearActual;
    inputField.hmes = mesActual + 1;
    inputField.hyear = yearActual;
  };

  const inputsHandler = (e) => {
    e.target.name === "mes" && (inputSh.mes = e.target.value);
    e.target.name === "year" && (inputSh.year = e.target.value);
    e.target.name === "hmes" && (inputSh.hmes = e.target.value);
    e.target.name === "hyear" && (inputSh.hyear = e.target.value);
  };

  useEffect(() => {
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
    }

    // eslint-disable-next-line
  }, [sussecAdd]);
  return (
    <>
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
              <Row>
                <Form.Group as={Col} xs="2">
                  <Form.Label>
                    {" "}
                    <strong>Origen</strong>
                  </Form.Label>
                </Form.Group>
                <Form.Group as={Col} xs="5">
                  <Form.Label>
                    {" "}
                    <strong>Mes</strong>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    isInvalid={!!errores.mes}
                    name="mes"
             //       value={inputField.mes}
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
                <Form.Group as={Col} xs="5">
                  <Form.Label>
                    {" "}
                    <strong>Año</strong>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    isInvalid={!!errores.year}
                    name="year"
           //         value={inputField.year}
                    onChange={inputsHandler}
                  >
                    {selectYear.map((option) =>
                      option.year === parseInt(inputField.year) ? (
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
              </Row>

              <Row className="mt-3">
                <Form.Group as={Col} xs="2">
                  <Form.Label>
                    {" "}
                    <strong>Destino</strong>
                  </Form.Label>
                </Form.Group>

                <Form.Group as={Col} xs="5">
                  <Form.Control
                    as="select"
                    isInvalid={!!errores.mes}
                    name="hmes"
           //         value={inputField.hmes}
                    onChange={inputsHandler}
                  >
                    {selectMes.map((option) =>
                      option.id === parseInt(inputField.hmes) ? (
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
                <Form.Group as={Col} xs="5">
                  <Form.Control
                    as="select"
                    isInvalid={!!errores.year}
                    name="hyear"
                //    value={inputField.hyear}
                    onChange={inputsHandler}
                  >
                    {selectYear.map((option) =>
                      option.year === parseInt(inputField.hyear) ? (
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

const selectYear = [
  { id: 0, year: 2020 },
  { id: 1, year: 2021 },
  { id: 2, year: 2022 },
  { id: 3, year: 2023 },
  { id: 4, year: 2024 },
  { id: 5, year: 2025 },
  { id: 6, year: 2026 },
  { id: 7, year: 2027 },
  { id: 8, year: 2028 },
  { id: 9, year: 2029 },
  { id: 10, year: 2030 },
  { id: 11, year: 2031 },
  { id: 12, year: 2032 },
  { id: 13, year: 2033 },
  { id: 14, year: 2034 },
  { id: 15, year: 2035 },
  { id: 16, year: 2036 },
  { id: 17, year: 2037 },
  { id: 18, year: 2038 },
  { id: 19, year: 2039 },
  { id: 20, year: 2040 },
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

export default CopyModel;
