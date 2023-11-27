import ModalCustom from "@/components/main/ModalCustom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ModalNaoLogado({ modalGettr, modalSettr }) {
    const navigate = useNavigate();

    const [switchPhase, setSwitchPhase] = useState(false);

    useEffect(() => {
        if (modalGettr) {
            setSwitchPhase(false);
        }
    }, [modalGettr]);

    return (
        <ModalCustom modalGettr={modalGettr} modalSettr={modalSettr} canClose>
            {switchPhase ? (
                <div className="w-[380px] min500:w-full h-full flex flex-col items-center py-8 gap-10 px-16">
                    <span className="text-3xl font-semibold text-center max-w-[240px] min500:max-w-[300px] flex items-center justify-center flex-wrap">
                        Como deseja realizar o cadastro?
                    </span>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => {
                                navigate("/cadastro/contratante");
                            }}
                            className="w-42 h-12 text-2xl bg-verde-padrao rounded-full text-white"
                        >
                            Contratante
                        </button>
                        <button
                            onClick={() => {
                                navigate("/cadastro/prestador");
                            }}
                            className="w-42 h-12 text-2xl bg-verde-padrao rounded-full text-white"
                        >
                            Prestador
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex flex-col items-center py-8 gap-10 px-10">
                    <span className="text-3xl font-semibold text-center max-w-[240px] min500:max-w-[300px] flex items-center justify-center flex-wrap">
                        Como deseja continuar?
                    </span>
                    <div className=" flex flex-col items-center gap-4">
                        <button
                            onClick={() => {
                                navigate("/login");
                            }}
                            className="w-42 h-12 text-2xl bg-verde-padrao hover:bg-green-400 transition-colors rounded-full text-white"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => {
                                setSwitchPhase(true);
                            }}
                            className="w-42 h-12 text-2xl bg-verde-padrao hover:bg-green-400 transition-colors rounded-full text-white"
                        >
                            Cadastro
                        </button>
                    </div>
                </div>
            )}
        </ModalCustom>
    );
}
