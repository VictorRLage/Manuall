import { useState } from "react";

export default function PrestadorAvaliacoes({ avaliacoes }) {

    const [currentAssessment, setCurrentAssessment] = useState([]);

    const nextAssessment = () => {
        setCurrentAssessment(currentAssessment + 1);
    };
    
    return (
        <div className="h-80 w-full">
            <div>
                {avaliacoes?.map(({ nome, nota, descricao }, i) => (
                    <div key={i}>
                        {nome}
                        {nota}
                        {descricao}
                    </div>
                ))}
            </div>
        </div>
    );
}