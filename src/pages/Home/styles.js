import styled from 'styled-components';

const Table = styled.table`
  font-family: tahoma;
  border-collapse: separate;
  border-spacing: 0 10px;
  width: 100%;
  border: none;
  table-layout: fixed;
  box-sizing: border-box;
  padding: 13px;
`;

const Th = styled.th`
  background-color: #f7f8fa;
  padding: 10px;
  text-align: left;
  border-top: 1px solid #dddddd;
  height: 100px;
  border-bottom: 1px solid #dddddd;
`;

const Td = styled.td`
  padding: 8px;
  background-color: white;
  border: none;
  height: 100px;
  border-bottom: 1px solid #dddddd;
  &:first-child {
    border-left: 6px solid #cccccc;
  }
`;

const TBodyTrLastChildTd = styled.td`
  border-bottom: none;
`;

const TBodyTrOdd = styled.tr`
  background-color: #f2f2f2;
`;

const TBodyTrEven = styled.tr`
  background-color: white;
`;

const TBodyTr = styled.tr`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const FlexItem = styled.div`
  margin-right: 10px;
`;

const H1Solicitacoes = styled.h1`
  font-family: "Inter";
  font-weight: 300;
`;

const TextCenter = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 10px;
  margin-top: 30px;
`;

const DivSeparate = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PositionInputs = styled.div`
  margin-top: 30px;
`;

const BtnSearch = styled.button`
  background-color: #1a83ff;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  height: 43px;
  width: 50px;
  &:hover {
    background: #193c5b;
  }
`;

const AlignBtnSolicitacao = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-top: 30px;
`;

const InputStyle = styled.input`
  height: 30px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 1px rgba(52, 152, 219, 0.7);
  }
`;

const Select = styled.select`
  height: 42px;
  width: 180px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  margin-right: 10px;
  transition: border-color 0.3s, box-shadow 0.3s;
  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 1px rgba(52, 152, 219, 0.7);
  }
`;

const BtnSolicitacao = styled.button`
  background-color: #1a83ff;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  height: 40px;
  border-color: transparent;
  width: 150px;
`;

const CustomButton = styled.button`
  background-color: #ff5733;
  color: white;
  &:hover {
    background-color: #d43f00;
  }
`;

export const TitleSolicitacao = styled.p`
font-family: 'Poppins';
font-weight: 300;
font-size: 2.5rem;
text-align: center;
margin: 30px;


`
export const AlignInputs = styled.div`
display: flex !important;
align-items: flex-end;
justify-content: flex-end;
`

export const InputText = styled.input`
height: 30px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s;
  
`

export {
  Table,
  Th,
  Td,
  TBodyTrLastChildTd,
  TBodyTrOdd,
  TBodyTrEven,
  TBodyTr,
  FlexContainer,
  FlexItem,
  H1Solicitacoes,
  TextCenter,
  DivSeparate,
  PositionInputs,
  BtnSearch,
  AlignBtnSolicitacao,
  InputStyle,
  Select,
  BtnSolicitacao,
  CustomButton,
};
// .input-style {
//   height: 30px;
//   padding: 5px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   outline: none;
//   transition: border-color 0.3s, box-shadow 0.3s;
// }

// .input-style:focus {
//   border-color: #3498db;
//   box-shadow: 0 0 1px rgba(52, 152, 219, 0.7);
// }
