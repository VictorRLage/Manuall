import { XCircleIcon } from "@heroicons/react/24/solid";
import ModalCustom from "@/components/main/ModalCustom";
import { useState } from "react";

export default function ModalSolicitacao({ modalGettr, modalSettr }) {
    const [servico, setServico] = useState("");
    const [valor, setValor] = useState("");

    const alterarFtPerfil = () => {
        axios
            .patch("/perfil/alterar/fotoPerfil", {
                servico,
                valor,
            })
            .then(window.location.reload)
            .catch((err) => console.log(err));
    };

    return (
        <ModalCustom
            modalGettr={modalGettr}
            modalSettr={modalSettr}
        >
            <div className="z-50 fixed h-screen w-screen top-0 bg-blur flex justify-center items-center">
                <div className="relative w-[500px] h-[500px] bg-white rounded-lg border-2 border-verde-padrao flex flex-col items-center p-6">
                    <div
                        onClick={modalSettr}
                        className="cursor-pointer absolute top-0 right-0"
                    >
                        <XCircleIcon className="w-9 h-9 text-verde-padrao" />
                    </div>
                    <span className="text-3xl font-extrabold text-verde-padrao mb-4">
                        Formulário de Orçamento
                    </span>
                    <div className="w-60 bg-verde-padrao h-1 mb-4"></div>

                    <div className="w-full px-4 mb-9">
                        <label className="block text-verde-padrao font-bold mb-2">
                            Qual foi o serviço prestado?
                        </label>
                        <textarea
                            placeholder="Descreva seu serviço aqui"
                            className="bg-gray-50 border-2 border-verde-padrao text-gray-900 text-sm rounded-lg block w-full py-3 px-2.5 h-42"
                            value={servico}
                            onChange={(e) => setServico(e.target.value)}
                        />
                    </div>
                    <div className="w-full px-4 mb-4">
                        <label className="block text-verde-padrao font-bold mb-2">
                            Qual o valor do serviço prestado?
                        </label>
                        <input
                            placeholder="R$0,00"
                            className="bg-gray-50 border-2 border-verde-padrao text-gray-900 text-sm rounded-lg block w-full py-3 px-2.5 h-12"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={alterarFtPerfil}
                        className="w-24 h-10 text-xl bg-verde-padrao rounded-full text-white"
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </ModalCustom>
    );
}
