import React from 'react';

function CadastroContratanteStep2(props) {
    return (
        <div id='container' className='bg-white 2xl:h-144 2xl:w-288 xl:h-120 xl:w-240 self-center rounded-lg drop-shadow-all flex flex-col'>

            <div id="container_steps" className="flex 2xl:h-16 xl:h-14 w-full justify-center items-center mt-8">
                <div id="step_1" className="bg-verde-padrao rounded-full 2xl:h-12 2xl:w-12 xl:h-10 xl:w-10"></div>
                <div id="linha" className="bg-verde-padrao h-1 2xl:w-14 xl:w-10"></div>
                <div id="step_2" className="bg-white border-4 border-verde-padrao rounded-full 2xl:h-12 2xl:w-12 xl:h-10 xl:w-10 "></div>
            </div>
            <div id="container-inputs" className="2xl:h-96 2xl:w-144 xl:h-72 rounded-lg  self-center grid grid-cols-10x20x10x20 grid-rows-4  justify-center items-center gap-0 p-10">

                <label htmlFor="cep_inp" className="2xl:text-2xl xl:text-xl text-verde-padrao font-extrabold flex items-center"> Cep:</label>
                <input id="cep_inp" type="zip" className="2xl:h-10 xl:h-9 2xl:w-72 xl:w-64 border-4 border-verde-padrao rounded-lg" />
                <label htmlFor="cidade_inp" className="2xl:text-2xl xl:text-xl text-verde-padrao font-extrabold flex items-center"> Cidade:</label>
                <input id="cidade_inp" type="text" className="2xl:h-10 xl:h-9 2xl:w-72 xl:w-64 border-4 border-verde-padrao rounded-lg" />
                <label htmlFor="estado_inp" className="2xl:text-2xl xl:text-xl text-verde-padrao font-extrabold flex items-center"> Estado:</label>
                <input id="estado_inp" type="text" className="2xl:h-10 xl:h-9 2xl:w-72 xl:w-64 border-4 border-verde-padrao rounded-lg" />
                <label htmlFor="bairro_inp" className="2xl:text-2xl xl:text-xl text-verde-padrao font-extrabold flex items-center">Bairro:</label>
                <input id="bairro_inp" type="text" className="2xl:h-10 xl:h-9 2xl:w-72 xl:w-64 border-4 border-verde-padrao rounded-lg" />
                <label htmlFor="rua_inp" className="2xl:text-2xl xl:text-xl text-verde-padrao font-extrabold flex items-center ">Rua:</label>
                <input id="rua_inp" type="text" className="2xl:h-10 xl:h-9 2xl:w-176 xl:w-168 border-4 border-verde-padrao rounded-lg col-span-3" />
                <label htmlFor="numero_inp" className="2xl:text-2xl xl:text-xl text-verde-padrao font-extrabold flex items-center">Número:</label>
                <input id="numero_inp" type="text" className="2xl:h-10 xl:h-9 2xl:w-72 xl:w-64 border-4 border-verde-padrao rounded-lg" />
                <label htmlFor="complemento_inp" className="2xl:text-2xl xl:text-xl text-verde-padrao font-extrabold flex items-center">Complemento:</label>
                <input id="complemento_inp" type="text" className="2xl:h-10 xl:h-9 2xl:w-72 xl:w-64 border-4 border-verde-padrao rounded-lg" />

            </div>
            <div id="container_botoes" className="w-full h-10 flex flex-row">
            <button className="2xl:text-4xl xl:text-2xl mr-16 mt-8 font-semibold text-verde-padrao flex items-center">Próximo</button>
            <button className="2xl:text-4xl xl:text-2xl mr-16 mt-8 font-semibold text-verde-padrao flex items-center">Próximo</button>
          </div>

        </div>

    );
}

export default CadastroContratanteStep2;