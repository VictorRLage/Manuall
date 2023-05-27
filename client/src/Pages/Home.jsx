import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import Header from "../components/main/Header";
import { useEffect, useState } from "react";
import axiosInstance from "../api/AxiosConfig";
import Card from "../components/main/Card";

function Home(props) {
    const slides = [
        {
            url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
        },
        {
            url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
        },
        {
            url: 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [areas, setAreas] = useState([]);
    const [prestadores, setPrestadores] = useState([]);


    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    const getAreas = () => {
        console.log("Buscando areas")
        axiosInstance.get("/usuario/areas", {
        }).then((res) => {
            setAreas(res.data)
        })
    }



    const getPrestadores = () => {
        console.log("Buscando todos prestadores")
        axiosInstance.get("/usuario/prestadores", {
        }).then((res) => {
            setPrestadores(res.data)
        })
    }

    const getPrestadoresByArea = (idArea) => {
        console.log("Buscando todos prestadores")
        axiosInstance.get(`/usuario/prestadores/${idArea}`, {
        }).then((res) => {
            setPrestadores(res.data)
        })
    }

    useEffect(() => {
        getAreas()
        getPrestadores()
    }, [])

    return (
        <div>
            <Header pag={'inicio'} />
            <div className='w-full h-full'>
                <div id='container_carousel' className="group">
                    <div style={{ backgroundImage: `url(${slides[currentIndex].url})` }} className='w-full h-120 bg-center bg-cover duration-500'>

                        <div className="flex flex-row justify-between">

                            <div onClick={prevSlide} id='seta_direita' className="mt-48 cursor-pointer hidden group-hover:block ">
                                <ChevronLeftIcon className="text-white w-16 h-16" />
                            </div>
                            <div onClick={nextSlide} id='seta_esquerda' className="mt-48 right-0 cursor-pointer hidden group-hover:block ">
                                <ChevronRightIcon className="text-white w-16 h-16" />
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <div className='hidden group-hover:flex cursor-pointer w-24 mt-48 justify-between '>
                                <div onClick={() => goToSlide(0)} style={{ backgroundColor: currentIndex === 0 ? "#00CC69" : "white" }} className="w-6 h-6 bg-white border-2 border-verde-padrao rounded-full "></div>
                                <div onClick={() => goToSlide(1)} style={{ backgroundColor: currentIndex === 1 ? "#00CC69" : "white" }} className="w-6 h-6 bg-white border-2 border-verde-padrao rounded-full "></div>
                                <div onClick={() => goToSlide(2)} style={{ backgroundColor: currentIndex === 2 ? "#00CC69" : "white" }} className="w-6 h-6 bg-white border-2 border-verde-padrao rounded-full "></div>
                            </div>
                        </div>

                    </div>

                </div>
                <div id="container_filtro_cards" className="flex justify-center flex-col w-full">
                    <div id="titulo" className="p-12 text-5xl font-semibold text-center">O que você <span className="text-verde-padrao">precisa?</span></div>
                    <div id="botoes" className="w-full flex justify-between px-32">
                        {
                            areas.slice(0, 6).map(function (data, i) {
                                return (
                                    <button onClick={() =>{getPrestadoresByArea(data.id)}} className="w-32 h-10 bg-verde-padrao rounded-full text-xl text-white font-semibold " key={i}>{data.nome}</button>
                                )
                            })
                        }
                    </div>
                    <div id="cards" className="px-16 mt-12 grid grid-cols-3 gap-20 self-center">
                        {
                            prestadores.slice(0, 6).map(function (data, i) {
                                return (
                                    <Card key={i} nome={data.nome} cidade={data.cidade} foto={data.anexoPfp} area={data.idArea} min={data.orcamentoMin} max={data.orcamentoMax} aula={data.prestaAula} mediaNota={data.mediaAvaliacoes}/>
                                )
                            })
                        }

                    </div>

                </div>
                <div id="container_contratar" className="w-full flex p-32  flex-col">
                    <div className="w-full text-6xl font-semibold text-center">Como <span className="text-verde-padrao">contratar?</span></div>
                    <div id="conteiner_contratar" className=" mt-12 grid grid-cols-3 grid-rows-1 gap-20 self-center">
                        <div className='w-80 h-120 rounded-3xl drop-shadow-all'>
                            <div className='h-[60%] w-full rounded-t-3xl bg-white py-12'>
                                <img src='https://i.imgur.com/tLVE79n.png' alt="" />
                            </div>
                            <div className='h-[40%] w-full rounded-b-3xl bg-white py-14 px-6 text-center'>
                                <span className='text-2xl font-medium'>Cadastre-se e <span className="text-verde-padrao font-semibold">pesquise</span> pelo prestador que <span className="text-verde-padrao font-semibold">você precisa!</span></span>
                            </div>
                        </div>

                        <div className='w-80 h-120 rounded-3xl drop-shadow-all'>
                            <div className='h-[60%] w-full rounded-t-3xl bg-white py-12'>
                                <img src='https://i.imgur.com/cOE0Z8a.png' alt="" />
                            </div>
                            <div className='h-[40%] w-full rounded-b-3xl bg-white py-14 px-6 text-center'>
                                <span className='text-2xl font-medium'>Faça <span className="text-verde-padrao font-semibold">a sua escolha</span> e solicite o serviço (+ aula, se você quiser) em apenas 3 etapas!</span>
                            </div>
                        </div>

                        <div className='w-80 h-120 rounded-3xl drop-shadow-all'>
                            <div className='h-[60%] w-full rounded-t-3xl bg-white py-12'>
                                <img src='https://i.imgur.com/vAR85g2.png' alt="" />
                            </div>
                            <div className='h-[40%] w-full rounded-b-3xl bg-white py-14 px-6 text-center'>
                                <span className='text-2xl font-medium'>Termine de negociar pelo chat e pronto! Seu <span className="text-verde-padrao font-semibold">prestador (e professor)</span> irá até você!</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="container_ensinar" className=" w-full flex px-32 flex-col">
                    <div className="w-full text-6xl font-semibold text-center">Como <span className="text-verde-padrao">ensinar?</span></div>
                    <div id="conteiner_contratar" className=" mt-12 grid grid-cols-3 grid-rows-1 gap-20 self-center">
                        <div className='w-80 h-120 rounded-3xl drop-shadow-all'>
                            <div className='h-[60%] w-full rounded-t-3xl bg-white py-12'>
                                <img src='https://i.imgur.com/23p0hm6.png' alt="" />
                            </div>
                            <div className='h-[40%] w-full rounded-b-3xl bg-white py-14 px-6 text-center'>
                                <span className='text-2xl font-medium'>Cadastre-se e converse conosco para sua <span className="text-verde-padrao font-semibold">aprovação!</span></span>
                            </div>
                        </div>

                        <div className='w-80 h-120 rounded-3xl drop-shadow-all'>
                            <div className='h-[60%] w-full rounded-t-3xl bg-white py-12'>
                                <img src='https://i.imgur.com/bHeWCih.png' alt="" />
                            </div>
                            <div className='h-[40%] w-full rounded-b-3xl bg-white py-14 px-6 text-center'>
                                <span className='text-2xl font-medium'>Compre seu <span className="text-verde-padrao font-semibold">plano </span> e monte seu perfil!</span>
                            </div>
                        </div>

                        <div className='w-80 h-120 rounded-3xl drop-shadow-all'>
                            <div className='h-[60%] w-full rounded-t-3xl bg-white py-12'>
                                <img src='https://i.imgur.com/up9fCD3.png' alt="" />
                            </div>
                            <div className='h-[40%] w-full rounded-b-3xl bg-white py-14 px-6 text-center'>
                                <span className='text-2xl font-medium'>Receba solicitações de <span className="text-verde-padrao font-semibold">serviço (e ensino)</span>  e negocie pelo chat!</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="w-full relative">
                <svg className="absolute" width="100%" height="288" viewBox="0 0 1920 288" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_701_17813)">
                        <path d="M0 352C0 365.807 10.8338 377 24.6409 377C168.22 377 907.084 377 1387 377C1733.96 377 1858.45 377 1903.09 377C1916.89 377 1928 365.807 1928 352V0.5V0.5C1928 12.575 1918.74 22.5535 1906.69 23.2898C1769.2 31.6889 1001.18 79.8099 618.065 129.441C249.565 177.178 53.1672 59.4728 9.44733 28.9888C3.32833 24.7222 0 17.6802 0 10.2206V4.49988V352Z" fill="#008042" />
                    </g>
                    <defs>
                        <filter id="filter0_d_701_17813" x="-4" y="0.5" width="1936" height="384.5" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="4" />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_701_17813" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_701_17813" result="shape" />
                        </filter>
                    </defs>
                </svg>




            </footer>
        </div>
    );
}

export default Home;