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
        <div id='container' className="bg-white 2xl:h-144 2xl:w-288 xl:h-120 xl:w-240 self-center rounded-lg drop-shadow-all flex flex-ro">
            <div id="container_esquerda" className="bg-verde-padrao h-full w-30per rounded-l-lg flex flex-col ">
                <img src={logo_extensa} alt="Logo da Manuall por extensa" className='2xl:w-60 xl:w-52 2xl:mt-12 xl:mt-10 self-center' />
                <p className='2xl:text-6xl xl:text-4xl  font-bold text-white 2xl:w-48 xl:w-48 self-center 2xl:leading-relaxed 2xl:mt-10 xl:mt-20'>Cadastro de Contratante</p>
                <div className='flex flex-col 2xl:mt-80 xl:mt-64 '>
                    <p className='2xl:text-2xl xl:text-xl  font-semibold text-white 2xl:w-55.5 xl:w-48 self-center 2xl:leading-relaxed '>Já possui uma conta?</p>
                    <button className='2xl:text-2xl xl:text-xl font-bold text-white underline'>Entre aqui</button>
                    <button className='2xl:text-2xl xl:text-xl font-bold text-white self-center leading-relaxed 2xl:mt-15 xl:mt-28   flex items-center'> <ChevronDoubleLeftIcon className='2xl:h-10 2xl:w-10 xl:h-8 xl:w-8' /> Voltar à Tela inicial</button>
                </div>
            </div>

            <div id='container_direita' className='flex flex-col w-70per'>
                <div id="container_steps" className="flex 2xl:h-16 xl:h-14 w-full justify-center items-center mt-8">
                    <div id="step_1" className="bg-verde-padrao rounded-full 2xl:h-12 2xl:w-12 xl:h-10 xl:w-10"></div>
                    <div id="linha" className="bg-verde-padrao h-1 2xl:w-14 xl:w-10"></div>
                    <div id="step_2" className="bg-white border-4 border-verde-padrao rounded-full 2xl:h-12 2xl:w-12 xl:h-10 xl:w-10 "></div>
                </div>
                <div id="container-inputs" className="rounded-lg  self-center grid 2xl:grid-cols-16x16 xl:grid-cols-16x16  justify-center items-center gap-10 p-10">


                    <div class="relative">
                        <input type="text" id="cep_inp" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer" placeholder=" " />
                        <label for="cep_inp" class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><MapPinIcon className='2xl:h-6 2xl:w-6 xl:h-4 xl:w-4 mr-2' />Cep</label>
                    </div>
                    <div class="relative">
                        <input type="text" id="cidade_inp" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer" placeholder=" " />
                        <label for="cidade_inp" class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><BuildingOffice2Icon className='2xl:h-6 2xl:w-6 xl:h-4 xl:w-4 mr-2' />Cidade</label>
                    </div>
                    <div class="relative">
                        <input type="text" id="estado_inp" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer" placeholder=" " />
                        <label for="estado_inp" class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><BuildingLibraryIcon className='2xl:h-6 2xl:w-6 xl:h-4 xl:w-4 mr-2' />Estado</label>
                    </div>
                    <div class="relative">
                        <input type="text" id="bairro_inp" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer" placeholder=" " />
                        <label for="bairro_inp" class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><HomeModernIcon className='2xl:h-6 2xl:w-6 xl:h-4 xl:w-4 mr-2' />Bairro</label>
                    </div>
                    <div class="relative">
                        <input type="text" id="rua_inp" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer" placeholder=" " />
                        <label for="rua_inp" class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><MapIcon className='2xl:h-6 2xl:w-6 xl:h-4 xl:w-4 mr-2' />Rua</label>
                    </div>
                    <div class="relative">
                        <input type="text" id="numero_inp" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer" placeholder=" " />
                        <label for="numero_inp" class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><HomeIcon className='2xl:h-6 2xl:w-6 xl:h-4 xl:w-4 mr-2' />Número</label>
                    </div>
                    <div class="relative">
                        <input type="text" id="complemento_inp" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer" placeholder=" " />
                        <label for="complemento_inp" class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><HashtagIcon className='2xl:h-6 2xl:w-6 xl:h-4 xl:w-4 mr-2' />Complemento</label>
                    </div>




                </div>
                <div id="container_finalizar" className="w-full h-10 flex justify-end ">
                    <button className="bg-verde-escuro-2 w-40 h-12 rounded-full 2xl:text-2xl xl:text-xl 2xl:mr-13 xl:mr-12 mt-3 font-semibold text-white ">Finalizar</button>
                </div>
            </div>

        </div>


    );
}

export default CadastroContratanteStep2;