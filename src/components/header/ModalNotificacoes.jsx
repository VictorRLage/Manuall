import axios from "@/api/axios";
import ModalReceberSolicitacao from "@/components/header/ModalReceberSolicitacao";
import ModalCustom from "@/components/main/ModalCustom";
import ModalAvaliacao from "@/components/perfil/ModalAvaliacao";
import ModalFormOrcamento from "@/components/perfil/ModalFormOrcamento";
import { useData } from "@/data/CreateContext";
import NotificacaoENUM from "@/enum/NotificacaoENUM";
import { BellIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function ModalNotificacoes({
    modalGettr,
    modalSettr,
    openSpecificChat,
    refetchAll,
}) {
    const { userType, setNotificacoesCount } = useData();

    const [notificacoes, setNotificacoes] = useState();

    const [modalReceberSolicitacao, setModalReceberSolicitacao] =
        useState(false);
    const [notificacaoSelecionda, setNotificacaoSelecionada] = useState();

    const [modalAvaliacao, setModalAvaliacao] = useState(false);
    const [modalFormOrcamento, setModalFormOrcamento] = useState(false);

    const fetch = () => {
        if (
            localStorage.getItem("TOKEN") &&
            localStorage.getItem("TIPO_USUARIO") !== "3"
        ) {
            axios
                .get("/usuario/notificacoes")
                .then((res) => {
                    setNotificacoes(res.data.reverse());
                    setNotificacoesCount(res.data.length);
                    console.log(res.data);
                })
                .catch((err) => console.log(err));
        }

        refetchAll();
    };

    useEffect(fetch, []);

    return (
        <>
            <ModalReceberSolicitacao
                modalGettr={modalReceberSolicitacao}
                modalSettr={setModalReceberSolicitacao}
                notificacao={notificacaoSelecionda}
                refetch={fetch}
            />
            <ModalAvaliacao
                modalGettr={modalAvaliacao}
                modalSettr={setModalAvaliacao}
                notificacao={notificacaoSelecionda}
                refetch={fetch}
            />
            <ModalFormOrcamento
                modalGettr={modalFormOrcamento}
                modalSettr={setModalFormOrcamento}
                notificacao={notificacaoSelecionda}
                refetch={fetch}
            />
            <ModalCustom
                modalGettr={modalGettr}
                modalSettr={modalSettr}
                canClose
                blurBackgroundStyle={{
                    zIndex: "600",
                }}
                modalBackgroundStyle={{
                    zIndex: "601",
                }}
                modalStyle={{
                    backgroundColor: "#268054",
                }}
            >
                <div className="w-[100%] min550:w-[500px] min800:w-[700px] p-[4%] h-[500px] gap-8 flex flex-col items-center justify-center">
                    <div className="w-full flex items-center justify-center gap-4 text-white text-3xl font-semibold">
                        <BellIcon className="w-8 h-8" />
                        Notificações
                    </div>
                    <div className="h-[90%] w-full bg-white rounded-xl flex flex-col items-center p-2 gap-2 overflow-y-auto">
                        {notificacoes?.map((notificacao) => (
                            <div
                                className={`min-h-[70px] w-full bg-white border-[1px] border-[#268054] rounded-lg flex items-center justify-between p-4 ${
                                    notificacao.type === 4 && "cursor-pointer"
                                }`}
                                key={notificacao.solicitacaoId}
                                onClick={() => {
                                    if (notificacao.type === 4) {
                                        setNotificacaoSelecionada(notificacao);
                                        if (userType === 1)
                                            setModalAvaliacao(true);
                                        else if (userType === 2)
                                            setModalFormOrcamento(true);
                                    }
                                }}
                            >
                                <span className="text-xl text-[#1F1F1F]">
                                    {NotificacaoENUM[userType]?.[
                                        notificacao.type
                                    ]?.(notificacao.nomeUsuario)}
                                </span>
                                {notificacao.type === 1 ? (
                                    userType === 2 && (
                                        <button
                                            className="bg-[#4DAF7F] hover:bg-green-500 transition-colors text-white px-4 py-1 rounded-lg font-semibold"
                                            onClick={() => {
                                                setNotificacaoSelecionada(
                                                    notificacao,
                                                );
                                                setModalReceberSolicitacao(
                                                    true,
                                                );
                                            }}
                                        >
                                            Checar
                                        </button>
                                    )
                                ) : notificacao.type === 2 ? (
                                    <button
                                        className="bg-[#4DAF7F] hover:bg-green-500 transition-colors text-white px-4 py-1 rounded-lg font-semibold"
                                        onClick={() => {
                                            openSpecificChat(
                                                notificacao.solicitacaoId,
                                            );
                                        }}
                                    >
                                        Chat
                                    </button>
                                ) : (
                                    notificacao.type === 3 && (
                                        <span className="text-[#767676]">
                                            {notificacao.date &&
                                                new Date(notificacao.date)
                                                    .toLocaleString("pt-br")
                                                    .replace(",", "")}
                                        </span>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </ModalCustom>
        </>
    );
}
