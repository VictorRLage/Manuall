import defaultPfp from "@/assets/demo/default_pfp.jpg";
import ImageAddIcon from "@/assets/icons/image_add.png";
import {
    PencilSquareIcon,
    StarIcon as StarIconVazio,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconCheio } from "@heroicons/react/24/solid";
import Skeleton from "react-loading-skeleton";

export default function PrestadorCard({
    hasInfoLoaded,
    isOwnProfile,
    prestador,
    setModalUrlPfp,
}) {
    const mediaAvaliacoes =
        prestador?.avaliacoes.reduce((acc, { nota }) => acc + nota, 0) /
        prestador?.avaliacoes.length;

    const estrelas = Array.from({ length: 5 }, (_, i) => {
        const estrela = i + 1;
        return mediaAvaliacoes >= estrela ? (
            <StarIconCheio key={estrela} className="w-6 h-6 text-yellow-500" />
        ) : (
            <StarIconVazio key={estrela} className="w-6 h-6 text-yellow-500" />
        );
    });

    return (
        <>
            {hasInfoLoaded ? (
                prestador?.pfp ? (
                    <div
                        className="bg-cover bg-center bg-no-repeat h-30 w-30 rounded-3xl relative"
                        style={{
                            backgroundImage: `url(${prestador?.pfp}), url(${defaultPfp})`,
                        }}
                    >
                        {isOwnProfile && (
                            <button
                                onClick={() => setModalUrlPfp(true)}
                                className="absolute bg-verde-padrao text-center w-8 h-8 rounded-full -right-1 -top-1"
                            >
                                <PencilSquareIcon className="text-white h-[1.25rem] w-[1.25rem] m-auto" />
                            </button>
                        )}
                    </div>
                ) : isOwnProfile ? (
                    <div
                        onClick={() => setModalUrlPfp(true)}
                        className="cursor-pointer bg-center bg-no-repeat h-30 w-30 rounded-3xl border-verde-padrao border-4"
                        style={{
                            backgroundImage: `url(${ImageAddIcon})`,
                            backgroundSize: "80%",
                        }}
                    />
                ) : (
                    <div
                        className="bg-cover bg-center bg-no-repeat h-30 w-30 rounded-3xl"
                        style={{
                            backgroundImage: `url(${defaultPfp})`,
                        }}
                    />
                )
            ) : (
                <Skeleton height={120} width={120} borderRadius={20} />
            )}
            <span className="mt-2 font-bold m-auto text-3xl text-center">
                {hasInfoLoaded ? prestador?.nome : <Skeleton width={200} />}
            </span>
            {hasInfoLoaded ? (
                <>
                    <div className="flex m-auto mt-2">
                        {estrelas}
                        <span className="text-lg ml-2">
                            {mediaAvaliacoes.toFixed(1)}
                        </span>
                    </div>
                    <span className="m-auto text-cinza-claro-3">
                        {prestador?.avaliacoes.length} avaliações
                    </span>
                </>
            ) : (
                <>
                    <Skeleton width={180} height={20} />
                    <Skeleton width={120} height={20} />
                </>
            )}
            <div className="grid grid-cols-2 py-4">
                <div className="w-fit flex flex-col">
                    <span>Preço:</span>
                    <span>Estado:</span>
                    <span>Cidade:</span>
                </div>
                <div className="w-fit flex flex-col">
                    {hasInfoLoaded ? (
                        <>
                            <span>
                                R${prestador?.orcamentoMin} - R$
                                {prestador?.orcamentoMax}
                            </span>
                            <span>{prestador?.estado}</span>
                            <span>{prestador?.cidade}</span>
                        </>
                    ) : (
                        <>
                            <span>
                                <Skeleton width={100} />
                            </span>
                            <span>
                                <Skeleton width={100} />
                            </span>
                            <span>
                                <Skeleton width={100} />
                            </span>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
