import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { api } from "../../services/api";
import {
  CenteredFormContainer,
  CustomForm,
  FieldContainer,
  CustomLabel,
  CustomTextField,
  StyledButton,
  Title,
  CenterBtn
} from './styles';
import Navbar from "../../components/Sidebar/Navbar";

const Cadastro = () => {
  const [usemail, setUsemail] = useState("");
  const [ususers, setUsusers] = useState("");
  const [ussenha, setUssenha] = useState("");
  const [ustelefone, setUstelefone] = useState("");
  const [usmatricula, setUsmatricula] = useState("");
  const [usperfil, setUsperfil] = useState("");
  const [Departamento_id, setDepartamento_id] = useState("");

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



  return (
    <div>
      <Navbar />
      <Title> <p>Cadastro</p></Title>
      <CenteredFormContainer>
        <CustomForm onSubmit={handleSubmit} autoComplete="off">
          <FieldContainer>
            <CustomLabel>Email</CustomLabel>
            <CustomTextField
              label="Email"
              type="email"
              name="usemail"
              value={usemail}
              onChange={handleInputChange} />

          </div>
          <div >
            <label>Nome de usuário</label>
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
              onChange={handleInputChange}
              variant="outlined"
              required
            />
          </FieldContainer>
          <FieldContainer>
            <CustomLabel>Nome de Usuário</CustomLabel>
            <CustomTextField
              label="Nome de Usuário"
              type="text"
              name="ususers"
              value={ususers}
              onChange={handleInputChange}
              variant="outlined"
              autoComplete="false"
              required
            />
          </FieldContainer>
          <FieldContainer>
            <CustomLabel>Senha</CustomLabel>
            <CustomTextField
              label="Senha"
              required
              type="password"
              name="ussenha"
              value={ussenha}
              onChange={handleInputChange}
              variant="outlined"
            />
          </FieldContainer>
          <FieldContainer>
            <CustomLabel>Telefone</CustomLabel>
            <CustomTextField
              label="Telefone"
              type="text"
              name="ustelefone"
              value={ustelefone}
              onChange={handleInputChange}
              variant="outlined"
              required
            />
          </FieldContainer>
          <FieldContainer>
            <CustomLabel>Matrícula</CustomLabel>
            <CustomTextField
              required
              label="Matricula"
              type="text"
              name="usmatricula"
              value={usmatricula}
              onChange={handleInputChange}
              variant="outlined"
            />
          </FieldContainer>
          <FieldContainer>
            <CustomLabel>Perfil</CustomLabel>
            <CustomTextField
              required
              label="Perfil"
              type="text"
              name="usperfil"
              value={usperfil}
              onChange={handleInputChange}
              variant="outlined"
            />
          </FieldContainer>
          <FieldContainer>
            <CustomLabel>Departamento ID</CustomLabel>
            <CustomTextField
              label="Departamento ID"
              type="text"
              name="Departamento_id"
              value={Departamento_id}
              onChange={handleInputChange}
              variant="outlined"
            />
          </FieldContainer>
          <CenterBtn>
          <StyledButton id="btn-entrar" variant="contained" size="medium" type="submit">
            Cadastrar
          </StyledButton>
          </CenterBtn>
        </CustomForm>
      </CenteredFormContainer>
    </div>
  );
};

export default Cadastro;
