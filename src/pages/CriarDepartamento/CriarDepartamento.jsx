// import React from "react";
// import { Button } from "@mui/material";
// import { AuthContext } from "../context/auth";
// import { TextField } from "@mui/material";
// import { api, createSession } from "../services/api"
// import AppRoutes from "../AppRoutes";
// import { useNavigate, Link } from "react-router-dom";
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import { useState } from "react"

// const CriarDepartamento = () =>{

//     const [depNome, setDepnome] = useState("");
//     // const []
//     const handleSubmit = (e) =>{
//         e.preventDefault();

//         const formData = {
//             depNome
//         };
//         api.post("departamentos", formData)
//         .then((res) => {
//             console.log("Departamento registrado com sucesso", res)
//         });
//         .catch((error) => {
//             console.error("falha ao cadastrar o departamento", error)
//         });
//     };

//     const handleInputChange = (e) =>{
//         const { name, value} = e.target;
//         switch(name) {
//             case "depNome":
//                 console.log(depNome)

//                 setDepnome(value);
//                 break;
//                 default;
//                 break;
//         }
//     }



//     return(
//         <div>
//             <h1>
//                 Criar Novo Departamento
//             </h1>
//         </div>
//     )
// }

// export default CriarDepartamento;