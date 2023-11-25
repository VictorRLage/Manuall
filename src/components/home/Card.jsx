import defaultPfp from "@/assets/demo/default_pfp.jpg";
import { StarIcon as StarIconVazio } from "@heroicons/react/24/outline";
import { StarIcon as StarIconCheio } from "@heroicons/react/24/solid";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

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
    openModalNaoLogado,
}) {
    const navigate = useNavigate();

    const estrelas = Array.from({ length: 5 }, (_, i) => {
        const estrela = i + 1;
        return mediaAvaliacoes >= estrela ? (
            <StarIconCheio key={estrela} className="w-6 h-6 text-yellow-500" />
        ) : (
            <StarIconVazio key={estrela} className="w-6 h-6 text-yellow-500" />
        );
    });

    const verificarLogin = () => {
        if (localStorage.getItem("TOKEN")) navigate(`/perfil/${id}`);
        else openModalNaoLogado();
    };

    return (
        <div
            className="w-80 rounded-3xl drop-shadow-xl hover:scale-102 transition-transform"
            onClick={verificarLogin}
        >
            <img
                onError={({ target }) => (target.src = defaultPfp)}
                src={anexoPfp}
                alt=""
                className="object-cover h-80 w-full rounded-t-3xl bg-verde-padrao bg-cover bg-center"
            />
            <div className="w-full rounded-b-3xl bg-white pt-2 pb-4 px-6 flex flex-col gap-4">
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
                </div>
                <span className="text-lg font-normal">
                    R${orcamentoMin} - R${orcamentoMax}
                </span>
                <div className="flex w-full justify-between">
                    <div className="w-[47%] border-[1px] flex items-center justify-center border-verde-padrao bg-green-50 rounded-full text-verde-padrao text-center">
                        {cidade}
                    </div>
                    <div className="w-[47%] border-[1px] flex items-center justify-center border-verde-padrao bg-green-50 rounded-full text-verde-padrao text-center">
                        {prestaAula ? "Serviço + Aula" : "Serviço"}
                    </div>
                </div>
                <div className="flex space-x-1">
                    {estrelas}
                    <span className="text-lg font-medium">
                        {mediaAvaliacoes?.toFixed(1)}
                    </span>
                </div>
                <div className="flex justify-center">
                    <button className="px-6 py-2 text-xl bg-verde-padrao hover:bg-green-400 transition-colors rounded-full text-white font-semibold">
                        CONTRATAR
                    </button>
                </div>
            </div>
        </div>
    );
}
