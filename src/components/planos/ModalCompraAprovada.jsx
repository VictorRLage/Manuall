import ModalCustom from "@/components/main/ModalCustom";
import { useNavigate } from "react-router-dom";

export default function ModalCompraAprovada({ modalGettr, modalSettr }) {
    const navigate = useNavigate();

    return (
        <ModalCustom modalGettr={modalGettr} modalSettr={modalSettr}>
            <div className="flex flex-col items-center justify-center p-8 gap-8">
                <span className="text-3xl font-bold">Parabéns!</span>
                <span className="text-xl">
                    Sua compra foi aprovada com sucesso
                </span>
                <button
                    onClick={() => {
                        navigate("/perfil");
                    }}
                    className="bg-verde-escuro-1 hover:bg-[#45af55] transition-colors text-white text-xl font-semibold px-4 py-2 rounded-lg"
                >
                    Visitar o meu perfil
                </button>
            </div>
        </ModalCustom>
    );
}
