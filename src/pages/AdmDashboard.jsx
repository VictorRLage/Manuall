import axios from "@/api/axios";
import Sidebar from "@/components/adm/Sidebar";
import { useEffect } from "react";

export default function AdmDashboard() {
    useEffect(() => {
        axios.get("/usuario/login/checar/validade").catch(console.log);
    }, []);

    return (
        <div className="h-screen w-screen flex bg-cinza-claro-2">
            <Sidebar />
            <iframe
                title="PBI_TEMPLATE_MANUAL"
                width="1720"
                height="789.25"
                src="https://app.powerbi.com/reportEmbed?reportId=9612569f-796e-4037-8aac-763b0217bb77&autoAuth=true&ctid=fd50b457-84e0-400c-80f2-460f28eb41a6"
                allowFullScreen="true"
                className="grow h-screen"
            />
        </div>
    );
}
