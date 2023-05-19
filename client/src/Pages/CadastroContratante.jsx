import React from 'react';
import CadastroStep1 from '../components/CadastroContratanteStep1';
import CadastroStep2 from '../components/CadastroContratanteStep2';

function CadastroContratante(props) {
    return (
        <div className="flex justify-center h-screen font-mukta ">
            <CadastroStep2 />
        </div>
    );
}

export default CadastroContratante;