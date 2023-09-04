import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import falasManuelEnum from "@/enum/FalasManuelENUM";
import cidades from "@/enum/CrmCidadesENUM";
import { authenticatedApiInstance as axios } from "@/api/AxiosConfig";

export default function ChatManuel({ chat, setChat, scrollDown }) {

    const navigate = useNavigate()

    const tipoUsuario = localStorage.TIPO_USUARIO && Number(localStorage.TIPO_USUARIO)

    const buscarPorMensagens = async () => {

        if (!chat.isManuel) return;

        const msgs = chat.stringifiedMsgs.split(",")
        const mensagensExibidas = []
        const respostas = []

        if (tipoUsuario !== 1) {
            if (msgs.length === 0) {
                return pushMessage(msgs.concat("0").join(","))
            }

            // Fase 0 Fluxo contratante
            if (msgs[0] === "0") {
                let msgAtual = falasManuelEnum[1][0]

                mensagensExibidas.push({
                    texto: msgAtual.get(/* nomeUsuario */),
                    selfsender: false
                })

                // Fase 1 Fluxo contratante
                if (msgs.length === 1) {
                    return pushMessage(msgs.concat("0").join(","))
                }

                msgAtual = msgAtual.next[msgs[1]]

                mensagensExibidas.push({
                    texto: msgAtual.get(),
                    selfsender: false
                })

                if (msgs.length > 2) {
                    // Fase 2 Fluxo contratante
                    msgAtual = msgAtual.next[msgs[2]]

                    mensagensExibidas.push({
                        texto: msgAtual.get(),
                        selfsender: true
                    })

                    if (msgs.length === 3) {
                        return pushMessage(msgs.concat("0").join(","))
                    }

                    // Fase 3 Fluxo contratante
                    msgAtual = msgAtual.next[msgs[3]]

                    mensagensExibidas.push({
                        texto: msgAtual.get(),
                        selfsender: false
                    })

                    if (msgs.length > 4) {
                        // Fase 4 Fluxo contratante

                        msgAtual = msgAtual.next[0]
                        mensagensExibidas.push({
                            texto: msgAtual.get([
                                { id: 0, texto: "Jardineiro" },
                                { id: 1, texto: "Pintor" },
                                { id: 2, texto: "Eletricista" },
                                { id: 3, texto: "Encanador" },
                                { id: 4, texto: "Marceneiro" },
                                { id: 5, texto: "Montador" },
                                { id: 6, texto: "Gesseiro" },
                            ])[msgs[4]].texto,
                            selfsender: true
                        })

                        if (msgs.length === 5) {
                            return pushMessage(msgs.concat("0").join(","))
                        }

                        msgAtual = msgAtual.next[msgs[5]]

                        mensagensExibidas.push({
                            texto: msgAtual.get(),
                            selfsender: false
                        })

                        if (msgs.length === 6) {
                            return pushMessage(msgs.concat("0").join(","))
                        }

                        // Fase 5 Fluxo contratante
                        msgAtual = msgAtual.next[msgs[6]]

                        mensagensExibidas.push({
                            texto: msgAtual.get(),
                            selfsender: false
                        })

                        if (msgs.length > 7) {

                            // Fase 6 Fluxo contratante
                            msgAtual = msgAtual.next[0]

                            mensagensExibidas.push({
                                texto: cidades[msgs[7] - 1].texto,
                                selfsender: true
                            })

                            if (msgs.length === 8) {
                                return pushMessage(msgs.concat("0").join(","))
                            }

                            // Fase 7 Fluxo contratante
                            msgAtual = msgAtual.next[msgs[8]]

                            mensagensExibidas.push({
                                texto: msgAtual.get(),
                                selfsender: false
                            })

                            if (msgs.length === 9) {
                                return pushMessage(msgs.concat("0").join(","))
                            }

                            // Fase 8 Fluxo contratante
                            msgAtual = msgAtual.next[msgs[9]]

                            mensagensExibidas.push({
                                texto: msgAtual.get(),
                                selfsender: false
                            })

                            if (msgs.length > 10) {

                                // Fase 9 Fluxo contratante
                                msgAtual = msgAtual.next[msgs[10]]

                                navigate({ pathname: "/development" })
                            } else {
                                for (let i = 0; i < msgAtual.next.length; i++) {
                                    respostas.push({
                                        texto: msgAtual.next[i].get(),
                                        id: i,
                                    })
                                }
                            }
                        } else {

                            // Fase 5 Fluxo contratante
                            respostas.push(...cidades)
                        }

                    } else {

                        msgAtual = msgAtual.next[0]

                        const mock = [
                            { id: 0, texto: "Jardineiro" },
                            { id: 1, texto: "Pintor" },
                            { id: 2, texto: "Eletricista" },
                            { id: 3, texto: "Encanador" },
                            { id: 4, texto: "Marceneiro" },
                            { id: 5, texto: "Montador" },
                            { id: 6, texto: "Gesseiro" },
                        ]

                        // Fase 3 Fluxo contratante
                        respostas.push(...mock)
                    }
                } else {

                    // Fase 1 Fluxo contratante
                    for (let i = 0; i < msgAtual.next.length; i++) {
                        respostas.push({
                            texto: msgAtual.next[i].get(),
                            id: i,
                        })
                    }
                }
            }

        } else {
            if (msgs.length === 0) {
                return pushMessage(msgs.concat("0").join(","))
            }

            // Fase 0 Fluxo prestador
            if (msgs[0] === "0") {
                let msgAtual = falasManuelEnum[2][0]

                mensagensExibidas.push({
                    texto: msgAtual.get(/* nomeUsuario */),
                    selfsender: false
                })

                // Fase 1 Fluxo prestador
                if (msgs.length === 1) {

                    //ultimaDataContratado - new Date() > 1000 * 60 * 60 * 24 * 30
                    if (/* prestador foi contratado no ultimo mes? */ false) {
                        return pushMessage(msgs.concat("0").join(","))
                    } else {
                        return pushMessage(msgs.concat("1").join(","))
                    }
                }

                console.log(msgs[1])
                msgAtual = msgAtual.next[msgs[1]]

                mensagensExibidas.push({
                    texto: msgAtual.get("tanto faz"),
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
                        return pushMessage(msgs.concat("0").join(","))
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
                            return pushMessage(msgs.concat("0").join(","))
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
        pushMessage(chat.stringifiedMsgs + "," + id)
    }

    const pushMessage = (msg) => {
        setChat({
            ...chat,
            stringifiedMsgs: msg
        })
        if (msg.split(",").length > 10) return
        
        // axios.post("/crm", {
        //     log: msg
        // })
        //     .catch((err) => {
        //         console.log(err)
        //     })
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
