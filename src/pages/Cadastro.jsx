import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { api } from "../services/api";
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
import { useNavigate, Link } from "react-router-dom";

const Cadastro = () => {
  const [usemail, setUsemail] = useState("");
  const [ususers, setUsusers] = useState("");
  const [ussenha, setUssenha] = useState("");
  const [ustelefone, setUstelefone] = useState("");
  const [usmatricula, setUsmatricula] = useState("");
  const [usperfil, setUsperfil] = useState("");
  const [Departamento_id, setDepartamento_id] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      usemail,
      ususers,
      ussenha,
      ustelefone,
      usmatricula,
      usperfil,
      Departamento_id,
    };


    api.post("users", formData)
      .then((res) => {
        console.log("Data saved successfully!", res);

      })
      .catch((error) => {
        console.error("Error saving data:", error);

      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "usemail":
        setUsemail(value);
        break;
      case "ususers":
        setUsusers(value);
        break;
      case "ussenha":
        setUssenha(value);
        break;
      case "ustelefone":
        setUstelefone(value);
        break;
      case "usmatricula":
        setUsmatricula(value);
        break;
      case "usperfil":
        setUsperfil(value);
        break;
      case "Departamento_id":
        setDepartamento_id(value);
        break;
      default:
        break;
    }
  };

  ////
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
      
          <div className="centralizaDiv">
            <div id="form-container">
              <form onSubmit={handleSubmit}>
                <TextField
                  id="usemail"
                  label="Email"
                  type="email"
                  name="usemail"
                  value={usemail}
                  onChange={handleInputChange}
                 
                />
                <TextField
                  id="ususers"
                  label="Username"
                  type="text"
                  name="ususers"
                  value={ususers}
                  onChange={handleInputChange}
                 
                />
                <TextField
                  id="ussenha"
                  label="Password"
                  type="password"
                  name="ussenha"
                  value={ussenha}
                  onChange={handleInputChange}
                  
                />
                <TextField
                  id="ustelefone"
                  label="Telefone"
                  type="text"
                  name="ustelefone"
                  value={ustelefone}
                  onChange={handleInputChange}
                ></TextField>
                <TextField
                  id="usmatricula"
                  label="Matricula"
                  type="text"
                  name="usmatricula"
                  value={usmatricula}
                  onChange={handleInputChange}
                 
                />
                <TextField
                  id="usperfil"
                  label="Perfil"
                  type="text"
                  name="usperfil"
                  value={usperfil}
                  onChange={handleInputChange}
                />
                <TextField
                  id="Departamento_id"
                  label="Departamento ID"
                  type="text"
                  name="Departamento_id"
                  value={Departamento_id}
                  onChange={handleInputChange}
                  
                />

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
      </Box>
    </Box>

  );
};

export default Cadastro;
