import { useData } from "@/data/CreateContext";
import axios from "@/api/axios";
import PrestadorGaleriaImg from "@/components/perfil/PrestadorGaleriaImg";
import Skeleton from "react-loading-skeleton";

export default function PrestadorGaleria({
    hasInfoLoaded,
    prestador,
    isOwnProfile,
    refetch,
    openCreateImageModal,
}) {
    const { windowWidth } = useData();

    const deleteImagem = (url) => {
        axios
            .post("/perfil/imagem/delete", { imagem: url })
            .then(() => {
                refetch();
            })
            .catch((err) => console.log(err));
    };

    return (
        <div
            className={`flex flex-col pb-4 gap-4 ${
                windowWidth < 700
                    ? windowWidth < 500
                        ? "px-8"
                        : "px-16"
                    : "px-32"
            }`}
        >
            <span className="text-3xl font-semibold text-gray-900">
                Galeria de <span className="text-verde-escuro-1">Imagens</span>
            </span>
            <div className="py-4">
                <div
                    className={`flex flex-wrap ${
                        windowWidth <= 1180
                            ? windowWidth <= 876
                                ? "max-w-[302px]"
                                : "max-w-[606px]"
                            : "max-w-[910px]"
                    } rounded-3xl overflow-hidden gap-[4px]`}
                >
                    {hasInfoLoaded
                        ? Array.from({ length: 6 }, (_, i) => (
                              <PrestadorGaleriaImg
                                  isOwnProfile={isOwnProfile}
                                  openCreateImageModal={openCreateImageModal}
                                  key={i}
                                  deleteImagem={deleteImagem}
                                  isNextToBeUploaded={
                                      prestador.imagens.length === i
                                  }
                                  currentImg={prestador.imagens[i]}
                              />
                          ))
                        : Array.from({ length: 6 }, (_, i) => (
                              <Skeleton width={300} height={150} />
                          ))}
                </div>
            </div>
        </div>
    );
}
