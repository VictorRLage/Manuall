import React from 'react';
import logo_extensa from '../assets/img/logo_manuall_extensa.png'
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'


function Login() {
    return (
        <div className='flex justify-center h-screen font-mukta'>
            <div id='container' className="bg-white 2xl:h-144 2xl:w-288 xl:h-120 xl:w-240 self-center rounded-lg drop-shadow-all flex flex-row">
                <div id="container_esquerda" className="bg-verde-padrao h-full w-30per rounded-l-lg flex flex-col ">
                    <img src={logo_extensa} alt="Logo da Manuall por extensa" className='2xl:w-60 xl:w-52 2xl:mt-12 xl:mt-10 self-center' />
                    <p className='2xl:text-4xl xl:text-2xl  font-bold text-white w-full text-start 2xl:pl-10 xl:pl-14 self-center 2xl:leading-relaxed 2xl:mt-10 xl:mt-8'>Ainda não possui<br />uma conta?</p>
                    <p className='2xl:text-2xl xl:text-xl   text-white w-full text-start 2xl:pl-10 xl:pl-14 self-center 2xl:leading-relaxed 2xl:mt-0 xl:mt-3'>Cadastre-se por aqui.</p>
                    <button className='bg-white font-normal text-verde-escuro-1 2xl:text-2xl xl:text-xl self-center 2xl:w-64 2xl:h-14 xl:w-48 xl:h-12 rounded-full xl:mt-10'>Contratante</button>
                    <button className='bg-white font-normal text-verde-escuro-1 2xl:text-2xl xl:text-xl self-center 2xl:w-64 2xl:h-14 xl:w-48 xl:h-12 rounded-full xl:mt-4'>Prestador</button>
                    <button className='2xl:text-2xl xl:text-xl font-bold text-white self-center leading-relaxed 2xl:mt-11 xl:mt-11 flex items-center'> <ChevronDoubleLeftIcon className='2xl:h-10 2xl:w-10 xl:h-8 xl:w-8' /> Voltar à Tela inicial</button>
                </div>

                <div id='container_direita' className='flex flex-col w-70per'>
                </div>

            </div>
        </div>
    );
}

export default Login;