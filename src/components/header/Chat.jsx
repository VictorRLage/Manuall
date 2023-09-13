import { useEffect, useRef, useState } from "react";
import { Oval } from "react-loader-spinner";
import LinedArrow from "@/assets/svg/arrow-icon.svg";
import Arrow from "@/assets/svg/lineless_arrow.svg";
import Manuel from "@/assets/img/manuel_pfp.png";
import ChatManuel from "@/components/header/ChatManuel";
import BotCertification from "@/assets/svg/bot_certification.svg";
import axios from "@/api/axios";

export default function Chat() {

    const tipoUsuario = localStorage.TIPO_USUARIO && Number(localStorage.TIPO_USUARIO)

    const btnFecharConversa = useRef(null)
    const imgBtnFecharConversa = useRef(null)
    const scrollingDiv = useRef(null)

    const [isOpen, setIsOpen] = useState(false)
    const [manuelMsgs, setManuelMsgs] = useState()
    const [dadosUsuarioCrm, setDadosUsuarioCrm] = useState()
    const [conversas, setConversas] = useState()
    // const [mensagens, setMensagens] = useState()
    const [chatAtual, setChatAtual] = useState()

    // const getNewConversas = () => {
    //     axios.get("/chat")
    //         .then((res) => {
    //             if (res.status === 200) {
    //                 setConversas(res.data)
    //                 getNewMensagens()
    //             }
    //         })
    //         .catch(err => {
    //             console.error(err);
    //         });
    // }

    // const getNewMensagens = () => {
    //     conversas?.forEach(e => {
    //         axios.get(`/chat/${e.solicitacaoId}`)
    //             .then((res) => {
    //                 if (res.status === 200) {
    //                     const newItem = {
    //                         'idMsg': res.data.mensagens[res.data.mensagens.length - 1].id,
    //                         'idSolicitação': e.solicitacaoId,
    //                         'nome': e.usuarioNome,
    //                         'mensagem': res.data.mensagens[res.data.mensagens.length - 1].mensagem
    //                     }
    //                     setMensagens(prevArray => [...prevArray, newItem])
    //                 }
    //             })
    //             .catch(err => {
    //                 console.error(err);
    //             });
    //     });
    // }

    const alternarChat = (e) => {
        if (e.target !== (btnFecharConversa && btnFecharConversa.current) && e.target !== (imgBtnFecharConversa && imgBtnFecharConversa.current)) {
            setIsOpen(!isOpen)
        }
        // if (isOpen && localStorage.TOKEN) getNewConversas()
    }

    const selecionarChat = (id, isManuel = false) => {
        if (isManuel) {
            setChatAtual({
                name: "Manuel",
                isManuel: true,
                mensagens: [],
                msgsFlow: manuelMsgs,
                dadosUsuarioCrm,
            })

            scrollDown()
        } else {
            // implementação chat real
        }
    }

    const scrollDown = () => {
        setTimeout(() => {
            scrollingDiv.current.scrollTop = scrollingDiv.current.scrollHeight
        }, 1)
    }

    const getDadosCrm = () => {
        axios.get("/crm")
            .then(({ data }) => {
                setManuelMsgs(data)
            })
            .catch((err) => {
                setManuelMsgs(true)
                console.log(err)
            })
    }

    const getDadosUsuarioCrm = () => {
        if (tipoUsuario)
        axios.get(`/crm/dados/${tipoUsuario}`)
            .then(({ data }) => {
                setDadosUsuarioCrm(data)
            })
            .catch((err) => {
                console.log(err)
                setDadosUsuarioCrm(true)
            })
    }

    useEffect(() => {
        setConversas([{
            solicitacaoId: 1,
            usuarioId: 1,
            usuarioNome: "Michael",
            usuarioPfp: "https://akamai.sscdn.co/uploadfile/letras/fotos/3/4/1/b/341be9c93b5809ae1cf9862d71319531.jpg",
        }, {
            solicitacaoId: 2,
            usuarioId: 2,
            usuarioNome: "Mitsuki",
            usuarioPfp: "https://cdn.amomama.com/4bf8d90018c96028117814b9b5c0c2fe.jpg",
        }, {
            solicitacaoId: 3,
            usuarioId: 3,
            usuarioNome: "Chester",
            usuarioPfp: "https://www.themoviedb.org/t/p/w500/6100kBIvUHArlQnBYO0B3u107rV.jpg"
        }, {
            solicitacaoId: 4,
            usuarioId: 4,
            usuarioNome: "Kevin",
            usuarioPfp: "https://www.rollingstone.com/wp-content/uploads/2019/05/tame-impala-lead-photo.jpg",
        }, {
            solicitacaoId: 5,
            usuarioId: 5,
            usuarioNome: "Alexandre",
            usuarioPfp: "https://www.mapadoceu.com.br/photo/astro/chorao.jpg",
        }])
        
        getDadosCrm()
        getDadosUsuarioCrm()
    }, [])

    return (
        <div className="fixed z-50 right-8 w-[350px] transition-all" style={{ bottom: isOpen ? "0" : "-400px" }}>
            <div onClick={alternarChat} className="bg-verde-escuro-1 h-[50px] rounded-t-lg flex items-center justify-between px-4 cursor-pointer hover:bg-verde-escuro-2 transition-all">
                <div className="flex justify-center items-center">
                    {chatAtual &&
                        <button
                            ref={btnFecharConversa}
                            onClick={() => { setChatAtual(undefined); getDadosCrm() }}
                            className="w-8 h-8 p-1 flex justify-center items-center rotate-180 hover:bg-verde-escuro-1 transition-all rounded-full"
                        >
                            <img ref={imgBtnFecharConversa} className="transition-all" src={LinedArrow} alt="" />
                        </button>}
                    <span className="text-white font-bold text-xl" style={{ paddingLeft: chatAtual ? "4px" : "0" }}>
                        {(chatAtual && chatAtual.name) || "Conversas"}
                    </span>
                </div>
                <div className="w-8 h-8 p-1 flex justify-center items-center">
                    <img className="transition-all" style={{ rotate: isOpen ? "180deg" : "360deg" }} src={Arrow} alt="" />
                </div>
            </div>
            {chatAtual
                ? <>
                    <div ref={scrollingDiv} className="bg-gray-100 flex flex-col overflow-y-auto py-2 scroll-smooth" style={{ height: chatAtual.isManuel ? "400px" : "360px" }}>
                        {chatAtual.isManuel
                            ? <ChatManuel
                                chat={chatAtual}
                                scrollDown={scrollDown}
                            />
                            : <>
                                {chatAtual.mensagens.map((msg, i) => (
                                    <div key={i} className={`w-full px-3 py-1 flex ${msg.selfsender ? "justify-end" : "justify-start"}`}>
                                        {!msg.selfsender && <div className="w-2 h-3 bg-[#c0e8c0]" style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />}
                                        <div className={`max-w-[80%] p-2 rounded-lg ${msg.selfsender ? "bg-[#5faf88] rounded-tr-none" : "bg-[#c0e8c0] rounded-tl-none"}`}>
                                            {msg.texto}
                                        </div>
                                        {msg.selfsender && <div className="w-2 h-3 bg-[#5faf88]" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}></div>}
                                    </div>
                                ))}
                            </>}
                    </div>
                    {!chatAtual.isManuel && <div className="bg-gray-500 h-[40px] flex" />}
                </>
                : <>
                    {conversas && manuelMsgs && dadosUsuarioCrm
                        ? <div className="bg-gray-100 h-[400px] flex flex-col overflow-y-auto">
                            {typeof manuelMsgs !== "boolean" && typeof dadosUsuarioCrm !== "boolean" && <div
                                onClick={() => { selecionarChat(undefined, true) }}
                                className="w-full min-h-[60px] px-4 cursor-pointer hover:bg-gray-100 transition-all"
                            >
                                <div className="w-full h-full flex items-center border-b-2 border-gray-200">
                                    <img src={Manuel} className="w-10 rounded-full" alt="" />
                                    <span className="p-2">Manuel</span>
                                    <img src={BotCertification} className="w-5" alt="" />
                                </div>
                            </div>}
                            {conversas?.map((cvs, i) => (
                                <div
                                    onClick={() => { selecionarChat(cvs.solicitacaoId) }}
                                    className="w-full min-h-[60px] px-4 cursor-pointer hover:bg-gray-100 transition-all"
                                    key={cvs.usuarioId}
                                >
                                    <div className="w-full h-full flex items-center border-b-2 border-gray-200">
                                        <img
                                            src={cvs.usuarioPfp}
                                            className="w-10 h-10 rounded-full object-cover" alt=""
                                        />
                                        <span className="p-2">{cvs.usuarioNome}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        : <div className="bg-white h-[400px] flex justify-center items-center">
                            <Oval
                                height={50}
                                color="#00cc69"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                ariaLabel="oval-loading"
                                secondaryColor="#00cc69"
                                strokeWidth={1}
                                strokeWidthSecondary={4}
                            />
                        </div>
                    }
                </>}
        </div>
    );
}
