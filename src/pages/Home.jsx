import Header from "@/components/header/Header";
import { useEffect, useState } from "react";
import axios from "@/api/axios";
import Skeleton from "react-loading-skeleton";
import FooterWave from "@/assets/shapes/FooterWave.svg?react";
import comoContratar1 from "@/assets/storyset/como_contratar_1.png";
import comoContratar2 from "@/assets/storyset/como_contratar_2.png";
import comoContratar3 from "@/assets/storyset/como_contratar_3.png";
import comoEnsinar1 from "@/assets/storyset/como_ensinar_1.png";
import comoEnsinar2 from "@/assets/storyset/como_ensinar_2.png";
import comoEnsinar3 from "@/assets/storyset/como_ensinar_3.png";
import Carousel from "@/components/home/Carousel";
import Cards from "@/components/home/Cards";

export default function Home() {
    const [areas, setAreas] = useState();
    const [activeArea, setActiveAtiva] = useState(0);
    const [prestadores, setPrestadores] = useState();

    const changeActiveArea = (idArea) => {
        setPrestadores();
        if (activeArea === idArea) {
            axios.get("/usuario/prestadores").then(({ data }) => {
                setPrestadores(data);
                setActiveAtiva(0);
            });
        } else {
            axios.get(`/usuario/prestadores/${idArea}`).then(({ data }) => {
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
            <Carousel />
            <div className="flex justify-center flex-col w-full">
                <div className="p-12 text-5xl font-semibold text-gray-900 text-center">
                    Do que você{" "}
                    <span className="text-verde-padrao">precisa?</span>
                </div>
                <div className="w-full px-16 flex justify-center flex-wrap">
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
            </div>
            <div className="w-full flex p-32  flex-col">
                <div className="w-full text-6xl font-semibold text-center">
                    Como <span className="text-verde-padrao">contratar?</span>
                </div>
                <div className=" mt-12 grid grid-cols-3 grid-rows-1 gap-20 self-center">
                    <div className="w-80 h-120 rounded-3xl drop-shadow-all">
                        <div className="h-[60%] w-full rounded-t-3xl bg-white py-12">
                            <img src={comoContratar1} alt="" />
                        </div>
                        <div className="h-[40%] w-full rounded-b-3xl bg-white py-14 px-6 text-center">
                            <span className="text-2xl font-medium">
                                Cadastre-se e{" "}
                                <span className="text-verde-padrao font-semibold">
                                    pesquise
                                </span>{" "}
                                pelo prestador que{" "}
                                <span className="text-verde-padrao font-semibold">
                                    você precisa!
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="w-80 h-120 rounded-3xl drop-shadow-all">
                        <div className="h-[60%] w-full rounded-t-3xl bg-white py-12">
                            <img src={comoContratar2} alt="" />
                        </div>
                        <div className="h-[40%] w-full rounded-b-3xl bg-white py-14 px-6 text-center">
                            <span className="text-2xl font-medium">
                                Faça{" "}
                                <span className="text-verde-padrao font-semibold">
                                    a sua escolha
                                </span>{" "}
                                e solicite o serviço (+ aula, se você quiser) em
                                apenas 3 etapas!
                            </span>
                        </div>
                    </div>
                    <div className="w-80 h-120 rounded-3xl drop-shadow-all">
                        <div className="h-[60%] w-full rounded-t-3xl bg-white py-12">
                            <img src={comoContratar3} alt="" />
                        </div>
                        <div className="h-[40%] w-full rounded-b-3xl bg-white py-14 px-6 text-center">
                            <span className="text-2xl font-medium">
                                Termine de negociar pelo chat e pronto! Seu{" "}
                                <span className="text-verde-padrao font-semibold">
                                    prestador (e professor)
                                </span>{" "}
                                irá até você!
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" w-full flex px-32 flex-col">
                <div className="w-full text-6xl font-semibold text-center">
                    Como <span className="text-verde-padrao">ensinar?</span>
                </div>
                <div className=" mt-12 grid grid-cols-3 grid-rows-1 gap-20 self-center">
                    <div className="w-80 h-120 rounded-3xl drop-shadow-all">
                        <div className="h-[60%] w-full rounded-t-3xl bg-white py-12">
                            <img src={comoEnsinar1} alt="" />
                        </div>
                        <div className="h-[40%] w-full rounded-b-3xl bg-white py-14 px-6 text-center">
                            <span className="text-2xl font-medium">
                                Cadastre-se e converse conosco para sua{" "}
                                <span className="text-verde-padrao font-semibold">
                                    aprovação!
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="w-80 h-120 rounded-3xl drop-shadow-all">
                        <div className="h-[60%] w-full rounded-t-3xl bg-white py-12">
                            <img src={comoEnsinar2} alt="" />
                        </div>
                        <div className="h-[40%] w-full rounded-b-3xl bg-white py-14 px-6 text-center">
                            <span className="text-2xl font-medium">
                                Compre seu{" "}
                                <span className="text-verde-padrao font-semibold">
                                    plano{" "}
                                </span>{" "}
                                e monte seu perfil!
                            </span>
                        </div>
                    </div>
                    <div className="w-80 h-120 rounded-3xl drop-shadow-all">
                        <div className="h-[60%] w-full rounded-t-3xl bg-white py-12">
                            <img src={comoEnsinar3} alt="" />
                        </div>
                        <div className="h-[40%] w-full rounded-b-3xl bg-white py-14 px-6 text-center">
                            <span className="text-2xl font-medium">
                                Receba solicitações de{" "}
                                <span className="text-verde-padrao font-semibold">
                                    serviço (e ensino)
                                </span>{" "}
                                e negocie pelo chat!
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="overflow-hidden">
                <FooterWave />
            </footer>
        </>
    );
}
