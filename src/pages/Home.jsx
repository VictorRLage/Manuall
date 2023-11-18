import axios from "@/api/axios";
import FooterWave from "@/assets/shapes/FooterWave.svg?react";
import comoContratar1 from "@/assets/storyset/como_contratar_1.png";
import comoContratar2 from "@/assets/storyset/como_contratar_2.png";
import comoContratar3 from "@/assets/storyset/como_contratar_3.png";
import comoEnsinar1 from "@/assets/storyset/como_ensinar_1.png";
import comoEnsinar2 from "@/assets/storyset/como_ensinar_2.png";
import comoEnsinar3 from "@/assets/storyset/como_ensinar_3.png";
import Header from "@/components/header/Header";
import Cards from "@/components/home/Cards";
import CarouselHome from "@/components/home/CarouselHome";
import HomeLabel from "@/components/home/HomeLabel";
import InfoCard from "@/components/home/InfoCard";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function Home() {
    const [areas, setAreas] = useState();
    const [activeArea, setActiveAtiva] = useState(0);
    const [prestadores, setPrestadores] = useState();

    const changeActiveArea = (idArea) => {
        setPrestadores();
        if (activeArea === idArea) {
            axios.get("/usuario/prestadores/0/null/false").then(({ data }) => {
                setPrestadores(data);
                setActiveAtiva(0);
            });
        } else {
            axios
                .get(`/usuario/prestadores/${idArea}/null/false`)
                .then(({ data }) => {
                    setPrestadores(data);
                    setActiveAtiva(idArea);
                });
        }
    };

    useEffect(() => {
        axios.get("/usuario/areas").then(({ data }) => setAreas(data));
        changeActiveArea(0);
    }, []);

    return (
        <>
            <Header />
            <CarouselHome />
            <div className="flex justify-center flex-col w-full bg-[#fafafa]">
                <HomeLabel>
                    Do que você{" "}
                    <span className="text-verde-padrao">precisa?</span>
                </HomeLabel>
                <div className="w-full px-16 max500:px-8 flex justify-center flex-wrap">
                    {areas
                        ? areas.map(({ id, nome }, i) => (
                              <button
                                  onClick={() => {
                                      changeActiveArea(id);
                                  }}
                                  key={i}
                                  className={`${
                                      activeArea === id
                                          ? "bg-verde-padrao text-white"
                                          : "bg-white hover:bg-[#eefff3] text-verde-padrao"
                                  }
                                    transition-all w-32 h-10 rounded-full text-xl font-semibold border-verde-padrao border-2 p-6 flex justify-center items-center m-3`}
                              >
                                  {nome}
                              </button>
                          ))
                        : Array.from({ length: 6 }).map((_, i) => (
                              <div key={i} className="w-32 h-[52px] m-3">
                                  <Skeleton
                                      height={"100%"}
                                      borderRadius={"9999px"}
                                  />
                              </div>
                          ))}
                </div>
                <Cards
                    areas={areas}
                    prestadores={prestadores?.slice(0, 6)}
                    isHome
                />
                <HomeLabel>
                    Como <span className="text-verde-padrao">contratar?</span>
                </HomeLabel>
                <div className="min500:px-16 px-8 flex flex-wrap justify-center gap-20 self-center">
                    <InfoCard img={comoContratar1}>
                        Cadastre-se e{" "}
                        <span className="text-verde-padrao font-semibold">
                            pesquise
                        </span>{" "}
                        pelo prestador que{" "}
                        <span className="text-verde-padrao font-semibold">
                            você precisa!
                        </span>
                    </InfoCard>
                    <InfoCard img={comoContratar2}>
                        Faça{" "}
                        <span className="text-verde-padrao font-semibold">
                            a sua escolha
                        </span>{" "}
                        e solicite o serviço (+ aula, se você quiser) em apenas
                        3 etapas!
                    </InfoCard>
                    <InfoCard img={comoContratar3}>
                        Termine de negociar pelo chat e pronto! Seu{" "}
                        <span className="text-verde-padrao font-semibold">
                            prestador (e professor)
                        </span>{" "}
                        irá até você!
                    </InfoCard>
                </div>
                <HomeLabel>
                    Como <span className="text-verde-padrao">ensinar?</span>
                </HomeLabel>
                <div className="min500:px-16 px-8 flex flex-wrap justify-center gap-20 self-center">
                    <InfoCard img={comoEnsinar1}>
                        Cadastre-se e converse conosco para sua{" "}
                        <span className="text-verde-padrao font-semibold">
                            aprovação!
                        </span>
                    </InfoCard>
                    <InfoCard img={comoEnsinar2}>
                        Compre seu{" "}
                        <span className="text-verde-padrao font-semibold">
                            plano{" "}
                        </span>{" "}
                        e monte seu perfil!
                    </InfoCard>
                    <InfoCard img={comoEnsinar3}>
                        Receba solicitações de{" "}
                        <span className="text-verde-padrao font-semibold">
                            serviço (e ensino)
                        </span>{" "}
                        e negocie pelo chat!
                    </InfoCard>
                </div>
            </div>
            <footer className="overflow-hidden bg-[#fafafa]">
                <FooterWave />
            </footer>
        </>
    );
}
