import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo_extensa from "@/assets/img/logo_manuall_extensa_verde.png";
import { UserIcon } from "@heroicons/react/24/solid";
import Notificacao from "@/components/main/Notificacao";
import Chat from "@/components/main/Chat";
import ModalEscolherCadastro from "@/components/main/ModalEscolherCadastro";

export default function Header(props) {
    /*  validações :
        1 - em qual pagina você esta?
        2 - logado?
        3 - se esta logado como como contratante tem CHAT e NOTIFICAÇOES e
        4 - se esta logado como como contratante tem CHAT, NOTIFICAÇOES, CONFIGURAÇÃO e link na navibar para Dashboard
    */
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const tipoUsuario = localStorage.TIPO_USUARIO && Number(localStorage.TIPO_USUARIO)
    const [modalEscolherCadastro, setModalEscolherCadastro] = useState(false);

    const logOff = () => {
        localStorage.removeItem('TOKEN')
        localStorage.removeItem('TIPO_USUARIO')
        window.location.reload()
    }

    return (
        <>
            {modalEscolherCadastro && <ModalEscolherCadastro modal={setModalEscolherCadastro} />}
            <header className="z-20 flex py-4 px-32 w-full bg-white drop-shadow-all justify-between items-center">
                <img
                    onClick={() => { navigate("/inicio") }}
                    src={logo_extensa}
                    alt="Logo da Manuall por extensa"
                    className='w-[200px]'
                />
                <nav className="flex items-center gap-4">
                    <button
                        onClick={() => { navigate("/inicio") }}
                        style={{
                            color: pathname === "/inicio" ? "#00CC69" : "black",
                            fontWeight: pathname === "/inicio" ? "700" : "400"
                        }}
                        className="text-xl"
                    >
                        Início
                    </button>
                    <button
                        onClick={() => { navigate("/prestadores") }}
                        style={{
                            color: pathname === "/prestadores" ? "#00CC69" : "black",
                            fontWeight: pathname === "/prestadores" ? "700" : "400"
                        }}
                        className="text-xl"
                    >
                        Prestadores
                    </button>
                    <button
                        onClick={() => { navigate("/contato") }}
                        style={{
                            color: pathname === "/contato" ? "#00CC69" : "black",
                            fontWeight: pathname === "/contato" ? "700" : "400"
                        }}
                        className="text-xl"
                    >
                        Contato
                    </button>
                    {!tipoUsuario || tipoUsuario === 3 ?
                        <>
                            <button
                                onClick={() => { navigate("/cadastroPrestador") }}
                                className="text-xl"
                            >
                                Quero ensinar
                            </button>
                            <button
                                onClick={() => { navigate("/login") }}
                                className="text-xl border-2 w-28 h-11 border-verde-padrao rounded-full text-verde-padrao font-bold"
                            >
                                Fazer login
                            </button>
                            <button
                                onClick={() => { setModalEscolherCadastro(true) }}
                                className="text-xl w-28 h-11 bg-verde-padrao rounded-full text-white font-bold"
                            >
                                Cadastre-se
                            </button>
                        </>
                        : <>
                            {tipoUsuario === 1
                                ? <button
                                    onClick={() => { navigate("/development") }}
                                    className="text-xl"
                                >
                                    Histórico
                                </button>
                                : <button
                                    onClick={() => { navigate("/development") }}
                                    className="text-xl"
                                >
                                    Dashboard
                                </button>}
                            <Notificacao tipoUsuario={tipoUsuario} />
                            <button
                                onClick={logOff}
                                className="bg-white w-11 h-11 rounded-full border-2 border-verde-padrao drop-shadow-all-icon flex justify-center items-center"
                            >
                                <UserIcon className='w-7 text-verde-padrao' />
                            </button>
                        </>}
                </nav>
            </header>
            {tipoUsuario && [1, 2].includes(tipoUsuario) && <Chat />}
        </>
    );
}
