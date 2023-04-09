import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import * as RiIcons from "react-icons/fi";
import "../../ab.css";
function ListTables({ datas, handdleEditUser, handleDelete }) {
  return (
    <Table striped bordered hover size="sm" responsive className=" fsizeTable">
      <thead>
        <tr align="center">
          <th>Núm. Empresa</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
          <th colSpan={2}>Acción</th>
        </tr>
      </thead>
      <tbody>
        {datas.map((item) => (
          <tr key={item.id}>
            <td align="center">{item.rut}</td>
            <td>{item.nombre}</td>
            <td>{item.email}</td>
            <td align="center">{item.rol}</td>
            <td align="center">
              <Button
                variant="warning"
                size="sm"
                onClick={() => handdleEditUser(item.id)}
              >
                <RiIcons.FiEdit />
              </Button>
            </td>
            <td align="center">
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(item.id)}
              >
                <RiIcons.FiTrash2 />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ListTables;
