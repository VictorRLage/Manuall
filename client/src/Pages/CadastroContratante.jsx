import React from 'react';
import CadastroStep1 from '../Components/CadastroContratanteStep1';
import CadastroStep2 from '../Components/CadastroContratanteStep2';

function CadastroContratante(props) {
    return (
        <div className="flex justify-center h-screen font-mukta">
            <CadastroStep2 />
        </div>
    );
}

export default CadastroContratante;