import { useState } from "react";
import CadastroStep1 from "@/components/cadastroContratante/CadastroContratanteStep1";
import CadastroStep2 from "@/components/cadastroContratante/CadastroContratanteStep2";

export default function CadastroContratante() {

    // Botão para mudar de step
    const [step, setStep] = useState(true);
    function mudarStep() {
        setStep(!step)
    }

    return (
        <div className="font-mukta">
            {step ?
                <CadastroStep1 mudarStep={mudarStep} />
                : <CadastroStep2 />}
        </div>
    );
}
