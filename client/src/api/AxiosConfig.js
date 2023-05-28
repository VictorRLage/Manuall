import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://10:8080",
    timeout: 15000
});

export default axiosInstance