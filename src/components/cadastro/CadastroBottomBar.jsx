import { ChevronDoubleLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export default function CadastroBottomBar({
    isAtLeft = false,
    isLogin = false,
}) {
    const navigate = useNavigate();

    return (
        <div
            className="min-h-[30%] w-full bg-[#008042] flex flex-col items-center justify-center gap-8 pt-4"
            style={{
                clipPath: isAtLeft
                    ? "polygon(0% 5.66%, 15% 6%, 31.82% 7.57%, 47.36% 7.08%, 67.45% 6.52%, 88.09% 4.26%, 100% 0%, 100% 100%, 0% 100%)"
                    : "polygon(0% 0%, 11.91% 4.26%, 32.55% 6.52%, 52.64% 7.08%, 68.18% 7.57%, 85% 6%, 100% 5.66%, 100% 100%, 0% 100%)",
            }}
        >
            {!isLogin && (
                <div className="flex flex-col justify-center items-center">
                    <p className="text-xl font-semibold text-white text-center">
                        Já possui uma conta?
                    </p>
                    <a
                        className="text-xl font-bold text-white text-center underline cursor-pointer"
                        onClick={() => {
                            navigate("/login");
                        }}
                    >
                        Entre aqui
                    </a>
                </div>
            )}
            <button
                onClick={() => {
                    navigate("/");
                }}
                className="text-xl font-bold text-white leading-relaxed flex items-center"
            >
                <ChevronDoubleLeftIcon className="h-8 w-8" />
                Voltar à Tela inicial
            </button>
        </div>
    );
}
