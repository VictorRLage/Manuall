import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FalasManuelENUM from "@/enum/FalasManuelENUM";
import axios from "@/api/axios";

export default function ChatManuel({ chat, scrollDown }) {
    const navigate = useNavigate();

    const [mensagens, setMensagens] = useState();

    const [msgsFlow, setMsgsFlow] = useState(chat.msgsFlow);

    const getFrom = () => {
        const newMensagens = [];

        for (let i = 0; i < msgsFlow.length; i++) {
            const msgAtual = FalasManuelENUM.find((v) => v.id == msgsFlow[i]);

            console.log(msgAtual);
            const proximaMsg = FalasManuelENUM.find(
                (v) => v.id == msgAtual.getProximo(chat.dadosUsuarioCrm),
            );

            if (msgsFlow.length === i + 1) {
                if (proximaMsg) {
                    setMsgsFlow([...msgsFlow, proximaMsg.id]);
                    axios.post("/crm", msgsFlow).catch((err) => {
                        console.log(err);
                    });
                    return;
                }
            }

            newMensagens.push(
                ...msgAtual.getMensagens(chat.dadosUsuarioCrm).map((v, i) => ({
                    id: String(msgAtual.id) + i,
                    texto: v,
                    msgType: msgAtual.msgsType,
                    firstMsgOfChunk: i === 0,
                })),
            );
        }

        setMensagens(newMensagens);
        scrollDown();
    };

    const responderManuel = (texto) => {
        if (texto.atualizarCampo) {
            console.log(
                "atualizando campo " +
                    texto.atualizarCampo.column +
                    " para valor " +
                    texto.atualizarCampo.value,
            );
        }
        if (texto.redirecionar) {
            navigate(texto.redirecionar);
        }
        setMsgsFlow(
            msgsFlow.slice(0, msgsFlow.length - 1).concat(texto.nextId),
        );
    };

    useEffect(() => {
        getFrom();
    }, [msgsFlow]);

    return mensagens?.map(({ id, texto, msgType, firstMsgOfChunk }) => (
        <div
            key={id}
            className={`w-full px-3 pb-0.5 flex
                        ${
                            msgType === "COSTUMER"
                                ? "justify-end"
                                : "justify-start"
                        }
                        ${firstMsgOfChunk && "pt-2"}`}
        >
            {msgType === "CHATBOT" && firstMsgOfChunk && (
                <div
                    className="w-2 h-3 bg-[#c0e8c0]"
                    style={{
                        clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                    }}
                />
            )}
            <div
                className={`max-w-[80%] p-2 rounded-lg
                            ${
                                msgType === "COSTUMER" &&
                                "bg-[#5faf88] rounded-tr-none"
                            }
                            ${
                                msgType === "CHATBOT" &&
                                `bg-[#c0e8c0]
                                    ${
                                        firstMsgOfChunk
                                            ? "rounded-tl-none"
                                            : "ml-2"
                                    }
                            `
                            }
                            ${
                                msgType === "ANSWER" &&
                                "ml-2 border-[#5faf88] border-2 cursor-pointer hover:bg-[#5faf88] transition-all"
                            }
                        `}
                onClick={() => {
                    msgType === "ANSWER" && responderManuel(texto);
                }}
            >
                {msgType === "ANSWER" ? texto.msg : texto}
            </div>
            {msgType === "COSTUMER" && (
                <div
                    className="w-2 h-3 bg-[#5faf88]"
                    style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                />
            )}
        </div>
    ));
}
