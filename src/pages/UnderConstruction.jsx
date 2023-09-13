import { useNavigate } from "react-router-dom";
import UnderConstructionIcon from "@/assets/storyset/under_construction.svg";

export default function UnderConstructions() {
    const navigate = useNavigate();

    return (
        <div className="w-screen h-screen flex justify-center items-center flex-col">
            <h1 className="text-verde-escuro-1 text-3xl">Oops...</h1>
            <h2 className="m-4 text-md">
                Parece que essa página ainda está em desenvolvimento
            </h2>
            <img
                src={UnderConstructionIcon}
                alt="Under Construction"
                className="w-96"
            />
            <button
                onClick={() => {
                    navigate("/");
                }}
                className="bg-verde-escuro-1 hover:bg-verde-escuro-2 transition-all text-white text-lg p-3 rounded-md"
            >
                Voltar à página inicial
            </button>
        </div>
    );
}
