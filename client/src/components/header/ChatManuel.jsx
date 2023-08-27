import { useEffect, useState } from "react"
import falasManuelEnum from "@/enum/FalasManuelENUM";

export default function ChatManuel({ chat, setChat, scrollDown }) {

    // const tipoUsuario = localStorage.TIPO_USUARIO && Number(localStorage.TIPO_USUARIO)
    const tipoUsuario = 2

    // const [dadosConversa, setDadosConversa] = useState()

    // useEffect(() => {

    // }, [])

    const buscarPorMensagens = async () => {

        if (!chat.isManuel) return;

        const msgs = chat.stringifiedMsgs.split(",")
        const mensagensExibidas = []
        const respostas = []

        if (tipoUsuario === 1) {

        } else {
            if (msgs.length === 0) {
                return setChat({
                    ...chat,
                    stringifiedMsgs: msgs.concat("0").join(",")
                })
            }

            // Fase 0 Fluxo prestador
            if (msgs[0] === "0") {
                let msgAtual = falasManuelEnum[2][0]

                mensagensExibidas.push({
                    texto: msgAtual.get(/* nomeUsuario */),
                    selfsender: false
                })

                // Fase 1 Fluxo prestador
                if (msgs.length <= 1) {

                    //ultimaDataContratado - new Date() > 1000 * 60 * 60 * 24 * 30
                    if (/* prestador foi contratado no ultimo mes? */ false) {
                        return setChat({
                            ...chat,
                            stringifiedMsgs: msgs.concat("0").join(",")
                        })
                    } else {
                        return setChat({
                            ...chat,
                            stringifiedMsgs: msgs.concat("1").join(",")
                        })
                    }
                }

                msgAtual = msgAtual.next[msgs[1]]

                mensagensExibidas.push({
                    texto: msgAtual.get(),
                    selfsender: false
                })

                // Fase 2 Fluxo prestador
                if (msgs.length > 2) {
                    msgAtual = msgAtual.next[msgs[2]]

                    mensagensExibidas.push({
                        texto: msgAtual.get(),
                        selfsender: true
                    })

                    if (msgs.length === 3) {
                        return setChat({
                            ...chat,
                            stringifiedMsgs: msgs.concat("0").join(",")
                        })
                    }

                    // Fase 3 Fluxo prestador
                    msgAtual = msgAtual.next[msgs[3]]

                    mensagensExibidas.push({
                        texto: msgAtual.get(),
                        selfsender: false
                    })

                    if (msgs.length > 4) {
                        // Fase 4 Fluxo prestador

                        msgAtual = msgAtual.next[msgs[4]]


                        mensagensExibidas.push({
                            texto: msgAtual.get(),
                            selfsender: true
                        })

                        if (msgs.length === 5) {
                            return setChat({
                                ...chat,
                                stringifiedMsgs: msgs.concat("0").join(",")
                            })
                        }

                        // Fase 5 Fluxo prestador
                        msgAtual = msgAtual.next[msgs[5]]

                        mensagensExibidas.push({
                            texto: msgAtual.get(),
                            selfsender: false
                        })

                    } else {

                        // Fase 3 Fluxo prestador
                        for (let i = 0; i < msgAtual.next.length; i++) {
                            respostas.push({
                                texto: msgAtual.next[i].get(),
                                id: i,
                            })
                        }

                    }
                } else {

                    // Fase 1 Fluxo prestador
                    for (let i = 0; i < msgAtual.next.length; i++) {
                        respostas.push({
                            texto: msgAtual.next[i].get(),
                            id: i,
                        })
                    }
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

        scrollDown()
    }

    useEffect(() => {
        buscarPorMensagens()
    }, [chat, /* dadosConversa */])

    const sendMsg = (id) => {
        setChat({
            ...chat,
            stringifiedMsgs: chat.stringifiedMsgs + "," + id
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
