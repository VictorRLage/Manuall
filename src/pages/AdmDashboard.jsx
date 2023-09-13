import { useEffect } from "react";
import Sidebar from "@/components/adm/Sidebar";
import { authenticatedApiInstance as axios } from "@/api/AxiosConfig";

export default function AdmDashboard(props) {

    useEffect(() => {
        axios.get("/usuario/login/checar/validade")
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className="h-screen w-screen flex bg-cinza-claro-2">
            <Sidebar />
        </div>
    )
}
