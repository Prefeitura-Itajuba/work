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
import "../styles/secretaria.css"
import MuiAppBar from '@mui/material/AppBar';
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
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';

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

    const handleNavigation = (route) => {
        navigate(route);
        handleDrawerClose();
    };

    const menuItems = [
        { text: 'Início', route: '/home', icon: <InboxIcon /> },

        { text: 'Novo Usuário', route: '/NovoUsuario', icon: <MailIcon /> },
        { text: 'Nova solicitação', route: '/NovaSolicitacao', icon: <MailIcon /> },

        { text: 'Detalhes Licitações', route: '/DetalhesLicitacoes', icon: <InboxIcon /> },
        { text: 'Processos Licitatórios', route: '/processos', icon: <MailIcon /> },
        { text: 'Nova Secretaria', route: '/NovaSecretaria', icon: <InboxIcon /> },
        { text: 'Atualizar Departamento', route: '/Departamentos', icon: <InboxIcon /> },

    ];


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
                    {menuItems.map((item) => (
                        <ListItem key={item.text}>
                            <ListItemButton onClick={() => handleNavigation(item.route)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />

                <div className="pageContainer">
                  
                    <div className="container" id="formSecretaria">
                        <h1>
                            Criação de Secretarias

                        </h1>
                        <br />
                        <br />
                        <div>
                            <form onSubmit={handleSubmit}>

                                <TextField
                                    id='secsigla'
                                    label='Sigla'
                                    name='secsigla'
                                    type='secsigla'
                                    value={secsigla}
                                    onChange={handleInputChange} />
                                <br />
                                <TextField
                                    id='secnome'
                                    label='Nome da Secretaria'
                                    name='secnome'
                                    type='secnome'
                                    value={secnome}
                                    onChange={handleInputChange} />
                                <br />
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
                </div>

            </Box>
        </Box>
    );
};

export default CriarSecretaria;