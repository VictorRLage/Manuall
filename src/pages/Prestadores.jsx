import axios from "@/api/axios";
import BlackArrowhead from "@/assets/icons/black_arrowhead.svg";
import lupaIcon from "@/assets/icons/lupa.png";
import SelectArrowIcon from "@/assets/icons/select_arrow_gray_600.svg";
import FooterWave from "@/assets/shapes/FooterWave.svg?react";
import Header from "@/components/header/Header";
import Cards from "@/components/home/Cards";
import Breadcrumb from "@/components/main/Breadcrumb";
import FiltragemENUM from "@/enum/FiltragemENUM";
import RegexENUM from "@/enum/RegexENUM";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Prestadores() {
    const mockPrestadoresPorPagina = 18;

    const [searchParams, setSearchParams] = useSearchParams();

    const [paginasNavigator, setPaginasNavigator] = useState();

    const [areas, setAreas] = useState();
    const [prestadores, setPrestadores] = useState();
    const [filteredPrestadores, setFilteredPrestadores] = useState();

    const [areaSelecionada, setAreaSelecionada] = useState(0);
    const [filtroSelecionado, setFiltroSelecionado] = useState("Nota");
    const [ordemSelecionada, setOrdemSelecionada] = useState(false);
    const [tipoSelecionado, setTipoSelecionado] = useState("todos");

    const [searchbarText, setSearchbarText] = useState("");
    const [cidadeSelecionada, setCidadeSelecionada] = useState();

    const getPrestadores = () => {
        setPrestadores();
        axios
            .get(
                `/usuario/prestadores/${areaSelecionada}/${filtroSelecionado}/${ordemSelecionada}/${tipoSelecionado}`,
            )
            .then(({ data }) => setPrestadores(data))
            .catch(console.log);
    };

    useEffect(() => {
        axios
            .get("/usuario/areas")
            .then(({ data }) => setAreas(data))
            .catch(console.log);

        getPrestadores();

        if (!Number(searchParams.get("pagina"))) {
            setSearchParams({ pagina: 1 });
        }

        setCidadeSelecionada(searchParams.get("cidade"));
    }, []);

    useEffect(getPrestadores, [
        areaSelecionada,
        filtroSelecionado,
        ordemSelecionada,
        tipoSelecionado,
    ]);

    useEffect(() => {
        if (!prestadores) return;

        const paginaAtual = Number(searchParams.get("pagina"));
        const paginasTotal = Math.ceil(
            prestadores.length / mockPrestadoresPorPagina,
        );

        let paginas = [];
        if (paginaAtual - 2 >= 1) paginas.push(paginaAtual - 2);
        if (paginaAtual - 1 >= 1) paginas.push(paginaAtual - 1);
        paginas.push(paginaAtual);
        if (paginaAtual + 1 <= paginasTotal) paginas.push(paginaAtual + 1);
        if (paginaAtual + 2 <= paginasTotal) paginas.push(paginaAtual + 2);

        setPaginasNavigator(paginas);
    }, [searchParams, prestadores]);

    useEffect(() => {
        console.log(prestadores);
        if (!prestadores) return;
        let newFilteredPrestadores = [...prestadores];

        if (cidadeSelecionada) {
            newFilteredPrestadores = newFilteredPrestadores.filter(
                ({ cidade }) => cidade === cidadeSelecionada,
            );
        }
        newFilteredPrestadores = newFilteredPrestadores.filter(({ nome }) =>
            nome
                .toLowerCase()
                .replace(RegexENUM.TEXT_NUMBER_LOCALES_REPLACEABLE, "")
                .includes(
                    searchbarText
                        .toLowerCase()
                        .replace(RegexENUM.TEXT_NUMBER_LOCALES_REPLACEABLE, ""),
                ),
        );

        setFilteredPrestadores(
            newFilteredPrestadores.splice(
                mockPrestadoresPorPagina * searchParams.get("pagina") -
                    mockPrestadoresPorPagina,
                mockPrestadoresPorPagina,
            ),
        );
    }, [searchbarText, prestadores, cidadeSelecionada, searchParams]);

    return (
        <div>
            <Header />
            <div className="w-full h-full bg-[#fafafa]">
                <div className="px-32 pt-8 flex max700:justify-center max700:text-center gap-4 items-center">
                    <Breadcrumb
                        items={[
                            { to: "/", desc: "Página Inicial" },
                            { to: null, desc: "Prestadores" },
                        ]}
                    />
                    {cidadeSelecionada && (
                        <button
                            className="flex items-center gap-2 bg-[#008042] px-2 py-1 rounded-lg"
                            onClick={() => {
                                setSearchParams({
                                    pagina: 1,
                                });
                                window.location.reload();
                            }}
                        >
                            <span className="text-xl font-semibold text-white">
                                {cidadeSelecionada}
                            </span>
                            <span className="text-xl text-white font-semibold">
                                x
                            </span>
                        </button>
                    )}
                </div>
                <div className="w-full pt-8 px-32 gap-4 flex items-center justify-center flex-wrap">
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="grow bg-no-repeat h-[50px] px-4 rounded-lg border-[1px] border-gray-600"
                        style={{
                            backgroundImage: `url(${lupaIcon})`,
                            backgroundPosition: "right 16px top 50%",
                            backgroundSize: "20px",
                        }}
                        value={searchbarText}
                        onChange={({ target }) =>
                            setSearchbarText(target.value)
                        }
                    />
                    <select
                        name="area"
                        className="h-[50px] bg-transparent bg-no-repeat rounded-lg border-[1px] border-gray-600 pl-4 pr-12 appearance-none bg-white"
                        style={{
                            backgroundImage: `url(${SelectArrowIcon})`,
                            backgroundPosition: "right 16px top 50%",
                            backgroundSize: "20px",
                        }}
                        value={areaSelecionada}
                        onChange={({ target }) =>
                            setAreaSelecionada(target.value)
                        }
                    >
                        <option value={0}>Todas as categorias</option>
                        {areas?.map(({ id, nome }) => (
                            <option key={id} value={id}>
                                {nome}
                            </option>
                        ))}
                    </select>
                    <select
                        name="tipo"
                        className="h-[50px] bg-transparent bg-no-repeat rounded-lg border-[1px] border-gray-600 pl-4 pr-12 appearance-none bg-white"
                        style={{
                            backgroundImage: `url(${SelectArrowIcon})`,
                            backgroundPosition: "right 16px top 50%",
                            backgroundSize: "20px",
                        }}
                        value={tipoSelecionado}
                        onChange={({ target }) =>
                            setTipoSelecionado(target.value)
                        }
                    >
                        <option value="todos">Todos os tipos</option>
                        <option value="apenasServico">Apenas serviço</option>
                        <option value="servicoAula">Serviço + Aula</option>
                    </select>
                    <select
                        name="filtro"
                        className="h-[50px] bg-transparent bg-no-repeat rounded-lg border-[1px] border-gray-600 pl-4 pr-12 appearance-none bg-white"
                        style={{
                            backgroundImage: `url(${SelectArrowIcon})`,
                            backgroundPosition: "right 16px top 50%",
                            backgroundSize: "20px",
                        }}
                        value={filtroSelecionado}
                        onChange={({ target }) =>
                            setFiltroSelecionado(target.value)
                        }
                    >
                        {FiltragemENUM.map(({ id, desc }) => (
                            <option key={id} value={id}>
                                Filtrar por {desc}
                            </option>
                        ))}
                    </select>
                    <select
                        name="ordem"
                        className="h-[50px] bg-transparent bg-no-repeat rounded-lg border-[1px] border-gray-600 pl-4 pr-12 appearance-none bg-white"
                        style={{
                            backgroundImage: `url(${SelectArrowIcon})`,
                            backgroundPosition: "right 16px top 50%",
                            backgroundSize: "20px",
                        }}
                        value={ordemSelecionada}
                        onChange={({ target }) => {
                            setOrdemSelecionada(target.value);
                        }}
                    >
                        <option value={true}>Crescente</option>
                        <option value={false}>Decrescente</option>
                    </select>
                </div>
                <div className="flex justify-center flex-col w-full">
                    <Cards areas={areas} prestadores={filteredPrestadores} />
                </div>
            </div>
            <div className="w-full px-32 pt-12 flex justify-end">
                <div className="h-[50px] flex rounded-2xl overflow-hidden gap-1 bg-transparent drop-shadow-sm">
                    {Number(searchParams.get("pagina")) > 1 && (
                        <div
                            className="h-full w-[50px] flex justify-center items-center cursor-pointer text-2xl rounded-sm hover:bg-[rgb(87,255,129)] transition-colors hover:scale-105 hover:text-white bg-[#f1f1f1]"
                            onClick={() => {
                                setSearchParams({
                                    pagina:
                                        Number(searchParams.get("pagina")) - 1,
                                });
                                window.scrollTo(0, 0);
                            }}
                        >
                            <img
                                src={BlackArrowhead}
                                className="h-[50%]"
                                alt=""
                            />
                        </div>
                    )}
                    {paginasNavigator?.map((pagina, i) => (
                        <div
                            key={i}
                            className={`h-full w-[50px] flex justify-center items-center cursor-pointer text-2xl rounded-sm hover:bg-[rgb(87,255,129)] transition-colors hover:scale-105 hover:text-white ${
                                searchParams.get("pagina") == pagina
                                    ? "bg-[#00cc69] text-white font-bold"
                                    : "bg-[#f1f1f1]"
                            }`}
                            onClick={() => {
                                setSearchParams({ pagina });
                                window.scrollTo(0, 0);
                            }}
                        >
                            {pagina}
                        </div>
                    ))}
                    {Number(searchParams.get("pagina")) <
                        Math.ceil(
                            prestadores?.length / mockPrestadoresPorPagina,
                        ) && (
                        <div
                            className="h-full w-[50px] flex justify-center items-center cursor-pointer text-2xl rounded-sm hover:bg-[rgb(87,255,129)] transition-colors hover:scale-105 hover:text-white bg-[#f1f1f1]"
                            onClick={() => {
                                setSearchParams({
                                    pagina:
                                        Number(searchParams.get("pagina")) + 1,
                                });
                                window.scrollTo(0, 0);
                            }}
                        >
                            <img
                                src={BlackArrowhead}
                                className="h-[50%] transform rotate-180"
                                alt=""
                            />
                        </div>
                    )}
                </div>
            </div>
            <footer className="overflow-hidden bg-[#fafafa]">
                <FooterWave />
            </footer>
        </div>
    );
}
