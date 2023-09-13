import { useNavigate } from "react-router-dom";
import ErrorIcon from "@/assets/storyset/404.svg"

export default function Erro() {

    const navigate = useNavigate()

    return (
        <div className="w-screen h-screen flex justify-center items-center flex-col">
            <h2 className="m-4 text-2xl">Página não encontrada</h2>
            <img src={ErrorIcon} alt="Under Construction" className="w-96" />
            <button onClick={() => { navigate("/") }} className="bg-verde-escuro-1 hover:bg-verde-escuro-2 transition-all text-white text-lg p-3 rounded-md">
                Voltar à página inicial
            </button>
        </div>
    );
}
