import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo_extensa from "@/assets/manuall/logo_green_black.png";
import { UserIcon } from "@heroicons/react/24/solid";
import Notificacao from "@/components/header/Notificacao";
import Chat from "@/components/header/Chat";
import HeaderSidebar from "@/components/header/HeaderSidebar";
import { logoff } from "@/utils/functions";
import ModalEscolherCadastro from "@/components/main/ModalEscolherCadastro";
import { useData } from "@/data/CreateContext";
import ThreeBars from "@/assets/icons/3bars.png";

export default function Header() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const { windowWidth } = useData();

    const tipoUsuario =
        localStorage.TIPO_USUARIO && Number(localStorage.TIPO_USUARIO);
    const [modalEscolherCadastro, setModalEscolherCadastro] = useState();

    const [sidebar, setSidebar] = useState(false);

    const openSidebar = () => {
        setSidebar(true);
    };

    return (
        <>
            <ModalEscolherCadastro
                modalGettr={modalEscolherCadastro}
                modalSettr={setModalEscolherCadastro}
            />
            <header className="z-20 flex py-4 px-32 w-full bg-white drop-shadow-all justify-between items-center">
                <img
                    onClick={() => {
                        navigate("/");
                    }}
                    src={logo_extensa}
                    alt="Logo da Manuall por extensa"
                    className="w-[200px] cursor-pointer"
                />
                {windowWidth > 1000 ? (
                    <nav className="flex items-center gap-4">
                        <button
                            onClick={() => {
                                pathname !== "/" && navigate("/");
                            }}
                            className={`text-xl decoration-green-400 ${
                                pathname === "/"
                                    ? "text-[#00CC69] cursor-default"
                                    : "text-black hover:underline"
                            }`}
                        >
                            Início
                        </button>
                        <button
                            onClick={() => {
                                pathname !== "/prestadores" &&
                                    navigate("/prestadores");
                            }}
                            className={`text-xl decoration-green-400 ${
                                pathname === "/prestadores"
                                    ? "text-[#00CC69] cursor-default"
                                    : "text-black hover:underline"
                            }`}
                        >
                            Prestadores
                        </button>
                        <button
                            onClick={() => {
                                pathname !== "/contato" && navigate("/contato");
                            }}
                            className={`text-xl decoration-green-400 ${
                                pathname === "/contato"
                                    ? "text-[#00CC69] cursor-default"
                                    : "text-black hover:underline"
                            }`}
                        >
                            Contato
                        </button>
                        {!tipoUsuario || tipoUsuario === 3 ? (
                            <>
                                {windowWidth > 1150 && (
                                    <button
                                        onClick={() => {
                                            pathname !==
                                                "/cadastro/prestador" &&
                                                navigate("/cadastro/prestador");
                                        }}
                                        className={`text-xl decoration-green-400 ${
                                            pathname === "/cadastro/prestador"
                                                ? "text-[#00CC69] cursor-default"
                                                : "text-black hover:underline"
                                        }`}
                                    >
                                        Quero ensinar
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        pathname !== "/login" &&
                                            navigate("/login");
                                    }}
                                    className="text-xl px-3 border-2 h-11 border-verde-padrao rounded-full text-verde-padrao font-bold hover:bg-[#eefff3] transition-all"
                                >
                                    Fazer login
                                </button>
                                <button
                                    onClick={() => {
                                        setModalEscolherCadastro(true);
                                    }}
                                    className="text-xl px-3 h-11 bg-verde-padrao rounded-full text-white font-bold hover:bg-[rgb(50,184,90)] transition-all"
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
                                <Notificacao tipoUsuario={tipoUsuario} />
                                <button
                                    onClick={logoff}
                                    className="bg-white w-11 h-11 rounded-full border-2 border-verde-padrao drop-shadow-all-icon flex justify-center items-center"
                                >
                                    <UserIcon className="w-7 text-verde-padrao" />
                                </button>
                            </>
                        )}
                    </nav>
                ) : (
                    <img
                        src={ThreeBars}
                        className="h-11 cursor-pointer"
                        onClick={openSidebar}
                    />
                )}
            </header>
            {(tipoUsuario === 1 || tipoUsuario === 2) && <Chat />}
            <HeaderSidebar
                on={sidebar}
                setOn={setSidebar}
                tipoUsuario={tipoUsuario}
                setModalEscolherCadastro={setModalEscolherCadastro}
            />
        </>
    );
}
