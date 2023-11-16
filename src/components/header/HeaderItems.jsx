import UserIcon from "@/assets/icons/user_icon.png";
import defaultPfp from "@/assets/demo/default_pfp.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { useData } from "@/data/CreateContext";
import HeaderItemLayout from "@/components/header/HeaderItemLayout";
import Dynamic from "@/components/main/Dynamic";
import { Fragment } from "react";

export default function HeaderItems({
    responsiveMode,
    openModalCadastro,
    toggleDropdown,
}) {
    const { userPfp, userType, windowWidth } = useData();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <Dynamic
            tag={responsiveMode ? Fragment : "nav"}
            {...(responsiveMode
                ? {}
                : { className: "flex items-center gap-4" })}
        >
            <HeaderItemLayout
                name="Início"
                url="/"
                responsiveMode={responsiveMode}
            />
            <HeaderItemLayout
                name="Prestadores"
                url="/prestadores"
                redirectionUrl="/prestadores?pagina=1"
                responsiveMode={responsiveMode}
            />
            <HeaderItemLayout
                name="Contato"
                url="/contato"
                responsiveMode={responsiveMode}
            />
            {!userType ? (
                <>
                    {windowWidth > 1150 && (
                        <HeaderItemLayout
                            name="Quero ensinar"
                            url="/cadastro/prestador"
                            responsiveMode={responsiveMode}
                        />
                    )}
                    <button
                        onClick={() => {
                            pathname !== "/login" && navigate("/login");
                        }}
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
                        />
                    ) : (
                        userType === 2 && (
                            <HeaderItemLayout
                                name="Dashboard"
                                url="/dashboard"
                                responsiveMode={responsiveMode}
                            />
                        )
                    )}
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
                </>
            )}
        </Dynamic>
    );
}
