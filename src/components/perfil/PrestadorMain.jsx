import axios from "@/api/axios";
import PerfilBg from "@/assets/shapes/PerfilBg.png";
import Breadcrumb from "@/components/main/Breadcrumb";
import Dynamic from "@/components/main/Dynamic";
import PrestadorCard from "@/components/perfil/PrestadorCard";
import { useData } from "@/data/CreateContext";
import { Fragment } from "react";
import Skeleton from "react-loading-skeleton";
import ContratarButtons from "@/components/perfil/ContratarButtons";

export default function PrestadorMain({
    prestador,
    hasInfoLoaded,
    isOwnProfile,
    setModalUrlPfp,
    setModalSolicitacao,
    setIncluiAula,
    refetch,
    descricao,
}) {
    const { windowWidth } = useData();

    const alterarDesc = () => {
        axios
            .patch("/perfil/alterar/desc", {
                descricao: descricao.value,
            })
            .then(refetch)
            .catch(console.log);
    };

    return (
        <div
            className={`flex flex-col bg-no-repeat min700:px-32 min500:px-16 pb-16`}
            style={{
                backgroundSize: "100% 100%",
                backgroundImage: `url(${PerfilBg})`,
            }}
        >
            <div className="py-6 max500:flex max500:items-center max500:justify-center max500:text-center max500:bg-[#bde5be] max500:px-8">
                <Breadcrumb
                    items={
                        isOwnProfile
                            ? [
                                  {
                                      to: "/",
                                      desc: "Página Inicial",
                                  },
                                  { to: null, desc: "Perfil" },
                              ]
                            : [
                                  {
                                      to: "/",
                                      desc: "Página Inicial",
                                  },
                                  {
                                      to: "/prestadores?pagina=1",
                                      desc: "Prestadores",
                                  },
                                  {
                                      to: null,
                                      desc: prestador?.nome,
                                      loading: !hasInfoLoaded,
                                  },
                              ]
                    }
                />
            </div>
            <div className="flex grow">
                <Dynamic
                    tag={windowWidth > 1000 ? Fragment : "div"}
                    className="flex flex-col items-center justify-center p-5 w-full drop-shadow-all bg-white min500:rounded-lg"
                >
                    <Dynamic
                        tag={windowWidth > 1000 ? Fragment : "div"}
                        className="flex items-center justify-center max700:flex-col-reverse max700:gap-8"
                    >
                        <div className="min1000:w-[50%] min700:w-[48%] max700:px-8">
                            <div className="flex gap-2 flex-wrap max700:justify-center">
                                <div className="text-2xl px-5 py-1 bg-verde-escuro-1 font-semibold text-white rounded-full drop-shadow-xl">
                                    {hasInfoLoaded ? (
                                        `Serviço${
                                            prestador.prestaAula
                                                ? " + Aula"
                                                : ""
                                        }`
                                    ) : (
                                        <Skeleton width={100} />
                                    )}
                                </div>
                                <div className="text-2xl px-5 py-1 bg-verde-escuro-1 font-semibold text-white rounded-full drop-shadow-xl">
                                    {hasInfoLoaded ? (
                                        prestador.area
                                    ) : (
                                        <Skeleton width={100} />
                                    )}
                                </div>
                            </div>
                            {hasInfoLoaded ? (
                                isOwnProfile ? (
                                    <textarea
                                        onBlur={alterarDesc}
                                        value={descricao.value}
                                        onChange={({ target }) =>
                                            descricao.set(target.value)
                                        }
                                        className="my-6 p-2 outline-none w-full rounded-lg border border-gray-300 h-[200px]"
                                        placeholder="Escreva sua descrição aqui..."
                                        maxLength={400}
                                    />
                                ) : (
                                    <p className="my-6 p-2 text-lg w-full">
                                        {prestador.descricao}
                                    </p>
                                )
                            ) : (
                                <Skeleton className="my-6 p-2" height={200} />
                            )}
                        </div>
                        {windowWidth <= 1000 && windowWidth > 700 && (
                            <div className="bg-gray-300 w-[2px] h-[90%] mx-4" />
                        )}
                        <Dynamic
                            tag={windowWidth > 1000 ? "div" : Fragment}
                            className="w-[50%] flex justify-end"
                        >
                            <div className="flex flex-col items-center min1000:p-5 min1000:bg-white min1000:w-[21rem] min1000:rounded-lg min1000:drop-shadow-all min700:w-[48%] max700:px-8">
                                <PrestadorCard
                                    hasInfoLoaded={hasInfoLoaded}
                                    isOwnProfile={isOwnProfile}
                                    prestador={prestador}
                                    setModalUrlPfp={setModalUrlPfp}
                                />
                                {windowWidth > 1000 && (
                                    <ContratarButtons
                                        hasInfoLoaded={hasInfoLoaded}
                                        isOwnProfile={isOwnProfile}
                                        prestaAula={prestador?.prestaAula}
                                        setModalSolicitacao={
                                            setModalSolicitacao
                                        }
                                        setIncluiAula={setIncluiAula}
                                    />
                                )}
                            </div>
                        </Dynamic>
                    </Dynamic>
                    {windowWidth <= 1000 && (
                        <ContratarButtons
                            hasInfoLoaded={hasInfoLoaded}
                            isOwnProfile={isOwnProfile}
                            prestaAula={prestador?.prestaAula}
                            setModalSolicitacao={setModalSolicitacao}
                            setIncluiAula={setIncluiAula}
                        />
                    )}
                </Dynamic>
            </div>
        </div>
    );
}
