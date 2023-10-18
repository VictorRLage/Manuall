import React, { useState } from 'react';
import ModalCustom from "@/components/main/ModalCustom";
import { useNavigate } from "react-router-dom";
import { UserIcon, ChartBarIcon, SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function ModalConfiguracao({
  modalGettr,
  modalSettr,
}) {
  const navigate = useNavigate();
  const [isNightMode, setIsNightMode] = useState(false);

  const handleNightModeToggle = () => {
    setIsNightMode(!isNightMode);
  };

  return (
    <ModalCustom
      modalGettr={modalGettr}
      modalSettr={modalSettr}
      canClose={true}
      blurBackgroundStyle={{
          zIndex: "600",
      }}
      modalBackgroundStyle={{
          zIndex: "601",
      }}
    >
      <div className="bg-white w-112 h-88 flex flex-col items-center rounded-lg bg-cover bg-center">

        <div className="h-[33%] w-full flex justify-center items-center text-verde-escuro-1 text-3xl font-bold">
          Acessibilidade
        </div>

        <div className="bg-verde-escuro-1 text-white w-72 h-12 rounded-full mb-2 font-semibold flex justify-between items-center px-6">
          <span className="text-xl">Modo Noturno</span>
          <label className="relative flex items-center group">
            <input type="checkbox" className="absolute z-10 w-12 h-6 appearance-none rounded-md" onChange={handleNightModeToggle} checked={isNightMode} />
            <span className={`relative w-12 h-6 flex items-center p-0 rounded-full duration-300 ease-in-out after:w-6 after:h-6 after:bg-white after:rounded-full after:shadow-md after:duration-300 ${isNightMode ? 'bg-verde-switch after:translate-x-6' : 'bg-slate-300 after:translate-x-0'} ${!isNightMode ? 'group-hover:after:translate-x-1' : ''}`} style={{ boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.5)" }}>
              <SunIcon className={`absolute left-1 w-5 h-5 ${isNightMode ? 'opacity-0' : 'text-verde-switch'}`} />
              <MoonIcon className={`absolute right-1 w-5 h-5 ${isNightMode ? 'text-verde-switch' : 'opacity-0'}`} />
            </span>
          </label>
        </div>
        
        <div className="bg-verde-escuro-1 text-white w-72 h-28 rounded-3xl mb-2 font-semibold flex flex-col justify-start items-center p-4">
          <span className="text-xl mb-2">Modo Daltonismo</span>
          <select 
            className="bg-slate-300 text-verde-escuro-1 text-md font-bold border-none px-4 py-2 rounded-full cursor-pointer focus:outline-none focus:border-none"
            onChange={(e) => console.log(e.target.value)} 
          >
            <option className='font-bold' value="normal">Normal</option>
            <option className='font-bold' value="deuteranopia">Deuteranopia</option>
            <option className='font-bold' value="protanopia">Protanopia</option>
            <option className='font-bold' value="tritanopia">Tritanopia</option>
          </select>
        </div>
      </div>
    </ModalCustom>
  );
}