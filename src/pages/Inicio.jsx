import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import InfoCard from "../componets/Informacion";
//import axios from "../api/direct";
import { useSelector } from "react-redux";
//import { axiosFetch } from "../hoocks/useAxios";
import { useLocation } from "react-router-dom";
//import LoginSistema from "./administracion/users/Login";
import registro from "../assets/images/registro.png";
import "../App.css";

/***** */
function Inicio() {
  const [login, setLogin] = useState(false);
  const user = useSelector((state) => state.users.value);
  const location = useLocation();
  //const [images, setImages] = useState("");

  const [informacionCard, setInformacionCard] = useState({
    isOpen: false,
    title: "",
    body: "",
  });

  /*
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      codTrans,
      clienteId,
      tipoCliente,
      servicio,
      convenio,
      pasajeros,
      nombrePasajero,
      origen,
      destino,
      montoEstimado,
      montoAdicional,
      peaje,
      estac,
      formaPago,
      gastoExtra,
      gastoColacion,
      observacion,
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
        codTrans: codTrans.value,
        chofer: selectChofer,
        tipoCliente: tipoCliente.value,
        clienteId: clienteId.value,
        servicio: servicio.value,
        convenio: convenio.value,
        pasajeros: pasajeros.value,
        nombrePasajero: nombrePasajero.value,
        origen: origen.value,
        destino: destino.value,
        montoEstimado: montoEstimado.value,
        montoAdicional: montoAdicional.value,
        peaje: peaje.value,
        estac: estac.value,
        formaPago: formaPago.value,
        gastoExtra: gastoExtra.value,
        gastoColacion: gastoColacion.value,
        observacion: observacion.value,
      };
      const endpoint = "/api/admin/trans";
      const newMethod = "POST";
      await axiosFetch({
        axiosInstance: axios,
        method: newMethod,
        url: endpoint,
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
          }
          if (posts.status === "201") {
            setSussecAdd(true);
            setBodymgs(posts.msg);
            //     inicializafuncion();
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
    e.preventDefault();
    setInputField((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    validar(inputField);
  };

  const getImagen = async (imagen) => {
    const endpointe = "/api/img";
    const newUrl = `${endpointe}/${imagen}`;
    await axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: newUrl,
    }).then((response) => {
//      setImages(response);
      if (response.status === "200" && "304") {
      }
    });
  };
*/
  useEffect(() => {
    if (!user[0]) {
      location.state ? setLogin(true) : setLogin(false);
    } else {
      setLogin(true);
    }
    //   getImagen("planific.jpg");
    //   getImagen("contact.png")
    // inicializafuncion();
    // getImagen("contact.png");

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!user[0]) {
      location.state ? setLogin(true) : setLogin(false);
    } else {
      setLogin(true);
    }
    // inicializafuncion();
    // eslint-disable-next-line
  }, [location]);
  return (
    <>
      {/*!login && (
        <LoginSistema
          onClose={() => {
            setLogin(false);
          }}
          onConfirma={() => {
            setLogin(true);
          }}
        />
        )*/}

      {login && (
        <>
          <div>
            <Card.Img src={registro} alt="" height={60} className="img-fluid" />
          </div>
          {/* <Container>
            <Row className="text-left g-4 m-4 fsizereg">
              <Col sx="4">
                <Card className="bg-dark text-light">
                  <Card.Body className="text-left d-grid gap-2">
                    <Card.Title className="mb-3 text-center">
                      Ingresos
                    </Card.Title>
                    <Card.Img
                      src={registro}
                      alt=""
                      height={60}
                      className="img-fluid"
                    />

                    <Card.Text className="text-left">
                      Registro de ingresos mensuales obtenidos, según las
                      actividades realizadas.
                    </Card.Text>
                    <Button variant="primary" size="lg">
                      Read More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col sx="4">
                <Card className="bg-dark text-light">
                  <Card.Body className="text-left d-grid gap-2">
                    <Card.Title className="mb-3 text-center">
                      Planificación
                    </Card.Title>
                    <Card.Img
                      src={registro}
                      alt=""
                      height={60}
                      className="img-fluid"
                    />

                    <Card.Text className="text-left ">
                      Planifíca tus gastos. Ingresos los estimados que gastaras
                      en cada mes.
                    </Card.Text>
                    <Button variant="primary" className="fsizereg">
                      Read More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col sx="4">
                <Card className="bg-dark text-light">
                  <Card.Body className="text-left d-grid gap-2">
                    <Card.Title className="mb-3 text-center">Gastos</Card.Title>
                    <Card.Img
                      src={registro}
                      alt=""
                      className="img-fluid"
                    />

                    <Card.Text className="text-left ">
                      Registra tus cgastos y manten control sobre las cantidades
                      gastadas cada mes.
                    </Card.Text>
                    <Button variant="primary" size="lg">
                      Read More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container> */}
        </>
      )}

      {/* <h1>Entre Victor</h1>



        /*  <div className="m-3 p-4 ">
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-1">
              <Form.Group as={Col} sm="6" md="3" lg="3">
                <Form.Label>
                  <strong>Tipo de Servicio</strong>
                </Form.Label>
                <Form.Select
                  as="select"
                  className="form-select"
                  name="servicio"
                  isInvalid={!!errores.servicio}
                  defaultValue={inputField.servicio}
                  onChange={inputsHandler}
                >
                  {selectServicio.map((option) =>
                    option.value === inputField.servicio ? (
                      <option key={option.value} value={option.value} selected>
                        {option.descrip}
                      </option>
                    ) : (
                      <option key={option.value} value={option.value}>
                        {option.descrip}
                      </option>
                    )
                  )}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errores.servicio}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} sm="3" md="6" lg="6"></Form.Group>
              <Form.Group as={Col} sm="3" md="3" lg="3">
                <Form.Label>
                  <strong># Transacción</strong>
                </Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  name="codTrans"
                  id="codTrans"
                  value={inputField.codTrans}
                />
              </Form.Group>
            </Row>

            <Row className="mb-1">
              <Form.Group as={Col} sm="4" lg="2">
                <Form.Label>
                  <strong>Tipo Cliente</strong>
                </Form.Label>
                <Form.Select
                  className="form-select"
                  as="select"
                  name="tipoCliente"
                  isInvalid={!!errores.tipoCliente}
                  defaultValue={inputField.tipoCliente}
                  onChange={inputsHandler}
                >
                  {selectTipoCliente.map((option) =>
                    option.value === inputField.tipoCliente ? (
                      <option key={option.value} value={option.value} selected>
                        {option.descrip}
                      </option>
                    ) : (
                      <option key={option.value} value={option.value}>
                        {option.descrip}
                      </option>
                    )
                  )}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errores.tipoCliente}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} sm="8" lg="4">
                <Form.Label>
                  <strong>Empresa</strong>
                </Form.Label>
                <Form.Select
                  as="select"
                  name="clienteId"
                  disabled={isDisabled ? true : false}
                  isInvalid={!!errores.clienteId}
                  defaultValue={inputField.clienteId}
                  onChange={inputsHandler}
                >
                  <option key={0} value={""}></option>
                  {selectCliente.map((option) =>
                    option.nombreId === inputField.clienteId ? (
                      <option key={option._id} value={option.nombreId}>
                        {option.nombre}
                      </option>
                    ) : (
                      <option key={option._id} value={option.nombreId}>
                        {option.nombre}
                      </option>
                    )
                  )}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errores.clienteId}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} sm="12" lg="6">
                <Form.Label>
                  <strong>Convenio</strong>
                </Form.Label>
                <Form.Select
                  as="select"
                  name="convenio"
                  disabled={isDisabled ? true : false}
                  isInvalid={!!errores.convenio}
                  defaultValue={inputField.convenio}
                  onChange={inputsHandler}
                >
                  <option key={0} value={""}></option>
                  {selectConvenio.map((option) =>
                    option.convenio === inputField.convenio ? (
                      <option key={option._id} value={option.convenio}>
                        {option.descripcion}
                      </option>
                    ) : (
                      <option key={option._id} value={option.convenio}>
                        {option.descripcion}
                      </option>
                    )
                  )}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errores.convenio}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-1">
              <Form.Group as={Col} sm="4" lg="2">
                <Form.Label>
                  <strong># Pasajeros</strong>
                </Form.Label>
                <Form.Select
                  as="select"
                  isInvalid={!!errores.pasajeros}
                  name="pasajeros"
                  defaultValue={inputField.pasajeros}
                  onChange={inputsHandler}
                >
                  {selectPasajeros.map((option) =>
                    option.value === inputField.pasajeros ? (
                      <option key={option.value} value={option.value} selected>
                        {option.descrip}
                      </option>
                    ) : (
                      <option key={option.value} value={option.value}>
                        {option.descrip}
                      </option>
                    )
                  )}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errores.pasajeros}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm="8" lg="4">
                <Form.Label>
                  <strong>Nombre del Pasajero</strong>
                </Form.Label>
                <Form.Control
                  placeholder="nombrePasajero"
                  type="text"
                  name="nombrePasajero"
                  id="nombrePasajero"
                  onChange={inputsHandler}
                  isInvalid={!!errores.nombrePasajero}
                  value={inputField.nombrePasajero}
                />
                <Form.Control.Feedback type="invalid">
                  {errores.nombrePasajero}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm="6" lg="3">
                <Form.Label>
                  <strong>Origen de Ruta</strong>
                </Form.Label>
                <Form.Select
                  as="select"
                  isInvalid={!!errores.origen}
                  name="origen"
                  defaultValue={inputField.origen}
                  onChange={inputsHandler}
                >
                  <option key={0} value={""}></option>
                  {selectOrigen.map((option, index) =>
                    option === inputField.origen ? (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ) : (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    )
                  )}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errores.origen}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm="6" lg="3">
                <Form.Label>
                  <strong>Destino</strong>
                </Form.Label>
                <Form.Select
                  as="select"
                  isInvalid={!!errores.destino}
                  name="destino"
                  defaultValue={inputField.destino}
                  onChange={inputsHandler}
                >
                  <option value={""}></option>
                  {selectDestino.map((option) =>
                    option.destino === inputField.destino ? (
                      <option key={option._id} value={option.destino}>
                        {option.destino}
                      </option>
                    ) : (
                      <option key={option._id} value={option.destino}>
                        {option.destino}
                      </option>
                    )
                  )}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errores.destino}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-1">
              <Form.Group as={Col} sm="6" lg="3">
                <Form.Label>
                  <strong>Monto Estimado</strong>
                </Form.Label>
                <Form.Control
                  className="d-flex justify-content-end text-end"
                  disabled={true}
                  placeholder="0"
                  type="text"
                  name="montoEstimado"
                  id="montoEstimado"
                  isInvalid={!!errores.montoEstimado}
                  onChange={inputsHandler}
                  value={inputField.montoEstimado}
                />
                <Form.Control.Feedback type="invalid">
                  {errores.montoEstimado}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} sm="6" lg="3">
                <Form.Label>
                  <strong>Monto Adicional</strong>
                </Form.Label>
                <Form.Control
                  className="d-flex justify-content-end text-end"
                  required
                  placeholder="0"
                  type="text"
                  name="montoAdicional"
                  id="montoAdicional"
                  isInvalid={!!errores.montoAdicional}
                  onChange={inputsHandler}
                  value={inputField.montoAdicional}
                />
                <Form.Control.Feedback type="invalid">
                  {errores.montoAdicional}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} sm="6" lg="3">
                <Form.Label>
                  <strong>Monto Total</strong>
                </Form.Label>
                <Form.Control
                  className="d-flex justify-content-end text-end"
                  disabled={true}
                  type="text"
                  name="montoTotal"
                  id="montoTotal"
                  isInvalid={!!errores.montoTotal}
                  onChange={inputsHandler}
                  value={inputField.montoTotal}
                />
                <Form.Control.Feedback type="invalid">
                  {errores.montoTotal}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm="6" lg="3">
                <Form.Label>
                  <strong>Forma de Pago</strong>
                </Form.Label>
                <Form.Select
                  as="select"
                  isInvalid={!!errores.formaPago}
                  name="formaPago"
                  defaultValue={inputField.formaPago}
                  onChange={inputsHandler}
                >
                  {selectFormaPago.map((option) =>
                    option.value === inputField.formaPago ? (
                      <option key={option.value} value={option.value} selected>
                        {option.descrip}
                      </option>
                    ) : (
                      <option key={option.value} value={option.value}>
                        {option.descrip}
                      </option>
                    )
                  )}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errores.formaPago}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-1">
              <Form.Group as={Col} sm="6" lg="3">
                <Form.Label>
                  <strong>Peaje</strong>
                </Form.Label>
                <Form.Select
                  className="d-flex justify-content-end text-end"
                  as="select"
                  isInvalid={!!errores.peaje}
                  name="peaje"
                  defaultValue={inputField.peaje}
                  onChange={inputsHandler}
                >
                  <option value={0}>0</option>
                  {selectPeaje.map((option) =>
                    option.valorServicio === inputField.peaje ? (
                      <option key={option._id} value={option.valorServicio}>
                        {option.valorServicio}
                      </option>
                    ) : (
                      <option key={option._id} value={option.valorServicio}>
                        {option.valorServicio}
                      </option>
                    )
                  )}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errores.peaje}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} sm="6" lg="3">
                <Form.Label>
                  <strong>Estacionamiento</strong>
                </Form.Label>
                <Form.Select
                  className="d-flex justify-content-end text-end"
                  as="select"
                  isInvalid={!!errores.estac}
                  name="estac"
                  defaultValue={inputField.estac}
                  onChange={inputsHandler}
                >
                  <option value={0}>0</option>
                  {selectEstac.map((option) =>
                    option.valorServicio === inputField.estac ? (
                      <option key={option._id} value={option.valorServicio}>
                        {option.valorServicio}
                      </option>
                    ) : (
                      <option key={option._id} value={option.valorServicio}>
                        {option.valorServicio}
                      </option>
                    )
                  )}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errores.estac}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm="6" lg="3">
                <Form.Label>
                  <strong>Gasto de Colación</strong>
                </Form.Label>
                <Form.Control
                  className="d-flex justify-content-end text-end"
                  required
                  type="text"
                  name="gastoColacion"
                  id="gastoColacion"
                  isInvalid={!!errores.gastoColacion}
                  onChange={inputsHandler}
                  value={inputField.gastoColacion}
                />
                <Form.Control.Feedback type="invalid">
                  {errores.gastoColacion}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} sm="6" lg="3">
                <Form.Label>
                  <strong>Gasto Extra</strong>
                </Form.Label>
                <Form.Control
                  className="d-flex justify-content-end text-end"
                  type="text"
                  name="gastoExtra"
                  id="gastoExtra"
                  isInvalid={!!errores.gastoExtra}
                  onChange={inputsHandler}
                  value={inputField.gastoExtra}
                />
                <Form.Control.Feedback type="invalid">
                  {errores.gastoExtra}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="12">
                <Form.Label>
                  <strong>Observación</strong>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Ingrese la Descripción .."
                  type="texarea"
                  name="observacion"
                  id="observacion"
                  isInvalid={!!errores.observacion}
                  onChange={inputsHandler}
                  value={inputField.observacion}
                />
                <Form.Control.Feedback type="invalid">
                  {errores.observacion}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <hr />
            <Row className="p-2 d-flex justify-content-between">
              <Col className="d-flex justify-content-end">
                <Button variant="danger">Cancelar</Button>
              </Col>
              <Col className="d-flex justify-content-start">
                <Button variant="primary" type="submit">
                  Guardar
                </Button>
              </Col>
            </Row>
          </Form>
        </div> */}
      {informacionCard.isOpen && (
        <InfoCard
          titulo={informacionCard.title}
          descripcion={informacionCard.body}
          onClose={() => {
            setInformacionCard({ isOpen: false, title: "", body: "" });
          }}
        />
      )}
    </>
  );
}

export default Inicio;
