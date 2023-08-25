
import React, { useState } from "react";

import Navbar from "../../components/Sidebar/Navbar";
import {
  CenteredFormContainer,
  CustomForm,
  FieldContainer,
  CustomLabel,
  CustomTextField,
  StyledButton,
  Title,
  CenterBtn
} from './styles';
import { NavLink, Outlet } from 'react-router-dom';

import { useTheme } from '@emotion/react';
import { styled } from '@mui/material/styles';
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

const AtualizarSenha = (props) => {


  // TESTE MENU


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

const theme = useTheme();
const [menuAberto, alterarMenuAberto] = useState(true);
const toggleDrawer = () => {
  alterarMenuAberto(!menuAberto);
};
////

  return (
    <div>
      {/* <Navbar />
      <Title>Alterar senha</Title>
      <CenteredFormContainer>
        <CustomForm autoComplete="off">
          <FieldContainer>
            <CustomLabel>Senha</CustomLabel>
            <CustomTextField
                Label="secsigla"
                type="text"
                id="secsigla"
               
                placeholder="Nova senha"
                required
            />
          </FieldContainer>
          <FieldContainer>
            <CustomLabel>Confirmar senha</CustomLabel>
            <CustomTextField
            type="text"
            Label="secnome"
            id="secnome"
          
            placeholder="Confirmar senha"
            />
          </FieldContainer>
          
         
          <CenterBtn>
          <StyledButton id="btn-entrar" variant="contained" size="medium" type="submit">
          Alterar senha
          </StyledButton>
          </CenterBtn>
        </CustomForm>
      </CenteredFormContainer> */}

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
            {/* {theme.palette.mode === 'dark' ? <DarkMode /> : <LightMode />} */}
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
        
        >
          <NavLink to='/admin'>
            <ListItemButton>
              <ListItemIcon>
                <SupervisorAccount color='primary' />
              </ListItemIcon>
              <ListItemText primary='Administração' />
            </ListItemButton>
          </NavLink>
          <NavLink to='/'>
            <ListItemButton>
              <ListItemIcon>
                <ViewList color='primary' />
              </ListItemIcon>
              <ListItemText primary='Projetos' />
            </ListItemButton>
          </NavLink>
          <NavLink to='/licitacoes'>
            <ListItemButton>
              <ListItemIcon>
                <WorkIcon color='primary' />
              </ListItemIcon>
              <ListItemText primary='Licitações' />
            </ListItemButton>
          </NavLink>
        </List>
      </Drawer>
      <Box
        component='main'
       
      >
        <Container maxWidth='100%' sx={{ paddingY: 1, marginTop: 10 }}>
          <Box>
            <Outlet />
          </Box>
        </Container>
      </Box>
    </Box>
    </div>
  );
};

export default AtualizarSenha;
