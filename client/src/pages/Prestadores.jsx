import Header from "@/components/header/Header";
import NenhumPrestadorEncontrado from "@/components/prestadores/NaoEncontrado";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@/api/AxiosConfig";
import Card from "@/components/main/Card";
import Skeleton from "react-loading-skeleton";

export default function Prestadores(props) {
    const navigate = useNavigate();
    const [areaAtiva, setAreaAtiva] = useState(0);
    const [areas, setAreas] = useState([]);
    const [prestadores, setPrestadores] = useState([]);
    const [showNoPrestadorMessage, setShowNoPrestadorMessage] = useState(false);
    const [filtroSelecionado, setFiltroSelecionado] = useState("Alfabetica");
    const [ordemSelecionada, setOrdemSelecionada] = useState(true);

    const changeAreaAtiva = (e) => {
        const idArea = e.target.value;
        if (areaAtiva === idArea || idArea === "todas") {
            getPrestadores();
            setAreaAtiva("todas");
        } else {
            axios.get(`/usuario/prestadores/${idArea}`)
                .then((res) => {
                    const data = res.data;
                    if (data.length === 0) {
                        setShowNoPrestadorMessage(true);
                    } else {
                        setShowNoPrestadorMessage(false);
                    }
                    setPrestadores(data);
                    setAreaAtiva(idArea);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    const getAreas = () => {
        axios.get("/usuario/areas")
            .then((res) => {
                setAreas(res.data)
            });
    }

    const getPrestadores = () => {
        axios.get("/usuario/prestadores")
            .then((res) => {
                setPrestadores(res.data)
                console.log(res.data);
                setShowNoPrestadorMessage(false);
            });
    }

    const getPrestadoresFiltrados = () => {

        let areaId = areaAtiva;
        if (areaAtiva === "todas") {
            areaId = 0;
        }

        axios.get(`/usuario/prestadores/${areaId}/${filtroSelecionado}/${ordemSelecionada}`)
            .then((res) => {
                setPrestadores(res.data);
                console.log(areaId);
                console.log(filtroSelecionado);
                console.log(ordemSelecionada);
            })
            .catch((error) => {
                console.error(error);
                console.log(areaId);
                console.log(filtroSelecionado);
                console.log(ordemSelecionada);
            });
    }

    const handleFiltroChange = (e) => {
        const novoFiltro = e.target.value;
        setFiltroSelecionado(novoFiltro);
    }

    const handleOrdemChange = (e) => {
        const novaOrdem = e.target.value === "asc";
        setOrdemSelecionada(novaOrdem);
    }

    useEffect(() => {
        getAreas()
        getPrestadores()
    }, [])

    useEffect(() => {
        getPrestadoresFiltrados();
    }, [areaAtiva, filtroSelecionado, ordemSelecionada]);

    useEffect(() => {
        const inputElement = document.getElementById("i_pesquisa");
        if (inputElement) {
            inputElement.addEventListener("keypress", handleKeyPress);
        }

        return () => {
            if (inputElement) {
                inputElement.removeEventListener("keypress", handleKeyPress);
            }
        };
    }, []);

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {}
    };

    return (
        <div>
            <Header />
            <div className='w-full h-full'>
                <div className="menuSuperior"><input id="i_pesquisa" type="text" placeholder="Buscar" />
                    <img className="imgLupa" alt="" src="https://img.freepik.com/icones-gratis/lupa_318-654446.jpg" />

                    <select className="dropdownCategoria" name="dropdownCategoria" id="dropdownCategoria" value={areaAtiva} onChange={changeAreaAtiva}>
                        <option value="todas">Todas as categorias</option>
                        {areas &&
                            areas.map(area => (
                                <option key={area.id} value={area.id}>
                                    {area.nome}
                                </option>
                            ))
                        }
                    </select>


                    <select className="dropdownFiltro" name="dropdownFiltro" id="dropdownFiltro" value={filtroSelecionado} onChange={handleFiltroChange}>
                        <option value="Alfabetica">Filtrar por Ordem Alfabética</option>
                        <option value="Nota">Filtrar por Nota</option>
                        <option value="PrecoMax">Filtrar por Maior Preço</option>
                        <option value="PrecoMin">Filtrar por Menor Preço</option>
                        <option value="Servico">Filtrar por Serviços</option>
                        <option value="ServicoAula">Filtrar por Serviços e Aulas</option>
                        { }
                    </select>

                    <select className="dropdownOrdem" name="dropdownOrdem" id="dropdownOrdem" value={ordemSelecionada ? "asc" : "desc"} onChange={handleOrdemChange}>
                        <option value="asc">Crescente</option>
                        <option value="desc">Decrescente</option>
                    </select>
                </div>
                <span className="breadCrumbs"><span onClick={() => { navigate("/") }} className="breadcrumbAnterior cursor-pointer">Página Inicial </span>/<span className="breadcrumbAtual"> Prestadores</span></span>
                <div id="container_filtro_cards" className="flex justify-center flex-col w-full">
                    <div id="cards" className="px-16 mt-12 flex flex-wrap justify-center gap-20 self-center">
                        {showNoPrestadorMessage ? (
                            <NenhumPrestadorEncontrado />
                        ) : (
                            prestadores.slice(0,9).map((data, i) => (
                                <Card
                                    key={i}
                                    id={data.id}
                                    nome={data.nome}
                                    cidade={data.cidade}
                                    foto={data.anexoPfp}
                                    area={areas?.find(area => area.id === data.idArea)?.nome}
                                    min={data.orcamentoMin}
                                    max={data.orcamentoMax}
                                    aula={data.prestaAula}
                                    mediaNota={data.mediaAvaliacoes}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
            <footer className="w-full relative">
                <svg width="1920" height="288" viewBox="0 0 1920 288" fill="none" xmlns="http://www.w3.org/2000/svg">
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
