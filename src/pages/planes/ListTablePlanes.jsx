import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import * as RiIcons from "react-icons/fi";
import "../ab.css";
function LisTablePlanes({
  datas,
  handdleEditIngreso,
  handleDelete,
  selectMes,
}) {
  return (
    <Table striped bordered hover size="sm" responsive className=" fsizeTable">
      <thead>
        <tr align="center">
          <th>Año</th>
          <th>Mes</th>
          <th>Tipo de Gasto</th>
          <th>Importe</th>
          <th colSpan={2}>Acción</th>
        </tr>
      </thead>
      <tbody>
        {datas.map((item) => (
          <tr key={item.id}>
            <td align="center" >
              {item.year}
            </td>
            <td align="center">
              {selectMes.map((option) =>
                option.id === parseInt(item.mes) ? option.mes : ""
              )}
            </td>
            <td>{item.tipoGastoDescripcion}</td>
            <td align="right">{item.monto}</td>
            <td align="center">
              <Button
                variant="warning"
                size="sm"
                onClick={() => handdleEditIngreso(item.id)}
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

export default LisTablePlanes;
