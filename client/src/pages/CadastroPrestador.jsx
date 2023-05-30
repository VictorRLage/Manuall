import React from 'react';
import { useState } from 'react'
import CadastroPrestadorStep1 from '../components/cadastroPrestador/CadastroPrestadorStep1';
import CadastroPrestadorStep2 from '../components/cadastroPrestador/CadastroPrestadorStep2';
import CadastroPrestadorStep3 from '../components/cadastroPrestador/CadastroPrestadorStep3';

function CadastroPrestador(props) {

        // Botão para mudar de step
        const [step, setStep] = useState(1);
        function passarStep() {
            console.log('passou')
            setStep(step + 1)
        }


    return (
        <div className="flex justify-center h-screen font-mukta">
            {step === 1 ? <CadastroPrestadorStep1 passarStep={passarStep} /> : step === 2 ? <CadastroPrestadorStep2 passarStep={passarStep} /> : step === 3 ? <CadastroPrestadorStep3 passarStep={passarStep} /> : null}
        </div>
    );
}

export default CadastroPrestador;