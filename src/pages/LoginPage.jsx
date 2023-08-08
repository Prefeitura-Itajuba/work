import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth";
import { Navigate, useNavigate } from "react-router-dom";
import Imagem from "../assets/image.png"
import Logo from "../assets/Logo.png"

import "../styles/styles.js"
import "../styles/styles.css"
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const LoginPage = (props) => {
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
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div class="container">
            <img src={Imagem} alt="logo"></img>

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

                    <br />                    <br />



                    <div className="actions">

                        <TextField
                            style={{ width: 400 }}
                            id="ussenha"
                            label="senha"
                            name="ussenha"
                            value={ussenha}
                            onChange={(e) => setPassword(e.target.value)}
                            {...props}
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleTogglePassword} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <Button
                        id="btn-entrar"
                        variant="contained"
                        size="medium"
                        type="submit"
                        style={{ width: 400, height: 47 }}

                    >


                        Entrar
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage