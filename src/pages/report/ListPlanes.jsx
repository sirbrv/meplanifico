import React from "react";
import Table from "react-bootstrap/Table";
// { FiItalic } from "react-icons/fi";
import "../ab.css";
function LisTableIngresos({ dataIngreso, totalIngreso }) {
  const formatoDate = (date) => {
    const [dFecha, hora] = date.split("T");
    const [year, month, day] = dFecha.split("-");
    const dates = day + "-" + month + "-" + year;
    return dates;
  };
  totalIngreso = 0;
  return (
    <Table striped bordered hover size="sm" responsive className=" fsizeTable">
      <thead>
        <tr align="center">
          <th>Fecha</th>
          <th>Grupo</th>
          <th>Tipo</th>
          <th>Importe</th>
        </tr>
      </thead>
      <tbody>
        {dataIngreso.map((item) => (
          <tr className={item.dt === 1 ? "nomal" : "negrilla"} key={item.id}>
            <td align="center" className="wt-20">
              {item.fecha ? formatoDate(item.fecha) : ""}
            </td>
            <td className="wt-40">{item.descripcion}</td>
            <td className="wt-30">{item.tipo}</td>
            <td align="right" className="wt-10">
              {item.monto}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default LisTableIngresos;
