import Header from "@/components/header/Header";
import NenhumPrestadorEncontrado from "@/components/prestadores/NaoEncontrado";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import lupaIcon from "@/assets/icons/lupa.png";
import axios from "@/api/axios";
import Card from "@/components/main/Card";
import Skeleton from "react-loading-skeleton";
import FooterWave from "@/assets/shapes/FooterWave";

export default function Prestadores() {
    const navigate = useNavigate();

    const [areas, setAreas] = useState();
    const [prestadores, setPrestadores] = useState();
    const [areaAtiva, setAreaAtiva] = useState(0);
    const [filtroSelecionado, setFiltroSelecionado] = useState("Alfabetica");
    const [ordemSelecionada, setOrdemSelecionada] = useState(true);

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            teste();
        }
    };

    function teste() {
        alert("Teste");
    }

    const getPrestadoresFiltrados = () => {
        setPrestadores();
        axios
            .get(
                `/usuario/prestadores/${areaAtiva}/${filtroSelecionado}/${ordemSelecionada}`,
            )
            .then(({ data }) => {
                setPrestadores(data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        axios
            .get("/usuario/areas")
            .then(({ data }) => setAreas(data))
            .catch((err) => console.log(err));
        axios
            .get("/usuario/prestadores")
            .then(({ data }) => setPrestadores(data))
            .catch((err) => console.log(err));
    }, []);

    useEffect(getPrestadoresFiltrados, [
        areaAtiva,
        filtroSelecionado,
        ordemSelecionada,
    ]);

    return (
        <div>
            <Header />
            <div className="w-full h-full">
                <div className="menuSuperior">
                    <input
                        onKeyDown={handleKeyPress}
                        type="text"
                        placeholder="Buscar"
                    />
                    <img className="imgLupa" alt="" src={lupaIcon} />
                    <select
                        className="dropdownCategoria"
                        name="dropdownCategoria"
                        value={areaAtiva}
                        onChange={({ target }) => {
                            setAreaAtiva(target.value);
                        }}
                    >
                        <option value={0}>Todas as categorias</option>
                        {areas?.map(({ id, nome }) => (
                            <option key={id} value={id}>
                                {nome}
                            </option>
                        ))}
                    </select>
                    <select
                        className="dropdownFiltro"
                        name="dropdownFiltro"
                        value={filtroSelecionado}
                        onChange={({ target }) => {
                            setFiltroSelecionado(target.value);
                        }}
                    >
                        <option value="Alfabetica">
                            Filtrar por Ordem Alfabética
                        </option>
                        <option value="Nota">Filtrar por Nota</option>
                        <option value="PrecoMax">
                            Filtrar por Maior Orçamento
                        </option>
                        <option value="PrecoMin">
                            Filtrar por Menor Orçamento
                        </option>
                        <option value="Servico">Filtrar por Serviços</option>
                        <option value="ServicoAula">
                            Filtrar por Serviços e Aulas
                        </option>
                    </select>
                    <select
                        className="dropdownOrdem"
                        name="dropdownOrdem"
                        value={ordemSelecionada ? "asc" : "desc"}
                        onChange={({ target }) => {
                            setOrdemSelecionada(target.value === "asc");
                        }}
                    >
                        <option value="asc">Crescente</option>
                        <option value="desc">Decrescente</option>
                    </select>
                </div>
                <span className="breadCrumbs">
                    <span
                        onClick={() => {
                            navigate("/");
                        }}
                        className="breadcrumbAnterior cursor-pointer"
                    >
                        Página Inicial
                    </span>
                    {" / "}
                    <span className="breadcrumbAtual">Prestadores</span>
                </span>
                <div className="flex justify-center flex-col w-full">
                    <div className="px-16 mt-12 flex flex-wrap justify-center gap-20 self-center">
                        {prestadores ? (
                            prestadores.length === 0 ? (
                                <NenhumPrestadorEncontrado />
                            ) : (
                                prestadores.map((data, i) => (
                                    <Card
                                        key={i}
                                        id={data.id}
                                        nome={data.nome}
                                        cidade={data.cidade}
                                        foto={data.anexoPfp}
                                        area={
                                            areas?.find(
                                                (area) =>
                                                    area.id === data.idArea,
                                            )?.nome
                                        }
                                        min={data.orcamentoMin}
                                        max={data.orcamentoMax}
                                        aula={data.prestaAula}
                                        mediaNota={data.mediaAvaliacoes}
                                    />
                                ))
                            )
                        ) : (
                            Array(6)
                                .fill()
                                .map((_, i) => (
                                    <div key={i}>
                                        <Skeleton
                                            width={"320px"}
                                            height={"480px"}
                                            borderRadius={"1.5rem"}
                                        />
                                    </div>
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
