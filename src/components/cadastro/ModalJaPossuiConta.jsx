import ModalCustom from "@/components/main/ModalCustom";
import { useNavigate } from "react-router-dom";

export default function ModalJaPossuiConta({
    modalGettr,
    modalSettr,
    tipoUsuario,
}) {
    const navigate = useNavigate();

    return (
        <ModalCustom
            modalGettr={modalGettr}
            modalSettr={modalSettr}
            canClose={false}
        >
            <div className="bg-white w-auto flex flex-col items-center rounded-lg p-8 gap-8 max-w-[500px]">
                <div className="flex justify-center items-center text-verde-padrao text-2xl font-extrabold">
                    Oops...
                </div>
                <div className="flex justify-center items-center text-gray-800 text-2xl font-base text-center">
                    Parece que você já possui uma conta cadastrada como{" "}
                    {tipoUsuario} neste endereço de e-mail.
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
                            navigate("/login");
                        }}
                    >
                        Navegar para tela de login
                    </button>
                </div>
            </div>
        </ModalCustom>
    );
}
