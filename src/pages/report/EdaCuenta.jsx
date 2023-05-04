import React, { useState, useEffect } from "react";
import axios from "../../api/direct";
import { axiosFetch } from "../../hoocks/useAxios";
import { useNavigate } from "react-router-dom";
import { selectYear, selectMes } from "../../componets/ControlFecha";

//  ***** Call to React-Bosotrap ****************** //
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

//  ***** Call to Redux ****************** //
import { useSelector } from "react-redux";
//import { getUsers, deleteProvee } from "../../feachures/users/UsersSlice";

//  ***** Call to Aplication ****************** //
import LisTableIngresos from "./ListEdoCuentas";
import InfoModal from "../../componets/Informacion";
import "../../App.css";

function EdoCuentas() {
  const [gastos, setGastos] = useState([]);
  const [ingresos, setIngresos] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [datos, setDatos] = useState([]);
  const fechaActual = new Date();
  const mesActual = fechaActual.getMonth();
  const yearActual = fechaActual.getFullYear();
  const user = useSelector((state) => state.users.value);
  const [login, setLogin] = useState(false);
  let navigate = useNavigate();
  let datosPlan = [];
  let datosGasto = [];
  let datosIngreso = [];

  const [informacionModal, setInformacionModal] = useState({
    isOpen: false,
    title: "",
    body: "",
  });

  const [inputMes, setInputMes] = useState("");
  const [inputYear, setInputYear] = useState(0);
  const [getRefrech, setGetRefrech] = useState(false);
  const [errorlog, setlog] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false); //different!
  const [page, setPage] = useState(1);
  //************  Constantes ********* */
  // let endpoint = "/api/gestion/plan";
  let totalIngreso = 0;
  let totalGasto = 0;
  let inputRt = new Array();
  let subTotalGasto = 0;

  //*************  Funciones  axios*********** */
  const getGastos = async () => {
    inputRt = [];
    const options = {
      limit: 1000,
      offset: 0,
      page: 1,
      sch: "",
      shMes: inputMes,
      shYear: inputYear,
      email: user[0].email,
      shTipo: "",
      shCondicion: "",
    };
    /**************seccion de gastos********** */
    let endpoint = "/api/gestion/gasto";
    await axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: endpoint,
      requestConfig: {
        params: options,
      },
    }).then((response) => {
      if (response.status === "200") {
        setGastos(response.data.gastos);
        let tem = response.data.gastos;
        datosGasto = tem.sort((a, b) => {
          return a.fecha - b.fecha;
        });
      }
    });
    /**************seccion de planes********** */
    let endpointp = "/api/gestion/plan";
    await axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: endpointp,
      requestConfig: {
        params: options,
      },
    }).then((response) => {
      if (response.status === "200") {
        setPlanes(response.data.planes);
        datosPlan = response.data.planes;
      }
    });
    /**************seccion de ingresos********** */
    let endpointi = "/api/gestion/ingreso";
    await axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: endpointi,
      requestConfig: {
        params: options,
      },
    }).then((response) => {
      if (response.status === "200") {
        setIngresos(response.data.ingresos);
        datosIngreso = response.data.ingresos;
      }
    });
    /**************fin seccion ********** */
    await gastoControl(datosIngreso, datosPlan, datosGasto);
  };

  const gastoControl = (ingresos, planes, gastos) => {
    let idem = 0;
    ingresos.map((ingreso) => {
      idem = idem + 1;
      inputRt.push({
        id: idem,
        fecha: ingreso.fecha,
        descripcion: ingreso.descripcion,
        tipo: ingreso.tipoGastoDescripcion,
        monto: ingreso.monto,
        dt: 1,
      });
      totalIngreso = totalIngreso + ingreso.monto;
    });

    idem = idem + 1;
    inputRt.push({
      id: idem,
      descripcion: "Total de Ingresos...",
      monto: totalIngreso,
      dt: 3,
    });
    /*
    planes.map((plan) => {
      subTotalGasto = 0;
      let cta = 0;
      let descripcion = "";
      gastos.map((gasto) => {
        setlog(true);
        if (gasto.tipoGasto === plan.tipoGasto) {
          subTotalGasto = subTotalGasto + gasto.monto;
          idem = idem + 1;
          inputRt.push({
            id: idem,
            fecha: gasto.fecha,
            descripcion: gasto.descripcion,
            tipo: cta === 0 ? gasto.tipoGastoDescripcion : "",
            monto: gasto.monto,
            dt: 1,
          });
          cta = cta + 1;
          descripcion = gasto.tipoGastoDescripcion;
        }
      });
      if (cta > 1) {
        idem = idem + 1;
        inputRt.push({
          id: idem,
          descripcion: "Sub total " + descripcion,
          monto: subTotalGasto,
          dt: 2,
        });
      }
      totalGasto = totalGasto + subTotalGasto;
    });
*/
    let gastosSort = gastos.sort(compare);

    let comparaGasto = 0;
    gastosSort[0]
      ? (comparaGasto = gastosSort[0].tipoGasto)
      : (comparaGasto = 0);
    gastos = gastosSort;
    let cta = 0;
    let descripcion = "";
    gastos.map((gasto) => {
      setlog(true);
      if (gasto.tipoGasto === comparaGasto) {
        subTotalGasto = subTotalGasto + gasto.monto;
        idem = idem + 1;
        inputRt.push({
          id: idem,
          fecha: gasto.fecha,
          descripcion: gasto.descripcion,
          tipo: cta === 0 ? gasto.tipoGastoDescripcion : "",
          monto: gasto.monto,
          dt: 1,
        });
        cta = cta + 1;
        descripcion = gasto.tipoGastoDescripcion;
      } else {
        if (cta > 0) {
          idem = idem + 1;
          comparaGasto = gasto.tipoGasto;
          cta = 0;
          inputRt.push({
            id: idem,
            descripcion: descripcion,
            monto: subTotalGasto,
            dt: 2,
          });
        }
        totalGasto = totalGasto + subTotalGasto;
        subTotalGasto = 0;

        subTotalGasto = subTotalGasto + gasto.monto;
        idem = idem + 1;
        inputRt.push({
          id: idem,
          fecha: gasto.fecha,
          descripcion: gasto.descripcion,
          tipo: cta === 0 ? gasto.tipoGastoDescripcion : "",
          monto: gasto.monto,
          dt: 1,
        });
        cta = cta + 1;
        descripcion = gasto.tipoGastoDescripcion;
      }
    });

    idem = idem + 1;
    inputRt.push({
      id: idem,
      descripcion: "Total de Gastos...",
      monto: totalGasto,
      dt: 3,
    });
    let total = totalIngreso - totalGasto;
    idem = idem + 1;
    inputRt.push({
      id: idem,
      descripcion: "Total ( Ingreso - Gastos)..",
      monto: total,
      dt: 4,
    });
    /* console.log("ingresos..", ingresos);
    console.log("Planes...:", planes);
    console.log("gastos...:", gastos);
    console.log("Resultado....:", inputRt); */
    setDatos(inputRt);
  };

  const getData = async () => {
    await getGastos();
  };

  //*************  Funciones  axios*********** */

  const inputsHandler = (e) => {
    e.target.name === "meses" && setInputMes(e.target.value);
    e.target.name === "year" && setInputYear(e.target.value);
    handdleRefrech();
  };

  const handdleRefrech = () => {
    setPage(1);
    setGetRefrech(true);
  };

  //*************  Funciones  de paginación *********** */

  const Inicializa = async () => {
    setInputMes(mesActual + 1);
    setInputYear(yearActual);
    //  await getData();
  };

  const acceesoControl = () => {
    navigate("/", { state: "" });
  };

  useEffect(() => {
    if (!user[0]) {
      setLogin(false);
    } else {
      setLogin(true);
      Inicializa();
      handdleRefrech();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (login) {
      getData();
      setGetRefrech(false);
    }
    // eslint-disable-next-line
  }, [getRefrech, inputMes, inputYear]);

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
        />
      )}
      <Container>
        {login && (
          <Container fluid={true} className="my-3">
            <Row className="d-flex justify-space-between align-items-center fsizeTable">
              <Col sm={9} xs={8}>
                <h3>{errorlog}</h3>
                <h3 className="fsize">Relación de Ingresos y Gastos </h3>
              </Col>
            </Row>
          </Container>
        )}
        <Container fluid={true}>
          {login && (
            <Row className="d-flex justify-content-center">
              <div className="my-3 backFilter">
                <Row className="d-flex justify-space-between align-items-center fsizeTable">
                  <Form noValidate>
                    <Col xs="12" md="12">
                      <Form.Group>
                        <Row className="my-3 d-flex align-items-center fsizeTable">
                          <Col xs="8">
                            <h5>
                              <strong>Filtros</strong>{" "}
                            </h5>
                          </Col>
                        </Row>
                        <Row className="my-3 d-flex justify-space-between align-items-center fsizeTable">
                          <Col xs="4" sm="3" md="2">
                            <Form.Select
                              as="select"
                              name="year"
                              onChange={inputsHandler}
                              value={inputYear}
                              //    disabled={disabledFecha}
                            >
                              {selectYear.map((option) =>
                                option.year === inputYear ? (
                                  <option
                                    key={option.id}
                                    defaultValue={option.year}
                                  >
                                    {option.year}
                                  </option>
                                ) : (
                                  <option key={option.id} value={option.year}>
                                    {option.year}
                                  </option>
                                )
                              )}
                            </Form.Select>
                          </Col>
                          <Col xs="5" sm="4" md="3">
                            <Form.Select
                              as="select"
                              name="meses"
                              onChange={inputsHandler}
                              value={inputMes}
                            >
                              {selectMes.map((option) =>
                                option.id === inputMes ? (
                                  <option key={option.id} value={option.id}>
                                    {(option.id, option.mes)}
                                  </option>
                                ) : (
                                  <option key={option.id} value={option.id}>
                                    {(option.id, option.mes)}
                                  </option>
                                )
                              )}
                            </Form.Select>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Col>
                  </Form>
                </Row>
              </div>
            </Row>
          )}
          {loading && (
            <>
              <hr />
              <h5 className="mt-5 text-center">Loading...</h5>
            </>
          )}
          {!loading && error && (
            <>
              <hr />
              <h5 className="mt-4 text-center">{errorMsg}</h5>{" "}
            </>
          )}
          {!loading && (
            <>
              <Row className="d-flex justify-space-between text-center fsizeTable my-3">
                <h5>Estado de Movimientos</h5>
                <Col sx="11"></Col>
                <Col sx="2">
                  {selectMes.map((option) => {
                    option.id === inputMes && (
                      <option key={option.id}>
                        {option.mes + "  "}
                        {inputYear}
                      </option>
                    );
                  })}
                </Col>
              </Row>
              <hr />
              <div className="mb-5">
                <LisTableIngresos
                  dataIngreso={datos}
                  totalIngreso={totalIngreso}
                />
                {/* <Row>
                <Col sx="6" md="7"></Col>
                <Form.Group as={Col} xs="4" md="3" className=" fsizeTable">
                  <Form.Label>
                    <strong>Total Ingresos..... </strong>
                  </Form.Label>
                </Form.Group>
                <Form.Group
                  as={Col}
                  xs="2"
                  md="2"
                  className=" fsizeTable align-end"
                >
                  <Form.Label>
                    <strong>{totalIngreso} </strong>
                  </Form.Label>
                </Form.Group>
              </Row> */}
              </div>
            </>
          )}
          {!loading && !error && !planes && (
            <>
              <hr />
              <h4>No hay Registros</h4>
            </>
          )}
          {informacionModal.isOpen && (
            <InfoModal
              titulo={informacionModal.title}
              descripcion={informacionModal.body}
              onClose={() => {
                setInformacionModal({ isOpen: false, title: "", body: "" });
              }}
            />
          )}{" "}
        </Container>
      </Container>
    </>
  );
}

function compare(a, b) {
  if (a.tipoGasto > b.tipoGasto) return 1;
  if (a.tipoGasto < b.tipoGasto) return -1;
  return 0;
}

export default EdoCuentas;
