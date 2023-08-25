import React, { useContext, useState, useEffect } from "react";
import { Button } from "@mui/material";

import { api, createSession } from "../../services/api"
import AppRoutes from "../../router/AppRoutes";
import { useNavigate, Link } from "react-router-dom";


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

    const [departamento, setListaDepartamento] = useState("");
    // const [secretarias, setListaSecretarias] = useState([]);
    const recoveredSession = localStorage.getItem("session");
    const [ depNome, setDepNome ] = useState("");
    const [ DepMaxDias, setDepMaxDias ] = useState("");
    const [Secretaria_Id, setSecretaria_Id] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            depNome,
            DepMaxDias: "5",
            Secretaria_Id
        };
        api
            .post("departamentos", formData)
            .then((res) => {
                console.log("Data saved successfully!", res);
            })
            .catch((error) => {
                console.error("Error saving data:", error);
            });

    }


    useEffect(() => {
        api
        .get("departamentos", {
            headers: {
                session: recoveredSession,
              },
        })
        .then((res) => {
            console.log("lista Departamento", res.data);
            setListaDepartamento(res);
          })
          .catch((error) => {
            console.error(error);
          });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "depNome":
                setDepNome(value);
            break;
            case "DepMaxDias":
                setDepMaxDias(value);
            break;
            case "Secretaria_Id":
                setSecretaria_Id(value);
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
            {/* <p>sigla { secretarias[0].secnome } </p> */}
            <CenteredFormContainer>
                <CustomForm onSubmit={handleSubmit} autoComplete="off">


                    <FieldContainer>
                        <CustomLabel>Nome do Departamento </CustomLabel>
                        <CustomTextField
                            type="text"
                            Label="depNome"
                            id="depNome"
                            name="depNome"
                            value={depNome}
                            onChange={handleInputChange}

                        />
                    </FieldContainer>

                    <FieldContainer>
                        <CustomLabel>Dias Maximos </CustomLabel>
                        <CustomTextField
                            type="number"
                            Label="DepMaxDias"
                            id="DepMaxDias"
                            name="DepMaxDias"
                            value={DepMaxDias}
                            onChange={handleInputChange}

                        />
                    </FieldContainer>

                    <FieldContainer>
                        <CustomLabel>Selecionar Secretaria </CustomLabel>
                        <select value={Secretaria_Id} name="Secretaria_Id" onChange={handleInputChange}>
                        <option value="">Selecionar Secretaria</option>
                        <option value="1">SEMIN</option>
                        <option value="4">SECUT</option>
                        <option value="5">SECOM</option>
                        </select>
                    </FieldContainer> 


                    <CenterBtn>
          <Button id="btn-entrar" variant="contained" size="medium" type="submit" onChange={handleInputChange}
              required>
              Criar
            </Button>
            </CenterBtn>
                </CustomForm>
            </CenteredFormContainer>

            <pre>{JSON.stringify(departamento.data, null, 2)}</pre>
        </div>

    );
};

export default AtualizarDepartamento;

