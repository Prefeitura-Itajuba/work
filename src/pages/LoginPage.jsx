import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth";
import { Navigate, useNavigate } from "react-router-dom";
import Imagem from "../assets/image.png"
import Logo from "../assets/Logo.png"

import "../styles/styles.js"
import "../styles/styles.css"



const LoginPage = () => {
    const { authenticated, login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [usemail, setEmail] = useState("");
    const [ussenha, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("submit", { usemail, ussenha });

        login(usemail, ussenha);
    };


    // const { authenticated } = useContext(AuthContext);
    // if (authenticated){
    //     return navigate("/")
    // }    
    useEffect(() => {
        if (authenticated) {
            return navigate("/home")
        }
    }, [])
    return (
        <div class="container">
            {/* <div className="image-container"> */}
            <img src={Imagem} alt="logo"></img>

            {/* </div> */}
            <div id="form-container">
                <img src={Logo} alt="logo" className="logo"></img>

                <form className="form" onSubmit={handleSubmit}>
                    <TextField
                        id="usemail"
                        label="email"
                        type="email"
                        name="usemail"
                        value={usemail}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                        style={{ width: 400 }}
                    />
                    <br />                    <br />
                    <TextField
                        id="ussenha"
                        label="senha"
                        type="password"
                        name="ussenha"
                        value={ussenha}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                        style={{ width: 400 }}

                    />
                    <br />                    <br />
                    <div className="actions">
                        <Button
                            id="btn-entrar"
                            variant="contained"
                            size="medium"
                            type="submit"
                            style={{ width: 400, height: 47 }}

                        >


                            Entrar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage