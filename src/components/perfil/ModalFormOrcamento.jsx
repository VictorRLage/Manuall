import axios from "@/api/axios";
import ModalCustom from "@/components/main/ModalCustom";
import RegexENUM from "@/enum/RegexENUM";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function ModalFormOrcamento({
    modalGettr,
    modalSettr,
    notificacao,
    refetch,
}) {
    const [servico, setServico] = useState("");
    const [valor, setValor] = useState("0");

    const [loading, setLoading] = useState(false);

    const [isValueSelected, setIsValueSelected] = useState(false);

    const enviarOrcamento = () => {
        setLoading(true);
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
            .catch(console.log)
            .finally(() => setLoading(false));
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
            <div className="w-[350px] min450:w-[400px] min550:w-[500px] h-[520px] min450:h-[500px] bg-white rounded-lg border-2 border-verde-padrao flex flex-col items-center p-6">
                <span className="text-3xl text-center font-extrabold text-verde-padrao mb-4">
                    Formulário de Orçamento
                </span>
                <div className="w-60 bg-verde-padrao h-1 mb-4" />
                <div className="w-full px-4 mb-9">
                    <label className="block text-verde-padrao font-bold mb-2">
                        Qual foi o serviço prestado?
                    </label>
                    <textarea
                        placeholder="Descreva seu serviço aqui"
                        className="bg-white border-2 border-verde-padrao rounded-lg w-full p-2 h-42 outline-none flex items-start justify-start resize-none"
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
                        className="bg-white border-2 border-verde-padrao rounded-lg block w-full p-2 h-12 outline-none"
                        value={`${valor}${isValueSelected ? "" : ",00"}`}
                        onFocus={() => setIsValueSelected(true)}
                        onBlur={() => setIsValueSelected(false)}
                        onChange={({ target }) =>
                            setValor(
                                target.value.replace(
                                    RegexENUM.NUMBER_REPLACEABLE,
                                    "",
                                ) || "0",
                            )
                        }
                    />
                </div>
                <button
                    onClick={enviarOrcamento}
                    className="w-24 h-10 flex items-center justify-center text-xl bg-verde-padrao hover:bg-green-400 transition-colors rounded-xl text-white"
                >
                    {loading ? (
                        <ThreeDots height="15" color="#fff" />
                    ) : (
                        "Enviar"
                    )}
                </button>
            </div>
        </ModalCustom>
    );
}
