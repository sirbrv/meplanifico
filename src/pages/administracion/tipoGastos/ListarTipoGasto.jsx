import React, { useState, useEffect } from "react";
import axios from "../../../api/direct";
import { axiosFetch } from "../../../hoocks/useAxios";
import * as RiIcons from "react-icons/fi";
import ControlAcceso from "../../../componets/ControlAcceso";

//  ***** Call to React-Bosotrap ****************** //
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

//  ***** Call to Redux ****************** //
import { useSelector } from "react-redux";

//  ***** Call to Aplication ****************** //
import Seach from "../../../componets/Busquedas";
import TipoGastoModal from "./TipoGastoModal";
import ListTable from "./ListTableTipoGasto";
import InfoModal from "../../../componets/Informacion";
import VerifyDelete from "../../../componets/VerifyDelete";
import Pagination from "../../../componets/Pagination";
import "../../ab.css";

function ListarTipoGasto() {
  const [addModa, setAddModal] = useState(false);
  const [editModa, setEditModal] = useState(false);
  const [tipoGasto, setTipoGasto] = useState([]);
  const [seach, setSeach] = useState("");
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

  const [register, setRegister] = useState("");
  const [getRefrech, setGetRefrech] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false); //different!
  const [page, setPage] = useState(1);
  const [regshow, setRegshow] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [pageNext, setPageNext] = useState(false);

  //************  Constantes ********* */
  const user = useSelector((state) => state.users.value);
  const [login, setLogin] = useState(false);
  const endpoint = "/api/admin/tipoGasto";

  //*************  Funciones  axios*********** */
  const getData = async () => {
    setLoading(true);

    const options = {
      limit: regshow,
      offset: (page - 1) * regshow,
      page: page,
      sch: seach,
      email: user[0].email,
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
          setTipoGasto(response.data.tipoGastos);
          setPageCount(response.data.totalPages);
          setPageNext(response.data.hasNextPage);
          setError(false);
        } else {
          if (response.msg === undefined) {
            setInformacionModal({
              isOpen: true,
              title: "Listado de tipo de Gastos",
              body: response,
            });
          } else {
            setInformacionModal({
              isOpen: true,
              title: "Listado de tipo de Gastos",
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

  const deleteTipoGasto = async (reg) => {
    const newUrl = `${endpoint}/${reg} `;
    axiosFetch({
      axiosInstance: axios,
      method: "DELETE",
      url: newUrl,
      requestConfig: {},
    }).then((posts) => {
      if (posts.status === "200" || "304") {
        getTipoGasto();
      }
    });
  };

  const getTipoGasto = async () => {
    await getData();
  };

  //*************  Funciones  axios*********** */

  const handdleAddTipoGasto = () => {
    setAddModal(true);
  };

  const handdleEditTipoGasto = (id) => {
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
    getTipoGasto();
    setVerifyDeleteModal({
      isOpen: true,
      title: "Eliminación de Tipo de Gastos",
      body: "Está seguro de eliminar el registro",
    });
  };
  const handleSelect = () => {
    console.log("Voy por Salida de select");
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

  //*************  useEffect *********** */
  useEffect(() => {
    if (!user[0]) {
      setLogin(false);
    } else {
       setLogin(true);
     getTipoGasto();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!user[0]) {
      setLogin(false);
    } else {
      setLogin(true);
      getTipoGasto();
      setGetRefrech(false);
    }
    // eslint-disable-next-line
  }, [getRefrech, page, regshow]);
  return (
    <Container>
      {!login && <ControlAcceso />}
      {login && (
        <div className="mx-4 my-3">
          <Row className="m-3 d-flex align-items-center m -3">
            <Col className="" sm={9} xs={8}>
              <h3 className="fsize">Tipo de Gastos</h3>
            </Col>
            <Col className="d-flex justify-content-end" sm={3} xs={4}>
              <Row className="d-flex justify-content-end">
                <Col xs="12">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handdleAddTipoGasto}
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
          <Seach
            textSeach=" Buscar por nombre. . . ."
            seach=""
            registro=""
            onConfirma={(valor) => {
              setSeach(valor);
              handdleBuscar();
            }}
          />
        </div>
      )}
      {login && loading && (
        <>
          <hr />
          <h5 className="mt-5 text-center">Loading...</h5>
        </>
      )}
      {login && !loading && error && (
        <>
          <hr />
          <h5 className="mt-5 text-center">{errorMsg}</h5>{" "}
        </>
      )}
      {login && !loading && !error && tipoGasto && (
        <>
          <Card className="mb-3 mx-3 shadow">
            <ListTable
              datas={tipoGasto}
              handdleEditTipoGasto={handdleEditTipoGasto}
              handleDelete={handleDelete}
              handleSelect={handleSelect}
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
      {login && !loading && !error && !tipoGasto && (
        <>
          <hr />
          <h4>No hay Registros</h4>
        </>
      )}
      {addModa && (
        <TipoGastoModal
          tittle="Adicionar Tipo de Gasto"
          registro=""
          onClose={() => {
            setAddModal(false);
          }}
          onConfirm={() => {
            setAddModal(false);
            getTipoGasto();
            setInformacionModal({
              isOpen: true,
              title: "Resultado de la Ejecución",
              body: "Registro Creado Correctamente",
            });
          }}
          help={1}
        />
      )}
      {editModa && (
        <TipoGastoModal
          tittle="Actualizar Tipo de Gasto"
          registro={register}
          onClose={() => {
            setEditModal(false);
          }}
          onConfirm={() => {
            setEditModal(false);
            getTipoGasto();
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
            deleteTipoGasto(register);
            setVerifyDeleteModal({ isOpen: false, title: "", body: "" });
          }}
        />
      )}
    </Container>
  );
}
export default ListarTipoGasto;
