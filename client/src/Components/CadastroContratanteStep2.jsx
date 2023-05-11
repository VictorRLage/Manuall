import React from 'react';
import { MapIcon } from '@heroicons/react/24/solid'
import { MapPinIcon } from '@heroicons/react/24/solid'
import { BuildingOffice2Icon } from '@heroicons/react/24/solid'
import { HomeIcon } from '@heroicons/react/24/solid'
import { HomeModernIcon } from '@heroicons/react/24/solid'
import { BuildingLibraryIcon } from '@heroicons/react/24/solid'
import { HashtagIcon } from '@heroicons/react/24/solid'
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'
import logo_extensa from '../assets/img/logo_manuall_extensa.png'



function CadastroContratanteStep2(props) {
    return (
        <div id='container' className="bg-white 2xl:h-200 2xl:w-288 xl:h-184 xl:w-240 self-center rounded-lg drop-shadow-all flex flex-row">
            <div id="container_esquerda" className="bg-verde-padrao h-full w-30per rounded-l-lg flex flex-col ">
                <img src={logo_extensa} alt="Logo da Manuall por extensa" className='2xl:w-60 xl:w-52 2xl:mt-12 xl:mt-10 self-center' />
                <p className='2xl:text-4xl xl:text-2xl  font-bold text-white 2xl:w-48 xl:w-32 self-center 2xl:leading-relaxed 2xl:mt-10 xl:mt-8'>Cadastro de Contratante</p>
                <div className='flex flex-col 2xl:mt-80 xl:mt-96 '>
                    <p className='2xl:text-2xl xl:text-xl  font-semibold text-white 2xl:w-55.5 xl:w-48 self-center 2xl:leading-relaxed '>Já possui uma conta?</p>
                    <button className='2xl:text-2xl xl:text-xl font-bold text-white underline'>Entre aqui</button>
                    <button className='2xl:text-2xl xl:text-xl font-bold text-white self-center leading-relaxed 2xl:mt-15 xl:mt-13 flex items-center'> <ChevronDoubleLeftIcon className='2xl:h-10 2xl:w-10 xl:h-8 xl:w-8' /> Voltar à Tela inicial</button>
                </div>
            </div>

            <div id='container_direita' className='flex flex-col w-70per'>
                <div id="container_steps" className="flex 2xl:h-16 xl:h-14 w-full justify-center items-center mt-8">
                    <div id="step_1" className="bg-verde-padrao rounded-full 2xl:h-12 2xl:w-12 xl:h-10 xl:w-10"></div>
                    <div id="linha" className="bg-verde-padrao h-1 2xl:w-14 xl:w-10"></div>
                    <div id="step_2" className="bg-white border-4 border-verde-padrao rounded-full 2xl:h-12 2xl:w-12 xl:h-10 xl:w-10 "></div>
                </div>
                <div id="container-inputs" className="rounded-lg  self-center grid grid-cols-14x18  justify-center items-center gap-10 p-10">

                    <label htmlFor="cep_inp" className="2xl:text-2xl xl:text-xl text-verde-padrao font-extrabold flex items-center"><MapPinIcon className='2xl:h-8 2xl:w-8 xl:h-6 xl:w-6 mr-3' /> Cep:</label>
                    <input id="cep_inp" type="zip" className="2xl:h-10 xl:h-9 border-4 border-verde-padrao rounded-lg" />
                    <label htmlFor="cidade_inp" className="2xl:text-2xl xl:text-xl text-verde-padrao font-extrabold flex items-center"><BuildingOffice2Icon className='2xl:h-8 2xl:w-8 xl:h-6 xl:w-6 mr-3' /> Cidade:</label>
                    <input id="cidade_inp" type="text" className="2xl:h-10 xl:h-9 border-4 border-verde-padrao rounded-lg" />
                    <label htmlFor="estado_inp" className="2xl:text-2xl xl:text-xl text-verde-padrao font-extrabold flex items-center"><BuildingLibraryIcon className='2xl:h-8 2xl:w-8 xl:h-6 xl:w-6 mr-3' /> Estado:</label>
                    <input id="estado_inp" type="text" className="2xl:h-10 xl:h-9 border-4 border-verde-padrao rounded-lg" />
                    <label htmlFor="bairro_inp" className="2xl:text-2xl xl:text-xl text-verde-padrao font-extrabold flex items-center"><HomeModernIcon className='2xl:h-8 2xl:w-8 xl:h-6 xl:w-6 mr-3' />Bairro:</label>
                    <input id="bairro_inp" type="text" className="2xl:h-10 xl:h-9 border-4 border-verde-padrao rounded-lg" />
                    <label htmlFor="rua_inp" className="2xl:text-2xl xl:text-xl text-verde-padrao font-extrabold flex items-center "><HomeIcon className='2xl:h-8 2xl:w-8 xl:h-6 xl:w-6 mr-3' />Rua:</label>
                    <input id="rua_inp" type="text" className="2xl:h-10 xl:h-9  border-4 border-verde-padrao rounded-lg" />
                    <label htmlFor="numero_inp" className="2xl:text-2xl xl:text-xl text-verde-padrao font-extrabold flex items-center"><MapIcon className='2xl:h-8 2xl:w-8 xl:h-6 xl:w-6 mr-3' />Número:</label>
                    <input id="numero_inp" type="text" className="2xl:h-10 xl:h-9 border-4 border-verde-padrao rounded-lg" />
                    <label htmlFor="complemento_inp" className="2xl:text-2xl xl:text-xl text-verde-padrao font-extrabold flex items-center"><HashtagIcon className='2xl:h-8 2xl:w-8 xl:h-6 xl:w-6 mr-3' />Complemento:</label>
                    <input id="complemento_inp" type="text" className="2xl:h-10 xl:h-9 border-4 border-verde-padrao rounded-lg" />


                </div>
                <div id="container_finalizar" className="w-full h-10 flex justify-end ">
                    <button className="bg-verde-escuro-2 w-40 h-12 rounded-full 2xl:text-2xl xl:text-xl 2xl:mr-13 xl:mr-12 mt-3 font-semibold text-white ">Finalizar</button>
                </div>
            </div>

        </div>


    );
}

export default CadastroContratanteStep2;