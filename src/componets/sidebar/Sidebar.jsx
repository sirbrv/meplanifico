import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import Button from "react-bootstrap/Button";
const Sidebar = (closesidebar) => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    sidebar ? setSidebar(false) : setSidebar(true);
  };

  useEffect(() => {
    if (closesidebar) {
      if (sidebar) {
        setSidebar(!sidebar);
      }
    }
    // eslint-disable-next-line
  }, [closesidebar]);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="nav">
          <Button onClick={showSidebar} className="navIcon btn-sm">
            <FaIcons.FaBars />
          </Button>
          <h2 className="sidebarTitulo">Me Planifíco</h2>
        </div>
        <nav
          sidebar={sidebar.toString()}
          className={sidebar ? "sidebarNavRigth" : "sidebarNavLeft"}
        >
          <div className="sidebarWrap">
            <Link to="#" className="navIcon">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </Link>
            {SidebarData.map((item, index) => {
              return (
                <SubMenu item={item} key={index} setSidebar={setSidebar} />
              );
            })}
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
