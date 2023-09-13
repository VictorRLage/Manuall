import Header from "@/components/header/Header";
import NenhumPrestadorEncontrado from "@/components/prestadores/NaoEncontrado";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import lupaIcon from "@/assets/icons/lupa.png"
import axios from "@/api/axios";
import Card from "@/components/main/Card";
import Skeleton from "react-loading-skeleton";
import FooterWave from "@/assets/shapes/FooterWave"

export default function Prestadores() {
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
        if (event.key === "Enter") { }
    };

    return (
        <div>
            <Header />
            <div className="w-full h-full">
                <div className="menuSuperior">
                    <input id="i_pesquisa" type="text" placeholder="Buscar" />
                    <img className="imgLupa" alt="" src={lupaIcon} />

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
                <span className="breadCrumbs">
                    <span onClick={() => { navigate("/") }} className="breadcrumbAnterior cursor-pointer">
                        Página Inicial
                    </span>
                    {" / "}
                    <span className="breadcrumbAtual">
                        Prestadores
                    </span>
                </span>
                <div id="container_filtro_cards" className="flex justify-center flex-col w-full">
                    <div id="cards" className="px-16 mt-12 flex flex-wrap justify-center gap-20 self-center">
                        {showNoPrestadorMessage
                            ? <NenhumPrestadorEncontrado />
                            : (
                                prestadores.slice(0, 9).map((data) => (
                                    <Card
                                        key={data.id}
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
            <footer className="overflow-hidden">
                <FooterWave />
            </footer>
        </div>
    );
}
