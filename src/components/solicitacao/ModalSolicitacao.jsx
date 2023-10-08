import { useState } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import ModalCustom from "@/components/main/ModalCustom";
import CantoEsquerdo from "@/assets/shapes/ModalBottomRightWave.svg";
import CantoDireito from "@/assets/shapes/ModalTopLeftWave.svg";
import SolicitacaoFase1 from "@/components/solicitacao/SolicitacaoFase1";
import SolicitacaoFase2 from "@/components/solicitacao/SolicitacaoFase2";
import SolicitacaoFase3 from "@/components/solicitacao/SolicitacaoFase3";
import SolicitacaoConclusao from "@/components/solicitacao/SolicitacaoConclusao";
import axios from "@/api/axios";

export default function ModalSolicitacao({
    modalGettr,
    modalSettr,
    idPrestador,
    incluiAula,
    servicos,
}) {
    const [faseAtual, setFaseAtual] = useState(1);

    const [idServico, setIdServico] = useState();
    const [tamanho, setTamanho] = useState("");
    const [medida, setMedida] = useState("Unidade");
    const [descricao, setDescricao] = useState("");

    const finalizar = () => {
        axios
            .post("/solicitacao", {
                idPrestador,
                idServico,
                tamanho,
                medida,
                descricao,
                incluiAula: incluiAula,
                anexo: [],
            })
            .then(() => {
                setFaseAtual(faseAtual + 1);
            })
            .catch((err) => console.log(err));
    };

    return (
        <ModalCustom
            canClose={true}
            modalGettr={modalGettr}
            modalSettr={modalSettr}
        >
            <div className="relative w-[1000px] h-[500px] flex flex-col justify-center items-center rounded-lg overflow-hidden">
                <img
                    src={CantoEsquerdo}
                    className="absolute top-0 left-0 w-[175px]"
                />
                <img
                    src={CantoDireito}
                    className="absolute bottom-0 right-0 w-[175px]"
                />
                <div className="flex flex-col justify-center items-center border-[30px] border-gray-200 w-[90%] h-[90%]">
                    {faseAtual <= 3 ? (
                        <>
                            <div className="flex flex-col items-center justify-center h-[20%] gap-4">
                                <div className="bg-cinza flex w-[450px] h-[10px] rounded-full mt-[10px]">
                                    <div
                                        className="bg-verde-padrao rounded-full transition-all"
                                        style={{ width: faseAtual * (450 / 3) }}
                                    />
                                </div>
                                <div className="w-full flex justify-center items-center text-gray-900 text-2xl font-extrabold mt-3">
                                    {faseAtual === 1
                                        ? "De qual serviço você necessita?"
                                        : faseAtual === 2
                                        ? "Informe o tamanho e a medida do serviço:"
                                        : "Algo mais a acrescentar? (Opcional)"}
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center w-full h-[60%]">
                                {faseAtual === 1 ? (
                                    <SolicitacaoFase1
                                        idServico={{ idServico, setIdServico }}
                                        servicos={servicos}
                                    />
                                ) : faseAtual === 2 ? (
                                    <SolicitacaoFase2
                                        tamanho={{ tamanho, setTamanho }}
                                        medida={{
                                            medida,
                                            setMedida,
                                        }}
                                    />
                                ) : (
                                    <SolicitacaoFase3
                                        descricao={{ descricao, setDescricao }}
                                    />
                                )}
                            </div>
                            <div className="flex items-center justify-between w-[50%]">
                                <button
                                    className="flex items-center rounded-full border-2 border-verde-padrao h-[35px] w-[120px] text-verde-padrao text-lg"
                                    onClick={() =>
                                        faseAtual === 1
                                            ? modalSettr(false)
                                            : setFaseAtual(faseAtual - 1)
                                    }
                                >
                                    <ChevronLeftIcon className="text-verde-padrao ml-1 w-[25px] h-[25px]" />
                                    <span
                                        className={
                                            faseAtual === 1 ? "ml-1" : "ml-2"
                                        }
                                    >
                                        {faseAtual === 1
                                            ? "Cancelar"
                                            : "Voltar"}
                                    </span>
                                </button>
                                <button
                                    className="text-white text-lg bg-verde-padrao flex justify-end items-center rounded-full h-[35px] w-[120px]"
                                    onClick={() =>
                                        faseAtual < 3
                                            ? setFaseAtual(faseAtual + 1)
                                            : finalizar()
                                    }
                                >
                                    <span
                                        className={
                                            faseAtual < 3 ? "mr-2" : "mr-1"
                                        }
                                    >
                                        {faseAtual < 3
                                            ? "Próximo"
                                            : "Finalizar"}
                                    </span>
                                    <ChevronRightIcon className="text-white mr-1 w-[25px] h-[25px]" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <SolicitacaoConclusao />
                    )}
                </div>
            </div>
        </ModalCustom>
    );
}