import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import "../pages/ab.css"
function Informacion({ titulo, descripcion, onClose }) {
  const [show, setShow] = useState(false);

  const handleClose = () => [setShow(false), onClose()];

  const handleShow = () => setShow(true);

  useEffect(() => {
    handleShow();
  }, []);
  return (
    <>
      <Card
        border="primary"
        style={{ width: "10rem" }}
        className="d-flex justify-content-center aling-item-center margen"
      >
        <Modal
          show={show}
          onHide={handleClose}
          size="md"
          // className="mt-5"
          dialogClassName="fullscreen-modal d-flex justify-content-center fsize modal-dialog"
          aria-labelledby="contained-modal-title-vcenter"
          centered           
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h4>{titulo}</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Modal.Title>
              <h6>
                <span>{descripcion}</span>
              </h6>
            </Modal.Title>
            <hr />
            <Row className="mb-1 aling-item-center">
              <Col></Col>
              <Col xs={3}>
                <Button variant="warning" onClick={handleClose}>
                  Cancelar
                </Button>
              </Col>
              <Col></Col>
            </Row>
          </Modal.Body>
        </Modal>
      </Card>
    </>
  );
}

export default Informacion;
