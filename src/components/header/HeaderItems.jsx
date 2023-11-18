import UserIcon from "@/assets/icons/user_icon.png";
import defaultPfp from "@/assets/demo/default_pfp.jpg";
import { useNavigate } from "react-router-dom";
import { useData } from "@/data/CreateContext";
import HeaderItemLayout from "@/components/header/HeaderItemLayout";
import Dynamic from "@/components/main/Dynamic";
import { Fragment } from "react";
import { logoff } from "@/utils/functions";

export default function HeaderItems({
    responsiveMode,
    openModalCadastro,
    toggleDropdown,
    closeHeaderSidebar,
    includeChat,
    setModalNotificacoes,
    setModalAcessibilidade,
}) {
    const { userPfp, userType, windowWidth } = useData();
    const navigate = useNavigate();

    return (
        <Dynamic
            tag={responsiveMode ? Fragment : "nav"}
            className="flex items-center gap-4"
        >
            <HeaderItemLayout
                name="Início"
                url="/"
                responsiveMode={responsiveMode}
                onPathClick={closeHeaderSidebar}
            />
            <HeaderItemLayout
                name="Prestadores"
                url="/prestadores"
                redirectionUrl="/prestadores?pagina=1"
                responsiveMode={responsiveMode}
                onPathClick={closeHeaderSidebar}
            />
            <HeaderItemLayout
                name="Contato"
                url="/contato"
                responsiveMode={responsiveMode}
                onPathClick={closeHeaderSidebar}
            />
            {!userType ? (
                <>
                    {windowWidth > 1150 && (
                        <HeaderItemLayout
                            name="Quero ensinar"
                            url="/cadastro/prestador"
                            responsiveMode={responsiveMode}
                            onPathClick={closeHeaderSidebar}
                        />
                    )}
                    <button
                        onClick={() => navigate("/login")}
                        className={`text-xl px-3 border-2 border-verde-padrao rounded-full text-verde-padrao font-bold hover:bg-[#eefff3] transition-all ${
                            responsiveMode ? "w-[60%] min-h-[56px]" : "h-11"
                        }`}
                    >
                        Fazer login
                    </button>
                    <button
                        onClick={openModalCadastro}
                        className={`text-xl px-3 bg-verde-padrao rounded-full text-white font-bold hover:bg-[rgb(50,184,90)] transition-all ${
                            responsiveMode ? "w-[60%] min-h-[56px]" : "h-11"
                        }`}
                    >
                        Cadastre-se
                    </button>
                </>
            ) : (
                <>
                    {userType === 1 ? (
                        <HeaderItemLayout
                            name="Histórico"
                            url="/contratante/historico"
                            responsiveMode={responsiveMode}
                            onPathClick={closeHeaderSidebar}
                        />
                    ) : (
                        userType === 2 && (
                            <HeaderItemLayout
                                name="Dashboard"
                                url="/dashboard"
                                responsiveMode={responsiveMode}
                                onPathClick={closeHeaderSidebar}
                            />
                        )
                    )}
                    {responsiveMode ? (
                        <>
                            {userType === 2 && (
                                <HeaderItemLayout
                                    name="Perfil"
                                    url="/perfil"
                                    responsiveMode
                                    onPathClick={closeHeaderSidebar}
                                />
                            )}
                            {includeChat && windowWidth <= 600 && (
                                <HeaderItemLayout
                                    name="Chat"
                                    responsiveMode
                                    onClick={includeChat}
                                />
                            )}
                            <HeaderItemLayout
                                name="Notificações"
                                responsiveMode
                                onClick={() => setModalNotificacoes(true)}
                            />
                            <HeaderItemLayout
                                name="Acessibilidade"
                                responsiveMode
                                onClick={() => setModalAcessibilidade(true)}
                            />
                            <HeaderItemLayout
                                name="Sair"
                                responsiveMode
                                onClick={logoff}
                            />
                        </>
                    ) : (
                        <button
                            className="bg-verde-padrao w-10 h-10 rounded-full border-2 border-verde-padrao drop-shadow-all-icon bg-center bg-cover bg-no-repeat"
                            style={{
                                backgroundImage:
                                    userType === 2
                                        ? `url(${userPfp}), url(${defaultPfp})`
                                        : `url(${UserIcon})`,
                            }}
                            onClick={toggleDropdown}
                        />
                    )}
                </>
            )}
        </Dynamic>
    );
}
