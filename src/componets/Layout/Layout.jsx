import { useState } from "react";
import Sidebar from "../../componets/sidebar/Sidebar";
import Footer from "../../pages/footer/Footer";
import Container from "react-bootstrap/Container";
import "../../../src/App.css";

const Layout = ({ children }) => {
  const [closesidebar, setCloseSidebar] = useState(false);
  return (
    <>
      <Sidebar closesidebar={closesidebar} />
      <main onClick={() => setCloseSidebar(!closesidebar)}>
        <Container fluid>{children}</Container>
      </main>
      <Footer />
    </>
  );
};
export default Layout;
