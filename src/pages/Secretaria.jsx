import React from "react";
import { Button } from "@mui/material";
import { AuthContext } from "../context/auth";
import { TextField } from "@mui/material";
import { api, createSession } from "../services/api"
import AppRoutes from "../AppRoutes";
import { useNavigate, Link } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from "react"


const CriarSecretaria = () => {

    const [secsigla, setSecsigla] = useState("");
    const [secnome, setSecnome] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();

        const formData = {
            secsigla,
            secnome
        };


        api.post("secretarias", formData)
            .then((res) => {
                console.log("Secretaria Cadastrada com suceso", res, );
            })
            .catch((error) => {
                console.error("falha ao cadastrar a secretaria", error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value} = e.target;
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



    return(
        <div>
            <h1>
                Criação de Secretarias

            </h1>
                <div>
                    <form  onSubmit={handleSubmit}>

                        <TextField
                        id='secsigla'
                        label='Sigla'
                        name='secsigla'
                        type='secsigla'
                        value={secsigla}
                        onChange={handleInputChange}/>

                        <TextField
                        id='secnome'
                        label='Nome da Secretaria'
                        name='secnome'
                        type='secnome'
                        value={secnome}
                        onChange={handleInputChange}/>

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

export default CriarSecretaria;