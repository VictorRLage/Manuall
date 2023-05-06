import React from 'react';
import { UserIcon } from '@heroicons/react/24/solid'
import { EnvelopeIcon } from '@heroicons/react/24/solid'
import { IdentificationIcon } from '@heroicons/react/24/solid'
import { LockClosedIcon } from '@heroicons/react/24/solid'
import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid'
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'
import  logo_extensa from '../assets/img/logo_manuall_extensa.png'

function CadastroStep1(props) {
    return (
<div className="flex justify-center h-screen font-mukta">
      <div id="container" className="bg-white h-hcadastro w-wcadastro self-center rounded-lg drop-shadow-all flex flex-row">
        <div id="container-esquerda" className="bg-white h-full w-70per rounded-l-lg flex flex-col gap-2 justify-center">
          <div id="container-steps" className="flex h-16 w-full justify-center items-center">
            <div id="step-1" className="bg-white border-4 border-verde-padrao rounded-full h-12 w-12 "></div>
            <div id="linha" className="bg-black h-1 w-14"></div>
            <div id="step-2" className="bg-white border-2 border-black rounded-full h-12 w-12 "></div>
          </div>
          <div id="container-inputs" className="bg-cinza-claro-2 h-hbox-inputs w-wbox-inputs rounded-lg drop-shadow-all self-center grid grid-cols-input-cadastro-step-1 grid-rows-4 justify-center items-center gap-0 p-10">

            <label htmlFor="usuario-inp" className="text-2xl text-cinza-claro-1 font-extrabold flex items-center"><UserIcon className='h-8 w-8 mr-3'/> Nome:</label>
            <input id="usuario-inp" type="text" className="h-10 drop-shadow-all-inp" />
            <label htmlFor="email-inp" className="text-2xl text-cinza-claro-1 font-extrabold flex items-center"><EnvelopeIcon className='h-8 w-8 mr-3'/> E-mail:</label>
            <input id="email-inp" type="text" className="h-10 drop-shadow-all-inp" />
            <label htmlFor="cpf-inp" className="text-2xl text-cinza-claro-1 font-extrabold flex items-center"><IdentificationIcon className='h-8 w-8 mr-3'/> CPF:</label>
            <input id="cpf-inp" type="text" className="h-10 drop-shadow-all-inp" />
            <label htmlFor="senha-inp" className="text-2xl text-cinza-claro-1 font-extrabold flex items-center"><LockClosedIcon className='h-8 w-8 mr-3'/> Senha:</label>
            <input id="senha-inp" type="text" className="h-10 drop-shadow-all-inp" />

          </div>
          <div id="container-proximo" className="w-full h-10 flex justify-end">
            <button className="text-4xl mr-16 mt-8 font-semibold text-verde-padrao flex items-center">Próximo <ChevronDoubleRightIcon className='h-10 w-10'/></button>
          </div>

        </div>
        <div id="container-direita" className="bg-verde-padrao h-full w-30per rounded-r-lg flex flex-col">
            <img src={logo_extensa} alt="Logo da Manuall por extensa" className='w-logo mt-12 self-center'/>
            <p className='text-4xl font-bold text-white w-48 self-center leading-relaxed mt-10'>Cadastro de Contratante</p>
            <p className='text-2xl font-semibold text-white w-55.5 self-center leading-relaxed mt-32'>Já possui uma conta?</p>
            <button className='text-2xl'>Entre aqui</button>
            <button className='text-2xl font-bold text-white self-center leading-relaxed mt-12 flex items-center'> <ChevronDoubleLeftIcon className='h-10 w-10'/> Voltar à Tela inicial</button>
        </div>

      </div>
    </div>
    );
}

export default CadastroStep1;