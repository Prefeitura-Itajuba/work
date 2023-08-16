import React, { useContext } from "react";
import { Button } from "@mui/material";
import { AuthContext } from "../../context/auth";
import { TextField } from "@mui/material";
import { api } from "../../services/api"
import AppRoutes from "../../router/AppRoutes";
import { useNavigate, Link } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from "react";

import { styled, useTheme } from '@mui/material/styles';
import "./styles.css"


const Solicitacao = () => {

    const dataHoje = new Date();
    const idRecuperado = localStorage.getItem("session");
    console.log(JSON.parse(idRecuperado));
    const { idUsuaros } = JSON.parse(idRecuperado);


    const [formData, setFormData] = useState({
        // prjid: "",
        idSonner: "",
        prjdata_inicial: dataHoje,
        prjdescricao: "",
        prjdescresumida: "",
        prjdata_final: "",
        status: "aberto",
        prjobrservacao_final: "",
        Usuario_id: idUsuaros,
        prjvalor: "",
        tipoprojeto: ""
    });
    // console.log(formData.tipoprojeto);
    // console.log(formData.Usuario_id);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode fazer a chamada à API para salvar os dados
        api
            .post("projetos", formData)
            .then((res) => {
                console.log("Solicitação salva com sucesso.", res);
            })
            .catch((error) => {
                console.error("Falha ao salvar solicitação", error);
            });
    };




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

    const navigate = useNavigate();



    return (



        <div class="table-container"> {/* Wrap the table with a container */}
            <div>

                <form onSubmit={handleSubmit}>
                    {/* <div>
    <label htmlFor="prjid">prjid:</label>
    <input
      type="text"
      id="prjid"
      name="prjid"
      value={formData.prjid}
      onChange={handleChange}
      />
  </div> */}

                    <div>
                        <label htmlFor="idSonner">idSonner:</label>
                        <input
                            type="text"
                            id="idSonner"
                            name="idSonner"
                            value={formData.idSonner}
                            onChange={handleChange}
                        />
                        <label htmlFor="prjdescresumida">prjdescresumida:</label>
                        <input
                            type="text"
                            id="prjdescresumida"
                            name="prjdescresumida"
                            value={formData.prjdescresumida}
                            onChange={handleChange}
                        />
                    </div>
                    <div>

                    </div>



                    <div>
                        <label htmlFor="prjvalor">Valor Estimdado:</label>
                        <input
                            type="text"
                            id="prjvalor"
                            name="prjvalor"
                            value={formData.prjvalor}
                            onChange={handleChange}
                        />

                        <select
                            name="tipoprojeto"
                            id="tipoprojeto"
                            value={formData.tipoprojeto}
                            onChange={handleChange}> Selecione o tipo de solicitação
                            <option value="1">Solicitação Comum</option>
                            <option value="2">ATA</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="prjdescricao"></label>
                        <br />
                        <input
                            type="text"
                            label="Descrição Detalhada"
                            id="prjdescricao"
                            name="prjdescricao"
                            value={formData.prjdescricao}
                            onChange={handleChange}
                        />
                    </div>



                    <button id="enviar" type="submit">Salvar</button>
                </form>
            </div>
        </div>

    );
};


export default Solicitacao;