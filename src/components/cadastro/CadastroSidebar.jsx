import { ChevronDoubleLeftIcon } from "@heroicons/react/24/solid";
import logo_extensa from "@/assets/manuall/logo_black_white.png";
import { useNavigate } from "react-router-dom";

export default function CadastroSidebar() {

    const navigate = useNavigate()

    return (
        <div className="bg-verde-padrao h-full min-w-[30%] flex flex-col items-center">
            <div className="h-[10%] w-full flex items-center justify-center">
                <img src={logo_extensa} alt="Logo da Manuall por extensa" className="w-52 mt-10" />
            </div>
            <div className="h-[40%] w-full flex items-center justify-center">
                <p className="text-4xl space-x-2 leading-[50px] font-bold text-white w-[60%] text-center mt-8 flex items-center justify-center flex-wrap">
                    Cadastro de Contratante
                </p>
            </div>
            <div className="h-[50%] w-full flex items-center justify-center flex-col pt-[20%]">
            <div className="flex flex-col justify-center items-center">
                <p className="text-xl font-semibold text-white text-center">
                    Já possui uma conta?
                </p>
                <a
                    className="text-xl font-bold text-white text-center underline cursor-pointer"
                    onClick={() => { navigate("/login") }}
                >
                    Entre aqui
                </a>
            </div>
            <button
                onClick={() => { navigate("/") }}
                className="text-xl font-bold text-white leading-relaxed mt-12.5 flex items-center"
            >
                <ChevronDoubleLeftIcon className="h-8 w-8" />
                Voltar à Tela inicial
            </button>
            </div>
        </div>
    )
}