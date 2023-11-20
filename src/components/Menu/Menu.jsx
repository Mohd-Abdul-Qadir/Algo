import React from "react";
import { NavLink } from "react-router-dom";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import AlbumIcon from "@mui/icons-material/Album";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import "./Menu.scss";
const Menu = () => {
  return (
    <div className="menu">
      <div className="item">
        <span className="title">Sort</span>
        <NavLink to="/" className="listItem">
          <BubbleChartIcon />
          <span className="listItem">Bubble</span>
        </NavLink>
        <NavLink to="/selection" className="listItem">
          <AlbumIcon />
          <span className="listItem">Selection</span>
        </NavLink>
        <NavLink to="/insertion" className="listItem">
          <ExitToAppIcon />
          <span className="listItem">Insertion</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Menu;
