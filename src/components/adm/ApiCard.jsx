import { routineApiInstance } from "@/api/axios";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

export default function ApiCard({ nome, url }) {
    const [statusApi, setStatusApi] = useState();

    const checarApi = () => {
        routineApiInstance.get(url + "/check").then(({ data }) => {
            setStatusApi(data === "true");
        });
    };

    const alterarApi = (ativar) => {
        routineApiInstance
            .post(`${url}/${ativar ? "on" : "off"}`)
            .then(checarApi)
            .catch(console.log);
    };

    useEffect(checarApi, []);

    return (
        <div className="w-[300px] h-[160px] bg-[#cfffdd] rounded-md">
            <div className="h-[80px] flex items-center justify-center gap-2">
                <span className="text-[#222] font-bold text-xl">
                    Rotina {nome}
                </span>
                {statusApi === undefined ? (
                    <Oval
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
                ) : statusApi ? (
                    <CheckCircleIcon className="text-[#47AE3E] h-[40px]" />
                ) : (
                    <XCircleIcon className="text-[#D02B2B] h-[40px]" />
                )}
            </div>
            <div className="h-[80px] flex items-center justify-evenly">
                <button
                    className={`text-white font-bold rounded-md w-[130px] py-4
                    ${
                        statusApi !== undefined && !statusApi
                            ? "bg-[#47AE3E]"
                            : "bg-[#acacac] cursor-default"
                    }
                `}
                    onClick={() => {
                        statusApi !== undefined &&
                            !statusApi &&
                            alterarApi(true);
                    }}
                >
                    Ativar
                </button>
                <button
                    className={`text-white font-bold rounded-md w-[130px] py-4
                    ${
                        statusApi
                            ? "bg-[#D02B2B]"
                            : "bg-[#acacac] cursor-default"
                    }
                `}
                    onClick={() => {
                        statusApi !== undefined &&
                            statusApi &&
                            alterarApi(false);
                    }}
                >
                    Desativar
                </button>
            </div>
        </div>
    );
}
