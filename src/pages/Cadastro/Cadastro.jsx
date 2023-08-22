import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { api } from "../../services/api";

import { styled, useTheme } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";
import "./styles.css";
import Navbar from "../../components/Sidebar/Navbar";
import {
  Grid,
} from "@mui/material";
const Cadastro = () => {
  const [usemail, setUsemail] = useState("");
  const [ususers, setUsusers] = useState("");
  const [ussenha, setUssenha] = useState("");
  const [ustelefone, setUstelefone] = useState("");
  const [usmatricula, setUsmatricula] = useState("");
  const [usperfil, setUsperfil] = useState("");
  const [Departamento_id, setDepartamento_id] = useState("");
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Início");
  const recoveredSession = localStorage.getItem("session");

  const { ususerss } = JSON.parse(recoveredSession);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      usemail,
      ususers,
      ussenha,
      ustelefone,
      usmatricula,
      usperfil,
      Departamento_id,
    };

    api
      .post("users", formData)
      .then((res) => {
        console.log("Data saved successfully!", res);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "usemail":
        setUsemail(value);
        break;
      case "ususers":
        setUsusers(value);
        break;
      case "ussenha":
        setUssenha(value);
        break;
      case "ustelefone":
        setUstelefone(value);
        break;
      case "usmatricula":
        setUsmatricula(value);
        break;
      case "usperfil":
        setUsperfil(value);
        break;
      case "Departamento_id":
        setDepartamento_id(value);
        break;
      default:
        break;
    }
  };

  ////
  const navigate = useNavigate();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNavigation = (route, text) => {
    setSelectedMenuItem(text);
    navigate(route);
    handleDrawerClose();
  };

  const handleLogout = () => {
    setLogoutDialogOpen(true);
  };

  const confirmLogout = () => {
    setLogoutDialogOpen(false);
    logout();
  };



  return (
    <div>
      <Navbar />

      <div className="divForm">
        <form className="custom-form" onSubmit={handleSubmit}>
          <div className="separete">
            <label>Email</label>
            <input placeholder="Email" id="usemail"
              label="Email"
              type="email"
              name="usemail"
              value={usemail}
              onChange={handleInputChange} />

          </div>
          <div className="separete">
            <label>Nome de</label>
            <input placeholder="Email" id="ususers"
            label="Nome de usuário"
            type="text"
            name="ususers"
            value={ususers}
            onChange={handleInputChange} />

          </div>
         
          <TextField
            id="ususers"
            label="Nome de usuário"
            type="text"
            name="ususers"
            value={ususers}
            onChange={handleInputChange}
            inputProps={{
              autocomplete: "off",
              form: {
                autocomplete: "off",
              },
            }}
            className="custom-textfield"
          />
          <TextField
            id="ussenha"
            label="Senha"
            type="password"
            name="ussenha"
            value={ussenha}
            onChange={handleInputChange}
            inputProps={{
              autocomplete: "off",
              form: {
                autocomplete: "off",
              },
            }}
          />
          <TextField
            id="ustelefone"
            label="Telefone"
            type="text"
            name="ustelefone"
            value={ustelefone}
            onChange={handleInputChange}
            inputProps={{
              autocomplete: "off",
              form: {
                autocomplete: "off",
              },
            }}
          ></TextField>
          <TextField
            id="usmatricula"
            label="Matricula"
            type="text"
            name="usmatricula"
            value={usmatricula}
            onChange={handleInputChange}
            inputProps={{
              autocomplete: "off",
              form: {
                autocomplete: "off",
              },
            }}
          />
          <TextField
            id="usperfil"
            label="Perfil"
            type="text"
            name="usperfil"
            value={usperfil}
            onChange={handleInputChange}
            inputProps={{
              autocomplete: "off",
              form: {
                autocomplete: "off",
              },
            }}
          />
          <TextField
            id="Departamento_id"
            label="Departamento ID"
            type="text"
            name="Departamento_id"
            value={Departamento_id}
            onChange={handleInputChange}
            inputProps={{
              autocomplete: "off",
              form: {
                autocomplete: "off",
              },
            }}
          />

          <Button id="btn-entrar" variant="contained" size="medium" type="submit">
            Cadastrar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
