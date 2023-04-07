import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

function VerifyDelete({ titulo, descripcion, onClose, onConfirmar }) {
  const [show, setShow] = useState(false);
  const handleClose = () => [setShow(false), onClose()];
  const handleConfirmar = () => [setShow(false), onConfirmar()];
  const handleShow = () => setShow(true);

  useEffect(() => {
    handleShow();
    // eslint-disable-next-line
  }, []);
  return (
    <Card border="primary" style={{ width: "18rem" }}>
      <Modal show={show} onHide={handleClose} size="md" className="mt-5">
        <Modal.Header closeButton>
          <Modal.Title>
            <b>{titulo}</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Title>
            <h5>
              <span>{descripcion}</span>
            </h5>
          </Modal.Title>
          <hr />
          <Row className="mb-1">
            <Col className="px-4 d-flex justify-content-start">
              <Button variant="warning" onClick={handleClose}>
                Cancelar
              </Button>
            </Col>
            <Col className="px-4 d-flex justify-content-end">
              <Button variant="primary" onClick={handleConfirmar}>
                Confirmar
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </Card>
  );
}

export default VerifyDelete;
