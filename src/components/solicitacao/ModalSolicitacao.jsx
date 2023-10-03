import { useState, useRef } from "react";
import {
    ChevronRightIcon,
    ChevronLeftIcon,
    XCircleIcon,
} from "@heroicons/react/24/solid";
import ModalCustom from "@/components/main/ModalCustom";
import WaitingBro from "@/assets/storyset/Waiting_bro.svg";
import SentMessage from "@/assets/storyset/SentMessage.svg";
import CantoEsquerdo from "@/assets/shapes/ModalBottomRightWave.svg";
import CantoDireito from "@/assets/shapes/ModalTopLeftWave.svg";
import axios from "@/api/axios";

export default function ModalSolicitacao({
    modalGettr,
    modalSettr,
    idPrestador,
    querAula,
    servicos,
}) {
    const servico_input = useRef(null);
    const tamanho_input = useRef(null);
    const medida_input = useRef(null);
    const descricao_input = useRef(null);

    const [idServico, setIdServico] = useState();

    const passarFase = () => {};

    const terminar = () => {
        const tamanho = tamanho_input?.current?.value;
        const medida = medida_input?.current?.value;
        const descricao = descricao_input?.current?.value;

        axios
            .post("/solicitacao", {
                idPrestador,
                idServico,
                tamanho,
                medida,
                descricao,
                incluiAula: querAula,
                anexo: [],
            })
            .then(() => {
                setModalVisible3(false);
                setModalVisible4(true);
            })
            .catch((err) => console.log(err));
    };

    return (
        <ModalCustom
            canClose={true}
            modalGettr={modalGettr}
            modalSettr={modalSettr}
        >
            <div className="relative w-[1000px] h-[500px] flex flex-col justify-center items-center">
                <img
                    src={CantoEsquerdo}
                    className="absolute top-0 left-0 w-[175px]"
                />
                <img
                    src={CantoDireito}
                    className="absolute bottom-0 right-0 w-[175px]"
                />
                <div className="flex flex-col justify-center items-center rounded-lg border-[30px] border-gray-200 w-[90%] h-[90%]">
                    <div className="flex flex-col items-center justify-center h-[20%] gap-4">
                        <div className="bg-cinza flex w-[450px] h-[10px] rounded-full mt-[10px]">
                            <div className="bg-verde-padrao w-[150px] rounded-full" />
                        </div>
                        <div className="w-full flex justify-center items-center text-gray-900 text-2xl font-extrabold mt-3">
                            De qual serviço você necessita?
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full h-[60%]">
                        <div className="flex flex-col m-5 justify-center items-center text-black text-2xl font-base text-center gap-2">
                            {servicos?.map((data, index) => (
                                <div key={index} className="block min-h-6">
                                    <label className="flex items-center">
                                        <input
                                            ref={servico_input}
                                            className="accent-verde-escuro-1 w-[60px]"
                                            type="radio"
                                            name="idServico"
                                            value={data.id}
                                            checked={idServico == data.id}
                                            onChange={({ target }) => {
                                                setIdServico(target.value);
                                            }}
                                        />
                                        <div className="cursor-pointer select-none text-slate-700 mx-2 text-xl">
                                            {data.nome}
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-12">
                        <div className="flex justify-center items-center rounded-full border-2 border-verde-padrao h-[35px] w-[120px]">
                            <ChevronLeftIcon className="text-verde-padrao w-[25px] h-[25px]" />
                            <button
                                className="white text-verde-padrao text-lg"
                                onClick={() => {
                                    modalSettr(false);
                                }}
                            >
                                Voltar
                            </button>
                        </div>
                        <div className="bg-verde-padrao flex justify-center items-center rounded-full border-2 border-verde-padrao h-[35px] w-[120px]">
                            <button
                                className="text-white text-lg"
                                onClick={() => passarFase(2)}
                            >
                                Próximo
                            </button>
                            <ChevronRightIcon className="text-white w-[25px] h-[25px]" />
                        </div>
                    </div>
                </div>
            </div>
        </ModalCustom>
    );
}
