import { useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/manuall/logo_only.png";
import { logoff } from "@/utils/functions";
import { UserIcon } from "@heroicons/react/24/solid";

export default function HeaderSidebar({
    on,
    setOn,
    tipoUsuario,
    setModalEscolherCadastro,
}) {
    const navigate = useNavigate();
    const { pathname } = useLocation();

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
                    on
                        ? "min500:left-[calc(100vw-400px)] left-0"
                        : "left-[100vw]"
                } min500:w-[400px] w-[100vw] z-50 h-full transition-all duration-150 ease-linear`}
            >
                <img
                    onClick={() => {
                        setOn(false);
                    }}
                    src={logo}
                    alt="Logotipo da Manuall"
                    className="w-[50px] cursor-pointer pb-4"
                />
                <button
                    onClick={() => {
                        pathname !== "/" && navigate("/");
                    }}
                    className={`w-[60%] min-h-[56px] hover:bg-gray-200 text-xl transition-all rounded-full border-[1px] border-gray-500 ${
                        pathname === "/"
                            ? "text-[#00CC69] cursor-default"
                            : "text-black"
                    }`}
                >
                    Início
                </button>
                <button
                    onClick={() => {
                        pathname !== "/prestadores" &&
                            navigate("/prestadores?pagina=1");
                    }}
                    className={`w-[60%] min-h-[56px] hover:bg-gray-200 text-xl transition-all rounded-full border-[1px] border-gray-500 ${
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
                    className={`w-[60%] min-h-[56px] hover:bg-gray-200 text-xl transition-all rounded-full border-[1px] border-gray-500 ${
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
                            className={`w-[60%] min-h-[56px] hover:bg-gray-200 text-xl transition-all rounded-full border-[1px] border-gray-500 ${
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
                            className="text-xl px-3 w-[60%] border-2 min-h-[56px] border-verde-padrao rounded-full text-verde-padrao font-bold hover:bg-[#eefff3] transition-all"
                        >
                            Fazer login
                        </button>
                        <button
                            onClick={() => {
                                setModalEscolherCadastro(true);
                            }}
                            className="text-xl px-3 w-[60%] min-h-[56px] bg-verde-padrao rounded-full text-white font-bold hover:bg-[rgb(50,184,90)] transition-all"
                        >
                            Cadastre-se
                        </button>
                    </>
                ) : (
                    <>
                        {tipoUsuario === 1 ? (
                            <button
                                onClick={() => {
                                    pathname !== "/development" &&
                                        navigate("/development");
                                }}
                                className={`w-[60%] min-h-[56px] hover:bg-gray-200 text-xl transition-all rounded-full border-[1px] border-gray-500 ${
                                    pathname === "/development"
                                        ? "text-[#00CC69] cursor-default"
                                        : "text-black"
                                }`}
                            >
                                Histórico
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    pathname !== "/development" &&
                                        navigate("/development");
                                }}
                                className={`w-[60%] min-h-[56px] hover:bg-gray-200 text-xl transition-all rounded-full border-[1px] border-gray-500 ${
                                    pathname === "/development"
                                        ? "text-[#00CC69] cursor-default"
                                        : "text-black"
                                }`}
                            >
                                Dashboard
                            </button>
                        )}
                        <div className="flex gap-4">
                            <button
                                onClick={logoff}
                                className="bg-white w-11 h-11 rounded-full border-2 border-verde-padrao drop-shadow-all-icon flex justify-center items-center"
                            >
                                <UserIcon className="w-7 text-verde-padrao" />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
