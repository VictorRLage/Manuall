import { useEffect, useState } from "react";
import Chat from "@/components/header/Chat";
import HeaderSidebarMode from "@/components/header/HeaderSidebarMode";
import ModalEscolherCadastro from "@/components/main/ModalEscolherCadastro";
import { useData } from "@/data/CreateContext";
import axios from "@/api/axios";
import HeaderDropdown from "@/components/header/HeaderDropdown";
import HeaderTopMode from "@/components/header/HeaderTopMode";
import ModalAcessibilidade from "@/components/perfil/ModalAcessibilidade";
import ModalNotificacoes from "@/components/header/ModalNotificacoes";

export default function Header({ refetch }) {
    const { setUserPfp, windowWidth, userType } = useData();

    const [modalEscolherCadastro, setModalEscolherCadastro] = useState();
    const [modalAcessibilidade, setModalAcessibilidade] = useState(false);
    const [modalNotificacoes, setModalNotificacoes] = useState(false);

    const [sidebar, setSidebar] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const [forceChatOpen, setForceChatOpen] = useState();
    const redefineForceChatOpen = () => setForceChatOpen();
    const [forceChatRefetch, setForceChatRefetch] = useState(false);

    const refetchAll = () => {
        if (
            localStorage.getItem("TOKEN") &&
            localStorage.getItem("TIPO_USUARIO") === "2"
        )
            axios
                .get("/perfil/fotoPerfil")
                .then(({ data }) => setUserPfp(data))
                .catch((err) => {
                    if (err.response.status !== 403) console.log(err);
                });
    };

    useEffect(refetchAll, [refetch]);

    return (
        <>
            <ModalEscolherCadastro
                modalGettr={modalEscolherCadastro}
                modalSettr={setModalEscolherCadastro}
            />
            <ModalAcessibilidade
                modalGettr={modalAcessibilidade}
                modalSettr={setModalAcessibilidade}
            />
            <ModalNotificacoes
                modalGettr={modalNotificacoes}
                modalSettr={setModalNotificacoes}
                openSpecificChat={(solicitacaoId) => {
                    setModalNotificacoes(false);
                    setDropdown(false);
                    setForceChatOpen(solicitacaoId);
                }}
                refetchAll={() => {
                    refetchAll();
                    setForceChatRefetch(!forceChatRefetch);
                }}
            />
            {windowWidth > 1000 ? (
                <HeaderDropdown
                    dropdownGettr={dropdown}
                    dropdownSettr={setDropdown}
                    setModalNotificacoes={setModalNotificacoes}
                    setModalAcessibilidade={setModalAcessibilidade}
                />
            ) : (
                <HeaderSidebarMode
                    on={sidebar}
                    setOn={setSidebar}
                    userType={userType}
                    openModalEscolherCadastro={() =>
                        setModalEscolherCadastro(true)
                    }
                    openChat={() => {
                        setSidebar(false);
                        setForceChatOpen(null);
                    }}
                    setModalNotificacoes={setModalNotificacoes}
                    setModalAcessibilidade={setModalAcessibilidade}
                />
            )}
            <HeaderTopMode
                setOn={setSidebar}
                openSidebar={() => setSidebar(true)}
                openModalEscolherCadastro={() => setModalEscolherCadastro(true)}
                toggleDropdown={() => setDropdown(!dropdown)}
                setModalNotificacoes={setModalNotificacoes}
                setModalAcessibilidade={setModalAcessibilidade}
            />
            {(userType === 1 || userType === 2) && (
                <Chat
                    forceChatOpen={forceChatOpen}
                    redefineForceChatOpen={redefineForceChatOpen}
                    forceChatRefetch={forceChatRefetch}
                />
            )}
        </>
    );
}
