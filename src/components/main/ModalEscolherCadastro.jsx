import { useNavigate } from "react-router-dom";
import ModalCustom from "@/components/main/ModalCustom";

export default function ModalEscolherCadastro({ modalGettr, modalSettr }) {
    const navigate = useNavigate();

    return (
        <ModalCustom
            modalGettr={modalGettr}
            modalSettr={modalSettr}
            canClose={true}
        >
            <div className="w-full h-full flex flex-col items-center py-8 gap-10 px-16">
                <span className="text-3xl font-semibold text-center max-w-[300px] flex items-center justify-center flex-wrap">
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
        </ModalCustom>
    );
}
