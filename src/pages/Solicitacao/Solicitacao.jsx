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
import { styled, useTheme } from '@mui/material/styles';
// import "../styles/solicitacao"


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

    const handleNavigation = (route) => {
        navigate(route);
        handleDrawerClose();
    };

    const navigate = useNavigate();


    const menuItems = [
        { text: 'Início', route: '/home', icon: <InboxIcon /> },
        { text: 'Novo Usuário', route: '/NovoUsuario', icon: <MailIcon /> },
        { text: 'Detalhes Licitações', route: '/detalhesLicitacoes/:id', icon: <InboxIcon /> },
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
                            </div>
                            <div>
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
                                <label htmlFor="prjdescricao">prjdescricao:</label>
                                <input
                                    type="text"
                                    id="prjdescricao"
                                    name="prjdescricao"
                                    value={formData.prjdescricao}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* <div>
    <label htmlFor="prjdata_final">prjdata_final:</label>
    <input
      type="date"
      id="prjdata_final"
      name="prjdata_final"
      value={formData.prjdata_final}
      onChange={handleChange}
      />
  </div> */}

                            {/* <div>
    <label htmlFor="status">status:</label>
    <input
      type="text"
      id="status"
      name="status"
      value={formData.status}
      onChange={handleChange}
      />
  </div> */}

                            {/* <div>
    <label htmlFor="prjobrservacao_final">prjobrservacao_final:</label>
    <input
      type="text"
      id="prjobrservacao_final"
      name="prjobrservacao_final"
      value={formData.prjobrservacao_final}
      onChange={handleChange}
      />
  </div> */}



                            <div>
                                <label htmlFor="prjvalor">prjvalor:</label>
                                <input
                                    type="text"
                                    id="prjvalor"
                                    name="prjvalor"
                                    value={formData.prjvalor}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <select
                                    name="tipoprojeto"
                                    id="tipoprojeto"
                                    value={formData.tipoprojeto}
                                    onChange={handleChange}> Selecione o tipo de solicitação
                                    <option value="1">Solicitação Comum</option>
                                    <option value="2">ATA</option>
                                </select>
                            </div>
                            {/* <div>
    <label htmlFor="tipoprojeto">tipoprojeto:</label>
    <input
      type="text"
      id="tipoprojeto"
      name="tipoprojeto"
      value={formData.tipoprojeto}
      onChange={handleChange}
      />
  </div> */}

                            <button type="submit">Salvar</button>
                        </form>
                    </div>
                </div>
            </Box>
        </Box>
    );
};


export default Solicitacao;