/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { Button } from "@mui/material";
import { AuthContext } from "../context/auth";
import { TextField } from "@mui/material";
import { api, createSession } from "../services/api"
import AppRoutes from "../AppRoutes";
import { useNavigate, Link } from "react-router-dom";
import Solicitacao from "./Solicitacao";
import "../styles/styles.css";
import { styled, useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Home = () => {
    const drawerWidth = 240;

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
            console.log('lsita projeto api get', listaProjeto)

        })
            .catch((error) => {
                console.error(error)
            })
    }, []);

    const openedMixin = (theme) => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    });

    const closedMixin = (theme) => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
    });

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));
    const theme = useTheme();
    // const [open, setOpen] = React.useState(false);

    // const handleDrawerOpen = () => {
    //     setOpen(true);
    // };

    // const handleDrawerClose = () => {
    //     setOpen(false);
    // };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            ...(open && {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
            }),
            ...(!open && {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            }),
        }),
    );


    return (
        <div>
            <div id="cabecalho">
                <button id="relatorio" onClick={() => { navigate("/relatorioSolicitacoes") }}>Relatório</button>
                <button id="cadastrar" onClick={() => { navigate("/NovoUsuario") }}>Cadastrar</button>
                <button id="cadastrarSecretaria" onClick={() => { navigate("/NovaSecretaria") }}>Cadastrar Secretaria</button>
                <button id="AtualizarDepartamento" onClick={() => { navigate("/Departamentos") }}>Atualizar Departamento</button>
                <button id="PL" onClick={() => { navigate("/ProcessosLicitatorios") }}>Processos Licitatórios</button>
                {/* <button onClick={handleLogout}>Logout</button> */}
                <Button variant="outlined" onClick={handleClickOpen}>
                    Sair
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    
                >

                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Deseja realmente sair?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button onClick={handleLogout} autoFocus className="colorBtn">
                            Sair
                        </Button>
                    </DialogActions>
                </Dialog>
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

                            <th>Descrição Resumida</th>
                            <th>N° da Solicitação</th>
                            <th>Departamento</th>

                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaProjeto && listaProjeto.data && listaProjeto.data.map((projeto, index) => (
                            <tr key={index}>

                                <td>{projeto.prjdescresumida}</td>
                                <td>{projeto.idSonner}</td>
                                <td>{projeto.depNome}</td>
                                <td>{projeto.prjvalor}</td>
                                <Link to={`/detalhesLicitacoes/${projeto.idetapas_projeto}`}>
                                    <button>Detalhes</button>
                                </Link>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>



        </div>
    );
}

export default Home