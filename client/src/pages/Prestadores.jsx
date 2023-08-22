import Header from "../components/main/Header";
import { useEffect, useState } from "react";
import axios from "../api/AxiosConfig";
import Card from "../components/main/Card";

function Home(props) {
    const [areas, setAreas] = useState([]);
    const [prestadores, setPrestadores] = useState([]);

    const getAreas = () => {
        console.log("Buscando areas")
        axios.get("/usuario/areas", {
        }).then((res) => {
            setAreas(res.data)
        })
    }

    const getPrestadores = () => {
        console.log("Buscando todos prestadores")
        axios.get("/usuario/prestadores", {
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
            <Header pag={'prestadores'} />
            <div className='w-full h-full'>
                <div className="menuSuperior"><input id="i_pesquisa" type="text" placeholder="Buscar" />
                    <img className="imgLupa" alt="" src="https://img.freepik.com/icones-gratis/lupa_318-654446.jpg" />
                    <select name="dropdownCategoria" id="dropdownCategoria">
                        <option value="todas">Todas as categorias</option>
                    </select>
                    <select name="dropdownFiltro" id="dropdownFiltro">
                        <option value="todas">Filtrando por Relevância</option>
                    </select>
                </div>
                <span className="breadCrumbs">
                    <a href="./inicio" className="breadcrumbAnterior">
                        Página Inicial
                    </a>
                    /
                    <span className="breadcrumbAtual">
                        Prestadores
                    </span>
                </span>
                <div id="container_filtro_cards" className="flex justify-center flex-col w-full">
                    <div id="cards" className="px-16 mt-12 grid grid-cols-3 gap-20 self-center">
                        {prestadores?.slice(0, 6).map((data, i) => (
                            <Card
                                key={i}
                                nome={data.nome}
                                cidade={data.cidade}
                                foto={data.anexoPfp}
                                area={areas?.find(area => area.id === data.idArea)?.nome}
                                min={data.orcamentoMin}
                                max={data.orcamentoMax}
                                aula={data.prestaAula}
                                mediaNota={data.mediaAvaliacoes}
                            />
                        ))}
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

export default Home