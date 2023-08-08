import React, { useState, useEffect, useRef, useContext } from "react";
import { api } from "../services/api";
import { AuthContext } from "../context/auth";
import { useParams } from "react-router-dom";

const DetalhesLicitacoes = () => {
  const dataHoje = new Date();
  const idRecuperado = localStorage.getItem("session"); 
  console.log(JSON.parse(idRecuperado));
  const { idUsuaros } = JSON.parse(idRecuperado);


  const [formData, setFormData] = useState({ 
      // prjid: "",
      idSonner: "",
      prjdata_inicial: dataHoje,
      prjdescricao: "",
      prjdescresumida: "",
      prjdata_final: "",
      status: "aberto",
      prjobrservacao_final: "",
      Usuario_id: idUsuaros,
      prjvalor: "",
      tipoprojeto: ""
  });
  // console.log(formData.tipoprojeto);
  // console.log(formData.Usuario_id);
  
  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  
  const handleSubmit = (e) => {
      e.preventDefault();
      // Aqui você pode fazer a chamada à API para salvar os dados f
      api
      .post("etapasprojetos", formData)
      .then((res) => {
          console.log("Solicitação salva com sucesso.", res)
      })
      .catch((error) => {
          console.error("Falha ao salvar solicitação", error);
      });
  };
  
  return (
      <div>

    <form onSubmit={handleSubmit}>
      {/* <div>
        <label htmlFor="prjid">prjid:</label>
        <input
          type="text"
          id="prjid"
          name="prjid"
          value={formData.prjid}
          onChange={handleChange}
          />
      </div> */}

      <div>
        <label htmlFor="idSonner">idSonner:</label>
        <input
          type="text"
          id="idSonner"
          name="idSonner"
          value={formData.idSonner}
          onChange={handleChange}
          />
      </div>
      <div>
        <label htmlFor="prjdescresumida">prjdescresumida:</label>
        <input
          type="text"
          id="prjdescresumida"
          name="prjdescresumida"
          value={formData.prjdescresumida}
          onChange={handleChange}
          />
      </div>
      <div>

      </div>

      <div>
        <label htmlFor="prjdescricao">prjdescricao:</label>
        <input
          type="text"
          id="prjdescricao"
          name="prjdescricao"
          value={formData.prjdescricao}
          onChange={handleChange}
          />
      </div>

      {/* <div>
        <label htmlFor="prjdata_final">prjdata_final:</label>
        <input
          type="date"
          id="prjdata_final"
          name="prjdata_final"
          value={formData.prjdata_final}
          onChange={handleChange}
          />
      </div> */}

      {/* <div>
        <label htmlFor="status">status:</label>
        <input
          type="text"
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          />
      </div> */}

      {/* <div>
        <label htmlFor="prjobrservacao_final">prjobrservacao_final:</label>
        <input
          type="text"
          id="prjobrservacao_final"
          name="prjobrservacao_final"
          value={formData.prjobrservacao_final}
          onChange={handleChange}
          />
      </div> */}



      <div>
        <label htmlFor="prjvalor">prjvalor:</label>
        <input
          type="text"
          id="prjvalor"
          name="prjvalor"
          value={formData.prjvalor}
          onChange={handleChange}
          />
      </div>
      <div>
          <select 
          name="tipoprojeto" 
          id="tipoprojeto"
          value={formData.tipoprojeto}
          onChange={handleChange}> Selecione o tipo de solicitação
              <option value="1">Solicitação Comum</option>
              <option value="2">ATA</option>
          </select>
      </div>
      {/* <div>
        <label htmlFor="tipoprojeto">tipoprojeto:</label>
        <input
          type="text"
          id="tipoprojeto"
          name="tipoprojeto"
          value={formData.tipoprojeto}
          onChange={handleChange}
          />
      </div> */}

      <button type="submit">Salvar</button>
    </form>
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