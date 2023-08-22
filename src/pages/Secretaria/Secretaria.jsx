import React from "react";

import { api, createSession } from "../../services/api"

import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Sidebar/Navbar";
import { useState } from "react"


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
        <div>Secretaria</div>
        <div>
            <form action="">
                <input type="text" />
                <input type="text" />
            </form>
        </div>
       </div>
    );
};

export default CriarSecretaria;