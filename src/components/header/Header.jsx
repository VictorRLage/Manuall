import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo_extensa from "@/assets/manuall/logo_green_black.png";
import Chat from "@/components/header/Chat";
import HeaderSidebar from "@/components/header/HeaderSidebar";
import ModalEscolherCadastro from "@/components/main/ModalEscolherCadastro";
import { useData } from "@/data/CreateContext";
import ThreeBars from "@/assets/icons/3bars.png";
import defaultPfp from "@/assets/demo/default_pfp.jpg";
import axios from "@/api/axios";
import UserIcon from "@/assets/icons/user_icon.png";
import HeaderDropdown from "@/components/header/HeaderDropdown";

export default function Header({ refetch }) {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const { windowWidth } = useData();

    const tipoUsuario =
        localStorage.TIPO_USUARIO && Number(localStorage.TIPO_USUARIO);
    const [modalEscolherCadastro, setModalEscolherCadastro] = useState();

    const [sidebar, setSidebar] = useState(false);
    const [pfp, setPfp] = useState(undefined);

    const [dropdown, setDropdown] = useState(false);

    const openSidebar = () => {
        setSidebar(true);
    };

    const refetchAll = () => {
        if (
            localStorage.getItem("TOKEN") &&
            localStorage.getItem("TIPO_USUARIO") === "2"
        )
            axios
                .get("/perfil/fotoPerfil")
                .then(({ data }) => setPfp(data))
                .catch((err) => {
                    if (err.response.status !== 403) {
                        console.log(err);
                    }
                });
    };

    useEffect(refetchAll, [refetch]);

    return (
        <>
            <HeaderDropdown
                dropdownGettr={dropdown && windowWidth > 1000}
                dropdownSettr={setDropdown}
                tipoUsuario={tipoUsuario}
                refetchAll={refetchAll}
            />
            <HeaderSidebar
                on={sidebar && windowWidth <= 1000}
                setOn={setSidebar}
                tipoUsuario={tipoUsuario}
                setModalEscolherCadastro={setModalEscolherCadastro}
            />
            <ModalEscolherCadastro
                modalGettr={modalEscolherCadastro}
                modalSettr={setModalEscolherCadastro}
            />
            <header
                className={`flex py-4 ${
                    windowWidth < 700
                        ? windowWidth < 500
                            ? "px-8"
                            : "px-16"
                        : "px-32"
                } w-full bg-white drop-shadow-md justify-between items-center`}
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
                        {!tipoUsuario ? (
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
                                <button
                                    className="bg-verde-padrao w-10 h-10 rounded-full border-2 border-verde-padrao drop-shadow-all-icon bg-center bg-cover bg-no-repeat"
                                    style={{
                                        backgroundImage:
                                            tipoUsuario === 2
                                                ? `url(${pfp}), url(${defaultPfp})`
                                                : `url(${UserIcon})`,
                                    }}
                                    onClick={() => {
                                        setDropdown(!dropdown);
                                    }}
                                />
                                {tipoUsuario === 1 ? (
                                    <button
                                        onClick={() => {
                                            pathname !==
                                                "/contratante/historico" &&
                                                navigate(
                                                    "/contratante/historico",
                                                );
                                        }}
                                        className={`text-xl decoration-green-400 ${
                                            pathname ===
                                            "/contratante/historico"
                                                ? "text-[#00CC69] cursor-default"
                                                : "text-black hover:underline"
                                        }`}
                                    >
                                        Histórico
                                    </button>
                                ) : (
                                    tipoUsuario === 2 && (
                                        <button
                                            onClick={() => {
                                                pathname !== "/dashboard" &&
                                                    navigate("/dashboard");
                                            }}
                                            className={`text-xl decoration-green-400 ${
                                                pathname === "/dashboard"
                                                    ? "text-[#00CC69] cursor-default"
                                                    : "text-black hover:underline"
                                            }`}
                                        >
                                            Dashboard
                                        </button>
                                    )
                                )}
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
