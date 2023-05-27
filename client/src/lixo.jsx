import React from 'react';

function lixo(props) {
    return (
        <div>
            <div className='relative col-span-2 flex flex-col'>
                    <p className='text-4xl font-semibold'>Deseja ensinar? <span className='text-xl font-normal text-slate-500 '>*você irá encinar enquanto executa seu serviço.</span></p>
                    <div className='flex flex-row mt-6 justify-between'>
                        <div className="block min-h-6">
                            <label className='flex items-center'>
                                <input id='1' className="w-5 h-5 ease-soft text-base rounded-md  checked:bg-verde-padrao after:text-base relative cursor-pointer appearance-none border-2 border-solid checked:outline outline-offset-2 outline-2 outline-verde-padrao border-slate-400 bg-white  after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-[''] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100" type="checkbox" />
                                <label htmlFor='1' className="cursor-pointer select-none text-slate-700 ml-2 text-2xl">Sim, quero ensinar também.</label>
                            </label>
                        </div>
                        <div className="block min-h-6">
                            <label className='flex items-center'>
                                <input id='2' className="w-5 h-5 ease-soft text-base rounded-md  checked:bg-verde-padrao after:text-base relative cursor-pointer appearance-none border-2 border-solid checked:outline outline-offset-2 outline-2 outline-verde-padrao border-slate-400 bg-white  after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-[''] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100" type="checkbox" />
                                <label htmlFor='2' className="cursor-pointer select-none text-slate-700 ml-2 text-2xl">Não, quero apenas executar.</label>
                            </label>
                        </div>
                    </div>
                </div>

                <div className='relative col-span-2 flex flex-col'>
                    <p className='text-2xl font-semibold'>Qual a faixa de preço dos seus serviços? <span className='text-xl font-normal text-slate-500 '>*caso ensinar, considere o valor de aula também.</span></p>
                    <div className='flex flex-row mt-6 justify-between'>
                        <div className="relative w-96">
                            <input type="text" id="complemento_inp" className="block px-2.5 pb-2.5 pt-4 w-full 2xl:text-sm xl:text-xs text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer" placeholder=" " />
                            <label htmlFor="complemento_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><HashtagIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Complemento</label>
                        </div>
                        <div className="relative w-96">
                            <input type="text" id="complemento_inp" className="block px-2.5 pb-2.5 pt-4 w-full 2xl:text-sm xl:text-xs text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer" placeholder=" " />
                            <label htmlFor="complemento_inp" className="absolute xl:text-xl 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><HashtagIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Complemento</label>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default lixo;