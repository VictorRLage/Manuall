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
    const [valor, setValor] = useState(0);

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(undefined);

    const [isValueSelected, setIsValueSelected] = useState(false);

    const enviarOrcamento = () => {
        if (!servico.trim()) {
            setErrorMsg("O campo de serviço prestado não pode estar vazio");
            return;
        }
        if (Number(valor) <= 50) {
            setErrorMsg("O valor do serviço prestado deve ser maior que 50");
            return;
        }

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
                setServico("");
                setValor(0);
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
            <div className="w-[350px] min450:w-[400px] min550:w-[500px] bg-white rounded-lg flex flex-col items-center p-6">
                <span className="text-3xl text-center font-extrabold text-verde-padrao mb-4">
                    Formulário de Orçamento
                </span>
                <div className="w-60 bg-verde-padrao h-1 mb-4" />
                <div className="w-full px-4 mb-9">
                    <label className="block font-semibold mb-2">
                        Qual foi o serviço prestado?
                    </label>
                    <textarea
                        placeholder="Descreva seu serviço aqui"
                        className="bg-white border-2 border-gray-300 rounded-lg w-full p-2 h-42 outline-none flex items-start justify-start resize-none"
                        value={servico}
                        maxLength={135}
                        onChange={({ target }) => setServico(target.value)}
                    />
                </div>
                <div className="w-full px-4 mb-4">
                    <label className="block font-semibold mb-2">
                        Qual o valor do serviço prestado?
                    </label>
                    <input
                        placeholder="R$0,00"
                        className="bg-white border-2 border-gray-300 rounded-lg block w-full p-2 h-12 outline-none"
                        value={`${valor}${isValueSelected ? "" : ",00"}`}
                        onFocus={() => setIsValueSelected(true)}
                        onBlur={() => setIsValueSelected(false)}
                        onChange={({ target }) => {
                            let newValor =
                                Number(
                                    target.value.replace(
                                        RegexENUM.NUMBER_REPLACEABLE,
                                        "",
                                    ),
                                ) || 0;
                            if (newValor > 5000) newValor = 5000;
                            setValor(newValor);
                        }}
                    />
                </div>
                {errorMsg && (
                    <span className="text-yellow-600 text-center my-2">
                        *{errorMsg}
                    </span>
                )}
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
