import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import * as RiIcons from "react-icons/fi";
import "../../ab.css";
function ListTablesTipoIngreso({
  datas,
  handdleEditTipoIngreso,
  handleDelete,
  handleSelect,
  help,
}) {
  return (
    <Table striped bordered hover size="sm" responsive className=" fsizeTable">
      <thead>
        <tr align="center">
          {<th>Dirección</th>}
          {<th colSpan={2}>Acción</th>}
        </tr>
      </thead>
      <tbody>
        {help === 0 &&
          datas.map((item) => (
            <tr key={item.id}>
              <td align="center">{item.descripcion}</td>
              <td align="center">
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handdleEditTipoIngreso(item.id)}
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
        {help === 1 &&
          datas.map((item) => (
            <tr key={item.id}>
              <td>
                <Button variant="href" onClick={() => handleSelect(item)}>
                  {item.descripcion}
                </Button>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}

export default ListTablesTipoIngreso;
