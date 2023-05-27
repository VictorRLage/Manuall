import React from 'react';
import { StarIcon as StarIconCheio } from '@heroicons/react/24/solid';
import { StarIcon as StarIconVazio } from '@heroicons/react/24/outline';

function Card(props) {
    return (
        <div className='w-80 h-120 rounded-3xl drop-shadow-all'>
            <div className='h-[55%] w-full rounded-t-3xl bg-verde-padrao'></div>
            <div className='h-[45%] w-full rounded-b-3xl bg-white py-2 px-4'>
                <div className='flex flex-col'>
                    <span className='text-2xl font-semibold'>Jorge Gomes</span>
                    <span className='text-xl font-medium'>Jardineiro</span>
                    <span className='text-lg font-normal mt-1'>Faixa de Preço: R$100 - R$500</span>
                </div>
                <div className='flex w-full justify-between mt-1'>
                    <div className='w-[45%] bg-verde-padrao rounded-full text-white text-center'>Santo André</div>
                    <div className='w-[45%] bg-verde-padrao rounded-full text-white text-center'>Serviço + Aula</div>
                </div>
                <div id='avaliação' className='flex mt-3'>
                    <StarIconCheio className='w-4 h-4 text-yellow-500' />
                    <StarIconCheio className='w-4 h-4 text-yellow-500' />
                    <StarIconCheio className='w-4 h-4 text-yellow-500' />
                    <StarIconCheio className='w-4 h-4 text-yellow-500' />
                    <StarIconVazio className='w-4 h-4 text-yellow-500' />
                    <span className='text-sm ml-2 font-medium'>4.0</span>
                </div>
                <div className='flex mt-1 justify-center'>
                    <button className=' w-32 h-10 text-xl bg-verde-padrao rounded-full text-white font-semibold'>CONTRATAR</button>
                </div>
            </div>
        </div>
    );
}

export default Card;