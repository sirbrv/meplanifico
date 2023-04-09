import React from "react";
import styled from "styled-components";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../../pages/ab.css";
const FooterPie = styled.div`
  background: #333;
  color: white;
  font-size: 1rem;
  height: 90px;
  botton: 0 @media only screen and (max-width: 880px) {
    font-size: 1rem;
  }
  @media only screen and (max-width: 680px) {
    font-size: 0.9rem;
  }
  @media only screen and (max-width: 580px) {
    font-size: 0.8rem;
  }
  @media only screen and (max-width: 510px) {
    font-size: 0.7rem;
  }
  @media only screen and (max-width: 450px) {
    font-size: 0.6rem;
  }
`;

const FooterDiv = styled.div`
  padding: 0 0 0 30px;
  height: 40px;
`;

function Footer() {
  return (
    <>
      <FooterPie className="d-flex align-items-center">
        <Row className="d-flex align-items-center justify-content-start">
          <Col xs={12}>
            <FooterDiv>
              &copy; {new Date().getFullYear()} made by -{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://google.com"
              >
                MePlanifíco.com
              </a>
              <b>
                <em> -{"  "}Todos los derechos reservados.</em>
              </b>
            </FooterDiv>
          </Col>
        </Row>
      </FooterPie>
    </>
  );
}

export default Footer;
