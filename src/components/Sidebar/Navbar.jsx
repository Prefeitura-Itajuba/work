import React, { useState, useContext,useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link,useNavigate } from "react-router-dom";
// import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import Dialog from "@mui/material/Dialog";
import HomeIcon from "@mui/icons-material/Home";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";
import { makeStyles } from '@mui/styles';
import { AuthContext } from "../../context/auth"

import { FormControl, Select } from '@mui/material';

import { Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
function Navbar() {
  const { authenticated, logout } = useContext(AuthContext);

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const navigate = useNavigate();



  const SidebarData = [
    { title: "Início", path: "/home", icon: <HomeIcon />, cName: "nav-text" },

    {
      title: "Processos",
      path: "/processos",
      icon: <AssignmentIcon />,
      cName: "nav-text",
    },
    {
      title: "Cadastro",
      path: "/NovoUsuario",
      icon: <HowToRegIcon />,
      cName: "nav-text"
    },
    {
      title: "Sair",
      icon: <LogoutIcon />,
      cName: "nav-text",
    },
  ];

  // TESTE:
  const UserArea = styled('div')({
    width: '45px',
    height: '45px',
    position: 'relative',
    cursor: 'pointer',
  });

  const UserAvatar = styled(Avatar)({
    width: '100%',
    height: '100%',
    borderRadius: '30px',
    border: '2px solid #fff',
    boxShadow: '0px 0px 12px -5px #000',
  });


  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // TESTE PROFILE
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const confirmLogout = () => {
    logout();
  };

  useEffect(() => {
    if (!authenticated) {
      return navigate("/login");
    }
  }, []);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className="titleDiv">
            <h1 className="txtTitle">Workflow</h1>
          </div>
          <div className="dropdownDiv">
            <div className="align-end">
              <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <AccountCircle style={{ color: 'white', fontSize: '3rem' }} />
              </Button>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <MenuItem onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1a83ff';
                  e.target.style.color = 'white';
                }} onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = 'inherit';
                }} onClick={handleClose}>Perfil</MenuItem>
                <MenuItem onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1a83ff';
                  e.target.style.color = 'white';
                }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = 'inherit';
                  }} onClick={handleClose}>Alterar senha</MenuItem>
                <MenuItem onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1a83ff';
                  e.target.style.color = 'white';
                }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = 'inherit';
                  }} onClick={confirmLogout}>Sair</MenuItem>
              </Menu>
            </div>
          </div>
        </div>

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                  {item.subMenu && (
                    <ul className="sub-menu">
                      {item.subMenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link to={subItem.path}>
                            <span>{subItem.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
