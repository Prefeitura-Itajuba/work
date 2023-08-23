import React from "react";
import { Button } from "@mui/material";

import { api, createSession } from "../../services/api"
import AppRoutes from "../../router/AppRoutes";
import { useNavigate, Link } from "react-router-dom";

import { useState } from "react"
// import "../styles/secretaria.css"
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
import Navbar from "../../components/Sidebar/Navbar";
const AtualizarDepartamento = () => {

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
                <Title>Criar Departamento</Title>
            </div>
            <CenteredFormContainer>
                <CustomForm onSubmit={handleSubmit} autoComplete="off">
                    <FieldContainer>
                        <CustomLabel>Campo</CustomLabel>
                        <CustomTextField
                            Label="secsigla"
                            type="text"
                            id="secsigla"
                            name="secsigla"
                            value={secsigla}
                            onChange={handleInputChange}
                            placeholder="Campo 1"
                            required
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <CustomLabel>Campo </CustomLabel>
                        <CustomTextField
                            type="text"
                            Label="secnome"
                            id="secnome"
                            name="secnome"
                            value={secnome}
                            onChange={handleInputChange}
                            placeholder="Campo 2"
                        />
                    </FieldContainer>


                    <CenterBtn>
                        <StyledButton onClick={() => { navigate("/NovoDepartamento") }} id="btn-entrar" variant="contained" size="medium" type="submit">
                            Criar Departamento
                        </StyledButton>
                    </CenterBtn>
                </CustomForm>
            </CenteredFormContainer>

        </div>
    );
};

export default AtualizarDepartamento;

