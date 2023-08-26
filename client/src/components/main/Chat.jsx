import { useRef, useState } from "react";
import LinedArrow from "@/assets/svg/arrow-icon.svg";
import Arrow from "@/assets/svg/lineless_arrow.svg";
import Manuel from "@/assets/img/manuel_pfp.png";
import BotCertification from "@/assets/svg/bot_certification.svg";
// import { authenticatedApiInstance as axios } from "@/api/AxiosConfig";

export default function Chat(props) {

    const btnFecharConversa = useRef(null)
    const imgBtnFecharConversa = useRef(null)
    const scrollingDiv = useRef(null)

    const [isOpen, setIsOpen] = useState(false)
    // const [conversas, setConversas] = useState()
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

    const selecionarChat = (e, isManuel = false) => {
        if (isManuel) {
            setChatAtual({
                name: "Manuel",
                isManuel: true,
                mensagens: [
                    { texto: "Bom dia! eu sou o Manuel, o assistente virtual da manuall. Posso ajudar em algo?", selfsender: false },
                    { texto: "Sim, eu gostaria de contratar um prestador", selfsender: true },
                    { texto: "Ok, qual serviço você deseja?", selfsender: false },
                    { texto: "Eu gostaria de contratar um prestador para fazer um serviço de pintura", selfsender: true },
                    { texto: "Ok, qual a sua cidade?", selfsender: false },
                    { texto: "São Paulo", selfsender: true },
                    { texto: "Ok, vou procurar por prestadores de pintura em São Paulo", selfsender: false },
                    { texto: "Ok, vou procurar por prestadores de pintura em São Paulo", selfsender: false },
                    { texto: "Ok, vou procurar por prestadores de pintura em São Paulo", selfsender: false },
                    { texto: "Ok, vou procurar por prestadores de pintura em São Paulo", selfsender: false },
                    { texto: "Parece que o Manuel pifou", selfsender: true },
                ]
            })
        } else {
        }

        setTimeout(() => {
            scrollingDiv.current.scrollTop = scrollingDiv.current.scrollHeight
        }, 1)
    }

    return (
        <div className="fixed z-50 right-8 w-[350px] transition-all" style={{ bottom: isOpen ? "0" : "-400px" }}>
            <div onClick={alternarChat} className="bg-verde-escuro-1 h-[50px] rounded-t-lg flex items-center justify-between px-4 cursor-pointer hover:bg-verde-escuro-2 transition-all">
                <div className="flex justify-center items-center">
                    {chatAtual &&
                        <button
                            ref={btnFecharConversa}
                            onClick={() => { setChatAtual(undefined) }}
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
                <div ref={scrollingDiv} className="bg-white flex flex-col overflow-y-auto py-2" style={{ height: chatAtual.isManuel ? "400px" : "360px" }}>
                    {chatAtual.mensagens.map((msg, i) => (
                        <div key={i} className={`w-full px-3 py-1 flex ${msg.selfsender ? "justify-end" : "justify-start"}`}>
                            {!msg.selfsender && <div className="w-2 h-3 bg-[#c0e8c0]" style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}></div>}
                            <div className={`max-w-[80%] p-2 rounded-lg ${msg.selfsender ? "bg-[#5faf88] rounded-tr-none" : "bg-[#c0e8c0] rounded-tl-none"}`}>
                                {msg.texto}
                            </div>
                            {msg.selfsender && <div className="w-2 h-3 bg-[#5faf88]" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}></div>}
                        </div>
                    ))}
                </div>
                {!chatAtual.isManuel && <div className="bg-gray-500 h-[40px] flex"></div>}
                </>
                : <div className="bg-white h-[400px] flex flex-col overflow-y-auto">
                    <div onClick={() => { selecionarChat(undefined, true) }} className="w-full min-h-[60px] px-4 cursor-pointer hover:bg-gray-100 transition-all">
                        <div className="w-full h-full flex items-center border-b-2 border-gray-200">
                            <img src={Manuel} className="w-10 rounded-full" alt="" />
                            <span className="p-2">Manuel</span>
                            <img src={BotCertification} className="w-5" alt="" />
                        </div>
                    </div>
                </div>}
        </div>
    );
}
