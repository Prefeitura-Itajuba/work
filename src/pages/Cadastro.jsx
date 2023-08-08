import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { api } from "../services/api";

const Cadastro = () => {
  const [usemail, setUsemail] = useState("");
  const [ususers, setUsusers] = useState("");
  const [ussenha, setUssenha] = useState("");
  const [ustelefone, setUstelefone] = useState("");
  const [usmatricula, setUsmatricula] = useState("");
  const [usperfil, setUsperfil] = useState("");
  const [Departamento_id, setDepartamento_id] = useState("");

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


    api.post("users", formData)
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

  return (
    <div className="container">
      <div id="form-container">
        <form onSubmit={handleSubmit}>
          <TextField
            id="usemail"
            label="Email"
            type="email"
            name="usemail"
            value={usemail}
            onChange={handleInputChange}
          />
          <TextField
            id="ususers"
            label="Username"
            type="text"
            name="ususers"
            value={ususers}
            onChange={handleInputChange}
          />
          <TextField
            id="ussenha"
            label="Password"
            type="password"
            name="ussenha"
            value={ussenha}
            onChange={handleInputChange}
          />
          <TextField
            id="ustelefone"
            label="Telefone"
            type="text"
            name="ustelefone"
            value={ustelefone}
            onChange={handleInputChange}
          />
          <TextField
            id="usmatricula"
            label="Matricula"
            type="text"
            name="usmatricula"
            value={usmatricula}
            onChange={handleInputChange}
          />
          <TextField
            id="usperfil"
            label="Perfil"
            type="text"
            name="usperfil"
            value={usperfil}
            onChange={handleInputChange}
          />
          <TextField
            id="Departamento_id"
            label="Departamento ID"
            type="text"
            name="Departamento_id"
            value={Departamento_id}
            onChange={handleInputChange}
          />

          <Button
            id="btn-entrar"
            variant="contained"
            size="medium"
            type="submit"
            style={{ width: 400, height: 47 }}
          >
            Cadastrar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
