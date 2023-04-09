import React from 'react'
import * as FaIcons from "react-icons/fa";
function Icon({ size, color, icon, className, viewBox }) {
    console.log("icnon....")
      const style = {
        /*      margin: 0,
        padding: 0,
        size: "30",
        color: "#000000",
        viewBox: "0 0 24 24", */

      };

  return (
    <div style={style}>
      {(icon = "Fas" && <FaIcons.FaFacebookSquare />)}
      {(icon = "Ftw" && <FaIcons.FaTwitterSquare />)}
      {(icon = "Fis" && <FaIcons.FaInstagramSquare />)}
    </div>
  );
}

export default Icon

/*
import React from "react";
import PropTypes from "prop-types";
import iconPath from "../assets/iconsLib";

const defaultStyles = { display: "inline-block", verticalAlign: "middle" };

const Icon = ({ size, color, icon, className, style, viewBox }) => {
  const styles = { ...defaultStyles, ...style };
  return (
    <svg
      className={className}
      style={styles}
      viewBox={viewBox}
      width={`${size}px`}
      height={`${size}px`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path fill={color} d={iconPath[icon]} />
    </svg>
  );
};

Icon.defaultProps = {
  size: 16,
  color: "#000000",
  viewBox: "0 0 24 24",
  style: {},
  className: "",
};

Icon.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  viewBox: PropTypes.string.isRequired,
  style: PropTypes.shape(PropTypes.object),
  className: PropTypes.string,
};

export default Icon;
*/