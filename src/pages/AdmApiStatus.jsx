import { useEffect, useState } from "react";
import Sidebar from "@/components/adm/Sidebar";
import axios, { routineApiInstance } from "@/api/axios";
import { Oval } from "react-loader-spinner";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default function AdmApiStatus() {

    const [statusApiPipefy, setStatusApiPipefy] = useState()
    const [statusApiCrm, setStatusApiCrm] = useState()

    const alterarApiPipefy = (ativar) => {
        routineApiInstance.post(`/pipefy/${ativar ? "ligar" : "desligar"}`)
            .then(checarApis)
            .catch((err) => {
                console.log(err)
            })
    }

    const alterarApiCrm = (ativar) => {
        routineApiInstance.post(`/crm/${ativar ? "ligar" : "desligar"}`)
            .then(checarApis)
            .catch((err) => {
                console.log(err)
            })
    }

    const checarApis = () => {
        routineApiInstance.get("/pipefy/checar")
            .then(({ data }) => {
                setStatusApiPipefy(data)
            })
        routineApiInstance.get("/crm/checar")
            .then(({ data }) => {
                setStatusApiCrm(data)
            })
    }

    useEffect(() => {
        axios.get("/usuario/login/checar/validade")
            .catch((err) => {
                console.log(err)
            })
        checarApis()
    }, [])

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
                    <div className="w-[300px] h-[160px] bg-[#cfffdd] rounded-md">
                        <div className="h-[80px] flex items-center justify-center gap-2">
                            <span className="text-[#222] font-bold text-xl">Rotina Pipefy</span>
                            {statusApiPipefy === undefined
                                ? <Oval
                                    height={30}
                                    width={30}
                                    color="#00cc69"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                    ariaLabel="oval-loading"
                                    secondaryColor="#00cc69"
                                    strokeWidth={3}
                                    strokeWidthSecondary={4}
                                />
                                : statusApiPipefy
                                    ? <CheckCircleIcon className="text-[#47AE3E] h-[40px]" />
                                    : <XCircleIcon className="text-[#D02B2B] h-[40px]" />}
                        </div>
                        <div className="h-[80px] flex items-center justify-evenly">
                            <button
                                className={`text-white font-bold rounded-md w-[130px] py-4
                                    ${statusApiPipefy !== undefined && !statusApiPipefy
                                        ? "bg-[#47AE3E]"
                                        : "bg-[#acacac] cursor-default"
                                    }
                                `}
                                onClick={() => { statusApiPipefy !== undefined && !statusApiPipefy && alterarApiPipefy(true) }}
                            >
                                Ativar
                            </button>
                            <button
                                className={`text-white font-bold rounded-md w-[130px] py-4
                                    ${statusApiPipefy
                                        ? "bg-[#D02B2B]"
                                        : "bg-[#acacac] cursor-default"
                                    }
                                `}
                                onClick={() => { statusApiPipefy !== undefined && statusApiPipefy && alterarApiPipefy(false) }}
                            >
                                Desativar
                            </button>
                        </div>
                    </div>
                    <div className="w-[300px] h-[160px] bg-[#cfffdd] rounded-md">
                        <div className="h-[80px] flex items-center justify-center gap-2">
                            <span className="text-[#222] font-bold text-xl">Rotina Chatbot/Email</span>
                            {statusApiCrm === undefined
                                ? <Oval
                                    height={30}
                                    width={30}
                                    color="#00cc69"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                    ariaLabel="oval-loading"
                                    secondaryColor="#00cc69"
                                    strokeWidth={3}
                                    strokeWidthSecondary={4}
                                />
                                : statusApiCrm
                                    ? <CheckCircleIcon className="text-[#47AE3E] h-[40px]" />
                                    : <XCircleIcon className="text-[#D02B2B] h-[40px]" />}
                        </div>
                        <div className="h-[80px] flex items-center justify-evenly">
                            <button
                                className={`text-white font-bold rounded-md w-[130px] py-4
                                    ${statusApiCrm !== undefined && !statusApiCrm
                                        ? "bg-[#47AE3E]"
                                        : "bg-[#acacac] cursor-default"
                                    }
                                `}
                                onClick={() => { statusApiCrm !== undefined && !statusApiCrm && alterarApiCrm(true) }}
                            >
                                Ativar
                            </button>
                            <button
                                className={`text-white font-bold rounded-md w-[130px] py-4
                                    ${statusApiCrm
                                        ? "bg-[#D02B2B]"
                                        : "bg-[#acacac] cursor-default"
                                    }
                                `}
                                onClick={() => { statusApiCrm !== undefined && statusApiCrm && alterarApiCrm(false) }}
                            >
                                Desativar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
