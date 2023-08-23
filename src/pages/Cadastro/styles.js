import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const CenteredFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
//   min-height: 100vh;
`;

export const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 300px;
  width: 100%;
  margin: 0 auto;
  background-color: white;
  padding: 20px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 3px;

  @media (min-width: 768px) {
    max-width: 740px;
  }
`;

export const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const CustomLabel = styled.label`
  flex: 1;
  padding-right: 10px;
  @media screen and (max-width: 768px) {
    padding-right: 0;
    margin-bottom: 5px;
  }
`;

export const CustomTextField = styled(TextField)`
  flex: 6;
`;

export const StyledButton = styled(Button)`
  margin-top: 15px;
`;

export const Title = styled.p`
font-family: 'Poppins';
font-weight: 300;
font-size: 2.5rem;
text-align: center;
margin: 30px;
`

export const CenterBtn = styled.div`
display: flex;
align-items:center;
justify-content: center;
`