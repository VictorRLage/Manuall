import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import cidades from "@/enum/CrmCidadesENUM";
import aaaaaaaaaa from "@/enum/aaaaaaaaaa"
import { authenticatedApiInstance as axios } from "@/api/AxiosConfig";

export default function ChatManuel({ chat, setChat, scrollDown }) {

    const navigate = useNavigate()

    const [mensagens, setMensagens] = useState()

    const [msgsFlow, setMsgsFlow] = useState(chat.msgsFlow)

    // const tipoUsuario = localStorage.TIPO_USUARIO && Number(localStorage.TIPO_USUARIO)

    const todosOsParametrosDoUsuarioMock = {
        tipoUsuario: 2,
        cidades,
        nome: "João",
        area: 59081,
        ultimaDataContratado: new Date("2021-08-01T00:00:00.000Z"),
        plano: 1,
    }

    const getFrom = (msgAtual, todasAsMsgs = [], todosOsIds = []) => {

        if (!msgAtual) msgAtual = aaaaaaaaaa.find(v => v.id == msgsFlow[0])

        todasAsMsgs.push(
            ...msgAtual.getMensagens(todosOsParametrosDoUsuarioMock).map((v, i) => ({
                id: String(msgAtual.id) + i,
                texto: v,
                msgType: msgAtual.msgsType,
                firstMsgOfChunk: i === 0
            }))
        )

        todosOsIds.push(msgAtual.id)

        const proximaMsg = aaaaaaaaaa.find(v => v.id == msgAtual.getProximo(todosOsParametrosDoUsuarioMock))
        if (!proximaMsg) {
            setMensagens(todasAsMsgs)

            // Comparar com o msgsFlow mais pra frente
            console.log(todosOsIds)
            return
        }
        getFrom(proximaMsg, todasAsMsgs, todosOsIds)
    }

    useEffect(() => {
        getFrom()
    }, [])

    return (
        <>
            {mensagens?.map(({ id, texto, msgType, firstMsgOfChunk }, i) => (
                <div
                    key={id}
                    className={`w-full px-3 pb-0.5 flex
                        ${msgType === "COSTUMER"
                            ? "justify-end"
                            : "justify-start"
                        }
                        ${firstMsgOfChunk && "pt-2"}`
                    }
                >
                    {msgType === "CHATBOT" && firstMsgOfChunk &&
                        <div
                            className="w-2 h-3 bg-[#c0e8c0]"
                            style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                        />}
                    <div
                        className={`max-w-[80%] p-2 rounded-lg
                            ${msgType === "COSTUMER" &&
                            "bg-[#5faf88] rounded-tr-none"
                            }
                            ${msgType === "CHATBOT" &&
                            `bg-[#c0e8c0]
                                    ${firstMsgOfChunk
                                ? "rounded-tl-none"
                                : "ml-2"}
                            `}
                        `}
                    >
                        {texto}
                    </div>
                    {msgType === "COSTUMER" &&
                        <div
                            className="w-2 h-3 bg-[#5faf88]"
                            style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                        />}
                </div>
            ))}
            {/* {chat?.mensagens.map((msg, i) => (
                <div key={i} className={`w-full px-3 py-1 flex ${msg.selfsender ? "justify-end" : "justify-start"}`}>
                    {!msg.selfsender && <div className="w-2 h-3 bg-[#c0e8c0]" style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}></div>}
                    <div className={`max-w-[80%] p-2 rounded-lg ${msg.selfsender ? "bg-[#5faf88] rounded-tr-none" : "bg-[#c0e8c0] rounded-tl-none"}`}>
                        {msg.texto}
                    </div>
                    {msg.selfsender && <div className="w-2 h-3 bg-[#5faf88]" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}></div>}
                </div>
            ))}
            {chat?.respostas?.map((msg, i) => (
                <div key={i} className="w-full pl-5 pr-3 py-[1px] flex justify-start">
                    <div onClick={() => { sendMsg(msg.id) }} className="max-w-[80%] p-2 rounded-lg border-[#246344] border-2 cursor-pointer">
                        {msg.texto}
                    </div>
                </div>
            ))} */}
        </>
    )
}
