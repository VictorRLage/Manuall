import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronDoubleLeftIcon, EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import logo_extensa from "@/assets/img/logo_manuall_extensa_branca.png";
import axios from "@/api/AxiosConfig";
import EntrarTrue from "@/components/login/EntrarTrue";
import EntrarFalse from "@/components/login/EntrarFalse";
import LoadingEmail from "@/components/login/LoadingEmail";
import ModalEscolherConta from "@/components/login/ModalEscolherConta";
import ModalAviso from "@/components/main/ModalAviso";
import ModalEscolherCadastro from "@/components/main/ModalEscolherCadastro";

export default function Login() {

    /*
    Validações:
    Logar - Botão fica indiponivel até o email ser validado
    Email - Apartir do momento que começou a digitar inicia requisição pro back letra por letra (bolinha fica 
        girando), caso seja encontrado 2 email no banco aparece modal perguntando como ele quer se logar, se
        só tiver 1 email libera o botão de login (aparece um check no lugar da bolinha)
    Senha - normal (pode digitar em qualquer momento)
    Botão -  so libera depois de verificar o email
    */

    const navigate = useNavigate();

    const [modalEscolherCadastro, setModalEscolherCadastro] = useState(false);
    const [modalEscolherConta, setModalEscolherConta] = useState(false);
    const [modalAviso, setMoldaAviso] = useState(false)
    const [avisoTitulo, setAvisoTitulo] = useState('')
    const [avisoDescricao, setAvisoDescricao] = useState('')

    const [tipoUsuario, setTipoUsuario] = useState(0);
    const [entrar, setEntrar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [check, setCheck] = useState(false);
    const [notCheck, setNotCheck] = useState(false);
    const [validacaoEmail, setValidacaoEmail] = useState(true);
    const [label, setLabel] = useState('');

    const email_input = useRef(null)
    const senha_input = useRef(null)


    const checarEmail = (e) => {
        const email = email_input.current.value

        if (
            email === "" ||
            email.indexOf("@") === -1 ||
            email.indexOf("@") === 0 ||
            email.indexOf("@") === email.length - 1 ||
            email.indexOf(" ") !== -1 ||
            email.length >= 256 ||
            email.indexOf("$") !== -1
        ) {
            setLabel("Campo inválido")
            setValidacaoEmail(false)
            setLoading(false)
            setCheck(false)
            return
        } else {
            setValidacaoEmail(true)
        }

        axios.post("/usuario/login/checar", {
            email: e.target.value
        })
            .then((res) => {
                if (res.status === 200) {
                    setTipoUsuario(res.data)
                    setEntrar(true)
                    setCheck(true)
                    setNotCheck(false)
                    setLoading(!loading)
                } else if (res.status === 204) {
                    setLabel("Usuario não existe")
                    setValidacaoEmail(false)
                    setEntrar(false)
                    setNotCheck(true)
                    setLoading(!loading)
                }
            })
            .catch((err) => {
                if (err.response.status === 409) {
                    setModalEscolherConta(true)
                    setEntrar(false)
                    setNotCheck(true)
                    setLoading(!loading)
                } else {
                    setMoldaAviso(true)
                    setAvisoTitulo('Erro inesperado')
                    setAvisoDescricao('Por favor tente novamente mais tarde')
                }
            })
    }

    const entrarLogin = () => {

        axios.post("/usuario/login/efetuar", {
            email: email_input.current.value,
            senha: senha_input.current.value,
            tipoUsuario: tipoUsuario
        })
            .then((res) => {
                if (res.status === 200 || res.status === 206) {
                    localStorage.TOKEN = res.data
                    localStorage.TIPO_USUARIO = tipoUsuario
                    if (tipoUsuario === 1) {
                        if(localStorage.PRESTADOR_INTERESSE !== undefined){
                            navigate(`/prestadores/${localStorage.PRESTADOR_SLUG}`, { state: { id: localStorage.PRESTADOR_INTERESSE } })
                        } else{
                            navigate("/prestadores")
                        }
                    }
                    if (tipoUsuario === 2) {
                        if (res.status === 200) {
                            navigate("/prestadores")
                        } else {
                            navigate("/notfound")
                        }
                    }
                    if (tipoUsuario === 3) {
                        navigate("/adm/aprovacao")
                    }
                }
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    setMoldaAviso(true)
                    setAvisoTitulo("Credenciais inválidas")
                    setAvisoDescricao('Por favor tente novamente')
                } else if (err.response.status === 403) {
                    if (err.response.data === "Usuário não finalizou o cadastro") { //modal usuário não finalizou o cadastro
                        setMoldaAviso(true)
                        setAvisoTitulo(err.response.data)
                        setAvisoDescricao('Irei redirecionar você para tela de cadastro para finaliza-lo')
                    }
                    if (err.response.data  === "Aprovação negada") { //modal aprovação negada
                        setMoldaAviso(true)
                        setAvisoTitulo(err.response.data)
                        setAvisoDescricao('Infelizmente sua aprovação foi negada')
                    }
                    if (err.response.data  === "Aprovação pendente") { //modal Aprovação pendente
                        setMoldaAviso(true)
                        setAvisoTitulo(err.response.data)
                        setAvisoDescricao('Por favor aguarde a sua conta ser aprovada')
                    }
                }
            })
    }

    return (
        <div className='flex justify-center h-screen font-mukta'>
            {modalEscolherConta ? <ModalEscolherConta setarUsuario={setTipoUsuario} modal={setModalEscolherConta} entrar={setEntrar} check={setCheck} notCheck={setNotCheck} /> : null}
            {modalAviso ? <ModalAviso titulo={avisoTitulo} descricao={avisoDescricao} tempo={10000} modal={setMoldaAviso} /> : null}
            {modalEscolherCadastro ? <ModalEscolherCadastro modal={setModalEscolherCadastro} /> : null}
            <div id='container' className=" bg-white 2xl:h-144 2xl:w-288 xl:h-120 xl:w-240 self-center rounded-lg drop-shadow-all flex flex-row">
                <div id="container_esquerda" className=" bg-verde-padrao h-full w-30per rounded-l-lg flex flex-col ">
                    <img onClick={() => { navigate("/") }} src={logo_extensa} alt="Logo da Manuall por extensa" className='cursor-pointer 2xl:w-60 xl:w-52 2xl:mt-12 xl:mt-10 self-center' />
                    <p className='2xl:text-4xl xl:text-2xl  font-bold text-white w-full text-start 2xl:pl-10 xl:pl-14 self-center 2xl:leading-relaxed 2xl:mt-10 xl:mt-8'>Ainda não possui<br />uma conta?</p>
                    <p className='2xl:text-2xl xl:text-xl   text-white w-full text-start 2xl:pl-10 xl:pl-14 self-center 2xl:leading-relaxed 2xl:mt-0 xl:mt-3'>Cadastre-se por aqui.</p>
                    <button onClick={() => { setModalEscolherCadastro(true) }} className='bg-white font-normal text-verde-escuro-1 2xl:text-2xl xl:text-xl self-center 2xl:w-64 2xl:h-14 xl:w-48 xl:h-12 rounded-full xl:mt-28'>Cadastre-se</button>
                    <button onClick={() => { navigate("/") }} className='2xl:text-2xl xl:text-xl font-bold text-white self-center leading-relaxed 2xl:mt-11 xl:mt-9 flex items-center'> <ChevronDoubleLeftIcon className='2xl:h-10 2xl:w-10 xl:h-8 xl:w-8' /> Voltar à Tela inicial</button>
                </div>
                <div id='container_direita' className='bg-white h-full w-70per rounded-r-lg flex flex-col'>
                    <div id='container_titulo' className='w-full flex flex-col text-center'>
                        <p className='text-verde-padrao font-extrabold text-6xl mt-14'>Bem-vindo de volta!</p>
                        <p className='text-verde-padrao font-extrabold text-2xl mt-2'>Acesse a sua conta agora mesmo.</p>
                    </div>
                    <div id="container_inputs" className="2xl:w-96  xl:w-80 rounded-lg  self-center flex flex-col 2xl:gap-10 xl:gap-8 2xl:mt-20 xl:mt-10 ">

                        <div className="relative">
                            <input ref={email_input} onBlur={(e) => { checarEmail(e); }} onFocus={() => { setLoading(!loading); setCheck(false); setNotCheck(false); }} type="text" id="email_inp" className={`block px-2.5 pb-2.5 pt-4 w-full 2xl:text-lg xl:text-base text-gray-900 bg-transparent rounded-lg border-2 ${validacaoEmail ? `border-cinza-claro-1` : `border-red-500`}  appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer`} placeholder=" " />
                            <label htmlFor="email_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><EnvelopeIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Endereço de email</label>
                            {validacaoEmail ? null : <label className="absolute ml-1 text-red-500 font-medium">{label}</label>}
                            {loading ? <LoadingEmail /> : null}
                            {check ? <CheckCircleIcon className='text-verde-padrao absolute 2xl:h-10 2xl:w-10 xl:h-10 xl:w-10 2xl:left-96 xl:left-80 top-2 ml-1' /> : null}
                            {notCheck ? <XCircleIcon className='text-red-500 absolute 2xl:h-10 2xl:w-10 xl:h-10 xl:w-10 2xl:left-96 xl:left-80 top-2 ml-1' /> : null}
                        </div>
                        <div className="relative">
                            <input ref={senha_input} type="password" id="senha_inp" className={`block px-2.5 pb-2.5 pt-4 w-full 2xl:text-lg xl:text-base text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer`} placeholder=" " />
                            <label htmlFor="senha_inp" className="absolute xl:text-lg 2xl:text-xl  text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><LockClosedIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Senha</label>
                        </div>
                    </div>
                    <div id="container_esqueci_senha" className="w-full flex justify-center">
                        <Link to={''} className='text-center text-verde-padrao font-medium underline 2xl:text-lg xl:text-base'>Esqueci minha senha</Link>
                    </div>
                    <div id="container_entrar" className="w-full flex justify-center 2xl:mt-8.5 xl:mt-3">
                        {entrar ? <EntrarTrue entrarLogin={entrarLogin} /> : < EntrarFalse />}
                    </div>
                </div>
            </div>
        </div>
    );
}
