import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import * as RiIcons from "react-icons/fi";
import "./../pages/ab.css"

function Pagination({
  page,
  pageCount,
  regshow,
  setRegshow,
  setPage,
  handleFirst,
  handlePrevious,
  handleNext,
  handleLast,
  pageNext,
}) {
  return (
    <Row className="mt-1 fsizeTable">
      <Col className="mb-3 mx-3 fsizeTable " sm={5}>
        <div>
          <label>
            <em>
              {" "}
              <b>Página</b>&nbsp;
              {page}
              &nbsp;<b>de</b>&nbsp;
              {pageCount}
              {"."}
            </em>
          </label>
        </div>
        <div>
          <label>
            <em>
              {" "}
              <b>
                Item por Página {regshow}&nbsp;{"."}
              </b>
            </em>
          </label>
          <div>
            <label>
              <em>
                <b>Cambiar Selección &nbsp;</b>
              </em>
            </label>
            <select
              onChange={(event) => {
                setRegshow(event.target.value);
              }}
            >
              <option></option>
              {Array(10)
                .fill(null)
                .map((_, index) => {
                  return (
                    <option value={(index + 1) * 10} key={index}>
                      {(index + 1) * 10}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </Col>
      <Col className="my-3  paginacion" sm={6}>
        <div className="">
          <Button
            size="sm"
            variant="outline-secondary"
            disabled={page === 1}
            onClick={handleFirst}
          >
            <RiIcons.FiChevronsLeft />
          </Button>
          <Button
            size="sm"
            variant="outline-secondary"
            disabled={page === 1}
            onClick={handlePrevious}
          >
            <RiIcons.FiChevronLeft />
          </Button>
          {pageNext ? (
            Array(pageCount)
            .fill(null)
            // eslint-disable-next-line
            .map((_, index) => {
                let valor = index + 1;
                let min = page;
                let max = page + 4;
                if (valor > min && valor < max) {
                  return (
                    <Button
                      style={{ width: "2rem" }}
                      size="sm"
                      variant="outline-secondary"
                      key={index}
                      value={index + 1}
                      onClick={(event) => {
                        setPage(event.target.value);
                      }}
                    >
                      {index + 1}
                    </Button>
                  );
                }
              })
          ) : (
            <Button
              style={{ width: "2rem" }}
              size="sm"
              variant="outline-secondary"
              key={page}
              value={page}
              onClick={(event) => {
                setPage(event.target.value);
              }}
            >
              {page}
            </Button>
          )}

          <Button
            size="sm"
            variant="outline-secondary"
            disabled={page === pageCount}
            onClick={handleNext}
          >
            <RiIcons.FiChevronRight />
          </Button>
          <Button
            size="sm"
            variant="outline-secondary"
            disabled={page === pageCount}
            onClick={handleLast}
          >
            <RiIcons.FiChevronsRight />
          </Button>
        </div>
      </Col>
    </Row>
  );
}

export default Pagination;
