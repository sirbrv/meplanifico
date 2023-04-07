import React, { useState } from "react";
import * as RiIcons from "react-icons/bs";
import InputGroup from "react-bootstrap/InputGroup";
function Seach({ textSeach, busqueda, onConfirma }) {
  const [seach, setSeach] = useState("");
  const inputsHandler = (e) => {
    setSeach(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSeach(e.target.value);
    e.target.value = "";
    onConfirma(seach);
  };

  return (
    <>
      {/* <div className="marcoSeach"> */}
        <form className="form-search" onSubmit={handleSubmit}>
          <InputGroup>
            <div className="input-group">
              <input
                className="form-control form-text"
                placeholder={textSeach}
                onChange={inputsHandler}
                value={seach}
                type="text"
                name="buscar"
                id="buscar"
              />
              <button className="btn btn-primary ">
                <RiIcons.BsSearch />
              </button>
            </div>
          </InputGroup>
        </form>
      {/* </div> */}
    </>
  );
}

export default Seach;
