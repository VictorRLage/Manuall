import ModalCustom from "@/components/main/ModalCustom";
import { useState } from "react";
import axios from "@/api/axios";
import RegexENUM from "@/enum/RegexENUM";

export default function ModalFormOrcamento({
    modalGettr,
    modalSettr,
    notificacao,
    refetch,
}) {
    const [servico, setServico] = useState("");
    const [valor, setValor] = useState("");

    const enviarOrcamento = () => {
        axios
            .post("/solicitacao/postarOrcamento", {
                mensagem: servico,
                orcamento: Number(valor),
                solicitacaoId: notificacao.solicitacaoId,
            })
            .then(() => {
                refetch();
                modalSettr(false);
            })
            .catch((err) => console.log(err));
    };

    return (
        <ModalCustom
            modalGettr={modalGettr}
            modalSettr={modalSettr}
            canClose
            blurBackgroundStyle={{
                zIndex: "602",
            }}
            modalBackgroundStyle={{
                zIndex: "603",
            }}
        >
            <div className="relative w-[500px] h-[500px] bg-white rounded-lg border-2 border-verde-padrao flex flex-col items-center p-6">
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
                        onChange={({ target }) => setServico(target.value)}
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
                        onChange={({ target }) =>
                            setValor(
                                target.value.replace(
                                    RegexENUM.NUMBER_REPLACEABLE,
                                    "",
                                ),
                            )
                        }
                    />
                </div>
                <button
                    onClick={enviarOrcamento}
                    className="w-24 h-10 text-xl bg-verde-padrao rounded-full text-white"
                >
                    Enviar
                </button>
            </div>
        </ModalCustom>
    );
}
