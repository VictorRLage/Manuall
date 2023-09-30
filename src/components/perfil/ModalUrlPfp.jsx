import { useState, useEffect } from "react";
import axios from "@/api/axios";
import ModalCustom from "@/components/main/ModalCustom";

export default function ModalUrlPfp({ modalGettr, modalSettr, currentPfp }) {
    const [pfp, setPfp] = useState(currentPfp);
    const [isPfpLoaded, setIsPfpLoaded] = useState(false);

    const alterarFtPerfil = () => {
        axios
            .patch("/perfil/alterar/fotoPerfil", {
                novaUrl: pfp,
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        setPfp(currentPfp);
    }, [currentPfp]);

    return (
        <ModalCustom
            modalGettr={modalGettr}
            modalSettr={modalSettr}
            canClose={true}
        >
            <div className="w-full h-full flex flex-col items-center py-8 px-10 gap-4">
                <span className="text-2xl text-gray-900 font-semibold text-center">
                    Insira o Url da sua imagem de perfil
                </span>
                <div className="flex flex-col justify-center items-center gap-2">
                    <img
                        src={pfp}
                        onLoad={() => setIsPfpLoaded(true)}
                        onError={() => setIsPfpLoaded(false)}
                        className="object-cover h-52 w-52 rounded-3xl border-none bg-gray-200"
                    />
                    <textarea
                        className="border-cinza-claro-3 border-2 text-gray-900 rounded-lg"
                        value={pfp}
                        onChange={({ target }) => setPfp(target.value)}
                    />
                    <button
                        onClick={alterarFtPerfil}
                        className={`text-2xl mt-4 ${
                            isPfpLoaded ? "bg-verde-padrao" : "bg-cinza-claro-1"
                        } rounded-full text-white px-4 py-1`}
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </ModalCustom>
    );
}
