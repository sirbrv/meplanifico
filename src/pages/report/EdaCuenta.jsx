import React, { useState, useEffect } from "react";
import axios from "../../api/direct";
import { axiosFetch } from "../../hoocks/useAxios";
import { useNavigate } from "react-router-dom";

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
  const [shFecha, setShFecha] = useState(0);
  const [shYear, setShYear] = useState(0);
  const [seach, setSeach] = useState("");
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

  const [inputSh, setInputSh] = useState({
    mes: "",
    year: "",
  });

  const [register, setRegister] = useState("");
  const [getRefrech, setGetRefrech] = useState(false);
  const [errorlog, setlog] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false); //different!
  const [page, setPage] = useState(1);
  const [disabledFecha, setDisabledFecha] = useState(true);
  //************  Constantes ********* */
  const userList = useSelector((state) => state.users.value);
  let endpoint = "/api/gestion/plan";
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
      shMes: inputSh.mes,
      shYear: inputSh.year,
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

    planes.map((plan) => {
      subTotalGasto = 0;
      let cta = 0;
      let descripcion = "";
      gastos.map((gasto) => {
        setlog(true);

        if (gasto.tipoGasto ===plan.tipoGasto) {
          subTotalGasto = subTotalGasto + gasto.monto;
          idem = idem + 1;
          inputRt.push({
            id: idem,
            fecha: gasto.fecha,
            descripcion: gasto.descripcion,
            tipo: cta ===0 ? gasto.tipoGastoDescripcion : "",
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
    setDatos(inputRt);
  };

  const getData = async () => {
    await getGastos();
  };

  //*************  Funciones  axios*********** */

  const inputsHandler = (e) => {
    e.target.name === "meses" && (inputSh.mes = e.target.value);
    e.target.name === "year" && (inputSh.year = e.target.value);
    handdleRefrech();
  };

  const onMesChange = ({ target: { value } }) => {
    setDisabledFecha(!disabledFecha);
  };

  const handdleRefrech = () => {
    setPage(1);
    setSeach("");
    setGetRefrech(true);
  };

  //*************  Funciones  de paginación *********** */

  const Inicializa = async () => {
    setShFecha(mesActual + 1);
    setShYear(yearActual);
    inputSh.mes = mesActual + 1;
    inputSh.year = yearActual;
    await getData();
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
  }, [getRefrech]);

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
                <h3 className="fsize">Movimiento de Gastos </h3>
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
                              value={yearActual}
                              //    disabled={disabledFecha}
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
                              //   disabled={disabledFecha}
                            >
                              {selectMes.map((option) =>
                                option.id === shFecha ? (
                                  <option
                                    key={option.id}
                                    value={option.id}
                                    selected
                                  >
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
                          {/* <Col xs="5" sm="4" md="3">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={handdleRefrech}
                          >
                            <RsIcons.BsSearch />
                          </Button>{" "}
                        </Col> */}
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
                    option.id === inputSh.mes && (
                      <option key={option.id}>
                        {option.mes + "  "}
                        {inputSh.year}
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

export default EdoCuentas;
