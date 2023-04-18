import React, { useState } from "react";
import * as RiIcons from "react-icons/bs";
import InputGroup from "react-bootstrap/InputGroup";
import "./component.css";

function Seach({ textSeach, onConfirma }) {
  const [seach, setSeach] = useState("");
  const inputsHandler = (e) => {
    setSeach(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.value = "";
    onConfirma(seach);
  };

  return (
    <>
      <div>
        <form className="" onSubmit={handleSubmit}>
          <InputGroup className="">
            <div className="input-group mb-1 br-3">
              <button className="btn btn-outline-primary">
                <RiIcons.BsSearch />
              </button>
              <input
                className="form-control form-text"
                placeholder={textSeach}
                onChange={inputsHandler}
                //         value={seach}
                type="text"
                name="buscar"
              />
            </div>
          </InputGroup>
        </form>
      </div>
    </>
  );
}

export default Seach;
