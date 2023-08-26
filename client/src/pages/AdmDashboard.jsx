import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/adm/Sidebar";
import { authenticatedApiInstance as axios } from "@/api/AxiosConfig";

export default function AdmDashboard(props) {

    const navigate = useNavigate()

    useEffect(() => {
        axios.get("/usuario/login/checar/validade")
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
