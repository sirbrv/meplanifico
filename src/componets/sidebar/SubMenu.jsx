import React, { useState } from "react";
import { Link } from "react-router-dom";
const SubMenu = ({ item, setSidebar }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => {
    setSubnav(!subnav);
  };

  const showLink = () => {
    setSidebar(false);
  };

  return (
    <>
      {!item.path ? (
        <div onClick={item.subNav && showSubnav} className="sidebarSubMenu">
          <div className="sidebarTitle">
            {item.icon}
            <div className="sidebarLabel">{item.title}</div>
          </div>
          <div>
            {item.subNav && subnav
              ? item.iconOpened
              : item.subNav
              ? item.iconClosed
              : null}
          </div>
        </div>
      ) : (
        <Link to={item.path} onClick={showLink} className="sidebarLink">
          <div className="sidebarTitle">
            {item.icon}
            <div className="sidebarLabel">{item.title}</div>
          </div>
          <div>
            {item.subNav && subnav
              ? item.iconOpened
              : item.subNav
              ? item.iconClosed
              : null}
          </div>
        </Link>
      )}

      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <Link
              to={item.path}
              key={index}
              onClick={showLink}
              className="dropdownLink"
            >
              {item.icon}
              <div className="sidebarLabel">{item.title}</div>
            </Link>
          );
        })}
    </>
  );
};

export default SubMenu;
