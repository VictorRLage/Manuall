import axios from "@/api/axios";
import SelectArrowIcon from "@/assets/icons/select_arrow.svg";
import CadastroBottomBar from "@/components/cadastro/CadastroBottomBar";
import CadastroProgress from "@/components/cadastro/CadastroProgress";
import { useData } from "@/data/CreateContext";
import Regex from "@/enum/RegexENUM";
import { defer } from "@/utils/functions";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import ReactSlider from "react-slider";

export default function Fase3({
    stepInfo,
    passarFase,
    voltarFase,
    isNextLoading,
}) {
    const { windowWidth } = useData();

    const [isAreaSelecionadaValidado, setIsAreaSelecionadaValidado] =
        useState();
    const [isServicosSelecionadosValidado, setIsServicosSelecionadosValidado] =
        useState();
    const [isPrestaAulaValidado, setIsPrestaAulaValidado] = useState();
    const [isOrcamentoValidado, setIsOrcamentoValidado] = useState(true);

    const [areas, setAreas] = useState([]);
    const [servicos, setServicos] = useState([]);

    const [areaSelecionada, setAreaSelecionada] = useState(null);
    const [servicosSelecionados, setServicosSelecionados] = useState([]);
    const [prestaAula, setPrestaAula] = useState(null);
    const [orcamento, setOrcamento] = useState([1500, 3500]);

    const [isOrcamentoSelected, setIsOrcamentoSelected] = useState([
        false,
        false,
    ]);

    const validar = {
        areaSelecionada: (areaSelecionadaValue = areaSelecionada) => {
            setIsAreaSelecionadaValidado(areaSelecionadaValue !== null);
        },
        servicosSelecionados: (
            servicosSelecionadosValue = servicosSelecionados,
        ) => {
            setIsServicosSelecionadosValidado(
                servicosSelecionadosValue.length > 0,
            );
        },
        prestaAula: (prestaAulaValue = prestaAula) => {
            setIsPrestaAulaValidado(prestaAulaValue !== null);
        },
        orcamento: () => {
            setIsOrcamentoValidado(
                orcamento[0] !== null && orcamento[1] !== null,
            );
        },
    };

    const isEveryThingValidated = () => {
        return (
            isAreaSelecionadaValidado &&
            isServicosSelecionadosValidado &&
            isPrestaAulaValidado &&
            isOrcamentoValidado
        );
    };

    const avancar = () => {
        if (isNextLoading) return;

        validar.areaSelecionada();
        validar.servicosSelecionados();
        validar.prestaAula();
        validar.orcamento();

        passarFase(isEveryThingValidated(), {
            area: areaSelecionada,
            servicos: servicosSelecionados,
            prestaAula: prestaAula === "1",
            orcamentoMin: orcamento[0],
            orcamentoMax: orcamento[1],
        });
    };

    useEffect(() => {
        if (sessionStorage.getItem("optEnsinar")) {
            setPrestaAula(
                JSON.parse(sessionStorage.getItem("optEnsinar")) ? 1 : 2,
            );
        }
        if (
            sessionStorage.getItem("optMin") &&
            sessionStorage.getItem("optMax")
        ) {
            setOrcamento([
                Number(sessionStorage.getItem("optMin")),
                Number(sessionStorage.getItem("optMax")),
            ]);
        }
        axios
            .get("/usuario/areas")
            .then(({ data }) => setAreas(data))
            .catch(console.log);
    }, []);

    useEffect(() => {
        setServicosSelecionados([]);
        if (!areaSelecionada) return;
        axios
            .get(`/usuario/servico/${areaSelecionada}`)
            .then(({ data }) => setServicos(data))
            .catch(console.log);
    }, [areaSelecionada]);

    useEffect(() => {
        if (orcamento[0] < 50) setOrcamento([50, orcamento[1]]);
        else if (orcamento[0] > 4950) setOrcamento([4950, orcamento[1]]);
        if (orcamento[1] < 100) setOrcamento([orcamento[0], 100]);
        else if (orcamento[1] > 5000) setOrcamento([orcamento[0], 5000]);
    }, [orcamento]);

    return (
        <div className="bg-white min-w-[100%] flex flex-col items-center">
            <CadastroProgress
                fase={3}
                fases={stepInfo.fases}
                mudarStep={stepInfo.passarFaseAtalho}
                isFlagAtLeft={stepInfo.fases % 2 === 0}
            />
            <div className="bg-white w-full flex flex-col items-center max1000:mt-8 justify-center min1000:min-h-[85%]">
                <div className="w-full flex justify-center items-center max1000:flex-col min1000:h-[50%]">
                    <div className="h-full flex flex-col justify-center items-center p-5 gap-5 w-[90%] min1000:w-[40%]">
                        <Dropdown
                            value={areaSelecionada}
                            onChange={({ value }) => {
                                setAreaSelecionada(value);
                                validar.areaSelecionada(value);
                            }}
                            options={areas}
                            optionValue="id"
                            optionLabel="nome"
                            placeholder="Marque a sua área de atuação"
                            dropdownIcon="disabled"
                            className="p-1 w-full bg-white rounded-lg border-2 border-cinza-claro-1 appearance-none
                            bg-no-repeat focus:outline-none focus:ring-0 focus:border-verde-padrao peer"
                            style={{
                                backgroundImage: `url(${SelectArrowIcon})`,
                                backgroundPosition: "right 0.7rem top 50%",
                                backgroundSize: "20px",
                            }}
                        />
                        <MultiSelect
                            value={servicosSelecionados}
                            onChange={({ value }) => {
                                setServicosSelecionados(value);
                                validar.servicosSelecionados(value);
                            }}
                            options={servicos}
                            disabled={!areaSelecionada}
                            optionValue="id"
                            optionLabel="nome"
                            display="chip"
                            placeholder="Marque os seus serviços prestados"
                            dropdownIcon="disabled"
                            className="p-1 w-full bg-white rounded-lg border-2 border-cinza-claro-1 appearance-none
                            bg-no-repeat focus:outline-none focus:ring-0 focus:border-verde-padrao peer"
                            style={{
                                backgroundImage: `url(${SelectArrowIcon})`,
                                backgroundPosition: "right 0.7rem top 50%",
                                backgroundSize: "20px",
                            }}
                        />
                    </div>
                    {windowWidth > 1000 && (
                        <div className="w-[2px] h-[80%] bg-gray-300" />
                    )}
                    <div className="h-full flex flex-col p-5 w-[90%] min1000:w-[40%] max1000:gap-4 max1000:pt-0">
                        <span className="flex items-end px-1 min1000:h-[15%]">
                            Gostaria de ensinar?
                        </span>
                        <div className="w-full flex flex-col max1000:gap-4 justify-around min1000:h-[70%]">
                            <label
                                htmlFor={1}
                                className={`w-full bg-white border-2 rounded-lg p-2 text-gray-700
                                hover:border-green-500 transition-colors min-h-[52px] flex items-center
                                ${
                                    prestaAula == 2
                                        ? "border-gray-200"
                                        : "border-cinza-claro-1"
                                }
                                `}
                            >
                                <input
                                    id={1}
                                    value={1}
                                    type="radio"
                                    name="prestaAula"
                                    className="accent-verde-escuro-1"
                                    onChange={({ target }) => {
                                        (async () => {
                                            setPrestaAula(target.value);
                                            await defer();
                                            validar.prestaAula(target.value);
                                        })();
                                    }}
                                />
                                <span className="ml-2">
                                    Sim, também quero ensinar
                                </span>
                            </label>
                            <label
                                htmlFor={2}
                                className={`w-full bg-white border-2 rounded-lg p-2 text-gray-700
                                hover:border-green-500 transition-colors min-h-[52px] flex items-center
                                ${
                                    prestaAula == 1
                                        ? "border-gray-200"
                                        : "border-cinza-claro-1"
                                }
                                `}
                            >
                                <input
                                    id={2}
                                    value={2}
                                    type="radio"
                                    name="prestaAula"
                                    className="accent-verde-escuro-1"
                                    onChange={({ target }) => {
                                        (async () => {
                                            setPrestaAula(target.value);
                                            await defer();
                                            validar.prestaAula(target.value);
                                        })();
                                    }}
                                />
                                <span className="ml-2">
                                    Não, apenas presto os serviços
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="h-[30%] flex flex-col w-[75%] max1000:w-[90%] max1000:px-5">
                    <h3 className="text-lg text-gray-900">
                        Média de seus orçamentos
                    </h3>
                    <div className="flex items-center justify-between w-full py-8 max800:flex-wrap max800:gap-x-[4%] max800:gap-y-4">
                        <div className="flex items-center justify-between w-[17%] max800:order-1 max800:w-[48%]">
                            <label
                                htmlFor="orcamento_min"
                                className="text-lg text-gray-800"
                            >
                                Mín
                            </label>
                            <input
                                id="orcamento_min"
                                type="text"
                                value={`${orcamento[0]}${
                                    isOrcamentoSelected[0] ? "" : ",00"
                                }`}
                                onBlur={() => {
                                    setIsOrcamentoSelected([
                                        false,
                                        isOrcamentoSelected[1],
                                    ]);
                                }}
                                onFocus={() => {
                                    setIsOrcamentoSelected([
                                        true,
                                        isOrcamentoSelected[1],
                                    ]);
                                }}
                                onChange={({ target }) => {
                                    setOrcamento([
                                        Number(
                                            target.value.replace(
                                                Regex.NUMBER_REPLACEABLE,
                                                "",
                                            ),
                                        ),
                                        orcamento[1] > target.value
                                            ? orcamento[1]
                                            : Number(target.value) + 1,
                                    ]);
                                }}
                                className="border-2 border-cinza-claro-1 rounded-lg w-[70%] px-2 hover:border-green-300 transition-all outline-none focus:border-green-600"
                            />
                        </div>
                        <ReactSlider
                            value={orcamento}
                            onChange={(value) => setOrcamento(value)}
                            className="w-[63%] h-[25px] flex items-center justify-center [&>*:nth-child(2)]:bg-verde-padrao max800:order-2 max800:w-full"
                            thumbClassName="w-5 h-5 bg-verde-padrao cursor-grab rounded-full transition-colors hover:bg-green-600 focus:h-6 focus:w-6 focus:outline-none"
                            trackClassName="h-3 bg-gray-200 rounded-full"
                            min={0}
                            max={5000}
                            pearling
                            minDistance={50}
                        />
                        <div className="flex items-center justify-between w-[17%] max800:order-1 max800:w-[48%]">
                            <label
                                htmlFor="orcamento_max"
                                className="text-lg text-gray-800"
                            >
                                Máx
                            </label>
                            <input
                                id="orcamento_max"
                                type="text"
                                value={`${orcamento[1]}${
                                    isOrcamentoSelected[1] ? "" : ",00"
                                }`}
                                onBlur={() => {
                                    setIsOrcamentoSelected([
                                        isOrcamentoSelected[0],
                                        false,
                                    ]);
                                }}
                                onFocus={() => {
                                    setIsOrcamentoSelected([
                                        isOrcamentoSelected[0],
                                        true,
                                    ]);
                                }}
                                onChange={({ target }) => {
                                    setOrcamento([
                                        orcamento[0] < target.value
                                            ? orcamento[0]
                                            : target.value - 1 >= 0
                                            ? target.value - 1
                                            : target.value || 0,
                                        Number(
                                            target.value.replace(
                                                Regex.NUMBER_REPLACEABLE,
                                                "",
                                            ),
                                        ),
                                    ]);
                                }}
                                className="border-2 border-cinza-claro-1 rounded-lg w-[70%] px-2 hover:border-green-300 transition-all outline-none focus:border-green-600"
                            />
                        </div>
                    </div>
                </div>
                <div className="h-[15%] flex justify-between items-center w-[75%] max1000:w-[90%] max1000:px-5">
                    <button
                        onClick={voltarFase}
                        className="text-gray-400 text-xl mb-4 font-bold flex justify-center items-center h-[40px] cursor-pointer"
                    >
                        <ChevronDoubleRightIcon className="h-8 w-8 rotate-180" />{" "}
                        Voltar
                    </button>
                    <button
                        onClick={() => {
                            isEveryThingValidated() && avancar();
                        }}
                        className={`${
                            isEveryThingValidated()
                                ? "bg-verde-escuro-2 cursor-pointer"
                                : "bg-gray-400 cursor-default"
                        } w-32 h-10 rounded-full text-xl mb-4 font-semibold text-white flex items-center justify-center`}
                    >
                        {isNextLoading ? (
                            <ThreeDots height="20" color="#fff" />
                        ) : (
                            "Finalizar"
                        )}
                    </button>
                </div>
                {windowWidth <= 1000 && <CadastroBottomBar isAtLeft />}
            </div>
        </div>
    );
}
