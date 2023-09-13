import axios from "axios";
import { logoff } from "@/utils/functions";

const apiUrl = "http://localhost:8080";

export const defaultApiInstance = axios.create({
    baseURL: apiUrl,
    timeout: 15000,
});

export const authenticatedApiInstance = axios.create({
    baseURL: apiUrl,
    timeout: 15000,
});

authenticatedApiInstance.interceptors.request.use(
    config => {
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("TOKEN")}`;
        return config;
    },
    error => Promise.reject(error)
);

authenticatedApiInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 480) logoff();
        return Promise.reject(error);
    }
);

export const rotinaApi = axios.create({
    baseURL: "http://localhost:8081",
    timeout: 10000,
});

export const viaCep = axios.create({
    baseURL: "https://viacep.com.br/ws",
    timeout: 10000,
});

export default defaultApiInstance;