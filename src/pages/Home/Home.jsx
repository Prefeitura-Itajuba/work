/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { Button } from "@mui/material";
import { AuthContext } from "../../context/auth";
import { TextField } from "@mui/material";
import { api, createSession } from "../../services/api"
import AppRoutes from "../../router/AppRoutes";
import { useNavigate, Link } from "react-router-dom";
// import "../styles/styles.css";
import { styled, useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LogoutIcon from '@mui/icons-material/Logout';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
            console.log('lista projeto', res.data)
            setListaProjeto(res)
        })
            .catch((error) => {
                console.error(error)
            })
    }, []);

    useEffect(() => {
        if (!authenticated) {
            return navigate("/login")
        }
    }, [])

    const { ususers } = JSON.parse(recoveredSession); 

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

    // const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const drawerWidth = 240;

    const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: `-${drawerWidth}px`,
            ...(open && {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: 0,
            }),
        }),
    );

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));


    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleNavigation = (route,text) => {
        setSelectedMenuItem(text);
        navigate(route);
        handleDrawerClose();
    };

    const menuItems = [
        { text: 'Início', route: '/home', icon: <InboxIcon /> },
        { text: 'Novo Usuário', route: '/NovoUsuario', icon: <MailIcon /> },
        { text: 'Nova solicitação', route: '/NovaSolicitacao', icon: <MailIcon /> },

        { text: 'Detalhes Licitações', route: '/detalhesLicitacoes/:id', icon: <InboxIcon /> },
        { text: 'Processos Licitatórios', route: '/processos', icon: <MailIcon /> },
        { text: 'Nova Secretaria', route: '/NovaSecretaria', icon: <InboxIcon /> },
        { text: 'Atualizar Departamento', route: '/Departamentos', icon: <InboxIcon /> },

    ];
    const [selectedMenuItem, setSelectedMenuItem] = useState("Início")
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}

                        disableRipple

                    >

                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Workflow
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Box>
                <List>
                    <ListItem>
                        <ListItemButton onClick={() => handleNavigation('profile')}>
                            <ListItemIcon>
                                <AccountCircleIcon className="icon" />
                            </ListItemIcon>
                            <ListItemText primary={ ususers } />
                        </ListItemButton>
                    </ListItem>
                    {menuItems.map((item) => (
                        <ListItem key={item.text}   className={selectedMenuItem === item.text ? "selected-menu-item" : ""}>
                            <ListItemButton onClick={() => handleNavigation(item.route)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <ListItem>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                </List>

            </Drawer>
            <Toolbar />
            <div>
                <div class="table-responsive">
                    <table class="custom-table">
                        <thead class="table-header">
                            <tr>
                                <th>Nome</th>
                                <th>ID Sonner</th>
                                <th>Departamento</th>
                                <th>Valor</th>
                                <th>Detalhes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaProjeto && listaProjeto.data && listaProjeto.data.map((projeto, index) => (
                                <tr key={index}>
                                    <td>{projeto.prjdescresumida}</td>
                                    <td>{projeto.idSonner}</td>
                                    <td>{projeto.depNome}</td>
                                    <td>{projeto.prjvalor}</td>
                                    <td>
                                        <a href={`/detalhesLicitacoes/${projeto.idetapas_projeto}`}>
                                            <Button variant="contained">Detalhes</Button>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </Box>
    );
}

export default Home




{/* <tbody> */ }
{/* {listaProjeto && listaProjeto.data && listaProjeto.data.map((projeto, index) => (
    <tr key={index}>

        <td>{projeto.prjdescresumida}</td>
        <td>{projeto.idSonner}</td>
        <td>{projeto.depNome}</td>
        <td>{projeto.prjvalor}</td>
        <Link to={`/detalhesLicitacoes/${projeto.idetapas_projeto}`}>
            <button>Detalhes</button>
        </Link>
    </tr>
))} */}
// </tbody>