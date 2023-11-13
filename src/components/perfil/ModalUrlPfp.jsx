import { useState, useEffect } from "react";
import axios from "@/api/axios";
import ModalCustom from "@/components/main/ModalCustom";
import { ThreeDots } from "react-loader-spinner";

export default function ModalUrlPfp({
    modalGettr,
    modalSettr,
    currentPfp,
    refetch,
}) {
    const [pfp, setPfp] = useState(currentPfp);
    const [isPfpLoaded, setIsPfpLoaded] = useState(false);
    const [loading, setLoading] = useState(false);

    const alterarFtPerfil = () => {
        setLoading(true);
        axios
            .patch("/perfil/alterar/fotoPerfil", {
                novaUrl: pfp,
            })
            .then(() => {
                refetch();
                modalSettr(false);
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false);
            });
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
            <div className="w-[300px] min450:w-[400px] h-full flex flex-col items-center py-8 px-10 gap-4">
                <span className="text-2xl text-gray-900 font-semibold text-center">
                    Insira o Url da sua imagem de perfil
                </span>
                <div className="flex flex-col justify-center items-center gap-2">
                    <img
                        src={pfp}
                        alt=" "
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
                        onClick={() => {
                            isPfpLoaded && alterarFtPerfil();
                        }}
                        className={`text-2xl mt-4 ${
                            isPfpLoaded ? "bg-verde-padrao" : "bg-cinza-claro-1"
                        } rounded-full text-white w-32 h-10 flex items-center justify-center`}
                    >
                        {loading ? (
                            <ThreeDots height="20" color="#fff" />
                        ) : (
                            "Salvar"
                        )}
                    </button>
                </div>
            </div>
        </ModalCustom>
    );
}
