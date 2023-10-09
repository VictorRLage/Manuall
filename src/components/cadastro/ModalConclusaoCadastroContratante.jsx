import BgModal from "@/assets/shapes/ModalBg.png";
import ModalCustom from "@/components/main/ModalCustom";
import { useNavigate } from "react-router-dom";

export default function ModalConclusaoCadastroContratante({
    modalGettr,
    modalSettr,
}) {
    const navigate = useNavigate();

    return (
        <ModalCustom
            modalGettr={modalGettr}
            modalSettr={modalSettr}
            canClose={false}
        >
            <div
                className="bg-white w-144 h-88 flex flex-col items-center rounded-lg bg-cover bg-center"
                style={{ backgroundImage: `url(${BgModal})` }}
            >
                <div className="h-[33%] w-full flex justify-center items-center text-verde-padrao text-2xl font-extrabold">
                    Obrigado por chegar até aqui!
                </div>
                <div className="h-[33%] w-[50%] flex justify-center items-center text-gray-800 text-2xl font-base text-center">
                    Seu cadastro foi realizado com sucesso
                </div>
                <div className="h-[33%] w-full flex justify-center items-center">
                    <button
                        className="bg-verde-padrao hover:bg-[rgb(16,166,93)] text-white rounded-lg text-xl px-6 py-2 transition-all"
                        onClick={() => {
                            navigate("/login");
                        }}
                    >
                        Entrar agora
                    </button>
                </div>
            </div>
        </ModalCustom>
    );
}
