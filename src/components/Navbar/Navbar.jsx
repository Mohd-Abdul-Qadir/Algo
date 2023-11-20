import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RestartIcon from "@mui/icons-material/RestartAltRounded";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { arrayState, playState, navState, speed } from "../../actions";

const settings = ["Slow", "Normal", "Fast"];
const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const play = useSelector((state) => state.play);
  const currentSpeed = useSelector((state) => state.speed);

  const dispatch = useDispatch();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function rI(max) {
    return Math.floor(Math.random() * (max - 7 + 1)) + 7;
  }

  function handleShuffleClick() {
    dispatch(arrayState([rI(60), rI(50), rI(40), rI(20), rI(50), rI(30)]));
  }

  function handlePlayClick() {
    dispatch(playState(true));
    dispatch(navState(false));
  }

  return (
    <div className="navbar">
      <div className="logo">
        <h2>Algo Visualizer</h2>
      </div>
      <span className="icons">
        {!play ? (
          <>
            <span className="icon">
              <a onClick={handleOpenUserMenu}>
                <img src="/images/speedometer.png" alt="meter" />
              </a>
            </span>
            <span>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* {settings.map((setting, i) => (
                  <MenuItem key={i} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))} */}
                <MenuItem
                  onClick={handleCloseUserMenu}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  {/* <Typography textAlign="center">{setting}</Typography> */}
                  <div
                    className={`dropdown ${
                      currentSpeed == 1000 ? "active" : ""
                    }`}
                    onClick={() => {
                      dispatch(speed(1000));
                    }}
                  >
                    Slow
                  </div>
                  <div
                    className={`dropdown ${
                      currentSpeed == 500 ? "active" : ""
                    }`}
                    onClick={() => {
                      dispatch(speed(500));
                    }}
                  >
                    Normal
                  </div>
                  <div
                    className={`dropdown ${
                      currentSpeed == 200 ? "active" : ""
                    }`}
                    onClick={() => {
                      dispatch(speed(200));
                    }}
                  >
                    Fast
                  </div>
                </MenuItem>
              </Menu>
              <Tooltip title="Randomize">
                <ShuffleIcon
                  className="play icon"
                  onClick={handleShuffleClick}
                />
              </Tooltip>
            </span>
            <span>
              <Tooltip title="Play">
                <PlayArrowOutlinedIcon
                  className="play icon"
                  onClick={handlePlayClick}
                />
              </Tooltip>
            </span>
          </>
        ) : (
          <span className="play">
            <Tooltip title="play">
              <RestartIcon
                className="play icon"
                onClick={() => {
                  window.location.reload();
                }}
              />
            </Tooltip>
          </span>
        )}
      </span>
    </div>
  );
};

export default Navbar;
