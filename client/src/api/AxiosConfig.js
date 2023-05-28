import axios from "axios"

const axiosInstance = axios.create({
<<<<<<< HEAD
    baseURL: "http://192.168.0.70:8080",
=======
    baseURL: "http://10:8080",
>>>>>>> 358b00398434df0020b890a618d09f763653c812
    timeout: 15000
});

export default axiosInstance