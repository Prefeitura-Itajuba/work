import React, { useState } from "react";
import { Button, TextField, FormControl, InputLabel, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import Navbar from "../../components/Sidebar/Navbar";
import {
    TituloSolicitacao,
    Coluna1,
    Form,
    TextArea,
    Select,
    InputText,
    CenterBtn
} from './styles.js';

const Solicitacao = () => {
    const dataHoje = new Date();
    const idRecuperado = JSON.parse(localStorage.getItem("session"));
    const { idUsuaros } = idRecuperado;

    const [formData, setFormData] = useState({
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api
            .post("projetos", formData)
            .then((res) => {
                console.log("Solicitação salva com sucesso.", res);
            })
            .catch((error) => {
                console.error("Falha ao salvar solicitação", error);
            });
    };

    const navigate = useNavigate();

    return (
        <div>
            <Navbar />
            <TituloSolicitacao>
                <p>Nova Solicitação</p>
            </TituloSolicitacao>

            <div className="table-container">
                <Form onSubmit={handleSubmit}>
                    <Coluna1>
                        <InputText
                            label="Número da Solicitação"
                            id="idSonner"
                            name="idSonner"
                            value={formData.idSonner}
                            placeholder="Número da Solicitação"
                            onChange={handleChange}
                        />
                        <InputText
                            label="Descrição Resumida:"
                            id="prjdescresumida"
                            name="prjdescresumida"
                            placeholder="Descrição Resumida"
                            value={formData.prjdescresumida}
                            onChange={handleChange}
                        />
                        <InputText
                            label="Valor Estimado:"
                            placeholder="Valor Estimado"
                            id="prjvalor"
                            name="prjvalor"
                            value={formData.prjvalor}
                            onChange={handleChange}
                        />
                        <FormControl>
                            <Select
                                label="Tipo da Solicitação"
                                id="tipoprojeto"
                                name="tipoprojeto"
                                value={formData.tipoprojeto}
                                onChange={handleChange}
                            >
                                <option value="1">Solicitação Comum</option>
                                <option value="2">ATA</option>
                            </Select>
                        </FormControl>
                    </Coluna1>
                    <div>
                        <TextArea
                            multiline
                            label="Descrição Detalhada:"
                            placeholder="Descrição Detalhada"
                            id="prjdescricao"
                            name="prjdescricao"
                            value={formData.prjdescricao}
                            onChange={handleChange}
                            // style={Padding: "0, 0, 1px"}
                        />
                        <CenterBtn>
                            <Button type="submit" variant="contained">Salvar</Button>
                        </CenterBtn>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Solicitacao;
