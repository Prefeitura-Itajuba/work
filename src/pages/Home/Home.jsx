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

import SearchIcon from "@mui/icons-material/Search";
import QueueIcon from '@mui/icons-material/Queue';
const Home = () => {
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


  return (
    <div>
      <Navbar />
      <div className="divSeparate">
        <div>
          <h1 className="h1-solicitacoes textCenter">Solicitações</h1>
        </div>
        <div className="positionInputs">
          <select
            name="status"
            className="select-style"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="Em andamento">Em andamento</option>
            <option value="Concluído">Concluído</option>
            <option value="Cancelado">Cancelado</option>
            <option value="Ata">Ata</option>
          </select>

          <input
            id="outlined-basic"
            label="Pesquisar"
            variant="outlined"
            className="input-style"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar por descrição"
          />
        </div>

      </div>
      <div className="alignBtnSolicitacao">
        <Link to="/NovaSolicitacao">

          <Button variant="contained" style={{ width: '146px', height: '49px', textTransform: 'none', fontFamily: 'Inter', fontWeight: '300' }}>Nova solicitação</Button>

        </Link>
      </div>
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