import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import * as RiIcons from "react-icons/fi";
import "../ab.css";
function LisTableIngresos({ datas, handdleEditIngreso, handleDelete }) {
  const formatoDate = (date) => {
    const [dFecha, hora] = date.split("T");
    const [year, month, day] = dFecha.split("-");
    const dates = day + "-" + month + "-" + year;
    return dates;
  };
  return (
    <Table striped bordered hover size="sm" responsive className=" fsizeTable">
      <thead>
        <tr align="center">
          <th>Fecha</th>
          <th>Descripción</th>
          <th>Tipo</th>
          <th>Importe</th>
          <th>Condición del Ingreso</th>
          <th colSpan={2}>Acción</th>
        </tr>
      </thead>
      <tbody>
        {datas.map((item) => (
          <tr key={item.id}>
            <td align="center" className="wt-20">
              {formatoDate(item.fecha)}
            </td>
            <td className="wt-30">{item.descripcion}</td>
            <td>{item.tipoIngresoDescripcion}</td>
            <td align="right">{item.monto}</td>
            <td>{item.condicionDescripcion}</td>
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

export default LisTableIngresos;
