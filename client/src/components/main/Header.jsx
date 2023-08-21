import { Link, useNavigate } from "react-router-dom";
import logo_extensa from '../../assets/img/logo_manuall_extensa_verde.png'
import { BellIcon, UserIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Notificacoes from "./Notificacoes";
import Chat from "./Chat";
import axiosInstance from "../../api/AxiosConfig";
import ModalEscolherCadastro from "./ModalEscolherCadastro";

export default function Header(props) {
    /*  validações :
        1 - em qual pagina você esta?
        2 - logado?
        3 - se esta logado como como contratante tem CHAT e NOTIFICAÇOES e
        4 - se esta logado como como contratante tem CHAT, NOTIFICAÇOES, CONFIGURAÇÃO e link na navibar para Dashboard
    */
    const navigate = useNavigate()

    const tipoUsuario = localStorage.TIPO_USUARIO && Number(localStorage.TIPO_USUARIO)
    const [modalEscolherCadastro, setModalEscolherCadastro] = useState(false);
    const [dropDownNotificacao, setdropDownNotificacao] = useState(false);
    // const [temNotificacao, setTemNotificacao] = useState(false)
    const [jsonNotificacao, setJsonNotificacao] = useState([])

    const logOff = () => {
        localStorage.removeItem('TOKEN')
        localStorage.removeItem('TIPO_USUARIO')
        window.location.reload()
    }

    const getNotificacao = () => {
        axiosInstance.get("/perfil/solicitacoes", {
            headers: {
                "Authorization": `Bearer ${localStorage.TOKEN}`
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.length !== 0) {
                        // setTemNotificacao(true)
                        setJsonNotificacao(res.data)
                    }
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        if (localStorage.TOKEN) getNotificacao()
    }, [])

    return (
        <>
            {modalEscolherCadastro && <ModalEscolherCadastro modal={setModalEscolherCadastro} />}
            <header className="z-20 flex py-4 px-32 w-full bg-white drop-shadow-all justify-between">
                <div>
                    <img onClick={() => { navigate("/inicio") }} src={logo_extensa} alt="Logo da Manuall por extensa" className='2xl:w-60 xl:w-52' />
                </div>
                <nav className="flex justify-between  items-center" style={{ width: tipoUsuario === undefined ? "46rem" : "38rem" }}>
                    <div className="flex justify-between w-[38%]" style={{ width: tipoUsuario === undefined ? "38%" : "47%" }}>
                        <Link to="/inicio" style={{ color: props.pag === 'inicio' ? "#00CC69" : "black", fontWeight: props.pag === 'inicio' ? "700" : "400" }} className="text-xl">
                            Início
                        </Link>
                        <Link to="/prestadores" style={{ color: props.pag === 'prestadores' ? "#00CC69" : "black", fontWeight: props.pag === 'prestadores' ? "700" : "400" }} className="text-xl">
                            Prestadores
                        </Link>
                        <Link to="/contato" style={{ color: props.pag === 'contato' ? "#00CC69" : "black", fontWeight: props.pag === 'contato' ? "700" : "400" }} className="text-xl mr-2">
                            Contato
                        </Link>
                    </div>
                    {!tipoUsuario || tipoUsuario === 3 ?
                        <div className="flex justify-between w-[68%] items-center">
                            <Link to="/CadastroPrestador" className="text-xl" >
                                Quero ensinar
                            </Link>
                            <button onClick={() => { navigate("/login") }} className="text-xl border-4 w-28 h-11 mr-2 ml-2 border-verde-padrao rounded-full text-verde-padrao font-bold" >
                                Fazer login
                            </button>
                            <button onClick={() => { setModalEscolherCadastro(true) }} className="text-xl w-28 h-11 bg-verde-padrao rounded-full text-white font-bold">
                                Cadastre-se
                            </button>
                        </div>
                        : <div className="flex justify-between w-[47%] items-center">
                            {tipoUsuario === 1
                                ? <Link to="/development" className="text-xl" >
                                    Histórico
                                </Link>
                                : <Link to="/development" className="text-xl">
                                    Dashboard
                                </Link>}
                            <div className="flex justify-between w-[42%] items-center">
                                <div>
                                    {/* Funcionalidade depreciada por enquanto */}
                                    {/* temNotificacao
                                        ? <div className="absolute z-10 ml-8">
                                            <span className="relative flex h-3 w-3 ">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                            </span>
                                        </div>
                                        : null */}
                                    {dropDownNotificacao && <button onClick={() => { setdropDownNotificacao(false) }} className="z-30 fixed h-screen w-screen top-0 left-0 right-0 bottom-0 cursor-default"></button>}
                                    <button onClick={() => { setdropDownNotificacao(!dropDownNotificacao) }} className="bg-verde-padrao w-11 h-11 border-2 border-verde-padrao drop-shadow-all-icon rounded-full flex justify-center items-center">
                                        <BellIcon className='w-7 text-white' />
                                    </button>
                                    <Notificacoes json={jsonNotificacao} tipoUsuario={tipoUsuario} dropDown={dropDownNotificacao} />
                                </div>
                                <button onClick={logOff} className="bg-white w-11 h-11 rounded-full border-2 border-verde-padrao drop-shadow-all-icon flex justify-center items-center">
                                    <UserIcon className='w-7 text-verde-padrao' />
                                </button>
                            </div>
                        </div>}
                </nav>
            </header>
            {tipoUsuario && [1, 2].includes(tipoUsuario) && <Chat />}
        </>
    );
}
