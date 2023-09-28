import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { StarIcon as StarIconCheio } from "@heroicons/react/24/solid";
import { StarIcon as StarIconVazio } from "@heroicons/react/24/outline";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import Header from "@/components/header/Header";
import axios from "@/api/axios";
import ModaisSolicitacaoServico from "@/components/solicitacao/ModaisSolicitacaoServico";

export default function PerfilVisaoContratanate() {
    const [prestador, setPrestador] = useState({});
    const [servicos, setServicos] = useState([]);
    const [avaliacoesData, setAvaliacoesData] = useState([]);
    const [imagens, setImagens] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [modaisSolicitacao, setModaisSolicitacao] = useState(false);
    const [querAula, setQuerAula] = useState(false);

    const getInfoPrestador = () => {
        if (localStorage.getItem("TOKEN") === null) {
            navigate("/inicio");
        }

        const receivedId = location.state?.id;
        if (!receivedId) {
            navigate("/");
        } else {
            axios.get(`/perfil/${receivedId}`).then((res) => {
                setPrestador(res.data);
                console.log(res.data);
                setServicos(res.data.servicos);
                setAvaliacoesData(res.data.avaliacoes);
                setImagens(res.data.imagens);
            });
        }
    };

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

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollThreshold = 100;
    const translateYValue =
        scrollY > scrollThreshold ? 0 : scrollThreshold - scrollY;

    let notas = [];

    if (prestador && prestador.avaliacoes) {
        for (let avaliacao of prestador.avaliacoes) {
            notas.push(avaliacao.nota);
        }
    }
    const media = notas.reduce((acc, num) => acc + num, 0) / notas.length;
    const avaliacoes = notas.length;
    const Estrelas = ({ media, tamanho }) => {
        return Array.from({ length: 5 }, (_, i) => {
            const estrela = i + 1;
            return media >= estrela ? (
                <StarIconCheio
                    key={estrela}
                    className={`w-${tamanho} h-${tamanho} text-yellow-500`}
                />
            ) : (
                <StarIconVazio
                    key={estrela}
                    className={`w-${tamanho} h-${tamanho} text-yellow-500`}
                />
            );
        });
    };

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % avaliacoesData.length);
    };

    const prevSlide = () => {
        setCurrentIndex(
            (prevIndex) =>
                (prevIndex - 1 + avaliacoesData.length) % avaliacoesData.length,
        );
    };

    return (
        <>
            <ModaisSolicitacaoServico
                idPrestador={location.state?.id}
                querAula={querAula}
                servicos={servicos}
                modalSolicitacao={modaisSolicitacao}
                modalSettr={setModaisSolicitacao}
            />
            <Header />
            <div className="w-full h-full z-10 ">
                <div className="bg-white h-[70vh] pt-10 pl-32 pr-32 flex flex-col ">
                    <div className="z-10">
                        <span className="text-2xl">
                            <span
                                onClick={() => {
                                    navigate("/");
                                }}
                                className="text-cinza-claro-3 cursor-pointer"
                            >
                                Página Inicial{" "}
                            </span>
                            <span
                                onClick={() => {
                                    navigate("/prestadores");
                                }}
                                className="text-cinza-claro-3 cursor-pointer"
                            >
                                / Prestadores
                            </span>
                            {" / "}
                            <span className="text-verde-escuro-1 text font-bold">
                                {prestador.nome}
                            </span>
                        </span>
                    </div>
                    <div className="ml-36 mr-36 mt-10 space-x-4 ">
                        <button className="text-2xl bg-white h-10 pl-5 pr-5 font-semibold text-verde-escuro-1 rounded-full drop-shadow-all">
                            {prestador.area}
                        </button>
                        <button
                            onClick={() => console.log(prestador)}
                            className="text-2xl bg-white h-10 pl-5 pr-5 font-semibold text-verde-escuro-1 rounded-full drop-shadow-all"
                        >
                            {prestador.prestaAula
                                ? "Serviço + Aula"
                                : "Serviço"}
                        </button>
                    </div>
                    <div className="flex justify-between pt-5 pl-36 pr-36 z-10">
                        <div className="max-w-[50%] text-xl z-10">
                            <span>{prestador.descricao}</span>
                        </div>

                        <div>
                            <div
                                style={{
                                    transform: `translateY(${translateYValue}px)`,
                                }}
                                className={`fixed  top-18 right-72 transition-transform duration-500  flex flex-col p-5 bg-white w-84 h-130  rounded-3xl drop-shadow-all`}
                            >
                                <img
                                    src={prestador.pfp}
                                    className="object-cover bg-no-repeat h-42 w-42 rounded-3xl ml-auto mr-auto"
                                />
                                <span className="mt-2 font-bold ml-auto mr-auto text-3xl">
                                    {prestador.nome}
                                </span>
                                <div className="flex flex-row mr-auto ml-auto mt-2">
                                    <Estrelas media={media} tamanho={6} />
                                    <span className="ml-2 text-lg">
                                        {media.toFixed(1)}
                                    </span>
                                </div>
                                <span className="ml-auto mr-auto text-cinza-claro-3">
                                    ({avaliacoes} avaliações)
                                </span>
                                <div className="grid grid-cols-2 text-lg mt-1 ml-auto mr-auto space-y-1">
                                    <span>Preço</span>
                                    <span>
                                        R${prestador.orcamentoMin} - R$
                                        {prestador.orcamentoMax}
                                    </span>
                                    <span>Cidade</span>
                                    <span>{prestador.cidade}</span>
                                    <span>Estado</span>
                                    <span>{prestador.estado}</span>
                                </div>
                                {prestador?.prestaAula ? (
                                    <>
                                        <button
                                            className="bg-verde-padrao text-white w-56 h-10 text-2xl mt-6 mr-auto ml-auto rounded-full"
                                            onClick={() => {
                                                setModaisSolicitacao(true);
                                                setQuerAula(true);
                                            }}
                                        >
                                            Contratar com aula
                                        </button>
                                        <button
                                            className="text-verde-padrao w-52 h-10 text-2xl mt-6 mr-auto ml-auto rounded-full"
                                            onClick={() => {
                                                setModaisSolicitacao(true);
                                                setQuerAula(false);
                                            }}
                                        >
                                            Apenas contratar
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className="bg-verde-padrao text-white w-56 h-10 text-2xl mt-6 mr-auto ml-auto rounded-full"
                                        onClick={() => {
                                            setModaisSolicitacao(true);
                                            setQuerAula(false);
                                        }}
                                    >
                                        Contratar
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white z-10 h-184 pt-10 pl-32 pr-32 flex flex-col">
                    <span className="mt-14 ml-36 mr-36 text-3xl font-bold">
                        Galeria de imagens
                    </span>
                    <div className="mt-10 grid grid-cols-2 h-120 w-[38%] ml-36 mr-36 gap-x-2 gap-y-2">
                        <img
                            src=""
                            alt=""
                            className="bg-cinza-claro-1 blur-sm rounded-tl-3xl"
                        />
                        <img
                            src=""
                            alt=""
                            className="bg-cinza-claro-1 blur-sm rounded-tr-3xl"
                        />
                        <img
                            src=""
                            alt=""
                            className="bg-cinza-claro-1 blur-sm"
                        />
                        <img
                            src=""
                            alt=""
                            className="bg-cinza-claro-1 blur-sm"
                        />
                        <img
                            src=""
                            alt=""
                            className="bg-cinza-claro-1 blur-sm rounded-bl-3xl"
                        />
                        <img
                            src=""
                            alt=""
                            className="bg-cinza-claro-1 blur-sm rounded-br-3xl"
                        />
                    </div>
                </div>
                <div className="z-10 min-h-[18rem] bg-verde-escuro-2 pt-10 pl-36 pr-32 flex flex-col">
                    <div className="bg-white rounded-3xl min-h-48 w-[40%] ml-32 mr-32 p-10 drop-shadow-all">
                        <span className=" text-3xl font-bold z-10 ">
                            Serviços oferecidos
                        </span>
                        <div className="z-10 mt-2 text-lg flex flex-col">
                            {servicos.map((data, i) => (
                                <span key={i}>{data.nome}</span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="bg-white z-10 h-72 pt-10 pl-32 pr-32 flex flex-col">
                    <span className="ml-36 mr-36 text-3xl font-bold">
                        Avaliações
                    </span>
                    <div className="relative mt-10 ml-52 mr-36">
                        {avaliacoesData.map((avaliacao, index) => (
                            <div
                                key={index}
                                className={`absolute top-0 transition-opacity duration-300 ${
                                    currentIndex === index
                                        ? "opacity-100"
                                        : "opacity-0"
                                }`}
                            >
                                <div className="p-4 bg-verde-claro-3 w-96 h-32 shadow-md rounded-md">
                                    <h2 className="text-xl font-bold">
                                        {avaliacao.nome}
                                    </h2>
                                    <span className="flex">
                                        <Estrelas
                                            media={avaliacao.nota}
                                            tamanho={5}
                                        />
                                        <span className="ml-1 font-semibold">
                                            {avaliacao.nota}
                                        </span>
                                    </span>
                                    <p>{avaliacao.descricao}</p>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={prevSlide}
                            className="absolute left-[-4.5rem] top-[4rem] transform -translate-y-1/2 p-2  focus:outline-none"
                        >
                            <ChevronLeftIcon className="text-verde-padrao w-16 h-16" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute left-[23.5rem] top-[4rem] transform -translate-y-1/2 p-2 focus:outline-none"
                        >
                            <ChevronRightIcon className="text-verde-padrao w-16 h-16" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
