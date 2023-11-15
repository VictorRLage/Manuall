import { useEffect, useState } from "react";
import Chat from "@/components/header/Chat";
import HeaderSidebarMode from "@/components/header/HeaderSidebarMode";
import ModalEscolherCadastro from "@/components/main/ModalEscolherCadastro";
import { useData } from "@/data/CreateContext";
import axios from "@/api/axios";
import HeaderDropdown from "@/components/header/HeaderDropdown";
import HeaderTopMode from "@/components/header/HeaderTopMode";

export default function Header({ refetch }) {
    const { setUserPfp, windowWidth, userType } = useData();

    const [modalEscolherCadastro, setModalEscolherCadastro] = useState();

    const [sidebar, setSidebar] = useState(false);

    const [dropdown, setDropdown] = useState(false);

    const [forceChatOpen, setForceChatOpen] = useState();
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
            <HeaderTopMode
                openSidebar={() => setSidebar(true)}
                openModalEscolherCadastro={() => setModalEscolherCadastro(true)}
            />
            {windowWidth <= 1000 && (
                <HeaderSidebarMode
                    on={sidebar}
                    setOn={setSidebar}
                    userType={userType}
                    openModalEscolherCadastro={() =>
                        setModalEscolherCadastro(true)
                    }
                />
            )}
            <HeaderDropdown
                dropdownGettr={dropdown && windowWidth > 1000}
                dropdownSettr={setDropdown}
                userType={userType}
                refetchAll={() => {
                    refetchAll();
                    setForceChatRefetch(!forceChatRefetch);
                }}
                openSpecificChat={(solicitacaoId) =>
                    setForceChatOpen(solicitacaoId)
                }
            />
            {(userType === 1 || userType === 2) && (
                <Chat
                    forceChatOpen={forceChatOpen}
                    forceChatRefetch={forceChatRefetch}
                />
            )}
        </>
    );
}
