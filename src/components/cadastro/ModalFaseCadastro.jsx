import ModalCustom from "@/components/main/ModalCustom";
import { useNavigate } from "react-router-dom";

export default function ModalFaseCadastro({
    modalGettr,
    modalSettr,
    fase,
    changePhaseTo,
}) {
    const navigate = useNavigate();

    return (
        <ModalCustom modalGettr={modalGettr} modalSettr={modalSettr}>
            <div className="bg-white w-auto flex flex-col items-center rounded-lg p-8 gap-8 max-w-[300px] min500:max-w-[400px] min600:max-w-[500px]">
                <div className="flex justify-center items-center text-verde-padrao text-2xl font-extrabold">
                    Oops...
                </div>
                <div className="flex flex-col gap-2 justify-center items-center text-gray-800 text-2xl font-base text-center">
                    Encontramos um cadastro em andamento neste endereço de
                    e-mail.
                    <span>Continuar da {fase}ª fase?</span>
                </div>
                <div className="flex justify-center items-center gap-4">
                    <button
                        className="border-2 border-verde-padrao hover:bg-[rgb(218,255,237)] text-verde-padrao rounded-lg text-xl px-6 py-2 transition-all"
                        onClick={() => {
                            modalSettr(false);
                        }}
                    >
                        Cancelar
                    </button>
                    <button
                        className="bg-verde-padrao hover:bg-[rgb(16,166,93)] text-white rounded-lg text-xl px-6 py-2 transition-all"
                        onClick={() => {
                            if (fase <= 3) {
                                changePhaseTo(fase);
                                modalSettr(false);
                            } else {
                                navigate("/cadastro/prestador/planos");
                            }
                        }}
                    >
                        Sim
                    </button>
                </div>
            </div>
        </ModalCustom>
    );
}
