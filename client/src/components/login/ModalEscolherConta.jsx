import React from 'react';

function ModalEscolherConta(props) {
    return (
        <div className='z-50 fixed h-screen w-screen bg-blur flex justify-center items-center'>
            <div className='h-72 w-100 bg-white rounded-lg flex flex-col items-center p-10'>
                <span className='text-3xl font-semibold'>Você possui duas contas.</span>
                <span className='text-2xl mt-4'>Com qual conta deseja acessar?</span>
                <div className=' flex flex-col items-center py-6 gap-4'>
                    <button onClick={() =>{props.setarUsuario(1); props.modal(false); props.entrar(true); props.check(true); props.notCheck(false)}} className='w-42 h-12 text-2xl bg-verde-padrao rounded-full text-white'>Contratante</button>
                    <button onClick={() =>{props.setarUsuario(2); props.modal(false); props.entrar(true); props.check(true); props.notCheck(false)}} className='w-42 h-12 text-2xl bg-verde-padrao rounded-full text-white'>Prestador</button>
                </div>
            </div>
        </div>
    );
}

export default ModalEscolherConta;