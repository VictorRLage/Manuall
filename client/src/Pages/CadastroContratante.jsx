import { useState } from 'react'
import CadastroStep1 from '../components/cadastroContratante/CadastroContratanteStep1';
import CadastroStep2 from '../components/cadastroContratante/CadastroContratanteStep2';
import ModalAviso from "../components/main/ModalAviso"

function CadastroContratante(props) {

    const [modal, plotarModal] = useState(false)

    // Botão para mudar de step
    const [step, setStep] = useState(true);
    function mudarStep() {
        setStep(!step)
    }

    return (
        <div className="flex justify-center h-screen font-mukta ">
            {step ? <CadastroStep1 mudarStep={mudarStep} /> : <CadastroStep2 />}
            <button onClick={() => { plotarModal(true) }} className='bg-gray-300 h-5' >botao de teste de modal</button>
            <ModalAviso
                errorTitulo={"Credenciais invalidas"}
                errorMsg={"Por favor tente novamente"}
                errorType={404}
                maxSegundosEmTela={60000}
                modal={{ modal: modal, plotarModal: plotarModal }}
            />
        </div>
    );
}

export default CadastroContratante;