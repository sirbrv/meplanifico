import React, { useState, useEffect } from "react";
import axios from "../../../api/direct";
import { axiosFetch } from "../../../hoocks/useAxios";
import * as RiIcons from "react-icons/fi";
import ControlAcceso from "../../../componets/ControlAcceso";

//  ***** Call to React-Bosotrap ****************** //
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
//  ***** Call to Aplication ****************** //
import InfoModal from "../../../componets/Informacion";
import VerifyDelete from "../../../componets/VerifyDelete";
import Pagination from "../../../componets/Pagination";
import ListTables from "./ListTables";
import UserModal from "./UserModal";
//  ***** Call to Redux ****************** //
import { useSelector } from "react-redux";

function ListarUsers() {
  const [addModa, setAddModal] = useState(false);
  const [editModa, setEditModal] = useState(false);
  const [users, setUsers] = useState([]);
  //const [usersDatas, errors, loadings, axiosFetch] = UseAxiosFunction();
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
    nEmpresa: "N.Empresa o RUT",
    nombre: "Nombre",
    email: "Email",
    rol: "Rol",
  };

  const user = useSelector((state) => state.users.value);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState("");
  const [getRefrech, setGetRefrech] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false); //different!
  const [page, setPage] = useState(1);
  const [regshow, setRegshow] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [pageNext, setPageNext] = useState(false);

  //************  Constantes *********** */
  const endpoint = "/api/admin/user";
  //*************  Funciones  axios*********** */
  const getData = async () => {
    setLoading(true);
    const options = {
      limit: regshow,
      offset: (page - 1) * regshow,
    };

    await axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: endpoint,
      requestConfig: {
        params: options,
      },
    })
      .then((response) => {
        if (response.status === "200") {
          setUsers(response.data.users);
          setPageCount(response.data.totalPages);
          setPageNext(response.data.hasNextPage);
          // dispatch(getUsers(response.data.users));
          setError(false);
        } else {
          setInformacionModal({
            isOpen: true,
            title: "Listado de Usuarios",
            body: response.msg,
          });
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

  const deleteUser = async (reg) => {
    const newUrl = `${endpoint}/${reg} `;
    await axiosFetch({
      axiosInstance: axios,
      method: "DELETE",
      url: newUrl,
      requestConfig: {},
    }).then((posts) => {
      if (posts.status === "200" || "304") {
        gerUsers();
      }
    });
  };

  const gerUsers = async () => {
    await getData();
  };

  //*************  Funciones  axios*********** */
  const handdleAddUser = () => {
    setAddModal(true);
  };

  const handdleEditUser = (id) => {
    setRegister(id);
    setEditModal(true);
  };

  const handdleRefrech = () => {
    setPage(1);
    setGetRefrech(true);
  };

  const handleDelete = (id) => {
    setRegister(id);
    gerUsers();
    setVerifyDeleteModal({
      isOpen: true,
      title: "Eliminar Usuarios",
      body: "Está seguro de eliminar el registro",
    });

    //  dispatch(deleteUser(id));
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

  useEffect(() => {
    gerUsers();
    setGetRefrech(false);
    if (!user[0]) {
      setLogin(false);
    } else {
      setLogin(true);
    }

    // eslint-disable-next-line
  }, [getRefrech, page, regshow]);
  return (
    <>
      {!login && <ControlAcceso />}
      {login && (
        <div>
          <Row className="m-3 d-flex justify-space-between">
            <Col className="" sm={4} xs={4}>
              <h3 className="fsize">Usuários</h3>
            </Col>
            <Col className="d-flex justify-content-end" sm={8} xs={8}>
              <Row className="d-flex justify-content-end">
                <Col xs="12">
                  <Button variant="primary" size="sm" onClick={handdleAddUser}>
                    <RiIcons.FiPlus />
                  </Button>{" "}
                  <Button variant="primary" size="sm" onClick={handdleRefrech}>
                    <RiIcons.FiRefreshCw />
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
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
      {login && !loading && !error && users && (
        <>
          <Card className="mb-3 mx-3 shadow">
            <ListTables
              tableTitel={tableTitel}
              datas={users}
              handdleEditUser={handdleEditUser}
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
      {login && !loading && !error && !users && (
        <>
          <hr />
          <h4>No hay Registros</h4>
        </>
      )}
      {login && addModa && (
        <UserModal
          className="modal-dialog"
          tittle="Adicionar Usuarios"
          registro=""
          onClose={() => {
            setAddModal(false);
          }}
          onConfirm={() => {
            setAddModal(false);
            gerUsers();
            setInformacionModal({
              isOpen: true,
              title: "Resultado de la Ejecución",
              body: "Registro Creado Correctamente",
            });
          }}
        />
      )}
      {login && editModa && (
        <UserModal
          tittle="Actualizar Usuarios"
          registro={register}
          onClose={() => {
            setEditModal(false);
          }}
          onConfirm={() => {
            setEditModal(false);
            gerUsers();
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
            deleteUser(register);
            setVerifyDeleteModal({ isOpen: false, title: "", body: "" });
          }}
        />
      )}
    </>
  );
}
export default ListarUsers;
