import ModalCustom from "@/components/main/ModalCustom";
import { BellIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import axios from "@/api/axios";
import NotificacaoENUM from "@/enum/NotificacaoENUM";
import ModalReceberSolicitacao from "@/components/header/ModalReceberSolicitacao";
import ModalAvaliacao from "@/components/perfil/ModalAvaliacao";

export default function ModalNotificacoes({ modalGettr, modalSettr }) {
    const tipoUsuario =
        localStorage.getItem("TIPO_USUARIO") &&
        Number(localStorage.getItem("TIPO_USUARIO"));

    const [notificacoes, setNotificacoes] = useState();

    const [modalReceberSolicitacao, setModalReceberSolicitacao] =
        useState(false);
    const [notificacaoSelecionda, setNotificacaoSelecionada] = useState();

    const [modalAvaliacao, setModalAvaliacao] = useState(false);

    const fetch = () => {
        if (
            localStorage.getItem("TOKEN") &&
            localStorage.getItem("TIPO_USUARIO") !== "3"
        ) {
            axios
                .get("/usuario/notificacoes")
                .then((res) => {
                    setNotificacoes(res.data);
                })
                .catch((err) => console.log(err));
        }
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
            <ModalCustom
                modalGettr={modalGettr}
                modalSettr={modalSettr}
                canClose={true}
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
                <ModalAvaliacao
                    modalGettr={modalAvaliacao}
                    modalSettr={setModalAvaliacao}
                />
                <div className="w-[700px] p-[4%] h-[500px] gap-8 flex flex-col items-center justify-center">
                    <div className="w-full flex items-center justify-center gap-4 text-white text-3xl font-semibold">
                        <BellIcon className="w-8 h-8" />
                        Notificações
                    </div>
                    <div className="h-[90%] w-full bg-white rounded-xl flex flex-col items-center p-2 gap-2 overflow-y-auto">
                        {notificacoes?.map((notificacao) => (
                            <div
                                className="min-h-[70px] w-full bg-white border-[1px] border-[#268054] rounded-lg flex items-center justify-between p-4"
                                key={notificacao.solicitacaoId}
                                onClick={() => {
                                    if (notificacao.type === 4) {
                                        if (tipoUsuario === 1) {
                                            setModalAvaliacao(true);
                                        } else if (tipoUsuario === 2) {
                                            // abrir modal form orçamento
                                        }
                                    }
                                }}
                            >
                                <span className="text-xl text-[#1F1F1F]">
                                    {NotificacaoENUM[tipoUsuario][
                                        notificacao.type
                                    ](notificacao.nomeUsuario)}
                                </span>
                                {notificacao.type === 1 ? (
                                    tipoUsuario === 2 && (
                                        <button
                                            className="bg-[#4DAF7F] text-white px-4 py-1 rounded-lg font-semibold"
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
                                    <button className="bg-[#4DAF7F] text-white px-4 py-1 rounded-lg font-semibold">
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
