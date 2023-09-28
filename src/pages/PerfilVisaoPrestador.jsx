import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { StarIcon as StarIconCheio } from "@heroicons/react/24/solid";
import { StarIcon as StarIconVazio } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Header from "@/components/header/Header";
import ModalLinkPFP from "@/components/perfil/ModalLinkPFP";
import axios from "@/api/axios";
import slugify from "slugify";
import PerfilBg1 from "@/assets/shapes/PerfilBg1.svg?react";
import PerfilBg2 from "@/assets/shapes/PerfilBg2.svg?react";
import PerfilBg3 from "@/assets/shapes/PerfilBg3.svg?react";
import ModalSolicitacao from "@/components/perfil/ModalSolicitacao";

// 2. Define the component function
export default function PerfilVisaoPrestador() {
    const [prestador, setPrestador] = useState({});
    const [servicos, setServicos] = useState([]);
    const [avaliacoesData, setAvaliacoesData] = useState([]);
    const [modalLinkPFP, setModalLinkPFP] = useState(false);
    const [descricao, setDescricao] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [modalSolicitacao, setModalSolicitacao] = useState(false);

    const getInfoPrestador = () => {
        if (localStorage.getItem("TOKEN") === null) {
            navigate("/inicio");
        }

        const receivedId = location.state?.id;
        axios.get(`/perfil/${receivedId}`).then((res) => {
            setPrestador(res.data);
            setServicos(res.data.servicos);
            setAvaliacoesData(res.data.avaliacoes);
        });
    };

    const alterarDesc = () => {
        const slug = slugify(prestador.nome, { lower: true });
        axios
            .patch("/perfil/alterar/desc", {
                descricao: descricao,
            })
            .then((res) => {
                console.log(res);
                navigate(`/prestadores`);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getInfoPrestador();
        window.scrollTo(0, 0);
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
            {modalLinkPFP && <ModalLinkPFP modal={setModalLinkPFP} />}
            {modalSolicitacao && <ModalSolicitacao modal={setModalSolicitacao} />}

            <PerfilBg1 />
            <PerfilBg3 />
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


                        {/* TESTANDO FORM ORÇAMENTO AO CLICAR NA ÁREA DO PRESTADOR */}
                        <button onClick={() => setModalSolicitacao(true)} className="text-2xl bg-white h-10 pl-5 pr-5 font-semibold text-verde-escuro-1 rounded-full drop-shadow-all">
                            {prestador.area}
                        </button>
                        {/* TESTANDO FORM ORÇAMENTO AO CLICAR NA ÁREA DO PRESTADOR */}


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
                        <div className="min-w-[50%] text-xl z-10">
                            <label
                                htmlFor="message"
                                className="block mb-2 text-xl font-medium text-black"
                            >
                                Escreva sua descrição!
                            </label>
                            <textarea
                                onChange={(e) => setDescricao(e.target.value)}
                                rows="4"
                                className="block p-2.5 w-full text-base text-gray-900 bg-white rounded-lg border border-gray-300 h-64"
                                placeholder="Escreva seua descrição aqui..."
                            />
                        </div>

                        <div>
                            <div
                                style={{
                                    transform: `translateY(${translateYValue}px)`,
                                }}
                                className={`fixed  top-18 right-72 transition-transform duration-500 z-40 flex flex-col p-5 bg-white w-84 h-120  rounded-3xl drop-shadow-all`}
                            >
                                {prestador.pfp === "" ? (
                                    <div
                                        onClick={() => setModalLinkPFP(true)}
                                        className="cursor-pointer bg-cover bg-no-repeat h-42 w-42 rounded-3xl ml-auto mr-auto p-8 border-verde-padrao border-4"
                                    >
                                        <PlusIcon className="text-verde-padrao" />
                                    </div>
                                ) : (
                                    <div className="flex">
                                        <img
                                            src={prestador.pfp}
                                            className="object-cover bg-no-repeat h-42 w-42 rounded-3xl ml-auto mr-auto"
                                        />
                                        <div>
                                            <button
                                                onClick={() =>
                                                    setModalLinkPFP(true)
                                                }
                                                className="text-verde-padrao bg-verde-padrao text-center w-8 absolute h-8 rounded-full right-[5.5rem] top-[1.5rem]"
                                            >
                                                <PencilSquareIcon className="text-white h-[1.25rem] w-[1.25rem] m-auto" />
                                            </button>
                                        </div>
                                    </div>
                                )}
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
                                    <span>{prestador.estado}</span>
                                    <span>Estado</span>
                                    <span>{prestador.cidade}</span>
                                </div>
                                <button
                                    onClick={alterarDesc}
                                    className="bg-verde-padrao text-white w-52 h-10 text-2xl mt-6 mr-auto ml-auto rounded-full"
                                >
                                    Salvar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <PerfilBg2 />
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
                                <span className="" key={i}>
                                    {data.nome}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
