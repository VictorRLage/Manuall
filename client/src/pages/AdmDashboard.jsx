import { useEffect } from "react"
import Sidebar from "../components/adm/Sidebar"
import axios from "../api/AxiosConfig"
import { useNavigate } from "react-router-dom"

const AdmDashboard = (props) => {

    const navigate = useNavigate()

    useEffect(() => {
        axios.get("/usuario/login/checar/validade", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`
            }
        })
        .then((res) => {
            if (res.status !== 200 || res.data !== 3) {
                localStorage.removeItem("TOKEN")
                navigate("/login")
            }
        })
        .catch((err) => {
            localStorage.removeItem("TOKEN")
            navigate("/login")
        })
    }, []) // eslint-disable-line

    return (
        <div className="h-screen w-screen bg-cinza-claro-2">
            <Sidebar />
        </div>
    )
}

export default AdmDashboard