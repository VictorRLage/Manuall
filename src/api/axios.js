import axios from "axios";
import { logoff } from "@/utils/functions";

const mainApiUrl = "http://localhost:8080";

export const routineApiInstance = axios.create({
    baseURL: "http://localhost:8081",
    timeout: 10000,
});

export const viaCepInstance = axios.create({
    baseURL: "https://viacep.com.br/ws",
    timeout: 10000,
});

export const mainApiInstance = axios.create({
    baseURL: mainApiUrl,
    timeout: 15000,
});

mainApiInstance.interceptors.request.use(
    config => {
        if (localStorage.getItem("TOKEN"))
            config.headers["Authorization"] = `Bearer ${localStorage.getItem("TOKEN")}`
        return config
    },
    error => Promise.reject(error)
);

mainApiInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 480) logoff();
        return Promise.reject(error);
    }
);

export default mainApiInstance;
