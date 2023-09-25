import Header from "@/components/header/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import lupaIcon from "@/assets/icons/lupa.png";
import axios from "@/api/axios";
import FooterWave from "@/assets/shapes/FooterWave.svg?react";
import Cards from "@/components/home/Cards";

export default function Prestadores() {
    const navigate = useNavigate();

    const [areas, setAreas] = useState();
    const [prestadores, setPrestadores] = useState();
    const [activeArea, setActiveArea] = useState(0);
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
                `/usuario/prestadores/${activeArea}/${filtroSelecionado}/${ordemSelecionada}`,
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
        activeArea,
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
                        value={activeArea}
                        onChange={({ target }) => {
                            setActiveArea(target.value);
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
                    <Cards areas={areas} prestadores={prestadores} />
                </div>
            </div>
            <footer className="overflow-hidden">
                <FooterWave />
            </footer>
        </div>
    );
}
