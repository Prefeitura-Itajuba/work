/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth";
import { TextField } from "@mui/material";
import { api, createSession } from "../../services/api";
import { useNavigate, Link, NavLink } from "react-router-dom";
import "./styles.css";
import { styled, useTheme } from "@mui/material/styles";
import Navbar from "../../components/Sidebar/Navbar";
import Button from '@mui/material/Button';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ViewList from '@mui/icons-material/ViewListOutlined';
import DarkMode from '@mui/icons-material/DarkModeOutlined';
import LightMode from '@mui/icons-material/LightModeOutlined';
import SupervisorAccount from '@mui/icons-material/SupervisorAccountOutlined';
import WorkIcon from '@mui/icons-material/WorkOutline';
// import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from "@mui/icons-material/Search";
import QueueIcon from '@mui/icons-material/Queue';
import CreateIcon from '@mui/icons-material/Create';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import DescriptionIcon from '@mui/icons-material/Description';

import HomeIcon from "@mui/icons-material/Home";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";
const Home = (props) => {
  const { authenticated, logout } = useContext(AuthContext);
  const recoveredSession = localStorage.getItem("session");

  // console.log("usuario",recoveredSession)
  const [listaProjeto, setListaProjeto] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [status, setStatus] = React.useState("");
  const [statusFilter, setStatusFilter] = useState('Em andamento');
  const navigate = useNavigate();

  const forDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return formattedDate;
  };

  useEffect(() => {
    if (!authenticated) {
      return navigate("/");
    }
  }, []);

  // const { ususers } = JSON.parse(recoveredSession);

  useEffect(() => {
    api
      .get("projetos", {
        headers: {
          session: recoveredSession,
        },
      })
      .then((res) => {
        setListaProjeto(res);
        console.log("lsita projeto api get", listaProjeto);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleLogout = () => {
    setLogoutDialogOpen(true);
  };

  const confirmLogout = () => {
    logout();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNavigation = (route, text) => {
    setSelectedMenuItem(text);
    navigate(route);
    handleDrawerClose();
  };
  // const handleQueueIconClick = (project) => {
  //   console.log("Clicked Project Data:", project);
  // };

  const [searchTerm, setSearchTerm] = useState('');

  const [menuAberto, alterarMenuAberto] = useState(true);
  const toggleDrawer = () => {
    alterarMenuAberto(!menuAberto);
  };

  const drawerWidth = 240;
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    // zIndex: theme.zIndex.drawer + 0,
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
  
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      height: '49.7vw',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(7.5),
        },
      }),
    },
  }));
  

  const SidebarData = [
    { title: "Início", path: "/home",
     icon: <HomeIcon />,
      cName: "nav-text" },
  
    {
      title: "Processos",
      path: "/processos",
      icon: <AssignmentIcon />,
      cName: "nav-text",
    },
    {
      title: "Cadastro",
      path: "/NovoUsuario",
      icon: <HowToRegIcon />,
      cName: "nav-text",
    },
    {
      title: "Criar Secretaria",
      path: "/NovaSecretaria",
      icon: <CreateIcon />,
      cName: "nav-text",
    },
    {
      title: "Criar Departamento",
      path: "/Departamentos",
      icon: <AutoAwesomeMosaicIcon />,
      cName: "nav-text",
      // Cannot access 'confirmLogout'
    },
    {
      title: "Tipo Projeto",
      path: "/TipoProjeto",
      icon: <DescriptionIcon />,
      cName: "nav-text",
  
      // Cannot access 'confirmLogout'
    },
    {
      title: "Sair",
      // icon: <LogoutIcon />,
      cName: "nav-text",
  
      // Cannot access 'confirmLogout'
    },
  ];
  
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
      <AppBar position='absolute' open={menuAberto}>
        <Toolbar sx={{ paddingRight: '24px' }}>
          {/* <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer}
            sx={{ marginRight: '36px', ...(menuAberto && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton> */}
          <Box sx={{ flexGrow: 1 }} />
          <IconButton sx={{ ml: 1 }} onClick={props.changeTheme} color='inherit'>
          </IconButton>
          <IconButton color='inherit'>
            <Avatar sx={{ bgcolor: 'primary.main' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant='permanent' open={menuAberto}>
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', px: [1] }}>
          {/* <Typography component='h1' variant='h5' fontWeight={700}>
            Menu
          </Typography> */}
          <IconButton color='inherit' aria-label='open drawer' onClick={toggleDrawer}>
            {menuAberto ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
        <Divider />
        <List
          component='nav'
          sx={{
            span: { color: (t) => (t.palette.mode === 'light' ? t.palette.grey[900] : t.palette.text.primary) },
            a: { textDecoration: 'none' },
          }}
        >
          {SidebarData.map((item, index) => (
            <NavLink key={index} to={item.path}>
              <ListItemButton>
                <ListItemIcon style={{ color: "#132544", fontSize: "3rem" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </NavLink>
          ))}
        </List>
      </Drawer>
      <Box
        component='main'
    
      >
        <Container maxWidth='100%' sx={{ paddingY: 1, marginTop: 10 }}>
          <Box>
            <button onClick={confirmLogout}>Sair</button>
          <div className="table">
        <table className="custom-table">
          <thead className="table-header">
            <tr>
              <th>Descr. Resum.</th>
              <th>N° da Solicitação</th>
              <th>Departamento</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Detalhes</th>
            </tr>
          </thead>
          <tbody>
            {listaProjeto &&
              listaProjeto.data &&
              listaProjeto.data.filter((projeto) => {
                if (searchTerm === "") {
                  return true;
                } else if (
                  projeto.prjdescresumida
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return true;
                }
                return false;
              }).map((projeto, key) => (
                <tr key={projeto.prjid}>
                  {/* <td>{projeto.prjid}</td> */}
                  {/* <td>{forDate(projeto.prjdata_inicial)}</td> */}
                  <td>{projeto.prjdescresumida}</td>
                  <td>{projeto.idSonner}</td>
                  <td>{projeto.depNome}</td>
                  <td>{projeto.tpjdescricao}</td>
                  <td>{projeto.prjvalor}</td>

                  <td>
                    {/* to={`/detalhesLicitacoes/${projeto.prjid}`} onClick={() => handleQueueIconClick(projeto)} */}
                  <NavLink to={`/detalhesLicitacoes/${projeto.prjid}`} state={{ dadosDoProjeto: projeto }}>
                    <QueueIcon />
                  </NavLink>
                </td>
                </tr>
              ))}
        </tbody>

      </table>
    </div>
          </Box>
        </Container>
      </Box>
    </Box>
      {/* <Navbar /> */}
    
    </div >
  );
};

export default Home;
// {listaProjeto && listaProjeto.data && listaProjeto.data.map((projeto) => (
//   <tr key={projeto.prjid}>
//     {/* <td>{projeto.prjid}</td> */}
//     {/* <td>{forDate(projeto.prjdata_inicial)}</td> */}
//     <td>{projeto.prjdescresumida}</td>
//     <td>{projeto.idSonner}</td>
//     <td>{projeto.depNome}</td>
//     <td>{projeto.tpjdescricao}</td>
//     <td>{projeto.prjvalor}</td>

//     <td>
//       <NavLink to={`/detalhesLicitacoes/${projeto.prjid}`} >
//         <QueueIcon />
//       </NavLink>
//     </td>
//   </tr>
// ))}
// prjstatus
// :
// 0 - > verdadeiro concluido
// 1 -> cancelado