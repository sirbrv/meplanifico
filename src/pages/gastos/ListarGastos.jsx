import React, { useState, useEffect } from "react";
import axios from "../../api/direct";
import { axiosFetch } from "../../hoocks/useAxios";
import * as RiIcons from "react-icons/fi";
import { useNavigate } from "react-router-dom";
//  ***** Call to React-Bosotrap ****************** //
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

//  ***** Call to Redux ****************** //
import { useSelector } from "react-redux";
//import { getUsers, deleteProvee } from "../../feachures/users/UsersSlice";

//  ***** Call to Aplication ****************** //
import Seach from "../../componets/Busquedas";
import GastosModal from "./gastosModal";
import ListTable from "./ListTableGastos";
import InfoModal from "../../componets/Informacion";
import VerifyDelete from "../../componets/VerifyDelete";
import Pagination from "../../componets/Pagination";
import "../../App.css";

function ListarGastos() {
  const [shFecha, setShFecha] = useState(0);
  const [shYear, setShYear] = useState(0);
  const [addModa, setAddModal] = useState(false);
  const [editModa, setEditModal] = useState(false);
  const [gastos, setGastos] = useState([]);
  const [seach, setSeach] = useState("");

  const textSeach = "";
  const fechaActual = new Date();
  const mesActual = fechaActual.getMonth();
  const yearActual = fechaActual.getFullYear();
  const [login, setLogin] = useState(false);
  let navigate = useNavigate();

  const [informacionModal, setInformacionModal] = useState({
    isOpen: false,
    title: "",
    body: "",
  });

  const [verifyDeleteModal, setVerifyDeleteModal] = useState({
    isOpen: false,
    title: "",
    body: "",
  });

  const [inputSh, setInputSh] = useState({
    mes: "",
    year: "",
    tipo: "",
    condicion: "",
  });

  const [register, setRegister] = useState("");
  const [getRefrech, setGetRefrech] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false); //different!
  const [page, setPage] = useState(1);
  const [regshow, setRegshow] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [pageNext, setPageNext] = useState(false);
  const [selectTipoGasto, setSelectTipoGasto] = useState([]);
  const [selectCondicion, setSelectCondicion] = useState([]);
  const [sehFecha, setSehfecha] = useState(false);

  const [disabledFecha, setDisabledFecha] = useState(true);
  const [disabledTipo, setDisabledTipo] = useState(true);
  const [disabledCond, setDisabledCond] = useState(true);

  //************  Constantes ********* */
  const endpoint = "/api/gestion/gasto";
  const user = useSelector((state) => state.users.value);

  //*************  Funciones  axios*********** */
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

  const getData = async () => {
    setLoading(true);

    const options = {
      email: user[0].email,
      limit: regshow,
      offset: (page - 1) * regshow,
      page: page,
      sch: seach,
      shMes: inputSh.mes,
      shYear: inputSh.year,
      shTipo: inputSh.tipo,
      shCondicion: inputSh.condicion,
    };

    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: endpoint,
      requestConfig: {
        params: options,
      },
    })
      .then((response) => {
        if (response.status === "200") {
          setGastos(response.data.gastos);
          setPageCount(response.data.totalPages);
          setPageNext(response.data.hasNextPage);
          setError(false);
        } else {
          if (response.msg === undefined) {
            setInformacionModal({
              isOpen: true,
              title: "Listado de Gastos",
              body: response,
            });
          } else {
            setInformacionModal({
              isOpen: true,
              title: "Listado de Gastos",
              body: response.msg,
            });
          }
        }
        setLoading(false);
        setErrorMsg(response);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        setErrorMsg(err);
      });
  };

  const deleteGastos = async (reg) => {
    const newUrl = `${endpoint}/${reg} `;
    axiosFetch({
      axiosInstance: axios,
      method: "DELETE",
      url: newUrl,
      requestConfig: {},
    }).then((posts) => {
      if (posts.status === "200" && "304") {
        getGastos();
      }
    });
  };

  const getGastos = async () => {
    await getData();
  };

  const getTipoGastos = async () => {
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

  //*************  Funciones  axios*********** */

  const inputsHandler = (e) => {
    e.target.name === "meses" && (inputSh.mes = e.target.value);
    e.target.name === "year" && (inputSh.year = e.target.value);
    e.target.name === "tipoGasto" && (inputSh.tipo = e.target.value);
    e.target.name === "condicion" && (inputSh.condicion = e.target.value);
  };

  const onMesChange = ({ target: { value } }) => {
    setDisabledFecha(!disabledFecha);
  };

  const onTipoChange = ({ target: { value } }) => {
    inputSh.tipo = "";
    setDisabledTipo(!disabledTipo);
  };

  const onCondicionChange = ({ target: { value } }) => {
    inputSh.condicion = "";
    setDisabledCond(!disabledCond);
  };

  const handdleAddGastos = () => {
    setAddModal(true);
  };

  const handdleEditGasto = (id) => {
    setRegister(id);
    setEditModal(true);
  };

  const handdleRefrech = () => {
    setPage(1);
    setSeach("");
    setGetRefrech(true);
  };

  const handleDelete = (id) => {
    setRegister(id);
    getGastos();
    setVerifyDeleteModal({
      isOpen: true,
      title: "Eliminación de Prodeevor",
      body: "Está seguro de eliminar el registro",
    });

    //  dispatch(deleteProvee(id));
  };

  //*************  Funciones  de paginación *********** */

  const handlePrevious = () => {
    setPage((p) => {
      let prev = 1 * 1;
      if (p > 1) {
        prev = p * 1 - 1;
      }
      return prev;
    });
  };

  const handdleBuscar = () => {
    setPage(1);
    setGetRefrech(true);
  };

  const handleFirst = () => {
    setPage((p) => {
      return 1;
    });
  };

  const handleLast = () => {
    setPage((p) => {
      let valor = pageCount - 3;
      let valorPageCount = 0;
      valor <= 0
        ? (valorPageCount = pageCount)
        : (valorPageCount = pageCount - 3);
      return valorPageCount;
    });
  };

  const handleNext = () => {
    setPage((p) => {
      if (p === pageCount) return p * 1;
      let prox = p * 1 + 1;
      if (prox > pageCount) return pageCount;
      return prox;
    });
  };

  const Inicializa = () => {
    getGastos();
    getTipoGastos();
    getCondicion();
    setShFecha(mesActual + 1);
    setShYear(yearActual);
    inputSh.mes = mesActual + 1;
    inputSh.year = yearActual;
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
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (login) {
      getGastos();
      setGetRefrech(false);
    }
    // eslint-disable-next-line
  }, [inputSh, getRefrech, page, regshow]);

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
      {login && (
        <Row className="mb-4 mx-2 mt-4 d-flex justify-content-center">
          <Row className="d-flex justify-space-between align-items-center">
            <Col sm={9} xs={8}>
              <h3 className="fsize">Gestión de Gastos</h3>
            </Col>
            <Col className="d-flex justify-content-end" sm={3} xs={4}>
              <Row className="d-flex justify-content-end">
                <Col xs="12">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handdleAddGastos}
                  >
                    <RiIcons.FiPlus />
                  </Button>{" "}
                  <Button variant="primary" size="sm" onClick={handdleRefrech}>
                    <RiIcons.FiRefreshCw />
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <section className="my-3 backFilter">
            <Row className="d-flex align-items-center fsizeTable">
              <Form noValidate>
                <Col xs="12" md="12">
                  <Form.Group>
                    <Row className="my-3 d-flex justify-space-between align-items-center fsizeTable">
                      <Col xs="8">
                        <h4 className="fsizeTable">
                          <strong>Filtros</strong>{" "}
                        </h4>
                      </Col>
                      <Col xs="1" md="2">
                        <h6 className="fsizeTable">Año</h6>
                      </Col>
                      <Col xs="3" md="2">
                        <Form.Select
                          as="select"
                          name="year"
                          onChange={inputsHandler}
                          //    disabled={disabledFecha}
                        >
                          {selectYear.map((option) =>
                            option.year === yearActual ? (
                              <option
                                key={option.id}
                                value={option.year}
                                selected
                              >
                                {option.year}
                              </option>
                            ) : (
                              <option
                                key={option.id}
                                defaultValue={option.year}
                              >
                                {option.year}
                              </option>
                            )
                          )}
                        </Form.Select>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="4">
                        <Form.Check
                          type="switch"
                          label="Mes"
                          onChange={onMesChange}
                        />
                      </Col>
                      <Col xs="4">
                        <Form.Check
                          type="switch"
                          label="Tipo"
                          onChange={onTipoChange}
                        />
                      </Col>
                      <Col xs="4">
                        <Form.Check
                          type="switch"
                          label="Condición"
                          onChange={onCondicionChange}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="4">
                        <Form.Select
                          as="select"
                          name="meses"
                          onChange={inputsHandler}
                          disabled={disabledFecha}
                          >
                            {selectMes.map((option) =>
                            option.id === shFecha ? (
                              <option
                                key={option.id}
                                value={option.id}
                                selected
                              >
                                {option.mes}
                              </option>
                            ) : (
                              <option key={option.id} value={option.id}>
                                {option.mes}
                              </option>
                            )
                          )}
                        </Form.Select>
                      </Col>
                      <Col xs="4">
                        <Form.Control
                          as="select"
                          name="tipoGasto"
                          disabled={disabledTipo}
                          onChange={inputsHandler}
                        >
                          <option key={0} value={0}></option>
                          {selectTipoGasto.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.descripcion}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col xs="4">
                        <Form.Control
                          as="select"
                          name="condicion"
                          disabled={disabledCond}
                          onChange={inputsHandler}
                        >
                          <option key={0} value={0}></option>
                          {selectCondicion.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.descripcion}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
              </Form>
            </Row>
            <Row className="mt-1 d-flex align-items-center sizeTable">
              <Col xs="12" className="mb-4">
                <Seach
                  textSeach=" Buscar por descripción. . . ."
                  seach=""
                  registro=""
                  onConfirma={(valor) => {
                    setSeach(valor);
                    handdleBuscar();
                  }}
                />
              </Col>
            </Row>
          </section>
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
          <h5 className="mt-5 text-center">{errorMsg}</h5>{" "}
        </>
      )}
      {!loading && !error && login && gastos && (
        <>
          <Card className="mb-3 mx-3 shadow">
            <ListTable
              datas={gastos}
              handdleEditGasto={handdleEditGasto}
              handleDelete={handleDelete}
              help={0}
            />
          </Card>
          <Card className="mb-3 mx-3 shadow-sm">
            <Pagination
              page={page}
              pageCount={pageCount}
              regshow={regshow}
              setRegshow={setRegshow}
              setPage={setPage}
              handleFirst={handleFirst}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              handleLast={handleLast}
              pageNext={pageNext}
            />
          </Card>
        </>
      )}
      {!loading && !error && !gastos && (
        <>
          <hr />
          <h4>No hay Registros</h4>
        </>
      )}
      {addModa && (
        <GastosModal
          tittle="Adicionar Gasto"
          registro=""
          onClose={() => {
            setAddModal(false);
          }}
          onConfirm={() => {
            setAddModal(false);
            getGastos();
            setInformacionModal({
              isOpen: true,
              title: "Resultado de la Ejecución",
              body: "Registro Creado Correctamente",
            });
          }}
          help={0}
        />
      )}
      {editModa && (
        <GastosModal
          tittle="Gastos"
          registro={register}
          onClose={() => {
            setEditModal(false);
          }}
          onConfirm={() => {
            setEditModal(false);
            getGastos();
            setInformacionModal({
              isOpen: true,
              title: "Resultado de la Ejecución",
              body: "Registro Actualizado Correctamente",
            });
          }}
          help={0}
        />
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
      {verifyDeleteModal.isOpen && (
        <VerifyDelete
          titulo={verifyDeleteModal.title}
          descripcion={verifyDeleteModal.body}
          onClose={() => {
            setVerifyDeleteModal({ isOpen: false, title: "", body: "" });
          }}
          onConfirmar={() => {
            deleteGastos(register);
            setVerifyDeleteModal({ isOpen: false, title: "", body: "" });
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

export default ListarGastos;
