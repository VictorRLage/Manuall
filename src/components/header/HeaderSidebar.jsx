import { useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/manuall/logo_only.png";
import { useData } from "@/data/CreateContext";

export default function HeaderSidebar({ on, setOn, tipoUsuario, setModalEscolherCadastro }) {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const { windowWidth } = useData();

    return (
        <>
            {on && (
                <div
                    className="left-0 top-0 fixed justify-center items-center h-screen w-screen z-40 bg-black transition-all duration-300 opacity-40"
                    onClick={() => {
                        setOn(false);
                    }}
                />
            )}
            <div
                className={`bg-white fixed flex flex-col items-center gap-4 top-0 py-8 overflow-y-auto ${
                    on ? "right-0" : windowWidth < 500 ? "right-[-100vw]" : "right-[-400px]"
                } ${windowWidth < 500 ? "w-[100vw]" : "w-[400px]"} z-50 h-full transition-all duration-150 ease-linear`}
            >
                <img
                    onClick={() => {
                        setOn(false)
                    }}
                    src={logo}
                    alt="Logo da Manuall por extensa"
                    className="w-[50px] cursor-pointer pb-4"
                />
                <button
                    onClick={() => {
                        pathname !== "/" && navigate("/");
                    }}
                    className={`w-[60%] min-h-[56px] hover:bg-gray-200 text-xl transition-all rounded-full ${
                        pathname === "/"
                            ? "text-[#00CC69] cursor-default"
                            : "text-black"
                    }`}
                >
                    Início
                </button>
                <button
                    onClick={() => {
                        pathname !== "/prestadores" && navigate("/prestadores");
                    }}
                    className={`w-[60%] min-h-[56px] hover:bg-gray-200 text-xl transition-all rounded-full ${
                        pathname === "/prestadores"
                            ? "text-[#00CC69] cursor-default"
                            : "text-black"
                    }`}
                >
                    Prestadores
                </button>
                <button
                    onClick={() => {
                        pathname !== "/contato" && navigate("/contato");
                    }}
                    className={`w-[60%] min-h-[56px] hover:bg-gray-200 text-xl transition-all rounded-full ${
                        pathname === "/contato"
                            ? "text-[#00CC69] cursor-default"
                            : "text-black"
                    }`}
                >
                    Contato
                </button>
                {!tipoUsuario || tipoUsuario === 3 ? (
                    <>
                        <button
                            onClick={() => {
                                pathname !== "/cadastro/prestador" &&
                                    navigate("/cadastro/prestador");
                            }}
                            className={`w-[60%] min-h-[56px] hover:bg-gray-200 text-xl transition-all rounded-full ${
                                pathname === "/cadastro/prestador"
                                    ? "text-[#00CC69] cursor-default"
                                    : "text-black"
                            }`}
                        >
                            Quero ensinar
                        </button>
                        <button
                            onClick={() => {
                                navigate("/login");
                            }}
                            className="text-xl px-3 w-[50%] border-2 min-h-[56px] border-verde-padrao rounded-full text-verde-padrao font-bold hover:bg-[#eefff3] transition-all"
                        >
                            Fazer login
                        </button>
                        <button
                            onClick={() => {
                                setModalEscolherCadastro(true);
                            }}
                            className="text-xl px-3 w-[50%] min-h-[56px] bg-verde-padrao rounded-full text-white font-bold hover:bg-[rgb(50,184,90)] transition-all"
                        >
                            Cadastre-se
                        </button>
                    </>
                ) : tipoUsuario === 1 ? (
                    <button
                        onClick={() => {
                            pathname !== "/development" &&
                                navigate("/development");
                        }}
                        className="text-xl"
                    >
                        Histórico
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            pathname !== "/development" &&
                                navigate("/development");
                        }}
                        className="text-xl"
                    >
                        Dashboard
                    </button>
                )}
            </div>
        </>
    );
}
