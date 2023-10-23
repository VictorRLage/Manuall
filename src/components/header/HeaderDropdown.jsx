import { useEffect, useState } from "react";
import {
    UserIcon,
    BellIcon,
    EyeIcon,
    ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { logoff } from "@/utils/functions";
import ModalConfiguracao from "@/components/perfil/ModalConfiguracao";
import ModalNotificacoes from "@/components/header/ModalNotificacoes";

export default function HeaderDropdown({
    dropdownGettr,
    dropdownSettr,
    tipoUsuario,
    refetchAll,
    openSpecificChat,
}) {
    const navigate = useNavigate();

    const [realOn, setRealOn] = useState(dropdownGettr);
    const [modalConfiguracao, setModalConfiguracao] = useState(false);
    const [modalNotificacoes, setModalNotificacoes] = useState(false);

    useEffect(() => {
        if (dropdownGettr) {
            setRealOn(true);
        } else {
            setTimeout(() => {
                setRealOn(false);
            }, 250);
        }
    }, [dropdownGettr]);

    return (
        <>
            <ModalConfiguracao
                modalGettr={modalConfiguracao}
                modalSettr={setModalConfiguracao}
            />
            <ModalNotificacoes
                modalGettr={modalNotificacoes}
                modalSettr={setModalNotificacoes}
                openSpecificChat={(solicitacaoId) => {
                    setModalNotificacoes(false);
                    dropdownSettr(false);
                    openSpecificChat(solicitacaoId);
                }}
            />
            {realOn && (
                <div
                    className="absolute right-32 top-[60px] flex flex-col items-end overflow-hidden transition-all drop-shadow-xl"
                    style={{
                        zIndex: "500",
                        animation: `grow_height 400ms forwards${
                            dropdownGettr
                                ? ""
                                : ", shrink_height 400ms forwards"
                        }`,
                    }}
                >
                    <div
                        className="bg-white h-5 w-10"
                        style={{
                            clipPath:
                                "polygon(50% 0, 50% 0px, 100% 100%, 0px 100%)",
                        }}
                    />
                    <div className="bg-white h-auto flex flex-col w-[300px] rounded-xl rounded-tr-none p-4 gap-3">
                        {tipoUsuario === 2 && (
                            <button
                                className="bg-[#008042] min-h-[50px] w-full text-white flex items-center px-4 gap-2 font-semibold rounded-lg"
                                onClick={() => {
                                    navigate("/perfil");
                                }}
                            >
                                <UserIcon className="w-5 h-5" />
                                Perfil
                            </button>
                        )}
                        <button
                            className="bg-[#008042] min-h-[50px] w-full text-white flex items-center px-4 gap-2 font-semibold rounded-lg"
                            onClick={() => {
                                setModalNotificacoes(true);
                            }}
                        >
                            <BellIcon className="w-5 h-5" />
                            Notificações
                        </button>
                        <button
                            className="bg-[#008042] min-h-[50px] w-full text-white flex items-center px-4 gap-2 font-semibold rounded-lg"
                            onClick={() => {
                                setModalConfiguracao(true);
                            }}
                        >
                            <EyeIcon className="w-5 h-5" />
                            Acessibilidade
                        </button>
                        <button
                            className="bg-[#008042] min-h-[50px] w-full text-white flex items-center px-4 gap-2 font-semibold rounded-lg"
                            onClick={logoff}
                        >
                            <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                            Sair
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
