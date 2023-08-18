import {
  Button,
  Grid,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import { Navigate, useNavigate } from "react-router-dom";
import Imagem from "../../assets/image.png";
import Logo from "../../assets/ogo.png";
import Fundo from "../../assets/fundo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./styles.css";

const LoginPage = () => {
  const { authenticated, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [usemail, setEmail] = useState("");
  const [bothFieldsFilled, setBothFieldsFilled] = useState(false);

  const [ussenha, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    login(usemail, ussenha);
  };

  // useEffect(() => {
  //   if (authenticated) {
  //     return navigate("/home");
  //   }
  // }, [authenticated, navigate]);

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const fieldsFilled = usemail !== "" && ussenha !== "";
    setBothFieldsFilled(fieldsFilled);

    if (authenticated) {
      return navigate("/home");
    }
  }, [authenticated, navigate, usemail, ussenha]);

  return (
    <div class="container">
      <div class="image-container">
        <img src={Imagem} alt="background" className="background-image" />
      </div>
      <div class="login-container">
        <img src={Logo} alt="background" className="logo-bg" />
        <form className="form" onSubmit={handleSubmit} >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div class="input-field">
                <i className={`fas fa-user icon ${bothFieldsFilled ? "blue" : ""}`}></i>
                <input
                  id="usemail"
                  label="email"
                  placeholder="Email"
                  type="email"
                  name="usemail"
                  value={usemail}
                  className="teste"
                  onChange={(e) => setEmail(e.target.value)}
                  class="input-field"
                  style={{ width: "200px", marginBottom: "20px", height: "45px" }}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div class="input-field">
                <FontAwesomeIcon
                  icon={passwordVisible ? faEye : faEyeSlash}
                  className={`icon iconEye ${bothFieldsFilled ? "blue" : ""}`}
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  style={{ cursor: "pointer" }}



                />
                <input
                  id="ussenha"
                  label="senha"
                  placeholder="Senha"
                  name="ussenha"
                  value={ussenha}
                  class="input-field"
                  onChange={(e) => setPassword(e.target.value)}
                  type={passwordVisible ? "text" : "password"}
                  style={{ width: "200px", marginBottom: "20px", height: "45px" }}

                />

                {/* <i className={`fas fa-eye icon ${bothFieldsFilled ? "blue" : ""}`}></i> */}
                {/* <input
                  id="ussenha"
                  label="senha"
                  placeholder="Senha"
                  name="ussenha"
                  value={ussenha}
                  class="input-field"
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  style={{ width: "200px", marginBottom: "20px", height: "45px" }}
                /> */}

              </div>
            </Grid>
          </Grid>
          <button
            id="btn-entrar"
            variant="contained"
            size="medium"
            type="submit"

          >
            Entrar
          </button>
          {/* <input
  id="ussenha"
  label="senha"
  placeholder="Senha"
  name="ussenha"
  value={ussenha}
  className="input-field"
  onChange={(e) => setPassword(e.target.value)}
  type={passwordVisible ? "text" : "password"} // Toggle visibility based on the state
  style={{ width: "200px", marginBottom: "20px", height: "45px" }}
/>
<InputAdornment position="end">
  <IconButton
    aria-label="toggle password visibility"
    onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility on click
    edge="end"
  >
    {passwordVisible ? <Visibility /> : <VisibilityOff />}
  </IconButton>
</InputAdornment> */}


        </form>
      </div>
    </div>
  );
};

export default LoginPage;
