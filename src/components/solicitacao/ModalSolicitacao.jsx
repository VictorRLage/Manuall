import axios from "@/api/axios";
import CantoEsquerdo from "@/assets/shapes/ModalBottomRightWave.svg";
import CantoDireito from "@/assets/shapes/ModalTopLeftWave.svg";
import ModalCustom from "@/components/main/ModalCustom";
import ModalUrlGaleria from "@/components/perfil/ModalUrlGaleria";
import SolicitacaoConclusao from "@/components/solicitacao/SolicitacaoConclusao";
import SolicitacaoFase1 from "@/components/solicitacao/SolicitacaoFase1";
import SolicitacaoFase2 from "@/components/solicitacao/SolicitacaoFase2";
import SolicitacaoFase3 from "@/components/solicitacao/SolicitacaoFase3";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

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
    const [imagens, setImagens] = useState([]);

    const [modalUrlGaleria, setModalUrlGaleria] = useState(false);

    const [loading, setLoading] = useState(false);

    const [faseValidated, setFaseValidated] = useState({
        fase1: false,
        fase2: false,
        fase3: true,
    });

    const finalizar = () => {
        setLoading(true);
        axios
            .post("/solicitacao", {
                idPrestador,
                idServico,
                tamanho,
                medida,
                descricao,
                incluiAula: incluiAula,
                anexo: imagens,
            })
            .then(() => {
                setFaseAtual(faseAtual + 1);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (faseAtual === 4) {
            setFaseAtual(1);
            setIdServico();
            setTamanho("");
            setMedida("Unidade");
            setDescricao("");
        }
    }, [modalGettr]);

    return (
        <>
            <ModalUrlGaleria
                modalGettr={modalUrlGaleria}
                modalSettr={setModalUrlGaleria}
                createImagem={(url) => {
                    setImagens([...imagens, url]);
                    setModalUrlGaleria(false);
                }}
            />
            <ModalCustom
                canClose
                modalGettr={modalGettr}
                modalSettr={modalSettr}
            >
                <div className="relative w-[400px] min700:w-[600px] min900:w-[800px] min1100:w-[1000px] h-[500px] flex flex-col justify-center items-center rounded-lg overflow-hidden">
                    <div className="absolute flex flex-col justify-center items-center border-[30px] border-transparent w-[90%] h-[90%] z-20">
                        {faseAtual <= 3 ? (
                            <>
                                <div className="flex flex-col items-center justify-center h-[20%] gap-4 w-full">
                                    <div className="flex justify-center gap-4 w-full mt-[10px]">
                                        {[1, 2, 3].map((step) => (
                                            <div
                                                key={step}
                                                className={`h-[10px] w-[20%] min900:w-[15%] rounded-full transition-all duration-300 ease-in-out ${
                                                    faseAtual >= step
                                                        ? "bg-verde-padrao"
                                                        : "bg-cinza"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <div className="w-full flex justify-center items-center text-center text-gray-900 text-2xl font-extrabold mt-3">
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
                                            idServico={{
                                                idServico,
                                                setIdServico,
                                            }}
                                            servicos={servicos}
                                            setIsEveryThingValidated={(value) =>
                                                setFaseValidated({
                                                    ...faseValidated,
                                                    fase1: value,
                                                })
                                            }
                                        />
                                    ) : faseAtual === 2 ? (
                                        <SolicitacaoFase2
                                            tamanho={{ tamanho, setTamanho }}
                                            medida={{
                                                medida,
                                                setMedida,
                                            }}
                                            setIsEveryThingValidated={(value) =>
                                                setFaseValidated({
                                                    ...faseValidated,
                                                    fase2: value,
                                                })
                                            }
                                        />
                                    ) : (
                                        <SolicitacaoFase3
                                            descricao={{
                                                descricao,
                                                setDescricao,
                                            }}
                                            imagens={{ imagens, setImagens }}
                                            openCreateImageModal={() => {
                                                setModalUrlGaleria(true);
                                            }}
                                        />
                                    )}
                                </div>
                                <div className="flex items-center justify-between w-[90%] min700:w-[60%] min900:w-[50%]">
                                    <button
                                        className="flex items-center hover:bg-gray-100 transition-colors rounded-full border-2 border-verde-padrao h-[35px] w-[120px] text-verde-padrao text-lg"
                                        onClick={() =>
                                            faseAtual === 1
                                                ? modalSettr(false)
                                                : setFaseAtual(faseAtual - 1)
                                        }
                                    >
                                        <ChevronLeftIcon className="text-verde-padrao ml-1 w-[25px] h-[25px]" />
                                        <span
                                            className={
                                                faseAtual === 1
                                                    ? "ml-1"
                                                    : "ml-2"
                                            }
                                        >
                                            {faseAtual === 1
                                                ? "Cancelar"
                                                : "Voltar"}
                                        </span>
                                    </button>
                                    <button
                                        className={`text-white text-lg flex items-center rounded-full h-[35px] w-[120px] ${
                                            faseValidated[`fase${faseAtual}`]
                                                ? "bg-verde-padrao hover:bg-green-400 transition-colors"
                                                : "bg-cinza-claro-1 cursor-default"
                                        } ${
                                            loading
                                                ? "justify-center"
                                                : "justify-end"
                                        }`}
                                        onClick={() =>
                                            faseValidated[`fase${faseAtual}`] &&
                                            (faseAtual < 3
                                                ? setFaseAtual(faseAtual + 1)
                                                : finalizar())
                                        }
                                    >
                                        {loading ? (
                                            <ThreeDots
                                                height="15"
                                                color="#fff"
                                            />
                                        ) : (
                                            <>
                                                <span
                                                    className={
                                                        faseAtual < 3
                                                            ? "mr-2"
                                                            : "mr-1"
                                                    }
                                                >
                                                    {faseAtual < 3
                                                        ? "Próximo"
                                                        : "Finalizar"}
                                                </span>
                                                <ChevronRightIcon className="text-white mr-1 w-[25px] h-[25px]" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <SolicitacaoConclusao />
                        )}
                    </div>
                    <img
                        src={CantoEsquerdo}
                        className="absolute top-0 left-0 w-[175px]"
                    />
                    <img
                        src={CantoDireito}
                        className="absolute bottom-0 right-0 w-[175px]"
                    />
                    <div className="flex flex-col justify-center items-center border-[30px] border-gray-200 w-[90%] h-[90%]"></div>
                </div>
            </ModalCustom>
        </>
    );
}
