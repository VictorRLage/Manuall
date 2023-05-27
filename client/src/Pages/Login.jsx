import axiosInstance from "../api/AxiosConfig"
import { useState, useRef } from "react"
import { useNavigate, Link } from "react-router-dom";
import { ChevronDoubleLeftIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import logo_extensa from '../assets/img/logo_manuall_extensa.png'
import EntrarTrue from '../components/login/EntrarTrue'
import EntrarFalse from '../components/login/EntrarFalse'
import LoadingEmail from "../components/login/LoadingEmail";

function Login() {

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

    const [tipoUsuario, setTipoUsuario] = useState(0);
    const [entrar, setEntrar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [check, setCheck] = useState(false);
    const [notCheck, setNotCheck] = useState(false);

    const email = useRef(null)
    const senha = useRef(null)

    const checarEmail = (e) => {
        console.log("Checando email")
        axiosInstance.post("/usuario/login/checar", {
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
                alert("Usuario não existe")
                setEntrar(false)
                setNotCheck(true)
                setLoading(!loading)
                // modal usuario nao existe
            } else if (res.status === 206) {
                
            } else {
                alert("Erro inesperado")
            }
        })
        .catch((err) => {
            if (err.response.status === 403) {
                const errorData = err.response.data
                if (errorData === "Aprovação pendente") {
                    alert("Redirecionado para tela de aguarde aprovação")
                } else if (errorData === "Aprovação negada") {
                    alert("Redirecionado para tela de aprovação negada")
                }
            } else if (err.response.status === 409) {
                alert("Usuario possui 2 perfis")
                setEntrar(false)
                setNotCheck(true)
                setLoading(!loading)
                // modal 2 tipos de perfil
            } else {
                alert("Erro inesperado")
            }
        })
    }

    const entrarLogin = () => {
        axiosInstance.post("/usuario/login/efetuar", {
            email: email.current.value,
            senha: senha.current.value,
            tipoUsuario: tipoUsuario
        })
        .then((res) => {
            if (res.status === 200) {
                console.log("Token recuperado")
                console.log(res.data)
                localStorage.TOKEN = res.data
                //res.data
                // if (tipoUsuario === 1) vai pra vendas
                // if (tipoUsuario === 2) vai pra perfil
            }
        })
        .catch((err) => {
            if (err.response.status === 401) {
                alert("Credenciais inválidas")
                // modal credenciais invalidas
            } else if (err.response.status === 403) {
                // if (res.data === "Usuário não finalizou o cadastro") modal usuário não finalizou o cadastro
                // if (res.data === "Aprovação negada") modal aprovação negada
                // if (res.data === "Aprovação pendente") modal Aprovação pendente
            }
        })
    }

    return (
        <div className='flex justify-center h-screen font-mukta'>
            <div id='container' className="bg-white 2xl:h-144 2xl:w-288 xl:h-120 xl:w-240 self-center rounded-lg drop-shadow-all flex flex-row">
                <div id="container_esquerda" className="bg-verde-padrao h-full w-30per rounded-l-lg flex flex-col ">
                    <img src={logo_extensa} alt="Logo da Manuall por extensa" className='2xl:w-60 xl:w-52 2xl:mt-12 xl:mt-10 self-center' />
                    <p className='2xl:text-4xl xl:text-2xl  font-bold text-white w-full text-start 2xl:pl-10 xl:pl-14 self-center 2xl:leading-relaxed 2xl:mt-10 xl:mt-8'>Ainda não possui<br />uma conta?</p>
                    <p className='2xl:text-2xl xl:text-xl   text-white w-full text-start 2xl:pl-10 xl:pl-14 self-center 2xl:leading-relaxed 2xl:mt-0 xl:mt-3'>Cadastre-se por aqui.</p>
                    <button className='bg-white font-normal text-verde-escuro-1 2xl:text-2xl xl:text-xl self-center 2xl:w-64 2xl:h-14 xl:w-48 xl:h-12 rounded-full xl:mt-28' onClick={() => {navigate("/cadastroContratante")}}>Cadastre-se</button>
                    <button className='2xl:text-2xl xl:text-xl font-bold text-white self-center leading-relaxed 2xl:mt-11 xl:mt-9 flex items-center'> <ChevronDoubleLeftIcon className='2xl:h-10 2xl:w-10 xl:h-8 xl:w-8' /> Voltar à Tela inicial</button>
                </div>
                <div id='container_direita' className='bg-white h-full w-70per rounded-r-lg flex flex-col'>
                    <div id='container_titulo' className='w-full flex flex-col text-center'>
                        <p className='text-verde-padrao font-extrabold text-6xl mt-14'>Bem-vindo de volta!</p>
                        <p className='text-verde-padrao font-extrabold text-2xl mt-2'>Acesse a sua conta agora mesmo.</p>
                    </div>
                    <div id="container_inputs" className="2xl:w-96  xl:w-80 rounded-lg  self-center flex flex-col 2xl:gap-10 xl:gap-8 2xl:mt-20 xl:mt-10 ">

                        <div className="relative">
                            <input defaultValue={"joaquim.pires@sptech.school"} ref={email} onBlur={(e) => {checarEmail(e);}} onFocus={() => {setLoading(!loading); setCheck(false); setNotCheck(false);}} type="text" id="email_inp" className="block px-2.5 pb-2.5 pt-4 w-full 2xl:text-lg xl:text-base text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer" placeholder=" " />
                            <label htmlFor="email_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><EnvelopeIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Endereço de email</label>
                            {loading ? <LoadingEmail/>: null}
                            {check ? <CheckCircleIcon className='text-verde-padrao absolute 2xl:h-10 2xl:w-10 xl:h-10 xl:w-10 2xl:left-96 xl:left-80 top-2 ml-1'/>:  null}
                            {notCheck ? <XCircleIcon className='text-red-500 absolute 2xl:h-10 2xl:w-10 xl:h-10 xl:w-10 2xl:left-96 xl:left-80 top-2 ml-1'/>:  null}
                        </div>
                        <div className="relative">
                            <input defaultValue={"senha123"} ref={senha} type="text" id="senha_inp" className="block px-2.5 pb-2.5 pt-4 w-full 2xl:text-lg xl:text-base text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer" placeholder=" " />
                            <label htmlFor="senha_inp" className="absolute xl:text-lg 2xl:text-xl  text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><LockClosedIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Senha</label>
                        </div>
                    </div>
                    <div id="container_esqueci_senha" className="w-full flex justify-center">
                        <Link to={''} className='text-center text-verde-padrao font-medium underline 2xl:text-lg xl:text-base'>Esqueci minha senha</Link>
                    </div>
                    <div id="container_entrar" className="w-full flex justify-center 2xl:mt-8.5 xl:mt-3">
                        {entrar ? <EntrarTrue entrarLogin={entrarLogin}/> : < EntrarFalse />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;