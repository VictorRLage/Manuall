import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { StarIcon as StarIconCheio } from "@heroicons/react/24/solid";
import { StarIcon as StarIconVazio } from "@heroicons/react/24/outline";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import Header from "@/components/header/Header";
import axios from "@/api/AxiosConfig";
import ModaisSolicitacaoServico from "@/components/solicitacao/ModaisSolicitacaoServico";

// 2. Define the component function
export default function PerfilVisaoContratanate(props) {

    const [prestador, setPrestador] = useState({});
    const [servicos, setServicos] = useState([]);
    const [avaliacoesData, setAvaliacoesData] = useState([]);
    const [imagens, setImagens] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [modaisSolicitacao, setModaisSolicitacao] = useState(false)

    const getInfoPrestador = () => {
        if (localStorage.getItem("TOKEN") === null) {
            navigate("/inicio");
        }

        const receivedId = location.state?.id;
        if (!receivedId) {
            navigate("/")
        } else {
            axios.get(`/perfil/${receivedId}`)
                .then((res) => {
                    setPrestador(res.data);
                    console.log(res.data)
                    setServicos(res.data.servicos);
                    setAvaliacoesData(res.data.avaliacoes);
                    setImagens(res.data.imagens)
                });
        }
    }

    // const verificarPrestador = () = >{
    //     if
    // }

    useEffect(() => {
        getInfoPrestador();
        // window.scrollTo(0, 0);
    }, []);

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    const scrollThreshold = 100;
    const translateYValue = scrollY > scrollThreshold ? 0 : scrollThreshold - scrollY;

    let notas = [];

    if (prestador && prestador.avaliacoes) {
        for (let avaliacao of prestador.avaliacoes) {
            notas.push(avaliacao.nota);
        }
    }
    const media = notas.reduce((acc, num) => acc + num, 0) / notas.length;
    const avaliacoes = notas.length
    const Estrelas = ({ media, tamanho }) => {
        return Array.from({ length: 5 }, (_, i) => {
            const estrela = i + 1;
            return media >= estrela
                ? <StarIconCheio key={estrela} className={`w-${tamanho} h-${tamanho} text-yellow-500`} />
                : <StarIconVazio key={estrela} className={`w-${tamanho} h-${tamanho} text-yellow-500`} />
        });
    };

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % avaliacoesData.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + avaliacoesData.length) % avaliacoesData.length);
    };

    return (
        <>
            <ModaisSolicitacaoServico servicos={servicos} modalSolicitacao={modaisSolicitacao} modalSettr={setModaisSolicitacao} />
            <svg className="absolute top-0 z-[0]" viewBox="0 0 1921 805" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M102.552 12.7864C450.19 12.7862 1778.3 146.35 2102.68 12.7863C2427.06 -120.777 2086.94 923.41 2102.68 731.758C2118.42 540.107 509.889 966.19 102.551 731.758C-304.786 497.327 -245.086 12.7866 102.552 12.7864Z" fill="#11AD0E" fill-opacity="0.25" />
            </svg>
            <svg className="absolute right-0" width="460" height="630" viewBox="0 0 594 830" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_8_430)">
                    <path d="M423.719 502.664C423.719 35.6634 -220.544 194.088 88.5878 -79.1472C397.72 -352.383 705.725 -75.4086 725.945 58.8419C746.165 193.092 1042.95 24.2691 916.719 460.664C790.491 897.059 423.719 969.664 423.719 502.664Z" fill="#008042" />
                </g>
                <defs>
                    <filter id="filter0_d_8_430" x="0.65332" y="-195.278" width="951.221" height="1025.07" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_8_430" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_8_430" result="shape" />
                    </filter>
                </defs>
            </svg>

            <Header />

            <div className="w-full h-full z-10 " >


                <div id="section1" className="bg-white h-[70vh] pt-10 pl-32 pr-32 flex flex-col ">
                    <div id="crumbs" className="z-10">
                        <span className="text-2xl"> <span onClick={() => { navigate("/") }} className="text-cinza-claro-3 cursor-pointer">Página Inicial </span><span onClick={() => { navigate("/prestadores") }} className="text-cinza-claro-3 cursor-pointer">/ Prestadores</span> / <span className="text-verde-escuro-1 text font-bold">{prestador.nome}</span></span>
                    </div>
                    <div id="tags" className="ml-36 mr-36 mt-10 space-x-4 ">
                        <button className="text-2xl bg-white h-10 pl-5 pr-5 font-semibold text-verde-escuro-1 rounded-full drop-shadow-all">{prestador.area}</button>
                        <button onClick={() => console.log(prestador)} className="text-2xl bg-white h-10 pl-5 pr-5 font-semibold text-verde-escuro-1 rounded-full drop-shadow-all">{prestador.prestaAula ? "Serviço + Aula" : "Serviço"}</button>
                    </div>
                    <div id="content" className="flex justify-between pt-5 pl-36 pr-36 z-10">
                        <div id="texto" className="max-w-[50%] text-xl z-10">
                            <span>{prestador.descricao}</span>
                        </div>

                        <div id="conteinerCard">
                            <div id="card" style={{ transform: `translateY(${translateYValue}px)` }} className={`fixed  top-18 right-72 transition-transform duration-500  flex flex-col p-5 bg-white w-84 h-120  rounded-3xl drop-shadow-all`}>
                                <img src={prestador.pfp} id="foto" className="bg-cover bg-no-repeat h-42 w-42 rounded-3xl ml-auto mr-auto"></img>
                                <span className="mt-2 font-bold ml-auto mr-auto text-3xl">{prestador.nome}</span>
                                <div className="flex flex-row mr-auto ml-auto mt-2">
                                    <Estrelas media={media} tamanho={6} /><span className="ml-2 text-lg">{media.toFixed(1)}</span>
                                </div>
                                <span className="ml-auto mr-auto text-cinza-claro-3">({avaliacoes} avaliações)</span>
                                <div className="grid grid-cols-2 text-lg mt-1 ml-auto mr-auto space-y-1">
                                    <span>Preço</span>
                                    <span>R${prestador.orcamentoMin} - R${prestador.orcamentoMax}</span>
                                    <span>Cidade</span>
                                    <span>{prestador.cidade}</span>
                                    <span>Estado</span>
                                    <span>{prestador.estado}</span>
                                </div>
                                <button className="bg-verde-padrao text-white w-52 h-10 text-2xl mt-6 mr-auto ml-auto rounded-full" onClick={() => { setModaisSolicitacao(true) }}>
                                    Contratar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <svg className="absolute top-[-250px]" width="360" height="1029" viewBox="0 0 360 1029" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_8_431)">
                        <path d="M-136.729 328.407C-197.545 664.774 110.518 788.917 322 814.5C445.999 829.5 200.301 892.156 59.4595 947C-466.541 1151.83 -510.128 875.754 -505.653 742.173C-501.179 608.591 -815.971 752.265 -617.241 332.526C-418.511 -87.2117 -53.674 -130.96 -136.729 328.407Z" fill="#008042" />
                    </g>
                    <defs>
                        <filter id="filter0_d_8_431" x="-687.103" y="0.55835" width="1047" height="1027.66" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="4" />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_8_431" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_8_431" result="shape" />
                        </filter>
                    </defs>
                </svg>

                <div id="section2" className="bg-white z-10 h-184 pt-10 pl-32 pr-32 flex flex-col">
                    <span className="mt-14 ml-36 mr-36 text-3xl font-bold">Galeria de imagens</span>
                    <div id="containerImgs" className="mt-10 grid grid-cols-2 h-120 w-[38%] ml-36 mr-36 gap-x-2 gap-y-2">
                        <img src="" alt="" className="bg-cinza-claro-1 blur-sm rounded-tl-3xl" />
                        <img src="" alt="" className="bg-cinza-claro-1 blur-sm rounded-tr-3xl" />
                        <img src="" alt="" className="bg-cinza-claro-1 blur-sm" />
                        <img src="" alt="" className="bg-cinza-claro-1 blur-sm" />
                        <img src="" alt="" className="bg-cinza-claro-1 blur-sm rounded-bl-3xl" />
                        <img src="" alt="" className="bg-cinza-claro-1 blur-sm rounded-br-3xl" />
                    </div>
                </div>
                <div id="section3" className="z-10 min-h-[18rem] bg-verde-escuro-2 pt-10 pl-36 pr-32 flex flex-col">

                    <div className="bg-white rounded-3xl min-h-48 w-[40%] ml-32 mr-32 p-10 drop-shadow-all">
                        <span className=" text-3xl font-bold z-10 ">Serviços oferecidos</span>
                        <div className="z-10 mt-2 text-lg flex flex-col">
                            {servicos.map((data, i) => (
                                <span key={i}>{data.nome}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div id="section4" className="bg-white z-10 h-72 pt-10 pl-32 pr-32 flex flex-col">
                    <span className="ml-36 mr-36 text-3xl font-bold">Avaliações</span>
                    <div className="relative mt-10 ml-52 mr-36">
                        {avaliacoesData.map((avaliacao, index) => (
                            <div
                                key={index}
                                className={`absolute top-0 transition-opacity duration-300 ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <div className="p-4 bg-verde-claro-3 w-96 h-32 shadow-md rounded-md">
                                    <h2 className="text-xl font-bold">{avaliacao.nome}</h2>
                                    <span className="flex"><Estrelas media={avaliacao.nota} tamanho={5} /><span className="ml-1 font-semibold">{avaliacao.nota}</span></span>
                                    <p className="">{avaliacao.descricao}</p>
                                </div>
                            </div>
                        ))}

                        <button onClick={prevSlide} className="absolute left-[-4.5rem] top-[4rem] transform -translate-y-1/2 p-2  focus:outline-none">
                            <ChevronLeftIcon className="text-verde-padrao w-16 h-16" />
                        </button>
                        <button onClick={nextSlide} className="absolute left-[23.5rem] top-[4rem] transform -translate-y-1/2 p-2 focus:outline-none">
                            <ChevronRightIcon className="text-verde-padrao w-16 h-16" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}