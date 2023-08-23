
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

const AtualizarSenha = () => {


  return (
    <div>
      <Navbar />
      <Title>Alterar senha</Title>
      <CenteredFormContainer>
        <CustomForm autoComplete="off">
          <FieldContainer>
            <CustomLabel>Senha</CustomLabel>
            <CustomTextField
                Label="secsigla"
                type="text"
                id="secsigla"
               
                placeholder="Escreva a Sigla da Secretaria"
                required
            />
          </FieldContainer>
          <FieldContainer>
            <CustomLabel>Confirmar senha </CustomLabel>
            <CustomTextField
            type="text"
            Label="secnome"
            id="secnome"
          
            placeholder="Escreva o nome da secretaria"
            />
          </FieldContainer>
          
         
          <CenterBtn>
          <StyledButton id="btn-entrar" variant="contained" size="medium" type="submit">
          Alterar senha
          </StyledButton>
          </CenterBtn>
        </CustomForm>
      </CenteredFormContainer>
    </div>
  );
};

export default AtualizarSenha;
