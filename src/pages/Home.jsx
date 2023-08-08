/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { Button } from "@mui/material";
import { AuthContext } from "../context/auth";
import { TextField } from "@mui/material";
import { api, createSession } from "../services/api"
import AppRoutes from "../AppRoutes";
import { useNavigate, Link } from "react-router-dom";
import Solicitacao from "./Solicitacao";

const Home = () => {
    const { authenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const forDate = (date) => {
        const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
        return formattedDate;
    }


    const recoveredSession = localStorage.getItem("session");

    const [listaProjeto, setListaProjeto] = useState([]);

    useEffect(() => {
        api.get('projetos', {
            headers: {
                'session': recoveredSession
            }
        }).then((res) => {
            console.log(res.data)
            setListaProjeto(res)
        })
            .catch((error) => {
                console.error(error)
            })
    }, []);

    // console.log("lsta projeto", listaProjeto);

    useEffect(() => {
        if (!authenticated) {
            return navigate("/login")
        }
    }, [])








    const { usperfil, ususers } = JSON.parse(recoveredSession);




    const handleLogout = () => {
        logout();
    };

        useEffect(() => {
        api.get('projetos', {
            headers: {
                'session': recoveredSession
            }
        }).then((res) => {
            setListaProjeto(res)
            console.log('lsita projeto api get',listaProjeto)

        })
            .catch((error) => {
                console.error(error) 
            })
    }, []);

    return (
        <div>


            <div id="cabecalho">
                <button id="relatorio" onClick={() => { navigate("/relatorioSolicitacoes") }}>Relatório</button>
                <button id="cadastrar" onClick={() => { navigate("/NovoUsuario") }}>Cadastrar</button>
                <button id="cadastrarSecretaria" onClick={() => { navigate("/NovaSecretaria") }}>Cadastrar Secretaria</button>
                <button id="AtualizarDepartamento" onClick={() => { navigate("/Departamentos") }}>Atualizar Departamento</button>
                <button id="PL" onClick={() => { navigate("/ProcessosLicitatorios") }}>Processos Licitatórios</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <h1 id="titulo">Lista de Solicitações</h1>
            <p>Perfil do usuário: {ususers}</p>
            <p>Nome da sessão: {usperfil}</p>
            <div id="barra">
                <TextField
                    id="pesquisa"
                    label="Pesquisa"
                    variant="outlined">

                </TextField>
                <Link to="/NovaSolicitacao">
                    <Button
                        id="novaSolicitacão"
                        variant="contained"
                        color="success"
                        sx={{ height: "5vh" }}
                    >
                        Nova Solicitação
                    </Button>
                </Link>
            </div>
            <div id="projetos">
                <table>
                    <thead>
                        <tr>
                            {/* <th>ID</th> */}
                            {/* <th>Data Inicial</th> */}
                            <th>Descrição Resumida</th>
                            <th>N° da Solicitação</th>
                            <th>Departamento</th>
                            {/* <th>Observação Final</th>
                            <th>Usuário ID</th> */}
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                    {listaProjeto && listaProjeto.data && listaProjeto.data.map((projeto,index) => (
                            <tr key={index}>
                                {/* <td>{projeto.prjid}</td> */}
                                {/* <td>{forDate(projeto.prjdata_inicial)}</td> */}
                                <td>{projeto.prjdescresumida}</td>
                                <td>{projeto.idSonner}</td>
                                <td>{projeto.depNome}</td>
                                {/* <td>{projeto.prjobrservacao_final}</td> */}
                                {/* <td>{projeto.Usuario_id}</td> */}
                             
                                <td>{projeto.prjvalor}</td>
                                <Link to={`/detalhesLicitacoes/${projeto.idetapas_projeto}`}>
                                    <button>Detalhes</button>
                                </Link>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* //prjd === projeto_id */}


            </div>
        </div>
        // </Container>
    );
}

export default Home