import { useEffect } from "react";
import Sidebar from "@/components/adm/Sidebar";
import axios from "@/api/axios";

export default function AdmDashboard() {

    useEffect(() => {
        axios.get("/usuario/login/checar/validade")
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className="h-screen w-screen flex bg-cinza-claro-2">
            <Sidebar />
            <iframe title="PBI_TEMPLATE_MANUAL" width="1720" height="789.25" src="https://app.powerbi.com/reportEmbed?reportId=ac360cf5-0190-478d-8afd-5d9d476335ce&autoAuth=true&ctid=fd50b457-84e0-400c-80f2-460f28eb41a6" 
            allowFullScreen="true"></iframe>
        </div>
    )

}


