import { useNavigate } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/24/solid";

export default function ModalEscolherCadastro(props) {

    const navigate = useNavigate();

    return (
        <div className='z-50 fixed h-screen w-screen bg-blur flex justify-center items-center'>
            <div className='relative h-64 w-100 bg-white rounded-lg flex flex-col items-center p-6'>
                <div onClick={() =>{props.modal()}} className='cursor-pointer absolute top-0 right-0'><XCircleIcon className='w-9 h-9 text-verde-padrao' /></div>
                <span className='text-3xl font-semibold text-center'>Deseja realizar <br />o cadastro como?</span>
                <div className=' flex flex-col items-center py-4 gap-4'>
                    <button onClick={() => { navigate("/cadastroContratante") }} className='w-42 h-12 text-2xl bg-verde-padrao rounded-full text-white'>Contratante</button>
                    <button onClick={() => { navigate("/cadastroPrestador") }} className='w-42 h-12 text-2xl bg-verde-padrao rounded-full text-white'>Prestador</button>
                </div>
            </div>
        </div>
    );
}
