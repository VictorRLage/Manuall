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
    const deleteImagem = (id) => {
        axios
            .post(`/perfil/imagem/delete/${id}`)
            .then(() => {
                refetch();
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="flex flex-col pb-4 gap-4 min700:px-32 min500:px-16 px-8">
            <span className="text-3xl font-semibold text-gray-900">
                Galeria de <span className="text-verde-escuro-1">Imagens</span>
            </span>
            <div className="py-4">
                <div className="grid grid-cols-1 min500:grid-cols-2 min500:max-w-[600px] max-w-[300px] rounded-3xl overflow-hidden gap-[4px]">
                    {hasInfoLoaded
                        ? Array.from({ length: 6 }, (_, i) => (
                              <PrestadorGaleriaImg
                                  isOwnProfile={isOwnProfile}
                                  openCreateImageModal={openCreateImageModal}
                                  key={i}
                                  deleteImagem={() => {
                                      deleteImagem(prestador.imagens[i].id);
                                  }}
                                  isNextToBeUploaded={
                                      prestador.imagens.length === i
                                  }
                                  currentImg={prestador.imagens[i]?.url}
                              />
                          ))
                        : Array.from({ length: 6 }, (_, i) => (
                              <Skeleton key={i} width={300} height={150} />
                          ))}
                </div>
            </div>
        </div>
    );
}
