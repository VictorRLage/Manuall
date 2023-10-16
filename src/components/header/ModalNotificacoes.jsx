import ModalCustom from "@/components/main/ModalCustom";
import { BellIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import axios from "@/api/axios";
import NotificacaoENUM from "@/enum/NotificacaoENUM";

export default function ModalNotificacoes({ modalGettr, modalSettr }) {
    const tipoUsuario = localStorage.getItem("TIPO_USUARIO");

    const [notificacoes, setNotificacoes] = useState();

    useEffect(() => {
        if (localStorage.getItem("TOKEN")) {
            axios
                .get("/usuario/notificacoes")
                .then((res) => {
                    setNotificacoes(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, []);

    return (
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
            <div className="w-[700px] p-[4%] h-[500px] gap-8 flex flex-col items-center justify-center">
                <div className="w-full flex items-center justify-center gap-4 text-white text-3xl font-semibold">
                    <BellIcon className="w-8 h-8" />
                    Notificações
                </div>
                <div className="h-[90%] w-full bg-white rounded-xl flex flex-col items-center p-2 gap-2 overflow-y-auto">
                    {notificacoes?.map(
                        ({
                            solicitacaoId,
                            nomeUsuario,
                            type,
                            date,
                            isSolicitacao,
                        }) => (
                            <div
                                className="min-h-[70px] w-full bg-white border-[1px] border-[#268054] rounded-lg flex items-center justify-between p-4"
                                key={solicitacaoId}
                            >
                                <span className="text-xl text-[#1F1F1F]">
                                    {NotificacaoENUM[tipoUsuario][type](
                                        nomeUsuario,
                                    )}
                                </span>
                                {type === 1 ? (
                                    tipoUsuario === 2 && (
                                        <button className="bg-[#4DAF7F] text-white px-4 py-1 rounded-lg font-semibold">
                                            Checar
                                        </button>
                                    )
                                ) : type === 2 ? (
                                    <button className="bg-[#4DAF7F] text-white px-4 py-1 rounded-lg font-semibold">
                                        Chat
                                    </button>
                                ) : (
                                    type === 3 && (
                                        <span className="text-[#767676]">
                                            {date}
                                        </span>
                                    )
                                )}
                            </div>
                        ),
                    )}
                </div>
            </div>
        </ModalCustom>
    );
}
