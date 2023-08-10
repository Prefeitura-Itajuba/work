import axios from "axios";

export const api = axios.create({
    baseURL: "http://10.1.0.187:8081/",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'session'
    }
});


export const createSession = async (usemail, ussenha, usperfil) => {
    return api.post("login", {usemail, ussenha});
}

