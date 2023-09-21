import { useState } from "react";
import PrestadorFase1 from "@/components/cadastro/PrestadorFase1";
import PrestadorFase2 from "@/components/cadastro/PrestadorFase2";
import Fase3 from "@/components/cadastro/Fase3";

export default function CadastroPrestador() {
    const [step, setStep] = useState(1);
    function passarStep() {
        console.log("passou");
        setStep(step + 1);
    }

    return (
        <div className="flex justify-center h-screen font-mukta">
            {step === 1 ? (
                <PrestadorFase1 passarStep={passarStep} />
            ) : step === 2 ? (
                <PrestadorFase2 passarStep={passarStep} />
            ) : step === 3 ? (
                <Fase3 passarStep={passarStep} />
            ) : null}
        </div>
    );
}
