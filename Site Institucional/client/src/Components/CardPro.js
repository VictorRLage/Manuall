import React from 'react';

function CardPro({tipo, foto ,nome, cargo}) {
    return (
        <div>
            <div className={tipo}>
                <img className='ftTime' src={foto}></img>
                <div className='nome'>{nome}</div>
                <div className='cargo'>{cargo}</div>
            </div>
        </div>
    );
}

export default CardPro;