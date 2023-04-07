import React, { useState, useEffect } from "react";
import axios from "../../../api/direct";
import { axiosFetch } from "../../../hoocks/useAxios";
import * as RiIcons from "react-icons/fi";

//  ***** Call to React-Bosotrap ****************** //
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

//  ***** Call to Aplication ****************** //
import Seach from "../../../componets/Busquedas";
import ContactoModal from "./ContactModal";
import InfoModal from "../../../componets/Informacion";
import VerifyDelete from "../../../componets/VerifyDelete";
import ListTables from "./ListTablesCont";
import Pagination from "../../../componets/Pagination";
import "../../ab.css";

function ListaContactos() {
  const [addModa, setAddModal] = useState(false);
  const [editModa, setEditModal] = useState(false);
  const [contactos, setContactos] = useState([]);
  const [seach, setSeach] = useState("");
  //const [ContactosDatas, errors, loadings, axiosFetch] = UseAxiosFunction();
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
  const tableTitel = {
    clave: "Clave",
    nombre: "Nombres",
    apellido: "Apellidos",
    email: "Email",
    comentario: "comentario",
  };

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
  const endpoint = "/api/admin/contact";

  //*************  Funciones  axios*********** */
  const getData = async () => {
    setLoading(true);

    const options = {
      limit: regshow,
      offset: (page - 1) * regshow,
      page: page,
      sch: seach,
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
          setContactos(response.data.contactos);
          setPageCount(response.data.totalPages);
          setPageNext(response.data.hasNextPage);
          //   setPage(response.data.page);
          //         dispatch(getUsers(response.data.docs));
          setError(false);
        } else {
          if (response.msg === undefined) {
            setInformacionModal({
              isOpen: true,
              title: "Listado de Contactos",
              body: response,
            });
          } else {
            setInformacionModal({
              isOpen: true,
              title: "Listado de Contactos",
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

  const deleteContacto = async (reg) => {
    const newUrl = `${endpoint}/${reg} `;
    axiosFetch({
      axiosInstance: axios,
      method: "DELETE",
      url: newUrl,
      requestConfig: {},
    }).then((posts) => {
      if (posts.status === "200" && "304") {
        getContactos();
      }
    });
  };

  const getContactos = async () => {
    await getData();
  };

  //*************  Funciones  axios*********** */
  const handdleAddContacto = () => {
    setAddModal(true);
  };

  const handdleEditContacto = (id) => {
    setRegister(id);
    setEditModal(true);
  };

  const handdleBuscar = () => {
    setPage(1);
    setGetRefrech(true);
  };
  
  const handdleRefrech = () => {
    setPage(1);
    setSeach("");
    setGetRefrech(true);
  };

  const handleDelete = (id) => {
    setRegister(id);
    getContactos();
    setVerifyDeleteModal({
      isOpen: true,
      title: "Eliminar Contactos",
      body: "Está seguro(a) de eliminar el registro",
    });

    //  dispatch(deleteContact(id));
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
    getContactos();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getContactos();
    setGetRefrech(false);
    // eslint-disable-next-line
  }, [getRefrech, page, regshow]);

  return (
    <>
      <div className="margen ">
        <Row className="m-3 d-flex align-items-center">
          <Col className="" sm={9} xs={8}>
            <h3 className="fsize">Administración de Contactos </h3>
          </Col>
          <Col className="d-flex justify-content-end" sm={3} xs={4}>
            <Row className="d-flex justify-content-end">
              <Col xs="12">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handdleAddContacto}
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
          textSeach=" Buscar por apellido. . . ."
          seach=""
          registro=""
          onConfirma={(valor) => {
            setSeach(valor);
            handdleBuscar();
          }}
        />
      </div>
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
      {!loading && !error && contactos && (
        <>
          <Card className="mb-3 mx-3 shadow">
            <ListTables
              tableTitel={tableTitel}
              datas={contactos}
              handdleEditContacto={handdleEditContacto}
              handleDelete={handleDelete}
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
      {!loading && !error && !contactos && (
        <>
          <hr />
          <h4>No hay Registros</h4>
        </>
      )}
      {addModa && (
        <ContactoModal
          tittle="Adicionar Contactos"
          registro=""
          onClose={() => {
            setAddModal(false);
          }}
          onConfirm={() => {
            setAddModal(false);
            getContactos();
            setInformacionModal({
              isOpen: true,
              title: "Resultado de la Ejecución",
              body: "Registro Creado Correctamente",
            });
          }}
        />
      )}
      {editModa && (
        <ContactoModal
          tittle="Actualizar Contactos"
          registro={register}
          onClose={() => {
            setEditModal(false);
          }}
          onConfirm={() => {
            setEditModal(false);
            getContactos();
            setInformacionModal({
              isOpen: true,
              title: "Resultado de la Ejecución",
              body: "Registro Actualizado Correctamente",
            });
          }}
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
            deleteContacto(register);
            setVerifyDeleteModal({ isOpen: false, title: "", body: "" });
          }}
        />
      )}
    </>
  );
}
export default ListaContactos;
