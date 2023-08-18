import React, { useContext } from "react";

import {
    BrowserRouter as Router,
    Route,
    Routes,
    useNavigate,
} from "react-router-dom";

import LoginPage from "../pages/Login/LoginPage";
import Home from "../pages/Home/Home";
import Cadastro from "../pages/Cadastro/Cadastro";
import Processos from "../pages/Processos/Processos";
import Solicitacao from "../pages/Solicitacao/Solicitacao";
import { AuthProvider, AuthContext } from "../context/auth";
import DetalhesLicitacoes from "../pages/DetalhesLicitacoes/DetalhesLicitacoes";
import CriarSecretaria from "../pages/Secretaria/Secretaria";
import AtualizarDepartamento from "../pages/Departamento/Departamento";
import Navbar from '../components/Sidebar/Navbar';
import AtualizarSenha from "../pages/AtualizarSenha/AtualizarSenha";


const AppRoutes = () => {
    const Private = ({ children }) => {
        const navigate = useNavigate();
        const { authenticated, loading } = useContext(AuthContext);

        if (loading) {
            return <div className="loading">Carregando...</div>
        }

        return children;
    };


    const excludedPaths = ["/"];

    return (
        <Router>


            <AuthProvider>
                <Routes>
                    <Route exact path="/" element={<LoginPage />} />
                    <Route exact path="/home" element={<Private><Home /></Private>} />
                    <Route exact path="/NovaSolicitacao" element={<Private><Solicitacao /></Private>} />
                    <Route exact path="/detalhesLicitacoes/:projetoId" element={<Private><DetalhesLicitacoes /></Private>} />
                    {/* <Route path="/etapasprojetos/:id" component={EtapaProjetoDetail} /> */}
                    <Route exact path="/NovoUsuario" element={<Private><Cadastro /></Private>} />
                    <Route exact path="/processos" element={<Private><Processos /></Private>} />
                    <Route exact path="/NovaSecretaria" element={<Private><CriarSecretaria /></Private>} />
                    <Route exact path ="/Departamentos" element={<Private><AtualizarDepartamento /></Private>} />
                    <Route exact path ="/AtualizarSenha" element={<Private><AtualizarSenha /></Private>} />

                    {/* <Route exact path ="/NovoDepartamento" element={<Private><CriarDepartamento /></Private>} /> */}
                </Routes>
            </AuthProvider>
        </Router >
    )
}

export default AppRoutes;