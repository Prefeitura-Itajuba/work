import React, { useState, useEffect, useRef, useContext } from "react";
import { api } from "../../services/api";
import { useParams, NavLink } from "react-router-dom";
import "./styles.css";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const DetalhesLicitacoes = () => {
  const { projetoId } = useParams();
  const [etapaProjeto, setEtapasProjeto] = useState([]);
  const [projeto, setProjeto] = useState([]);
  const recoveredSession = localStorage.getItem("session");
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    api
      .get(`projetos`, {
        headers: {
          session: recoveredSession,
        },
      })
      .then((res) => {
        console.log("projeto", res.data);
        setProjeto(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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

  useEffect(() => {
    api
      .get(`etapasprojetos/${projetoId}`)
      .then((res) => {
        setEtapasProjeto(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
    console.log({
      ...data,
      Usuarios_usuarioid: session.idUsuaros,
      Projeto_id: projetoId,
    });
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

  const uniqueDepartments = [...new Set(etapaProjeto.map(etapa => etapa.Departamento_Depid))];
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const buttonStyle = {
    backgroundColor: '#1a83ff',
    fontFamily: 'Inter',
    fontWeight: '300',
    color: 'white',
  };
  const dialogWidth = '700px';
  return (
    <div>
      {/* {etapaProjeto.projeto_id} */}
      <h1>Detalhes projeto</h1>
      criar logica ao clicar em um projeto,deve mostrar somente esse
      <div>
        <div className="positionBtn">
          <Button variant="outlined" onClick={handleClickOpen} style={buttonStyle}>
            Atualizar
          </Button>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          PaperProps={{
            style: {
              width: '100%',
              maxWidth: dialogWidth,
            },
          }}
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Atualizar Solicitação
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <form autoComplete="off" onSubmit={enviarEtapa}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="form-section">
                    <label className="form-label">Status</label>< br />
                    <input className="form-input" type="text" name="etpstatus" onChange={alterarDados} />
                  </div>

                  <div className="form-section">
                    <label className="form-label">Departamento</label>< br />
                    <select className="form-select" name="Departamento_Depid" onChange={alterarDados}>
                      <option value="">Selecione um departamento</option>
                      {uniqueDepartments.map(departamento => (
                        <option key={departamento} value={departamento}>
                          {departamento}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-section">
                    <label className="form-label">Observacao</label><br />
                    <input className="form-input" type="text" name="etpobservacao" onChange={alterarDados} />
                  </div>

                  <div className="form-align-btn">
                    <button className="form-btn" type="submit">Enviar etapa</button>
                  </div>
                </div>
              </form>
            </DialogContentText>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Sair
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <h2 className="testeTitulo">
        DETALHES ETAPA PROJETO (o que fica em baixo)
      </h2>
      <div className="table">
        <table className="">
          <thead className="table-header">
            <tr>
              <th>Início</th>
              <th>Término</th>
              <th>Dias Decorridos	</th>
              <th>Departamento</th>
              <th>Status</th>
              <th>Usuário</th>
            </tr>
          </thead>
          <tbody>
            {etapaProjeto.map((projeto) => (
              <tr key={projeto}>
                {/* <td>{projeto.prjid}</td> */}
                {/* <td>{forDate(projeto.prjdata_inicial)}</td> */}
                <td>{projeto.etpdata}</td>
                <td>{projeto.idSonner}</td>
                <td>{projeto.depNome}</td>
                {/* <td>{projeto.Departamento_Depid}</td> */}
                {/* <td>{projeto.Usuario_id}</td> */}

                <td>{projeto.prjvalor}</td>

              </tr>
            ))}

{/* {projeto.prjdescresumida} */}
          </tbody>
        </table>
      </div>
      <pre>{JSON.stringify(etapaProjeto, null, 2)}</pre>
    </div>
  );
};

export default DetalhesLicitacoes;
// {projectDetails && projectDetails.map((etapa) => (
//   <div key={etapa.idetapas_projeto}>
//     <h2>Detalhes do Projeto</h2>
//     <p>Descrição Resumida: {etapa.prjdescricao}</p>

//     <button type="submit">Salvar</button>
//   </div>
// )
// )}