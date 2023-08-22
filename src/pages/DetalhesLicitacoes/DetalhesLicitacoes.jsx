import React, { useState, useEffect, useRef, useContext } from "react";
import { api } from "../../services/api";
import { useParams, NavLink, useLocation } from "react-router-dom";
import "./styles.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Navbar from "../../components/Sidebar/Navbar";
import { TextField } from "@mui/material";
import { format } from "date-fns";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const DetalhesLicitacoes = (props) => {
  const location = useLocation();
  const { projetoId } = useParams();
  const [etapaProjeto, setEtapasProjeto] = useState([]);
  const [projeto, setProjeto] = useState([]);
  const recoveredSession = localStorage.getItem("session");
  const [open, setOpen] = useState(false);
  const [delProjeto,setDelProjeto] = useState([])

  console.log("location.state =>>", location.state);
  // useEffect(() => {
  //   api
  //     .get(`projetos`, {
  //       headers: {
  //         session: recoveredSession,
  //       },
  //     })
  //     .then((res) => {
  //       console.log("projeto", res.data);
  //       setProjeto(res);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  const [data, setData] = useState({
    etpobservacao: "",
    Projeto_id: "",
    etpstatus: "",
    Usuarios_usuarioid: "",
    Departamento_Depid: "",
  });

  const etpStatusEnum = {
    aberto: "aberto",
    encaminhado: "encaminhado",
    cancelado: "cancelado",
    retorna: "retorna",
  };

  const handleDelete =  () =>{
    api
    .get(`etapasprojetos/${projetoId}`)
    .then((res) => {
      setEtapasProjeto(res.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    handleDelete()
  }, []);
  // console.log(location.state);

  const alterarDados = (event) => {
    setData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const enviarEtapa = (e) => {
    e.preventDefault();
    const storage = localStorage.getItem("session");
    const session = JSON.parse(storage);
    // console.log({
    //   ...data,
    //   Usuarios_usuarioid: session.idUsuaros,
    //   Projeto_id: projetoId,
    // });
    api
      .post("etapasprojetos", {
        ...data,
        Usuarios_usuarioid: session.idUsuaros,
        Projeto_id: projetoId,
      })
      .then(({ data }) => {
        setEtapasProjeto((prevState) => [...prevState, data]);
      })
      .catch();
  };

  const uniqueDepartments = [
    ...new Set(etapaProjeto.map((etapa) => etapa.Departamento_Depid)),
  ];
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dialogWidth = "800px";
  const dialogHeight = "800px";

  // const dadosDoProjeto = location.state && location.state.dadosDoProjeto;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy");
  };

  useEffect(() => {
    api
      .delete(`/projeto/${projetoId}`)
      .then((res) => {
        setDelProjeto(res)
       console.log("deletou")
      })
      .catch((error) => {
        console.log("ERRO",error)
      });
  }, []);
  return (
    <div>
      <Navbar />
      {/* {etapaProjeto.projeto_id} */}
      <div className="table">
        <table className="custom-tables">
          <thead>
            <tr>
              <th>ID SONNER: {location?.state?.dadosDoProjeto?.idSonner}</th>
              <th>VALOR: {location?.state?.dadosDoProjeto?.prjvalor}</th>
              <th>
                DES RESUMIDA: {location?.state?.dadosDoProjeto?.prjdescresumida}
              </th>
              <th>
                DATA:{" "}
                {formatDate(location?.state?.dadosDoProjeto?.prjdata_inicial)}
              </th>
            </tr>
          </thead>
          {/* prjdata_inicial */}
          {/*  */}
          {/* prjdata_final */}
          {/* depNome */}

          <tbody>
            <tr>
              {/* <td>{projeto.prjid}</td> */}
              {/* <td>{forDate(projeto.prjdata_inicial)}</td> */}
              <td className="testeTam">
                {location?.state?.dadosDoProjeto && (
                  <div>
                    <p>
                      Descrição Resumida:{" "}
                      {location.state.dadosDoProjeto.prjdescricao}
                    </p>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* {location?.state?.dadosDoProjeto && (
        <div>
          <p>Descrição Resumida: {location.state.dadosDoProjeto.prjdescricao}</p>
        </div>
      )} */}
      <div>
        <div className="positionBtn">
          <Button
            variant="contained"
            onClick={handleClickOpen}
            style={{
              width: "146px",
              height: "49px",
              textTransform: "none",
              fontFamily: "Inter",
              fontWeight: "300",
            }}
          >
            Atualizar etapa projeto
          </Button>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          PaperProps={{
            style: {
              width: "100%",
              maxWidth: dialogWidth,
              maxHeight: dialogHeight,
            },
          }}
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Atualizar Solicitação
          </DialogTitle>
          <DialogContent>
            <form autoComplete="off" onSubmit={enviarEtapa}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="form-section">
                  <label className="form-label">Status</label>
                  <br />
                  <input
                    className="full-width-input"
                    type="text"
                    name="etpstatus"
                    onChange={alterarDados}
                  />
                </div>

                <div className="form-section">
                  <label className="form-label">Departamento</label>
                  <br />
                  <select
                    className="form-select full-width-input "
                    name="Departamento_Depid"
                    onChange={alterarDados}
                  >
                    <option value="">Selecione um departamento</option>
                    {uniqueDepartments.map((departamento) => (
                      <option key={departamento} value={departamento}>
                        {departamento}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-section">
                  <label className="form-label">Observacao</label>
                  <br />
                  <input
                    className="full-width-input "
                    type="text"
                    name="etpobservacao"
                    onChange={alterarDados}
                  />
                </div>

                <div className="btn-container">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleClose}
                    autoFocus
                    style={{
                      width: "146px",
                      height: "49px",
                      textTransform: "none",
                      fontFamily: "Inter",
                      fontWeight: "300",
                    }}
                  >
                    Sair
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{
                      width: "146px",
                      height: "49px",
                      textTransform: "none",
                      fontFamily: "Inter",
                      fontWeight: "300",
                    }}
                  >
                    Atualizar
                  </Button>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Button
        variant="contained"
        color="error"
        type="submit"
        onClick={handleDelete}
        style={{
          width: "146px",
          height: "49px",
          textTransform: "none",
          fontFamily: "Inter",
          fontWeight: "300",
        }}
      >
        Deletar
      </Button>
      <Button
        variant="outlined"
        type="submit"
        style={{
          width: "146px",
          height: "49px",
          textTransform: "none",
          fontFamily: "Inter",
          fontWeight: "300",
        }}
      >
        Atualizar
      </Button>

      <h2 className="testeTitulo">
        DETALHES ETAPA PROJETO (o que fica em baixo)
      </h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Início</th>
              <th>Término</th>
              <th>Dias Decorridos </th>
              <th>Departamento</th>
              <th>Status</th>
              <th>Usuário</th>
            </tr>
          </thead>
          <tbody>
            {etapaProjeto.map((projeto) => (
              <tr key={projeto}>
                <td>{projeto.etpdata}</td>
                <td>{projeto.idSonner}</td>
                <td>{projeto.depNome}</td>
                <td>{projeto.prjvalor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre>{JSON.stringify(etapaProjeto, null, 2)}</pre>
    </div>
  );
};

export default DetalhesLicitacoes;
