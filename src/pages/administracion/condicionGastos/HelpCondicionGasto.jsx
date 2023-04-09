import React, { useState, useEffect } from "react";
import axios from "../../../api/direct";
import { axiosFetch } from "../../../hoocks/useAxios";
//  ***** Call to React-Bosotrap ****************** //
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

//  ***** Call to Aplication ****************** //
import Seach from "../../../componets/Busquedas";
import ListTables from "./ListTableCondicionGasto";
import InfoModal from "../../../componets/Informacion";
import Pagination from "../../../componets/Pagination";
import "../../ab.css";

function HelpCondicionGastos({ onClose, handleSelect }) {
  const [show, setShow] = useState(false);
  const [condicionGastos, setCondicionGastos] = useState([]);
  const [seach, setSeach] = useState("");
  const [informacionModal, setInformacionModal] = useState({
    isOpen: false,
    title: "",
    body: "",
  });
  const handleClose = () => [setShow(false), onClose()];
  const handleShow = () => setShow(true);
  const [getRefrech, setGetRefrech] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false); //different!
  const [page, setPage] = useState(1);
  const [regshow, setRegshow] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [pageNext, setPageNext] = useState(false);
  const user = useSelector((state) => state.users.value);

  //*************  Funciones  axios*********** */

  // const dataSelect = "";
  const endpoint = "/api/admin/condicion";
  const getData = async () => {
    setLoading(true);
    const options = {
      limit: regshow,
      offset: (page - 1) * regshow,
      page: page,
      sch: seach,
      tipo: "Gastos",
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
          setCondicionGastos(response.data.CondicionGastos);
          setPageCount(response.data.totalPages);
          setPageNext(response.data.hasNextPage);
          //         dispatch(getUsers(response.data.docs));
          setError(false);
        } else {
          if (response.msg === undefined) {
            setInformacionModal({
              isOpen: true,
              title: "Listado de Condición de Gastos",
              body: response,
            });
          } else {
            setInformacionModal({
              isOpen: true,
              title: "Listado de Condición de Gastos",
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

  const getCondicionGastos = async () => {
    await getData();
  };

  //*************  Funciones  axios*********** */

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

  const tittle = "Ayuda de Condiciones de Gastos";

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

  const handleSelecta = (valor) => {
    handleSelect(valor);
  };

  //*************  useEffect *********** */
  useEffect(() => {
    getCondicionGastos();
    handleShow();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getCondicionGastos();
    setGetRefrech(false);
    // eslint-disable-next-line
  }, [getRefrech, page, regshow]);
  return (
    <>
      <Modal show={show} onHide={handleClose} size="md">
        <div className="m-1 shadow fsize">
          <Modal.Header closeButton>
            <Modal.Title>
              <h3 className="fsize">{tittle}</h3>
            </Modal.Title>
          </Modal.Header>
          <Seach
            textSeach=" Buscar por nombre. . . ."
            seach=""
            registro=""
            onConfirma={(valor) => {
              setSeach(valor);
              handdleBuscar();
            }}
          />
          {loading && (
            <div>
              <hr />
              <h5 className="mt-5 text-center">Loading...</h5>
            </div>
          )}
          {!loading && error && (
            <div>
              <hr />
              <h5 className="mt-5 text-center">{errorMsg}</h5>{" "}
            </div>
          )}
          {!loading && !error && condicionGastos && (
            <div>
              <Card className="mb-3 mx-3 shadow">
                <ListTables
                  datas={condicionGastos}
                  handleSelect={handleSelecta}
                  help={1}
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
            </div>
          )}
          {!loading && !error && !condicionGastos && (
            <div>
              <hr />
              <h4>No hay Registros</h4>
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
          )}{" "}
        </div>
        <Row className="p-2 d-flex justify-content-center">
          <Col className="d-flex justify-content-center">
            <Button variant="danger" onClick={handleClose}>
              Cancelar
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
export default HelpCondicionGastos;
