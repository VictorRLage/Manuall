import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import { ChevronDoubleLeftIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid'
import logo_extensa from '../assets/img/logo_manuall_extensa.png'


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

    let navigate = useNavigate();
    const routeChangeToCadastroContratante = () => {
        let path = `/cadastroContratante`;
        navigate(path);
    }


    return (
        <div className='flex justify-center h-screen font-mukta'>
            <div id='container' className="bg-white 2xl:h-144 2xl:w-288 xl:h-120 xl:w-240 self-center rounded-lg drop-shadow-all flex flex-row">
                <div id="container_esquerda" className="bg-verde-padrao h-full w-30per rounded-l-lg flex flex-col ">
                    <img src={logo_extensa} alt="Logo da Manuall por extensa" className='2xl:w-60 xl:w-52 2xl:mt-12 xl:mt-10 self-center' />
                    <p className='2xl:text-4xl xl:text-2xl  font-bold text-white w-full text-start 2xl:pl-10 xl:pl-14 self-center 2xl:leading-relaxed 2xl:mt-10 xl:mt-8'>Ainda não possui<br />uma conta?</p>
                    <p className='2xl:text-2xl xl:text-xl   text-white w-full text-start 2xl:pl-10 xl:pl-14 self-center 2xl:leading-relaxed 2xl:mt-0 xl:mt-3'>Cadastre-se por aqui.</p>
                    <button className='bg-white font-normal text-verde-escuro-1 2xl:text-2xl xl:text-xl self-center 2xl:w-64 2xl:h-14 xl:w-48 xl:h-12 rounded-full xl:mt-28' onClick={routeChangeToCadastroContratante}>Cadastre-se</button>
                    <button className='2xl:text-2xl xl:text-xl font-bold text-white self-center leading-relaxed 2xl:mt-11 xl:mt-9 flex items-center'> <ChevronDoubleLeftIcon className='2xl:h-10 2xl:w-10 xl:h-8 xl:w-8' /> Voltar à Tela inicial</button>
                </div>
                <div id='container_direita' className='bg-white h-full w-70per rounded-r-lg flex flex-col'>
                    <div id='container_titulo' className='w-full flex flex-col text-center'>
                        <p className='text-verde-padrao font-extrabold text-6xl mt-14'>Bem-vindo de volta!</p>
                        <p className='text-verde-padrao font-extrabold text-2xl mt-2'>Acesse a sua conta agora mesmo.</p>
                    </div>
                    <div id="container_inputs" className="2xl:h-96 2xl:w-96  xl:w-80 rounded-lg  self-center flex 2xl:justify-center flex-col 2xl:gap-10 xl:gap-8 2xl:mt-0 xl:mt-10">

                        <div class="relative">
                            <input type="text" id="email_inp" class="block px-2.5 pb-2.5 pt-4 w-full 2xl:text-sm xl:text-xs text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer" placeholder=" " />
                            <label for="cep_inp" class="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><EnvelopeIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Endereço de email</label>
                        </div>
                        <div class="relative">
                            <input type="text" id="senha_inp" class="block px-2.5 pb-2.5 pt-4 w-full 2xl:text-sm xl:text-xs text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer" placeholder=" " />
                            <label for="cidade_inp" class="absolute xl:text-lg 2xl:text-xl  text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><LockClosedIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Senha</label>
                        </div>


                    </div>
                    <div id="container_esqueci_senha" className="w-full flex justify-center">
                        <Link to={''} className='text-center text-verde-padrao font-medium underline'>Esqueci minha senha</Link>
                    </div>
                    <div id="container_entrar" className="w-full flex justify-center">
                        <button className="bg-verde-escuro-2 2xl:w-40 2xl:h-12 xl:w-32 xl:h-10 rounded-full 2xl:text-2xl xl:text-xl 2xl:mt-14 xl:mt-10 font-semibold text-white ">Entrar</button>
                    </div>
                </div>





            </div>
        </div>
    );
}

export default Login;