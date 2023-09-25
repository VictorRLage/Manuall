import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { StarIcon as StarIconCheio } from "@heroicons/react/24/solid";
import { StarIcon as StarIconVazio } from "@heroicons/react/24/outline";
import slugify from "slugify";
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
            <StarIconCheio key={estrela} className="w-4 h-4 text-yellow-500" />
        ) : (
            <StarIconVazio key={estrela} className="w-4 h-4 text-yellow-500" />
        );
    });

    const verificarLogin = () => {
        if (localStorage.getItem("TOKEN") === null) {
            const slug = slugify(nome, { lower: true });
            localStorage.PRESTADOR_SLUG = slug;
            localStorage.PRESTADOR_INTERESSE = id;
            setModalNaoLogado(true);
        } else {
            const slug = slugify(nome, { lower: true });
            navigate(`/prestadores/${slug}`, { state: { id } });
        }
    };

    return (
        <>
            <ModalNaoLogado
                modalGettr={modalNaoLogado}
                modalSettr={setModalNaoLogado}
            />
            <div className="w-80 h-120 rounded-3xl drop-shadow-all">
                <img
                    onError={({ target }) => (target.src = defaultPfp)}
                    src={anexoPfp}
                    alt=""
                    className="object-cover h-[55%] w-full rounded-t-3xl bg-verde-padrao bg-cover bg-center"
                />
                <div className="h-[45%] w-full rounded-b-3xl bg-white py-2 px-4">
                    <div className="flex flex-col">
                        <span className="text-2xl font-semibold">{nome}</span>
                        <span className="text-xl font-thin">
                            {area ? (
                                <>
                                    {area}
                                    {area[area.length - 1] !== "a" && "(a)"}
                                </>
                            ) : (
                                <Skeleton />
                            )}
                        </span>
                        <span className="text-lg font-normal mt-1">
                            R${orcamentoMin} - R${orcamentoMax}
                        </span>
                    </div>
                    <div className="flex w-full justify-between mt-1">
                        <div className="w-[45%] bg-verde-padrao rounded-full text-white text-center">
                            {cidade}
                        </div>
                        <div className="w-[45%] bg-verde-padrao rounded-full text-white text-center">
                            {prestaAula ? "Serviço + Aula" : "Serviço"}
                        </div>
                    </div>
                    <div className="flex mt-2">
                        {estrelas}
                        <span className="text-sm ml-2 font-medium">
                            {mediaAvaliacoes?.toFixed(1)}
                        </span>
                    </div>
                    <div className="flex mt-1 justify-center">
                        <button
                            className="w-32 h-10 text-xl bg-verde-padrao rounded-full text-white font-semibold"
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
