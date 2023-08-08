import React, { useState, useEffect, createContext } from "react";

import { useNavigate } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
import { api, createSession } from "../services/api.js"


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [session, setSession] = useState(null)

    useEffect(() => {
        const recoveredSession = localStorage.getItem("session");
      
        if (recoveredSession) {
          try {
            setSession(JSON.parse(recoveredSession));
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(recoveredSession).token}`
            navigate("/home")
          } catch (error) {
            // Caso ocorra algum erro ao fazer o parse do JSON, trate o erro aqui
            console.error("Erro ao fazer o parse do JSON:", error);
          }
        }
      
        setLoading(false);
        // console.log("recoveredSession",recoveredSession);
    }, []);
      // console.log("2",session)
      
      const login = async (usemail, ussenha) => {
        setLoading(true)
        await createSession(usemail, ussenha).then(({data})=>{
          setSession(data);
          localStorage.setItem("session", JSON.stringify(data));
          api.defaults.headers.Authorization = `Bearer ${data.token}`
          navigate("/home");
        }).finally(()=>{
          setLoading(false);
        })
      }

    
    // const login = async (usemail, ussenha) => {
    //     console.log("login auth", { usemail, ussenha});

    //      await createSession (usemail, ussenha).then(({data}) => {
    //       api.defaults.headers.Authorization = `Bearer ${data.token}`
    //       localStorage.setItem("token", data.token);
    //       setUser(data.user);         
    //       console.log("login", data);
    //       //api criar uma sessão
  
    //       // const loggedUser = response.data.user;
          
    //       // localStorage.setItem("usemail"  , data.user);
    //       localStorage.setItem("usperfil", data.usperfil);
          
          
          
          
    //       navigate("/");
    //     });
    //     // const token = response.data.token;
    //     // api.defaults.headers.Authorization = `Bearer ${token}`
    //     // localStorage.setItem("token", token);
    //     // setUser(response.data.user);
        
        
    // };

    const logout = () => {
        console.log("logout");
        localStorage.removeItem("session");
        setSession(null);
        navigate("/")
    }

    return(
    <AuthContext.Provider value={{ authenticated: !!session, user, loading, login, logout, session }}>{children}</AuthContext.Provider>);
};

