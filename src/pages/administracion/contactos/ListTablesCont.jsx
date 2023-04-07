import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import * as RiIcons from "react-icons/fi";
import "../../ab.css";

function ListTablesCli({ datas, handdleEditContacto, handleDelete }) {
  return (
    <Table striped bordered hover size="sm" responsive className=" fsizeTable">
      <thead>
        <tr align="center">
          <th>Nombre</th>
          <th>Email</th>
          <th>Comentarios</th>
          <th colSpan={2}>Acción</th>
        </tr>
      </thead>
      <tbody>
        {datas.map((item) => (
          <tr key={item.id}>
            <td>
              {item.nombre + " "}  
              {item.apellido}
            </td>
            <td>{item.email}</td>
            <td>{item.comentario}</td>
            <td align="center">
              <Button
                variant="warning"
                size="sm"
                onClick={() => handdleEditContacto(item.id)}
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

export default ListTablesCli;
