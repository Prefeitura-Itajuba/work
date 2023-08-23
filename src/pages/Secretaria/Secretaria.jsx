import React from "react";

import { api, createSession } from "../../services/api"

import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Sidebar/Navbar";
import { useState } from "react"

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

import { styled, useTheme } from '@mui/material/styles';
const CriarSecretaria = () => {

    const [secsigla, setSecsigla] = useState("");
    const [secnome, setSecnome] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            secsigla,
            secnome
        };


        api.post("secretarias", formData)
            .then((res) => {
                console.log("Secretaria Cadastrada com suceso", res,);
            })
            .catch((error) => {
                console.error("falha ao cadastrar a secretaria", error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "secsigla":
                console.log(secsigla)

                setSecsigla(value);
                break;
            case "secnome":
                console.log(secnome)

                setSecnome(value);
                break;
            default:
                break;
        }
    };

    const drawerWidth = 240;
    const navigate = useNavigate();


    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleNavigation = (route) => {
        navigate(route);
        handleDrawerClose();
    };



    return (

        <div>
            <Navbar />
            <div>
                <Title>Criar Secretaria</Title>
            </div>
            {/* <div>
                <form onSubmi={handleSubmit}>
                    <input type="text"
                        Label="secsigla"
                        id="secsigla"
                        name="secsigla"
                        value={secsigla}
                        onChange={handleInputChange}
                        placeholder="Escreva a Sigla da Secretaria"
                    />
                    <input type="text"
                        Label="secnome"
                        id="secnome"
                        name="secnome"
                        value={secnome}
                        onChange={handleInputChange}
                        placeholder="Escreva o nome da secretaria"
                    />

                    <button onClick={handleSubmit} >Criar</button>
                </form>
            </div> */}

<CenteredFormContainer>
        <CustomForm onSubmit={handleSubmit} autoComplete="off">
          <FieldContainer>
            <CustomLabel>Sigla</CustomLabel>
            <CustomTextField
                Label="secsigla"
                type="text"
                id="secsigla"
                name="secsigla"
                value={secsigla}
                onChange={handleInputChange}
                placeholder="Escreva a Sigla da Secretaria"
                required
            />
          </FieldContainer>
          <FieldContainer>
            <CustomLabel>Nome </CustomLabel>
            <CustomTextField
            type="text"
            Label="secnome"
            id="secnome"
            name="secnome"
            value={secnome}
            onChange={handleInputChange}
            placeholder="Escreva o nome da secretaria"
            />
          </FieldContainer>
          
         
          <CenterBtn>
          <StyledButton id="btn-entrar" variant="contained" size="medium" type="submit">
           Criar
          </StyledButton>
          </CenterBtn>
        </CustomForm>
      </CenteredFormContainer>
        </div>
    );
};

export default CriarSecretaria;