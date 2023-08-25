import styled from 'styled-components';
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

export const CustomTextField = styled.input`
  flex: 6;
  height: 40px;
  border-radius: 10px; 
  padding: 0 0.4rem;
  border: 1px solid #ccc;
`;

export const SeparateBtn = styled.div`
display: flex;
justify-content: space-between;
`

export const StyledButton = styled(Button)`
  margin-top: 15px;
  width: 146px;
`;

export const Title = styled.p`
font-family: 'Poppins';
font-weight: 300;
font-size: 2.5rem;
text-align: center;
margin: 30px;
`

export const PositionBtn = styled.div`
display: flex;
align-items: flex-end;
justify-content: flex-end;
padding: 8px;

`
export const PositionCtn = styled.div`
margin-top: 20px;
padding: 8px;

`


export const TableContainer = styled.div`
  width: 100%;
  /* overflow-x: auto; */
  margin-top: 60px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  padding: 10px;
  text-align: left;
  position: relative;
  background-color: #f2f2f2;
  height: 20px;
  font-weight: bold;
`;

export const Td = styled.td`
  padding: 10px;
  text-align: left;
  position: relative;
  height: 30px;

  &:nth-child(5) {
    /* font-weight: bold; */
  }

  &:first-child {
    /* font-weight: bold; */
  }

  &:last-child {
    font-style: italic;
  }
`;

export const TbodyTr = styled.tr`
  background-color: #fff;
  height: 20px; 
  
`;

export const TableSeparator = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
`;