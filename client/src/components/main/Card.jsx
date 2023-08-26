import { useNavigate } from "react-router-dom";
import { StarIcon as StarIconCheio } from "@heroicons/react/24/solid";
import { StarIcon as StarIconVazio } from "@heroicons/react/24/outline";
import Skeleton from "react-loading-skeleton";

export default function Card(props) {

    const navigate = useNavigate();

    const estrelas = Array.from({ length: 5 }, (_, i) => {
        const estrela = i + 1
        return props.mediaNota >= estrela
            ? <StarIconCheio key={estrela} className="w-4 h-4 text-yellow-500" />
            : <StarIconVazio key={estrela} className="w-4 h-4 text-yellow-500" />
    });

    const addFotoPadrao = ({ target }) =>
        target.src = "https://www.truckeradvisor.com/media/uploads/profilePics/notFound.jpg"

    return (
        <div className='w-80 h-120 rounded-3xl drop-shadow-all'>
            <img
                onError={addFotoPadrao}
                src={props.foto}
                alt=""
                className='object-cover h-[55%] w-full rounded-t-3xl bg-verde-padrao bg-cover bg-center'
            />
            <div className='h-[45%] w-full rounded-b-3xl bg-white py-2 px-4'>
                <div className='flex flex-col'>
                    <span className='text-2xl font-semibold'>
                        {props.nome}
                    </span>
                    <span className='text-xl font-thin'>
                        {props.area
                            ? <>
                                {props.area}
                                {props.area[props.area.length - 1] !== "a" && "(a)"}
                            </>
                            : <Skeleton />}
                    </span>
                    <span className='text-lg font-normal mt-1'>
                        R${props.min} - R${props.max}
                    </span>
                </div>
                <div className='flex w-full justify-between mt-1'>
                    <div className='w-[45%] bg-verde-padrao rounded-full text-white text-center'>
                        {props.cidade}
                    </div>
                    <div className='w-[45%] bg-verde-padrao rounded-full text-white text-center'>
                        {props.aula ? "Serviço + Aula" : "Serviço"}
                    </div>
                </div>
                <div id='avaliação' className='flex mt-3'>
                    {estrelas}
                    <span className='text-sm ml-2 font-medium'>
                        {props.mediaNota?.toFixed(1)}
                    </span>
                </div>
                <div className='flex mt-1 justify-center'>
                    <button className=' w-32 h-10 text-xl bg-verde-padrao rounded-full text-white font-semibold' onClick={() => { navigate("/development") }}>CONTRATAR</button>
                </div>
            </div>
        </div>
    );
}
