import React, { useState } from "react";
import { Link } from "react-router-dom";

const SubNavMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => {
    setSubnav(!subnav);
  };

  const showLink = () => {
    console.log("showlink")
 //   setSidebar(false);
  };

  return (
    <>
      {!item.path ? (
        <div onClick={item.subNav && showSubnav} className="navBarSubMenu">
          <div className="sidebarTitle">
            <div className="navbarLabel">{item.title}</div>
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
        <Link to={item.path} onClick={showLink} className="navBarLink">
          <div className="sidebarTitle">
            <div className="navbarLabel">{item.title}</div>
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
              className="dropdownNavLink"
            >
              {item.icon}
              <div className="sidebarLabel">{item.title}</div>
            </Link>
          );
        })}
    </>
  );
};

export default SubNavMenu;
