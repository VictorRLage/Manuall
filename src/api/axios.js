import { logoff } from "@/utils/functions";
import axios from "axios";

const mainApiUrl = import.meta.env.VITE_APP_MAIN_API_URL;

export const routineApiInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_ROUTINE_API_INSTANCE,
    timeout: 20000,
});

export const viaCepInstance = axios.create({
    baseURL: "https://viacep.com.br/ws",
    timeout: 20000,
});

export const mainApiInstance = axios.create({
    baseURL: mainApiUrl,
    timeout: 15000,
});

mainApiInstance.interceptors.request.use(
    (config) => {
        if (localStorage.getItem("TOKEN"))
            config.headers["Authorization"] = `Bearer ${localStorage.getItem(
                "TOKEN",
            )}`;
        return config;
    },
    (error) => Promise.reject(error),
);

mainApiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 480) logoff();
        return Promise.reject(error);
    },
);

export default mainApiInstance;
