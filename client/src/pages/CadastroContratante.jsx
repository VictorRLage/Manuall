import { useState } from 'react'
import CadastroStep1 from '../components/cadastroContratante/CadastroContratanteStep1';
import CadastroStep2 from '../components/cadastroContratante/CadastroContratanteStep2';

function CadastroContratante(props) {

    // Botão para mudar de step
    const [step, setStep] = useState(true);
    function mudarStep() {
        setStep(!step)
    }

    return (
        <div className="flex justify-center h-screen font-mukta ">
            {step ? <CadastroStep1 mudarStep={mudarStep} /> : <CadastroStep2 />}
        </div>
    );
}

export default CadastroContratante;