import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://192.168.0.70:8080",
    
    timeout: 15000
});

export default axiosInstance