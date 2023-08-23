import React, { useState, useEffect, useRef, useContext } from "react";
import { api } from "../../services/api";
import { useParams, NavLink, useLocation } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Navbar from "../../components/Sidebar/Navbar";
import { TextField } from "@mui/material";

import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import {
  CenteredFormContainer,
  CustomForm,
  FieldContainer,
  CustomLabel,
  CustomTextField,
  StyledButton,
  Th,
  Td,
  TbodyTr,
  PositionBtn,
  PositionCtn,
  TableSeparator,
  SeparateBtn
} from './styles';


const DetalhesLicitacoes = (props) => {
  const location = useLocation();
  const { projetoId } = useParams();
  const [etapaProjeto, setEtapasProjeto] = useState([]);
  const [projeto, setProjeto] = useState([]);
  const recoveredSession = localStorage.getItem("session");
  const [open, setOpen] = useState(false);
  const [delProjeto, setDelProjeto] = useState([])

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

  const handleDelete = () => {
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

  const dadosDoProjeto = location.state && location.state.dadosDoProjeto;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
  };


  return (
    <div>
      <Navbar />
      <PositionCtn>
        <TableContainer component={Paper}>
          <Table className="custom-tables">
            <TableHead>
              <TableRow>
                <TableCell><b>ID SONNER:</b> {location?.state?.dadosDoProjeto?.idSonner}</TableCell>
                <TableCell><b>VALOR:</b> {location?.state?.dadosDoProjeto?.prjvalor}</TableCell>
                <TableCell><b>DESC RESUMIDA:</b> {location?.state?.dadosDoProjeto?.prjdescresumida}</TableCell>
                <TableCell><b>DATA:</b> {formatDate(location?.state?.dadosDoProjeto?.prjdata_inicial)}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className="testeTam" colSpan={4} style={{ padding: '100px', borderLeft: '5px solid #dddddd' }}>
                  {dadosDoProjeto && (

                    <p>Descrição Resumida: {location.state.dadosDoProjeto.prjdescricao}</p>

                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </PositionCtn>
      <div>
        <PositionBtn>
          <Button variant="contained" onClick={handleClickOpen} style={{ width: '146px', height: '49px', textTransform: 'none', fontFamily: 'Inter', fontWeight: '300' }}>
            Atualizar
          </Button>
        </PositionBtn>
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

            <CenteredFormContainer>
              <CustomForm autoComplete="off" onSubmit={enviarEtapa}>
                <FieldContainer>
                  <CustomLabel>Status</CustomLabel>
                  <CustomTextField
                    type="text"
                    name="etpstatus"
                    onChange={alterarDados}
                  />
                </FieldContainer>
                <FieldContainer>
                  <CustomLabel>Departamento</CustomLabel>
                  <CustomTextField
                    as="select"
                    name="Departamento_Depid"
                    onChange={alterarDados}
                  >
                    <option value="">Selecione um departamento</option>
                    {uniqueDepartments.map((departamento) => (
                      <option key={departamento} value={departamento}>
                        {departamento}
                      </option>
                    ))}
                  </CustomTextField>
                </FieldContainer>
                <FieldContainer>
                  <CustomLabel>Observação</CustomLabel>
                  <CustomTextField
                    type="text"
                    name="etpobservacao"
                    onChange={alterarDados}
                  />
                </FieldContainer>
                <SeparateBtn>
                  <StyledButton
                    variant="outlined"
                    color="error"
                    onClick={handleClose}
                    autoFocus
                  >
                    Sair
                  </StyledButton>
                  <StyledButton variant="contained" type="submit">
                    Atualizar
                  </StyledButton>
                </SeparateBtn>
              </CustomForm>
            </CenteredFormContainer>
          </DialogContent>
        </Dialog>
      </div>
    
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>Início</Th>
              <Th>Término</Th>
              <Th>Dias Decorridos</Th>
              <Th>Departamento</Th>
              <Th>Status</Th>
              <Th>Usuário</Th>
            </tr>
          </thead>
          <tbody>
            <TbodyTr>
              {etapaProjeto.map((projeto) => (
                <tr key={projeto}>
                  <Td>{projeto.etpdata}</Td>
                  <Td>{projeto.idSonner}</Td>
                  <Td>{projeto.depNome}</Td>
                  <Td>{projeto.prjvalor}</Td>
                </tr>
              ))}

            </TbodyTr>
          </tbody>
        </Table>
        <TableSeparator />
      </TableContainer>

      {/* <pre>{JSON.stringify(etapaProjeto, null, 2)}</pre> */}
    </div>
  );
};

export default DetalhesLicitacoes;
