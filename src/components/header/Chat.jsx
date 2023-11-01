import { useEffect, useRef, useState } from "react";
import { Oval, ThreeDots } from "react-loader-spinner";
import Arrow from "@/assets/icons/arrow.svg";
import ArrowHead from "@/assets/icons/arrowhead.svg";
import Manuel from "@/assets/manuall/manuel_pfp.png";
import ChatManuel from "@/components/header/ChatManuel";
import ChatUsuario from "@/components/header/ChatUsuario";
import BotCertification from "@/assets/icons/checkmark_bot.svg";
import axios from "@/api/axios";
import SockJS from "sockjs-client/dist/sockjs";
import { over } from "stompjs";
import { PaperAirplaneIcon, PhotoIcon } from "@heroicons/react/24/solid";
import NoChatsIcon from "@/assets/icons/no_chats_icon.png";

export default function Chat({ forceChatOpen, forceChatRefetch }) {
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

    const [userId, setUserId] = useState();
    const [stompClient, setStompClient] = useState(null);

    const [mensagem, setMensagem] = useState("");
    const [isMensagemLoading, setIsMensagemLoading] = useState(false);

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

            scrollDown();
        }
    };

    const fetch = (openSocketConnection = false) => {
        axios
            .get("/chat")
            .then((res) => {
                if (res.status === 200 || res.status === 204) {
                    setConversas(res.data);

                    if (!openSocketConnection) return;
                    axios
                        .get("/usuario/id")
                        .then(({ data }) => {
                            const sock = new SockJS(
                                `${import.meta.env.VITE_APP_MAIN_API_URL}/ws`,
                            );
                            const stomp = over(sock);
                            stomp.debug = () => {};

                            setUserId(data);
                            setStompClient(stomp);
                        })
                        .catch((err2) => console.log(err2));
                }
            })
            .catch((err) => console.error(err));
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

    useEffect(() => {
        getDadosCrm();
        tipoUsuario &&
            axios
                .get(`/crm/dados/${tipoUsuario}`)
                .then(({ data }) => setDadosUsuarioCrm(data))
                .catch((err) => {
                    console.log(err);
                    setDadosUsuarioCrm(true);
                });

        fetch(true);
    }, []);

    useEffect(() => {
        stompClient?.connect({}, () => {
            stompClient.subscribe(`/chat/${userId}`, ({ body }) => {
                console.log(body)
                setIsMensagemLoading(false);
                setMensagem("");
                const msg = JSON.parse(body);
                if (!conversas) return;
                const newConversas = [...conversas];
                for (let i = 0; i < newConversas?.length; i++) {
                    if (newConversas[i].solicitacaoId === msg.solicitacaoId) {
                        newConversas[i].mensagens.push(msg);
                        break;
                    }
                }
                setConversas(newConversas);
                scrollDown();
            });
        });

        return () => {
            if (stompClient?.connected) {
                stompClient.disconnect();
            }
        };
    }, [stompClient]);

    const sendMessage = () => {
        if (isMensagemLoading) return;

        document.activeElement.blur();
        setIsMensagemLoading(true);
        stompClient.send(
            "/app/chat",
            {},
            JSON.stringify({
                mensagem,
                solicitacaoId: chatAtual.solicitacaoId,
                token: localStorage.getItem("TOKEN"),
                anexo: null,
            }),
        );
    };

    useEffect(() => {
        if (forceChatOpen) {
            for (let i = 0; i < conversas?.length; i++) {
                if (conversas[i].solicitacaoId === forceChatOpen) {
                    selecionarChat(conversas[i]);
                    setIsOpen(true);
                    break;
                }
            }
        }
    }, [forceChatOpen]);

    useEffect(fetch, [forceChatRefetch]);

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
                            <ChatUsuario chat={chatAtual} />
                        )}
                    </div>
                    {!chatAtual.isManuel && (
                        <div className="bg-gray-100 h-[40px] flex items-center justify-between px-1 gap-2 border-2 border-t-gray-200 relative">
                            <div className="h-[30px] min-w-[30px] flex items-center justify-center p-[6px] bg-[#008042] rounded-full cursor-pointer">
                                <PhotoIcon className="text-white" />
                            </div>
                            <input
                                className="bg-gray-200 h-[30px] w-full rounded-xl px-1"
                                placeholder="Digite sua mensagem aqui"
                                value={mensagem}
                                onChange={({ target }) =>
                                    setMensagem(target.value)
                                }
                                onKeyDown={({ key }) => {
                                    if (key === "Enter") sendMessage();
                                }}
                                maxLength={150}
                            />
                            <div
                                className="h-[30px] min-w-[30px] flex items-center justify-center p-[6px] bg-[#008042] rounded-full cursor-pointer"
                                onClick={sendMessage}
                            >
                                <PaperAirplaneIcon className="text-white" />
                            </div>
                            {isMensagemLoading && (
                                <div className="w-full h-full absolute bg-[rgba(0,0,0,0.3)] flex items-center justify-center">
                                    <ThreeDots
                                        height="60"
                                        width="60"
                                        radius="9"
                                        color="#ffffff"
                                        ariaLabel="three-dots-loading"
                                        visible={true}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </>
            ) : conversas !== undefined && manuelMsgs && dadosUsuarioCrm ? (
                <div className="bg-gray-100 h-[400px] flex flex-col overflow-y-auto">
                    {typeof manuelMsgs !== "boolean" &&
                    typeof dadosUsuarioCrm !== "boolean" ? (
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
                    ) : (
                        conversas === "" &&
                        conversas?.length === 0 && (
                            <div className="w-full h-full bg-white flex items-center justify-center flex-col gap-8">
                                <img
                                    src={NoChatsIcon}
                                    className="w-[40%]"
                                    alt=""
                                />
                                <span className="text-lg text-center max-w-[80%] font-bold">
                                    Você não possui solicitações ativas no
                                    momento
                                </span>
                            </div>
                        )
                    )}
                    {conversas !== "" &&
                        conversas?.map((conversa) => (
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
                                    <div className="px-2 flex flex-col">
                                        <span className="font-medium">
                                            {conversa.usuarioNome}
                                        </span>
                                        <span className="text-gray-600">
                                            {conversa.mensagens?.[
                                                conversa.mensagens.length - 1
                                            ]?.mensagem || "Inicie o chat já!"}
                                        </span>
                                    </div>
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
