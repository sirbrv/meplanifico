import React, { useState } from "react";
function ShowSelecter(dataSelect, selecetValue) {
  return (
    <>
      {dataSelect.map((option) =>
        option.value === selecetValue ? (
          <option key={option.value} value={option.value} selected>
            {option.descrip}
          </option>
        ) : (
          <option key={option.value}>{option.descrip}</option>
        )
      )}
    </>
  );
}

export default ShowSelecter;
