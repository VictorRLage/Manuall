import ModalCustom from "@/components/main/ModalCustom";
import { useNavigate } from "react-router-dom";
import { UserIcon, ChartBarIcon, SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function ModalConfiguracao({
  modalGettr,
  modalSettr,
}) {
  const navigate = useNavigate();

  return (
    <ModalCustom
      modalGettr={modalGettr}
      modalSettr={modalSettr}
      canClose={true}
    >
      <div className="bg-white w-112 h-88 flex flex-col items-center rounded-lg bg-cover bg-center">

        <div className="h-[33%] w-full flex justify-center items-center text-verde-escuro-1 text-3xl font-bold">
          Configurações
        </div>

        <button
          className="bg-verde-escuro-1 text-white w-72 h-12 rounded-full mb-2 font-semibold flex justify-start items-center px-6 space-x-4"
          onClick={() => navigate("/perfil")}
        >
          <UserIcon className="w-6 h-6 mr-2" />
          Perfil
        </button>

        <button
          className="bg-verde-escuro-1 text-white w-72 h-12 rounded-full mb-2 font-semibold flex justify-start items-center px-6 space-x-4"
          onClick={() => navigate("/dashboard")}
        >
          <ChartBarIcon className="w-6 h-6 mr-2" />
          Dashboard
        </button>

        <div className="bg-verde-escuro-1 text-white w-72 h-12 rounded-full mb-2 font-semibold flex justify-between items-center px-6">
          <span class="text-xl">Modo Noturno</span>
          <label class="relative flex items-center group">
            <input type="checkbox" class="absolute z-10 w-12 h-6 peer appearance-none rounded-md" />
            <span class="relative w-12 h-6 flex items-center p-0 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-6 after:h-6 after:bg-verde-switch after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1" style={{ boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.5)" }}>
              <SunIcon className="absolute z-0 left-0.5 w-5 h-5 text-yellow-300" />
              <MoonIcon className="absolute z-0 right-0.5 w-5 h-5 peer-checked:opacity-0 text-gray-600" />
            </span>
          </label>
        </div>


      </div>
    </ModalCustom>
  );
}