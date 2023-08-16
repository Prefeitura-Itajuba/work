import {
    Button,
    Grid,
    TextField,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
  import React, { useContext, useEffect, useState } from "react";
  import { AuthContext } from "../../context/auth";
  import { Navigate, useNavigate } from "react-router-dom";
  import Imagem from "../../assets/image.png";
  import Logo from "../../assets/ogo.png";
  
  // import "../styles/styles.js";
  // import "../styles/styles.css";
  import IconButton from "@mui/material/IconButton";
  import InputAdornment from "@mui/material/InputAdornment";
  import Visibility from "@mui/icons-material/Visibility";
  import VisibilityOff from "@mui/icons-material/VisibilityOff";
  import "./styles.css";
  
  const LoginPage = () => {
    const { authenticated, login } = useContext(AuthContext);
    const navigate = useNavigate();
  
    const [usemail, setEmail] = useState("");
    const [ussenha, setPassword] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      login(usemail, ussenha);
    };
  
    useEffect(() => {
      if (authenticated) {
        return navigate("/home");
      }
    }, [authenticated, navigate]);
  
    const [showPassword, setShowPassword] = useState(false);
  
    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };
  
    return (
      // <div className="flex-container">
      //   <div className="left-div">
      //     {" "}
      //     <img src={Imagem} alt="background" className="background-image" />
      //   </div>
      //   <div className="right-div">Div Direita</div>
      // </div>
      //     <form className="form" onSubmit={handleSubmit}>
      //     <Grid container spacing={2}>
      //         <Grid item xs={12}>
      //             <TextField
      //                 id="usemail"
      //                 label="email"
      //                 type="email"
      //                 name="usemail"
      //                 value={usemail}
      //                 onChange={(e) => setEmail(e.target.value)}
      //                 variant="outlined"
      //                 InputProps={{ disableUnderline: true }}
      //                 fullWidth
      //             />
      //         </Grid>
      //         <Grid item xs={12}>
      //             <TextField
      //                 autoComplete="off"
      //                 id="ussenha"
      //                 label="senha"
      //                 name="ussenha"
      //                 value={ussenha}
      //                 onChange={(e) => setPassword(e.target.value)}
      //                 type={showPassword ? "text" : "password"}
      //                 fullWidth
      //                 InputProps={{
      //                     endAdornment: (
      //                         <InputAdornment position="end">
      //                             <IconButton onClick={handleTogglePassword} edge="end">
      //                                 {showPassword ? <VisibilityOff /> : <Visibility />}
      //                             </IconButton>
      //                         </InputAdornment>
      //                     ),
      //                 }}
      //             />
      //         </Grid>
      //     </Grid>
      //     <Button
      //         id="btn-entrar"
      //         variant="contained"
      //         size="medium"
      //         type="submit"
      //         fullWidth
      //     >
      //         Entrar
      //     </Button>
      // </form>
      <div class="container">
        <div class="image-container">
          <img src={Imagem} alt="background" className="background-image" />
        </div>
        <div class="login-container">
          {/* <form>
      
    </form>
    <div class="input-container">
          <input type="text" class="input-field" id="input" required />
          <label for="input" class="input-label">Digite algo</label>
      </div> */}
          <form className="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <input
                  id="usemail"
                  label="email"
                  type="email"
                  name="usemail"
                  value={usemail}
                  onChange={(e) => setEmail(e.target.value)}
                  class="input-field"
                  style={{ width: "400px", marginBottom: "20px",height: "45px" }}
                />
                {/* <label for="input" class="input-label">
                  Digite algo
                </label> */}
              </Grid>
              <Grid item xs={12}>
                <input
                  id="ussenha"
                  label="senha"
                  name="ussenha"
                  value={ussenha}
                  class="input-field"
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  style={{ width: "400px", marginBottom: "20px",height: "40px" }}
                />
              </Grid>
            </Grid>
            <Button
              id="btn-entrar"
              variant="contained"
              size="medium"
              type="submit"
              style={{ width: "400px", marginBottom: "20px", height: "45px" }}
            >
              Entrar
            </Button>
          </form>
        </div>
      </div>
    );
  };
  
  export default LoginPage;
  