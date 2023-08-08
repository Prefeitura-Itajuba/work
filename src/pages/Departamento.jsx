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



const AtualizarDepartamento = () => {
    const navigate = useNavigate();


    return(
        <div>
            <h1>
                Departamento
                <br />
            </h1>
                <button onClick={() => { navigate("/NovoDepartamento") }}>Criar Departamento</button>
        </div>
    );
};

export default AtualizarDepartamento;