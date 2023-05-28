import { Link, useNavigate } from "react-router-dom";
import logo_extensa from '../../assets/img/logo_manuall_extensa_verde.png'
import { ChatBubbleBottomCenterTextIcon, BellIcon, UserIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Notificacoes from "./Notificacoes";
import Chat from "./Chat";
import axiosInstance from "../../api/AxiosConfig";

function Header(props) {
    /*  validações :
        1 - em qual pagina você esta?        
        2 - logado?
        3 - se esta logado como como contratante tem CHAT e NOTIFICAÇOES e 
        4 - se esta logado como como contratante tem CHAT, NOTIFICAÇOES, CONFIGURAÇÃO e link na navibar para Dashboard
    */
    const navigate = useNavigate()

    const tipoUsuario = localStorage.TIPO_USUARIO
    const [dropDownNotificacao, setdropDownNotificacao] = useState(false);
    const [dropDownChat, setdropDownChat] = useState(false);
    const [temNotificacao, setTemNotificacao] = useState(false)
    const [jsonNotificacao, setJsonNotificacao] = useState([])
    const [temChat, setTemChat] = useState(false)
    const [jsonPessoasConversas, setJsonPessoasConversas] = useState([])
    const [jsonConversas, setJsonConversas] = useState([])

    const getNotificacao = () => {
        axiosInstance.get("/perfil/solicitacoes", {
            headers: {
                "Authorization": `Bearer ${localStorage.TOKEN}`
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.length !== 0) {
                        setTemNotificacao(true)
                        setJsonNotificacao(res.data)
                    }
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    const getChat = () => {
        axiosInstance.get("/chat", {
            headers: {
                "Authorization": `Bearer ${localStorage.TOKEN}`
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    setJsonPessoasConversas(res.data)
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    const getMensagens = () => {
        setJsonConversas([])
        jsonPessoasConversas.forEach(e => {
            axiosInstance.get(`/chat/${e.solicitacaoId}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.TOKEN}`
                }
            })
                .then((res) => {
                    if (res.status === 200) {
                        const newItem = {
                            'idMsg': res.data.mensagens[res.data.mensagens.length - 1].id,
                            'idSolicitação': e.solicitacaoId,
                            'nome': e.usuarioNome,
                            'mensagem': res.data.mensagens[res.data.mensagens.length - 1].mensagem
                        }
                        setJsonConversas(prevArray => [...prevArray, newItem])
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        });
    }

    const buscarNovasNotificacoes = () => {
        jsonConversas.forEach(e => {
            axiosInstance.get(`/chat/${e.idSolicitação}/buscar/${e.idMsg}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.TOKEN}`
                }
            })
            .then((res) => {
                if (res.status === 200) {
                    setTemChat(true)
                }
            })
        })
    }

    useEffect(() => {
        if (localStorage.TOKEN !== undefined && localStorage.TOKEN !== null) {
            setInterval(buscarNovasNotificacoes, 10000)
            getNotificacao()
            getChat()
        }
    }, []) // eslint-disable-line

    useEffect(() => {
        jsonPessoasConversas.forEach(e => {
            axiosInstance.get(`/chat/${e.solicitacaoId}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.TOKEN}`
                }
            })
                .then((res) => {
                    if (res.status === 200) {
                        const newItem = {
                            'idMsg': res.data.mensagens[res.data.mensagens.length - 1].id,
                            'idSolicitação': e.solicitacaoId,
                            'nome': e.usuarioNome,
                            'mensagem': res.data.mensagens[res.data.mensagens.length - 1].mensagem
                        }
                        setJsonConversas(prevArray => [...prevArray, newItem])
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        });
    }, [jsonPessoasConversas]) // eslint-disable-line

    return (
        <div>
            <header className="z-20 flex py-4 px-32 w-full bg-white drop-shadow-all justify-between">
                <div>
                    <img onClick={() => { navigate("/inicio") }} src={logo_extensa} alt="Logo da Manuall por extensa" className='2xl:w-60 xl:w-52' />
                </div>
                <nav className="flex justify-between  items-center" style={{ width: tipoUsuario === undefined ? "46rem" : "38rem" }}>
                    <div className="flex justify-between w-[38%]" style={{ width: tipoUsuario === undefined ? "38%" : "47%" }}>
                        <Link to="/inicio" style={{ color: props.pag === 'inicio' ? "#00CC69" : "black", fontWeight: props.pag === 'inicio' ? "700" : "400" }} className="text-xl" >Inicio</Link>
                        <Link to="/development" style={{ color: props.pag === 'prestadores' ? "#00CC69" : "black", fontWeight: props.pag === 'prestadores' ? "700" : "400" }} className="text-xl" >Prestadores</Link>
                        <Link to="/development" style={{ color: props.pag === 'contato' ? "#00CC69" : "black", fontWeight: props.pag === 'contato' ? "700" : "400" }} className="text-xl" >Contato</Link>

                    </div>
                    {tipoUsuario === undefined ?
                        <div className="flex justify-between w-[58%] items-center">
                            <Link to="/CadastroPrestador" className="text-xl" >Quero ensinar</Link>
                            <button onClick={() => { navigate("/login") }} className="text-xl border-4 w-32 h-11 border-verde-padrao rounded-full text-verde-padrao font-bold" >Fazer login</button>
                            <button className="text-xl w-32 h-11 bg-verde-padrao rounded-full text-white font-bold">Cadastre-se</button>
                        </div>
                        : tipoUsuario === '1' ?
                            <div className="flex justify-between w-[47%] items-center">
                                <Link to="/development" className="text-xl" >Historico</Link>
                                <div className="flex justify-between w-[62%] items-center">
                                    <div >
                                        {temChat ? <div className="absolute z-10 ml-8">
                                            <span className="relative flex h-3 w-3 ">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                            </span>
                                        </div>
                                            : null}
                                        <button onClick={() => { setdropDownChat(!dropDownChat); getMensagens(); setTemChat(false) }} className="bg-white w-11 h-11 rounded-full border-2 border-verde-padrao drop-shadow-all-icon flex justify-center items-center"><ChatBubbleBottomCenterTextIcon className='w-7 text-verde-padrao' /></button>
                                        <Chat json={jsonConversas} dropDown={dropDownChat} />
                                    </div>
                                    {dropDownChat ? <button onClick={() => { setdropDownChat(false) }} className='z-30 fixed h-screen w-screen top-0 left-0 right-0 bottom-0 cursor-default '></button> : null}
                                    <div className="realtive">
                                        {/* {temNotificacao ? <div className="absolute z-10 ml-8">
                                            <span className="relative flex h-3 w-3 ">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                            </span>
                                        </div>
                                            : null} */}
                                        <button onClick={() => { setdropDownNotificacao(!dropDownNotificacao) }} className="bg-verde-padrao w-11 h-11 border-2 border-verde-padrao drop-shadow-all-icon rounded-full flex justify-center items-center"><BellIcon className='w-7 text-white' /></button>
                                        <Notificacoes json={jsonNotificacao} tipoUsuario={tipoUsuario} dropDown={dropDownNotificacao} />
                                    </div>
                                    {dropDownNotificacao ? <button onClick={() => { setdropDownNotificacao(false) }} className='z-30 fixed h-screen w-screen top-0 left-0 right-0 bottom-0 cursor-default '></button> : null}
                                    <button onClick={() => { navigate("/development") }} className="bg-white w-11 h-11 rounded-full border-2 border-verde-padrao drop-shadow-all-icon flex justify-center items-center"><UserIcon className='w-7 text-verde-padrao' /></button>
                                </div>
                            </div>
                            : tipoUsuario === '2' ?
                                <div className="flex justify-between w-[47%] items-center">
                                    <Link to="/development" className="text-xl" >Dashboard</Link>
                                    <div className="flex justify-between w-[62%] items-center">
                                        <div className="realtive">
                                            <div className="absolute z-10 ml-8">
                                                <span className="relative flex h-3 w-3 ">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                                </span>
                                            </div>
                                            <div >
                                                <button onClick={() => { setdropDownChat(!dropDownChat); getMensagens(); setTemChat(false) }} className="bg-white w-11 h-11 rounded-full border-2 border-verde-padrao drop-shadow-all-icon flex justify-center items-center"><ChatBubbleBottomCenterTextIcon className='w-7 text-verde-padrao' /></button>
                                                <Chat json={jsonConversas} dropDown={dropDownChat} />
                                            </div>
                                            {dropDownChat ? <button onClick={() => { setdropDownChat(false) }} className='z-30 fixed h-screen w-screen top-0 left-0 right-0 bottom-0 cursor-default '></button> : null}
                                        </div>

                                        <div className="realtive">
                                            {/* {temNotificacao ? <div className="absolute z-10 ml-8">
                                                <span className="relative flex h-3 w-3 ">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                                </span>
                                            </div>
                                                : null} */}
                                            {dropDownNotificacao ? <button onClick={() => { setdropDownNotificacao(false) }} className='z-40 fixed h-screen w-screen top-0 left-0 right-0 bottom-0 cursor-default '></button> : null}
                                            <button onClick={() => { setdropDownNotificacao(!dropDownNotificacao) }} className="bg-verde-padrao w-11 h-11 border-2 border-verde-padrao drop-shadow-all-icon rounded-full flex justify-center items-center"><BellIcon className='w-7 text-white' /></button>
                                            <Notificacoes json={jsonNotificacao} tipoUsuario={tipoUsuario} dropDown={dropDownNotificacao} />
                                        </div>
                                        <button onClick={() => { navigate("/development") }} className="bg-white w-11 h-11 rounded-full border-2 border-verde-padrao drop-shadow-all-icon flex justify-center items-center"><UserIcon className='w-7 text-verde-padrao' /></button>
                                    </div>
                                </div>
                                : null}
                </nav>
            </header>
        </div>
    );
}

export default Header;