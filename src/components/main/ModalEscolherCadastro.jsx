import cantoSuperior from "@/assets/shapes/cantoSuperiorModalEscolhaCadastro.png";
import ModalCustom from "@/components/main/ModalCustom";
import { useNavigate } from "react-router-dom";

export default function ModalEscolherCadastro({ modalGettr, modalSettr }) {
    const navigate = useNavigate();

    return (
        <ModalCustom
            modalGettr={modalGettr}
            modalSettr={modalSettr}
            canClose
            modalStyle={{ overflow: "hidden" }}
        >
            <div
                className="relative w-full h-full flex flex-col items-center py-8 gap-10 px-16 bg-no-repeat"
                style={{
                    backgroundImage: `url(${cantoSuperior})`,
                    backgroundPosition: "top 0",
                    backgroundSize: "440px",
                }}
            >
                <span className="text-2xl font-semibold text-white text-center max-w-[300px] flex items-center justify-center flex-wrap">
                    Como deseja se cadastrar?
                </span>

                <div className="flex flex-col items-center gap-4 mt-2">
                    <button
                        onClick={() => {
                            navigate("/cadastro/contratante");
                        }}
                        className="w-42 h-12 text-2xl bg-verde-escuro-1 rounded-2xl text-white"
                    >
                        Contratante
                    </button>
                    <button
                        onClick={() => {
                            navigate("/cadastro/prestador");
                        }}
                        className="w-42 h-12 text-2xl bg-verde-escuro-1 rounded-2xl text-white"
                    >
                        Prestador
                    </button>
                </div>
            </div>
        </ModalCustom>
    );
}
