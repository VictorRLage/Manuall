import { XCircleIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";
import axios from "@/api/axios";

export default function ModalLink({ modal }) {
    const urlImagem = useRef("");

    const alterarFtPerfil = () => {
        axios
            .patch("/perfil/alterar/fotoPerfil", {
                novaUrl: urlImagem.current.value,
            })
            .then(window.location.reload)
            .catch((err) => console.log(err));
    };

    return (
        <div className="z-50 fixed h-screen w-screen top-0 bg-blur flex justify-center items-center">
            <div className="relative h-42 w-120 bg-white rounded-lg flex flex-col items-center p-6">
                <div
                    onClick={modal}
                    className="cursor-pointer absolute top-0 right-0"
                >
                    <XCircleIcon className="w-9 h-9 text-verde-padrao" />
                </div>
                <span className="text-3xl font-semibold text-center">
                    Insira o URL da imagem
                </span>
                <div className="flex  items-center gap-4">
                    <div className="mb-6">
                        <input
                            className="bg-gray-50 mt-6 border-cinza-claro-3 border-2 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            ref={urlImagem}
                        />
                    </div>
                    <button
                        onClick={alterarFtPerfil}
                        className="w-24 h-10 text-xl bg-verde-padrao rounded-full text-white"
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
}
