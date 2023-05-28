import React, { useEffect, useState } from 'react';
import { StarIcon as StarIconCheio } from '@heroicons/react/24/solid';
import { StarIcon as StarIconVazio } from '@heroicons/react/24/outline';
import axiosInstance from '../../api/AxiosConfig';

function Card(props) {

    const [area, setArea] = useState('');


    const getNomeAreaById = async (idArea) => {
        try {
            const response = await axiosInstance.get("/usuario/areas");
            const area = response.data.find(e => e.id === idArea);
            if (area) {
                // console.log("Nome da área encontrada:", area.nome);
                setArea(area.nome);
            } else {
                // console.log("Área não encontrada");
                setArea('Area não encontrada');
            }
        } catch (error) {
            console.error("Erro ao buscar o nome da área:", error);
            setArea(null);
        }
    };

    useEffect(() => {
        getNomeAreaById(props.area)
    }, []) // eslint-disable-line

    return (
        <div className='w-80 h-120 rounded-3xl drop-shadow-all'>
            <div style={{ backgroundImage: `url(${props.foto})` }} className='h-[55%] w-full rounded-t-3xl bg-verde-padrao bg-cover bg-center' ></div>
            <div className='h-[45%] w-full rounded-b-3xl bg-white py-2 px-4'>
                <div className='flex flex-col'>
                    <span className='text-2xl font-semibold'>{props.nome}</span>
                    <span className='text-xl font-medium'>{area}(a)</span>
                    <span className='text-lg font-normal mt-1'>Faixa de Preço: R$ {props.min} - R$ {props.max}</span>
                </div>
                <div className='flex w-full justify-between mt-1'>
                    <div className='w-[45%] bg-verde-padrao rounded-full text-white text-center'>{props.cidade}</div>
                    <div className='w-[45%] bg-verde-padrao rounded-full text-white text-center'>{props.aula ? "Serviço + Aula" : "Serviço"}</div>
                </div>
                <div id='avaliação' className='flex mt-3'>
                    {props.mediaNota >= 1 ? <StarIconCheio className='w-4 h-4 text-yellow-500' /> : <StarIconVazio className='w-4 h-4 text-yellow-500' />}
                    {props.mediaNota >= 2 ? <StarIconCheio className='w-4 h-4 text-yellow-500' /> : <StarIconVazio className='w-4 h-4 text-yellow-500' />}
                    {props.mediaNota >= 3 ? <StarIconCheio className='w-4 h-4 text-yellow-500' /> : <StarIconVazio className='w-4 h-4 text-yellow-500' />}
                    {props.mediaNota >= 4 ? <StarIconCheio className='w-4 h-4 text-yellow-500' /> : <StarIconVazio className='w-4 h-4 text-yellow-500' />}
                    {props.mediaNota === 5 ? <StarIconCheio className='w-4 h-4 text-yellow-500' /> : <StarIconVazio className='w-4 h-4 text-yellow-500' />}
                    <span className='text-sm ml-2 font-medium'>{() => { props.mediaNota.toFixed(1) }}</span>
                </div>
                <div className='flex mt-1 justify-center'>
                    <button className=' w-32 h-10 text-xl bg-verde-padrao rounded-full text-white font-semibold'>CONTRATAR</button>
                </div>
            </div>
        </div>
    );
}

export default Card