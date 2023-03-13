import React from 'react';

function Bloco({iconi, titulo, texto}) {
    return (
        <div className='bloco'>
            <div className='blocoCirculo'><img src={iconi}></img></div>
            <div className='blocoTitulo'><h1>{titulo}</h1></div>
            <div className='blocoTxt'><p>{texto}</p></div>
        </div>
    );
}

export default Bloco;