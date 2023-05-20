import React from 'react';
import { useState } from "react"

function EntrarFalse(props) {

    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div>
            <button onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)} className="relative bg-cinza-claro-1 2xl:w-40 2xl:h-12 xl:w-36 xl:h-12 rounded-full 2xl:text-2xl xl:text-2xl 2xl:mt-14 xl:mt-10 font-semibold text-white cursor-default">
                Entrar
                {showTooltip && (
                    <div className="absolute z-10 bg-cinza-claro-2 text-black text-base p-2 h-9 w-96 rounded-r-md shadow-lg text-center left-42 bottom-2">
                        <span>Por favor preencha o campo endereço de email.</span>
                        <div className="absolute bottom-0 right-96 w-0 h-0 border-t-[18px] border-t-transparent border-r-[18px] border-cinza-claro-2 border-b-[18px] border-b-transparent">
                        </div>
                    </div>
                )}
            </button>
        </div>
    );
}

export default EntrarFalse;