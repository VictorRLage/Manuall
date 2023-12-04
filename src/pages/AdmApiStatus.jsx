import axios from "@/api/axios";
import Sidebar from "@/components/adm/Sidebar";
import { useEffect } from "react";
import ApiCard from "../components/adm/ApiCard";

export default function AdmApiStatus() {
    useEffect(() => {
        axios.get("/usuario/login/checar/validade").catch(console.log);
    }, []);

    return (
        <div className="h-screen w-screen flex bg-cinza-claro-2">
            <Sidebar />
            <div className="w-[82%] h-full overflow-y-scroll">
                <div className="h-[10%] w-full flex items-center">
                    <span className="text-verde-escuro-1 font-bold px-10 text-[30px]">
                        Status das Rotinas
                    </span>
                </div>
                <div className="h-[90%] w-full flex flex-wrap gap-5 px-10">
                    <ApiCard nome="Crm" url="/crm" />
                    <ApiCard nome="Pipefy" url="/pipefy" />
                </div>
            </div>
        </div>
    );
}
