import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo_extensa from "@/assets/manuall/logo_green_black.png";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import Notificacao from "@/components/header/Notificacao";
import Chat from "@/components/header/Chat";
import HeaderSidebar from "@/components/header/HeaderSidebar";
import { logoff } from "@/utils/functions";
import ModalEscolherCadastro from "@/components/main/ModalEscolherCadastro";
import { useData } from "@/data/CreateContext";
import ThreeBars from "@/assets/icons/3bars.png";
import defaultPfp from "@/assets/demo/default_pfp.jpg";
import axios from "@/api/axios";

export default function Header({ refetch }) {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const { windowWidth } = useData();

    const tipoUsuario =
        localStorage.TIPO_USUARIO && Number(localStorage.TIPO_USUARIO);
    const [modalEscolherCadastro, setModalEscolherCadastro] = useState();

    const [sidebar, setSidebar] = useState(false);
    const [pfp, setPfp] = useState(undefined);

    const openSidebar = () => {
        setSidebar(true);
    };

    const refetchAll = () => {
        if (localStorage.getItem("TOKEN"))
            axios.get("/perfil/fotoPerfil").then(({ data }) => setPfp(data));
    };

    useEffect(refetchAll, [refetch]);

    return (
        <>
            <HeaderSidebar
                on={sidebar}
                setOn={setSidebar}
                tipoUsuario={tipoUsuario}
                setModalEscolherCadastro={setModalEscolherCadastro}
            />
            <ModalEscolherCadastro
                modalGettr={modalEscolherCadastro}
                modalSettr={setModalEscolherCadastro}
            />
            <header
                className={`z-20 flex py-4 ${
                    windowWidth < 700
                        ? windowWidth < 500
                            ? "px-8"
                            : "px-16"
                        : "px-32"
                } w-full bg-white drop-shadow-all justify-between items-center`}
            >
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
                                        className={`text-xl decoration-green-400 ${
                                            pathname === "/development"
                                                ? "text-[#00CC69] cursor-default"
                                                : "text-black hover:underline"
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
                                        className={`text-xl decoration-green-400 ${
                                            pathname === "/development"
                                                ? "text-[#00CC69] cursor-default"
                                                : "text-black hover:underline"
                                        }`}
                                    >
                                        Dashboard
                                    </button>
                                )}
                                <Notificacao tipoUsuario={tipoUsuario} />
                                {tipoUsuario === 2 && (
                                    <button
                                        className="bg-verde-padrao w-11 h-11 rounded-full border-2 border-verde-padrao drop-shadow-all-icon bg-center bg-cover bg-no-repeat"
                                        style={{
                                            backgroundImage: `url(${pfp}), url(${defaultPfp})`,
                                        }}
                                        onClick={() => navigate("/perfil")}
                                    />
                                )}
                                <button
                                    onClick={logoff}
                                    className="bg-verde-padrao w-11 h-11 rounded-full border-2 border-verde-padrao drop-shadow-all-icon flex justify-center items-center"
                                >
                                    <ArrowLeftOnRectangleIcon className="w-7 text-white" />
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
        </>
    );
}
