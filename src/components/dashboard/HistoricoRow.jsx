import defaultPfp from "@/assets/demo/default_pfp.jpg";
import GreenArrowhead from "@/assets/icons/green_arrowhead.svg";
import { useData } from "@/data/CreateContext";
import { StarIcon as StarIconVazio } from "@heroicons/react/24/outline";
import { StarIcon as StarIconCheio } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function HistoricoRow({
    solicitacao: {
        status,
        dataInicio,
        dataFim,
        prestadorNome,
        servico,
        valorOrcamento,
        prestadorPfp,
        descricao,
        notaDada,
        solicitacaoId,
    },
    avaliar,
}) {
    const { windowWidth } = useData();

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(false);
    }, [windowWidth]);

    return (
        <div
            className={`border-2 border-[#00cc69] ${
                isOpen ? "h-[250px]" : "h-[50px]"
            } rounded-xl flex flex-col transition-all overflow-y-hidden`}
        >
            <div className="flex h-[48px]">
                <div
                    className={`${
                        isOpen && "border-b-2"
                    } min-w-[190px] border-r-2 border-[#00cc69] h-[48px] w-[20%] flex items-center justify-center relative`}
                >
                    <img
                        src={GreenArrowhead}
                        alt="Green Arrow Head"
                        className={`h-4 absolute left-4 ${
                            isOpen ? "rotate-0" : "-rotate-90"
                        } transition-all cursor-pointer`}
                        onClick={() => setIsOpen(!isOpen)}
                    />
                    {status === 1
                        ? "Pendente"
                        : dataInicio &&
                          new Date(dataInicio)?.toLocaleDateString()}
                </div>
                <div
                    className={`${
                        isOpen && "border-b-2"
                    } min-w-[190px] text-center border-r-2 border-[#00cc69] h-[48px] w-[20%] flex items-center justify-center`}
                >
                    {prestadorNome}
                </div>
                <div
                    className={`${
                        isOpen && "border-b-2"
                    } min-w-[380px] text-center border-r-2 border-[#00cc69] h-[48px] w-[40%] flex items-center justify-center`}
                >
                    {servico}
                </div>
                <div
                    className={`${
                        isOpen && "border-b-2"
                    } min-w-[190px] text-center border-[#00cc69] h-[48px] w-[20%] flex items-center justify-center`}
                >
                    {(valorOrcamento && `R${valorOrcamento},00`) || "N/A"}
                </div>
            </div>
            <div className="w-full h-[200px] flex">
                <div className="h-full w-[20%] border-r-2 border-[#00cc69] flex flex-col items-center justify-evenly">
                    <div className="h-[50px] w-[90%] flex items-center justify-center">
                        <div className="h-full min-w-[50px] flex items-center justify-center relative">
                            <div className="w-6 h-6 rounded-full bg-[#008042]" />
                            <div className="bg-black h-[30px] w-[2px] absolute -bottom-[20px]" />
                        </div>
                        <div className="h-full w-full flex items-center text-center justify-center flex-col">
                            <span className="font-semibold">
                                Primeiro contato
                            </span>
                            <span className="text-gray-600">
                                {(dataInicio &&
                                    new Date(
                                        dataInicio,
                                    ).toLocaleDateString()) ||
                                    "N/A"}
                            </span>
                        </div>
                    </div>
                    <div className="h-[50px] w-[90%] flex items-center justify-center">
                        <div className="h-full min-w-[50px] flex items-center justify-center relative">
                            <div className="w-6 h-6 rounded-full bg-[#00cc69]" />
                            <div className="bg-black h-[30px] w-[2px] absolute -bottom-[20px]" />
                        </div>
                        <div className="h-full w-full flex items-center text-center justify-center flex-col">
                            <span className="font-semibold">
                                Último contato
                            </span>
                            <span className="text-gray-600">
                                {(dataInicio &&
                                    new Date(
                                        dataInicio,
                                    ).toLocaleDateString()) ||
                                    "N/A"}
                            </span>
                        </div>
                    </div>
                    <div className="h-[50px] w-[90%] flex items-center justify-center">
                        <div className="h-full min-w-[50px] flex items-center justify-center relative">
                            <div className="w-6 h-6 rounded-full bg-[#4dffa9]" />
                        </div>
                        <div className="h-full w-full flex items-center text-center justify-center flex-col">
                            <span className="font-semibold">
                                Serviço finalizado
                            </span>
                            <span className="text-gray-600">
                                {(dataFim &&
                                    new Date(dataFim).toLocaleDateString()) ||
                                    "N/A"}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="h-full w-[20%] border-r-2 border-[#00cc69] flex items-center justify-center">
                    <div
                        className="bg-black h-[140px] w-[140px] bg-center bg-no-repeat bg-cover rounded-xl"
                        style={{
                            backgroundImage: `url(${prestadorPfp}), url(${defaultPfp})`,
                        }}
                    />
                </div>
                <div className="h-full w-[40%] border-r-2 border-[#00cc69] flex items-center justify-center text-center px-4">
                    <span className="bg-gray-200 px-4 py-2 rounded-xl">
                        {descricao}
                    </span>
                </div>
                <div className="h-full w-[20%] flex items-center justify-center">
                    {notaDada ? (
                        Array.from({ length: 5 }, (_, i) => {
                            const estrela = i + 1;
                            return notaDada >= estrela ? (
                                <StarIconCheio
                                    key={estrela}
                                    className="w-6 h-6 text-yellow-500"
                                />
                            ) : (
                                <StarIconVazio
                                    key={estrela}
                                    className="w-6 h-6 text-yellow-500"
                                />
                            );
                        })
                    ) : (
                        <button
                            className={`${
                                valorOrcamento
                                    ? "bg-[#00cc69] hover:bg-green-600 transition-colors"
                                    : "bg-gray-400 cursor-default"
                            } px-8 py-4 rounded-lg text-white font-semibold`}
                            onClick={() => {
                                valorOrcamento && avaliar(solicitacaoId);
                            }}
                        >
                            Avaliar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
