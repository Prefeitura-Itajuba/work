import React, { useContext, useState } from "react";
import Navbar from "../../components/Sidebar/Navbar";
import { useParams, useLocation } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { format } from 'date-fns';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

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


const DetalhesProcessosLicitatorios = (props) => {

    const [open, setOpen] = useState(false);

    const location = useLocation();
    const { etapaProcessoLicitatorio } = useParams();
    // console.log("location.state =>>", location.state);
    const dadosDoProjeto = location.state && location.state.dadosDoProjeto;
    // const formatDate = (dateString) => {
    //     const date = new Date(dateString);
    //     return format(date, 'dd/MM/yyyy');
    // };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const dialogWidth = "800px";
    const dialogHeight = "800px";

    
//   const uniqueDepartments = [
//     ...new Set(etapaProjeto.map((etapa) => etapa.Departamento_Depid)),
//   ];
    return (
        <div>
            <Navbar />
            <PositionCtn>
                <TableContainer component={Paper}>
                    <Table className="custom-tables">
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Lici Numero:</b> {location?.state?.dadosDoProjeto?.licinumero}</TableCell>
                                <TableCell><b>numero compras:</b> {location?.state?.dadosDoProjeto?.numeroCompras}</TableCell>
                                <TableCell><b>DESC RESUMIDA:</b> {location?.state?.dadosDoProjeto?.licinome}</TableCell>

                                <TableCell><b>VALOR:</b> {location?.state?.dadosDoProjeto?.licvalor}</TableCell>

                                {/* <TableCell><b>DATA:</b> {formatDate(location?.state?.dadosDoProjeto?.prjdata_inicial)}</TableCell> */}
                            </TableRow>
                        </TableHead>
                        {/* <TableBody>
                            <TableRow>
                                <TableCell className="testeTam" colSpan={4} style={{ padding: '100px', borderLeft: '5px solid #dddddd' }}>
                                    {dadosDoProjeto && (

                                        <p>Descrição Resumida: {location.state.dadosDoProjeto.licinome}</p>

                                    )}
                                </TableCell>
                            </TableRow>
                        </TableBody> */}
                    </Table>
                </TableContainer>
            </PositionCtn>
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
                    Atualizar Processo Licitatório
                </DialogTitle>
                <DialogContent>

                    <CenteredFormContainer>
                        <CustomForm autoComplete="off" >
                            <FieldContainer>
                                <CustomLabel>Status</CustomLabel>
                                <CustomTextField
                                    type="text"
                                    name="etpstatus"
                                  
                                />
                            </FieldContainer>
                            {/* <FieldContainer>
                                <CustomLabel>Departamento</CustomLabel>
                                <CustomTextField
                                    as="select"
                                    name="Departamento_Depid"
                               
                                >
                                    <option value="">Selecione um departamento</option>
                                    {uniqueDepartments.map((departamento) => (
                                        <option key={departamento} value={departamento}>
                                            {departamento}
                                        </option>
                                    ))}
                                </CustomTextField>
                            </FieldContainer> */}
                            <FieldContainer>
                                <CustomLabel>Observação</CustomLabel>
                                <CustomTextField
                                    type="text"
                                    name="etpobservacao"
                                  
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

    )
}

export default DetalhesProcessosLicitatorios;