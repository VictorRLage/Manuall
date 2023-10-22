import { useEffect, useRef, useState } from "react";
import { Oval } from "react-loader-spinner";
import Arrow from "@/assets/icons/arrow.svg";
import ArrowHead from "@/assets/icons/arrowhead.svg";
import Manuel from "@/assets/manuall/manuel_pfp.png";
import ChatManuel from "@/components/header/ChatManuel";
import ChatUsuario from "@/components/header/ChatUsuario";
import BotCertification from "@/assets/icons/checkmark_bot.svg";
import axios from "@/api/axios";

export default function Chat() {
    const tipoUsuario =
        localStorage.TIPO_USUARIO && Number(localStorage.TIPO_USUARIO);

    const btnFecharConversa = useRef(null);
    const imgBtnFecharConversa = useRef(null);
    const scrollingDiv = useRef(null);

    const [isOpen, setIsOpen] = useState(false);
    const [manuelMsgs, setManuelMsgs] = useState();
    const [dadosUsuarioCrm, setDadosUsuarioCrm] = useState();
    const [conversas, setConversas] = useState();
    const [chatAtual, setChatAtual] = useState();

    const getNewConversas = () => {
        axios
            .get("/chat")
            .then((res) => {
                if (res.status === 200 || res.status === 204) {
                    setConversas(res.data);
                }
            })
            .catch((err) => console.error(err));
    };

    const alternarChat = (e) => {
        if (
            e.target !== (btnFecharConversa && btnFecharConversa.current) &&
            e.target !== (imgBtnFecharConversa && imgBtnFecharConversa.current)
        ) {
            setIsOpen(!isOpen);
        }
    };

    const selecionarChat = (conversa, isManuel = false) => {
        if (isManuel) {
            setChatAtual({
                name: "Manuel",
                isManuel: true,
                mensagens: [],
                msgsFlow: manuelMsgs,
                dadosUsuarioCrm,
            });

            scrollDown();
        } else {
            setChatAtual({
                isManuel: false,
                name: conversa.usuarioNome,
                mensagens: conversa.mensagens,
                pfp: conversa.usuarioPfp,
                solicitacaoId: conversa.solicitacaoId,
            });
        }
    };

    const scrollDown = () => {
        setTimeout(() => {
            scrollingDiv.current.scrollTop = scrollingDiv.current.scrollHeight;
        }, 1);
    };

    const getDadosCrm = () => {
        axios
            .get("/crm")
            .then(({ data }) => setManuelMsgs(data))
            .catch(() => setManuelMsgs(true));
    };

    const getDadosUsuarioCrm = () => {
        tipoUsuario &&
            axios
                .get(`/crm/dados/${tipoUsuario}`)
                .then(({ data }) => setDadosUsuarioCrm(data))
                .catch((err) => {
                    console.log(err);
                    setDadosUsuarioCrm(true);
                });
    };

    useEffect(() => {
        getDadosCrm();
        getDadosUsuarioCrm();
        getNewConversas();
    }, []);

    return (
        <div
            className="fixed z-40 right-8 w-[350px] transition-all"
            style={{ bottom: isOpen ? "0" : "-400px" }}
        >
            <div
                onClick={alternarChat}
                className="bg-verde-escuro-1 h-[50px] rounded-t-lg flex items-center justify-between px-4 cursor-pointer hover:bg-verde-escuro-2 transition-all"
            >
                <div className="flex justify-center items-center">
                    {chatAtual && (
                        <button
                            ref={btnFecharConversa}
                            onClick={() => {
                                setChatAtual(undefined);
                                getDadosCrm();
                            }}
                            className="w-8 h-8 p-1 flex justify-center items-center rotate-180 hover:bg-verde-escuro-1 transition-all rounded-full"
                        >
                            <img
                                ref={imgBtnFecharConversa}
                                className="transition-all"
                                src={Arrow}
                                alt=""
                            />
                        </button>
                    )}
                    <span
                        className="text-white font-bold text-xl"
                        style={{ paddingLeft: chatAtual ? "4px" : "0" }}
                    >
                        {(chatAtual && chatAtual.name) || "Conversas"}
                    </span>
                </div>
                <div className="w-8 h-8 p-1 flex justify-center items-center">
                    <img
                        className="transition-all"
                        style={{ rotate: isOpen ? "180deg" : "360deg" }}
                        src={ArrowHead}
                        alt=""
                    />
                </div>
            </div>
            {chatAtual ? (
                <>
                    <div
                        ref={scrollingDiv}
                        className="bg-gray-100 flex flex-col overflow-y-auto py-2 scroll-smooth"
                        style={{
                            height: chatAtual.isManuel ? "400px" : "360px",
                        }}
                    >
                        {chatAtual.isManuel ? (
                            <ChatManuel
                                chat={chatAtual}
                                scrollDown={scrollDown}
                            />
                        ) : (
                            <ChatUsuario
                                chat={chatAtual}
                                scrollDown={scrollDown}
                            />
                        )}
                    </div>
                    {!chatAtual.isManuel && (
                        <div className="bg-gray-500 h-[40px] flex">
                            <div></div>
                        </div>
                    )}
                </>
            ) : conversas && manuelMsgs && dadosUsuarioCrm ? (
                <div className="bg-gray-100 h-[400px] flex flex-col overflow-y-auto">
                    {typeof manuelMsgs !== "boolean" &&
                        typeof dadosUsuarioCrm !== "boolean" && (
                            <div
                                onClick={() => {
                                    selecionarChat(undefined, true);
                                }}
                                className="w-full min-h-[60px] px-4 cursor-pointer hover:bg-gray-100 transition-all"
                            >
                                <div className="w-full h-full flex items-center border-b-2 border-gray-200">
                                    <img
                                        src={Manuel}
                                        className="w-10 rounded-full"
                                        alt=""
                                    />
                                    <span className="p-2">Manuel</span>
                                    <img
                                        src={BotCertification}
                                        className="w-5"
                                        alt=""
                                    />
                                </div>
                            </div>
                        )}
                    {conversas?.map((conversa) => (
                        <div
                            onClick={() => {
                                selecionarChat(conversa);
                            }}
                            className="w-full min-h-[60px] px-4 cursor-pointer hover:bg-gray-100 transition-all"
                            key={conversa.solicitacaoId}
                        >
                            <div className="w-full h-full flex items-center border-b-2 border-gray-200">
                                {tipoUsuario === 1 && (
                                    <img
                                        src={conversa.usuarioPfp}
                                        className="w-10 h-10 rounded-full object-cover"
                                        alt=""
                                    />
                                )}
                                <span className="p-2">
                                    {conversa.usuarioNome}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white h-[400px] flex justify-center items-center">
                    <Oval
                        height={50}
                        color="#00cc69"
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#00cc69"
                        strokeWidth={1}
                        strokeWidthSecondary={4}
                    />
                </div>
            )}
        </div>
    );
}
