import { useEffect, useState } from "react"
import falasManuelEnum from "@/enum/FalasManuelENUM";

export default function ChatManuel({ chat, setChat }) {

    useEffect(() => {

        if (!chat.isManuel) return;

        const msgs = chat.stringifiedMsgs.split(",")
        const mensagensExibidas = []
        const respostas = []

        let msgAtual = falasManuelEnum[2]
        if (msgs.length > 0) {
            msgAtual = msgAtual[msgs[0]]

            mensagensExibidas.push({

                // FALTA ENDPOINT CHATBOT
                texto: msgAtual.getFala(),
                selfsender: !msgAtual.isManuel
            })

            if(msgs.length <= 1) {
                if(/* prestador foi contratado no ultimo mes? */ false) {
                    msgs.push("0")
                } else {
                    msgs.push("1")
                }
            }
            msgAtual = msgAtual.next[msgs[1]]

            mensagensExibidas.push({
                texto: msgAtual.getFala(),
                selfsender: !msgAtual.isManuel
            })
            
            if (msgs.length > 2) {
                msgAtual = msgAtual.next[msgs[2]]

                mensagensExibidas.push({
                    texto: msgAtual.getFala(),
                    selfsender: !msgAtual.isManuel
                })

                if (msgs.length > 3) {
                    msgAtual = msgAtual.next[msgs[3]]

                    mensagensExibidas.push({
                        texto: msgAtual.getFala(),
                        selfsender: !msgAtual.isManuel
                    })
                }
            } else {
                for(let i = 0; i < msgAtual.next.length; i++) {
                    respostas.push({
                        texto: msgAtual.next[i].getFala(),
                        id: i,
                    })
                }
            }
        }

        if (chat.mensagens.length !== mensagensExibidas.length) {
            setChat({
                ...chat,
                mensagens: mensagensExibidas,
                respostas,
            })
        }
    }, [chat])

    const sendMsg = (id) => {
        setChat({
            ...chat,
            stringifiedMsgs: chat.stringifiedMsgs + `,${id}`
        })
    }

    return (
        <>
            {chat?.mensagens.map((msg, i) => (
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
            ))}
        </>
    )
}
