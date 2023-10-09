import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { StarIcon as StarIconCheio } from "@heroicons/react/24/solid";
import { StarIcon as StarIconVazio } from "@heroicons/react/24/outline";
import Skeleton from "react-loading-skeleton";
import ModalNaoLogado from "@/components/main/ModalNaoLogado";
import defaultPfp from "@/assets/demo/default_pfp.jpg";

export default function Card({
    prestador: {
        mediaAvaliacoes,
        nome,
        id,
        anexoPfp,
        orcamentoMin,
        orcamentoMax,
        cidade,
        prestaAula,
    },
    area,
}) {
    const navigate = useNavigate();

    const [modalNaoLogado, setModalNaoLogado] = useState(false);

    const estrelas = Array.from({ length: 5 }, (_, i) => {
        const estrela = i + 1;
        return mediaAvaliacoes >= estrela ? (
            <StarIconCheio key={estrela} className="w-6 h-6 text-yellow-500" />
        ) : (
            <StarIconVazio key={estrela} className="w-6 h-6 text-yellow-500" />
        );
    });

    const verificarLogin = () => {
        if (localStorage.getItem("TOKEN")) navigate(`/prestadores/${id}`);
        else setModalNaoLogado(true);
    };

    return (
        <>
            <ModalNaoLogado
                modalGettr={modalNaoLogado}
                modalSettr={setModalNaoLogado}
            />
            <div className="w-80 rounded-3xl drop-shadow-all">
                <img
                    onError={({ target }) => (target.src = defaultPfp)}
                    src={anexoPfp}
                    alt=""
                    className="object-cover h-80 w-full rounded-t-3xl bg-verde-padrao bg-cover bg-center"
                />
                <div className="h-[45%] w-full rounded-b-3xl bg-white py-2 px-4">
                    <div className="flex flex-col">
                        <span className="text-2xl font-semibold">{nome}</span>
                        <span className="text-sl font-thin">
                            {area ? (
                                <>
                                    {area}
                                    {area[area.length - 1] !== "a" && "(a)"}
                                </>
                            ) : (
                                <Skeleton />
                            )}
                        </span>
                        <span className="text-lg font-normal mt-3">
                            R${orcamentoMin} - R${orcamentoMax}
                        </span>
                    </div>
                    <div className="flex w-full justify-between mt-4">
                        <div className="w-[45%] border-2 border-verde-padrao bg-green-100 rounded-full text-verde-padrao text-center">
                            {cidade}
                        </div>
                        <div className="w-[45%] border-2 border-verde-padrao bg-green-100 rounded-full text-verde-padrao text-center">
                            {prestaAula ? "Serviço + Aula" : "Serviço"}
                        </div>
                    </div>
                    <div className="flex space-x-1 mt-6">
                        {estrelas}
                        <span className="text-lg ml-2 font-medium">
                            {mediaAvaliacoes?.toFixed(1)}
                        </span>
                    </div>
                    <div className="flex mt-5 justify-center">
                        <button
                            className="mb-3 w-32 h-10 text-xl bg-verde-padrao rounded-full text-white font-semibold"
                            onClick={verificarLogin}
                        >
                            CONTRATAR
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
