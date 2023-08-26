import axios from "axios";

const apiUrl = "http://localhost:8080";

export const defaultApiInstance = axios.create({
    baseURL: apiUrl,
    timeout: 15000,
});

export const authenticatedApiInstance  = axios.create({
    baseURL: apiUrl,
    timeout: 15000,
    headers: {
        "Authorization": "Bearer " + localStorage.TOKEN
    }
});

export const viaCep = axios.create({
    baseURL: "https://viacep.com.br/ws",
    timeout: 10000,
});

export default defaultApiInstance;