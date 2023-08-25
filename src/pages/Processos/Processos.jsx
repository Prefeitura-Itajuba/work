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
const Processos = () => {
  const { authenticated, logout } = useContext(AuthContext);
  const recoveredSession = localStorage.getItem("session");
  const [listaProjeto, setListaProjeto] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [status, setStatus] = React.useState("");
  const [statusFilter, setStatusFilter] = useState('Em andamento');
  const [searchTerm, setSearchTerm] = useState('');
  const [listaLicitatorio, setListaLicitatorio] = useState([]);
  const [atualizaProcesso, setAtualizaProcesso] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    api
      .get("processolicitatorios", {
        headers: {
          session: recoveredSession,
        },
      })
      .then((res) => {
        console.log("lista projeto licitatorios", res.data);
        setListaLicitatorio(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (!authenticated) {
      return navigate("/");
    }
  }, []);

  // const { ususers } = JSON.parse(recoveredSession);



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
  const handleQueueIconClick = (project) => {
    console.log("Clicked Project Data:", project);
  };

  //   api.post("etapaslicitarios")
  //   .then((res) => {
  //       console.log("Secretaria Cadastrada com suceso", res,);
  //   })
  //   .catch((error) => {
  //       console.error("falha ao cadastrar a secretaria", error);
  //   });
  // };


  return (
    <div>
      <Navbar />
      <div className="divSeparate">
        <div>
          <h1 className="h1-solicitacoes textCenter">Tela Processos</h1>
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
            placeholder="Pesquisar"
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
            {listaLicitatorio && listaLicitatorio.data && listaLicitatorio.data.map((licitatorio) => (
              <tr key={licitatorio.idprocessos_licitatorios}>
                <td>{licitatorio.licinome}</td>
                <td>{licitatorio.licinumero}</td>
                {/* <td>{projeto.depNome}</td>
                <td>{projeto.tpjdescricao}</td>
                <td>{projeto.prjvalor}</td> */}
                <td>
                  <NavLink to={`/detalhesProcessos/${licitatorio.idprocessos_licitatorios}`} state={{ dadosDoProjeto: licitatorio } }
                  >
                    <QueueIcon />
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Processos;
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
