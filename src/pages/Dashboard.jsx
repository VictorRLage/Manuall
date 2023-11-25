import axios from "@/api/axios";
import GreenArrowhead from "@/assets/icons/green_arrowhead.svg";
import ChartsAmico from "@/assets/storyset/Charts-amico.svg";
import GraficoMediaServico from "@/components/dashboard/GraficoMediaServico";
import GraficoServicosContratados from "@/components/dashboard/GraficoServicosContratados";
import GraficoSolicitacoesConcluidas from "@/components/dashboard/GraficoSolicitacoesConcluidas";
import InfoIcon from "@/components/dashboard/IconeInformacao";
import WordCloudAvaliacoes from "@/components/dashboard/WordCloudAvaliacoes";
import Header from "@/components/header/Header";
import Breadcrumb from "@/components/main/Breadcrumb";
import { useEffect, useRef, useState } from "react";
import { CirclesWithBar, ThreeCircles } from "react-loader-spinner";
import { Tooltip } from "react-tooltip";

const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
];

export default function Dashboard() {
    const [intervaloCategoria, setIntervaloCategoria] = useState("mes");

    const [intervaloOptions, setIntervaloOptions] = useState();
    const [intervalo, setIntervalo] = useState();
    const [dashboardData, setDashboardData] = useState();

    const graficoMediaServico = useRef(null);
    const palavrasChave = useRef(null);
    const graficoSolicitacoesConcluidas = useRef(null);

    const [ultimos12Meses, setUltimos12Meses] = useState();

    useEffect(() => {
        const dataAtual = new Date();

        const anoAtual = dataAtual.getFullYear();

        const mesesAtuais = Array.from({ length: 12 }).reduce(
            (acc, _, index) => {
                const mes = dataAtual.getMonth() - index;
                return mes < 0
                    ? [...acc, { mes: mes + 12, ano: anoAtual - 1 }]
                    : [...acc, { mes, ano: anoAtual }];
            },
            [],
        );

        setUltimos12Meses(mesesAtuais);

        if (intervaloCategoria === "mes") {
            const newIntervaloOptions = mesesAtuais.map(({ mes, ano }) => ({
                value: [
                    `${ano}-${(mes + 1)
                        .toString()
                        .padStart(2, "0")}-01T00:00:00`,
                    `${ano}-${(mes + 1).toString().padStart(2, "0")}-${
                        (mes + 1).toString().padStart(2, "0") == "02"
                            ? "28"
                            : "30"
                    }T23:59:59`,
                ],
                desc: `${meses[mes]} de ${ano}`,
            }));

            setIntervaloOptions(newIntervaloOptions);
            setIntervalo(newIntervaloOptions[0].value);
        } else {
            const newIntervaloOptions = mesesAtuais.reduce(
                (acc, { mes, ano }) => {
                    const semanas = Array.from({
                        length: new Date(ano, mes + 1, 0).getDate() / 7,
                    }).map((_, index) => {
                        const mesAtual = (mes + 1)?.toString().padStart(2, "0");
                        const firstDay = (Math.trunc(index * 7.5) + 1)
                            .toString()
                            .padStart(2, "0");
                        const secondDay = Math.trunc((index + 1) * 7.5)
                            .toString()
                            .padStart(2, "0");
                        return {
                            value: [
                                `${ano}-${mesAtual}-${firstDay}T00:00:00`,
                                `${ano}-${mesAtual}-${secondDay}T23:59:59`,
                            ],
                            desc: `${index + 1}ª semana de ${mesAtual}/${ano}`,
                        };
                    });

                    return [...acc, ...semanas];
                },
                [],
            );

            setIntervaloOptions(newIntervaloOptions);
            setIntervalo(newIntervaloOptions[0].value);
        }
    }, [intervaloCategoria]);

    useEffect(() => {
        if (!intervalo) return;

        setDashboardData();
        axios
            .get(`dashboard/${intervalo[0]}/${intervalo[1]}`)
            .then((res) => setDashboardData(res.data))
            .catch(console.log);
    }, [intervalo]);

    return (
        <div className="bg-[#FBFBFB] min-h-screen">
            <Header />
            <div className="w-full pt-6 pb-16 min700:px-32 min500:px-16 px-8 flex flex-col gap-6">
                <div className="w-full flex max1000:justify-center">
                    <Breadcrumb
                        items={[
                            { to: "/", desc: "Página Inicial" },
                            { to: null, desc: "Dashboard" },
                        ]}
                    />
                </div>
                <div className="w-full flex justify-center min1100:justify-between items-center gap-x-[8px] gap-y-[12px] flex-wrap">
                    <div className="h-[120px] min-w-[200px] w-[23%] flex items-center justify-center flex-col gap-2">
                        <select
                            className="h-[50%] w-full bg-white border-2 border-[#008042] rounded-xl text-[#008042] flex items-center justify-between px-4 text-lg cursor-pointer bg-no-repeat appearance-none"
                            style={{
                                backgroundImage: `url(${GreenArrowhead})`,
                                backgroundPosition: "right 16px top 50%",
                                backgroundSize: "20px",
                            }}
                            value={intervaloCategoria}
                            onChange={(e) =>
                                setIntervaloCategoria(e.target.value)
                            }
                        >
                            <option value="mes">Por mês</option>
                            <option value="semana">Por semana</option>
                        </select>
                        <select
                            className="h-[50%] w-full bg-white border-2 border-[#008042] rounded-xl text-[#008042] flex items-center justify-between px-4 text-lg cursor-pointer bg-no-repeat appearance-none"
                            style={{
                                backgroundImage: `url(${GreenArrowhead})`,
                                backgroundPosition: "right 16px top 50%",
                                backgroundSize: "20px",
                            }}
                            value={intervalo?.value}
                            onChange={(e) =>
                                setIntervalo(
                                    intervaloOptions.find(
                                        ({ value }) => value == e.target.value,
                                    ).value,
                                )
                            }
                        >
                            {intervaloOptions?.map(({ value, desc }) => (
                                <option key={value} value={value}>
                                    {desc}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="h-[120px] w-[23%] bg-[#008042] rounded-xl text-white flex items-center justify-center flex-col gap-2 relative">
                        <span className="text-lg">
                            Serviços Concluídos
                            <InfoIcon
                                tooltipId="my-tooltip"
                                tooltipContent="A quantidade de serviços que você já realizou"
                                tooltipPlace="top"
                            />
                        </span>
                        <h2 className="text-4xl font-bold">
                            {dashboardData ? (
                                dashboardData.servicosConcluidos
                            ) : (
                                <ThreeCircles
                                    height={40}
                                    width={40}
                                    color="#ffffff"
                                    visible={true}
                                    ariaLabel="three-circles-rotating"
                                />
                            )}
                        </h2>
                    </div>
                    <div className="h-[120px] w-[23%] bg-[#008042] rounded-xl text-white flex items-center justify-center flex-col gap-2 relative">
                        <span className="text-lg">
                            Tempo médio de resposta
                            <InfoIcon
                                tooltipId="my-tooltip"
                                tooltipContent="O tempo que você geralmente leva para responder o chat"
                                tooltipPlace="top"
                            />
                        </span>
                        <h2 className="text-4xl font-bold">
                            {dashboardData ? (
                                typeof dashboardData?.tempoMedioResposta ===
                                "number" ? (
                                    dashboardData?.tempoMedioResposta >= 60 ? (
                                        `${
                                            dashboardData?.tempoMedioResposta /
                                            60
                                        }h`
                                    ) : (
                                        `${dashboardData?.tempoMedioResposta}min`
                                    )
                                ) : (
                                    "N/A"
                                )
                            ) : (
                                <ThreeCircles
                                    height={40}
                                    width={40}
                                    color="#ffffff"
                                    visible={true}
                                    ariaLabel="three-circles-rotating"
                                />
                            )}
                        </h2>
                    </div>
                    <div className="h-[120px] w-[23%] bg-[#008042] rounded-xl text-white flex items-center justify-center flex-col gap-2 relative">
                        <span className="text-lg">Valor arrecadado</span>
                        <InfoIcon
                            tooltipId="my-tooltip"
                            tooltipContent="O valor total que você já recebeu pela Manuall"
                            tooltipPlace="top"
                        />
                        <h2 className="text-4xl font-bold">
                            {dashboardData ? (
                                `R$${dashboardData.valorArrecadado.toLocaleString(
                                    "pt-BR",
                                    { minimumFractionDigits: 2 },
                                )}`
                            ) : (
                                <ThreeCircles
                                    height={40}
                                    width={40}
                                    color="#ffffff"
                                    visible={true}
                                    ariaLabel="three-circles-rotating"
                                />
                            )}
                        </h2>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="w-[23%] flex flex-col">
                        <div className="py-2 max-w-[90%] w-fit bg-[#008042] flex items-center px-3 rounded-t-xl text-white font-semibold">
                            Seus serviços mais contratados
                        </div>
                        <div className="min-h-[240px] h-full w-full bg-[#008042] rounded-b-xl rounded-tr-xl flex items-center justify-center p-2">
                            <div className="w-full h-full bg-white p-3 rounded-xl flex items-center justify-center">
                                {dashboardData ? (
                                    dashboardData.servicos.length === 0 ? (
                                        <div className="h-[200px] flex flex-col items-center justify-center text-center">
                                            <img
                                                src={ChartsAmico}
                                                className="h-[100%]"
                                            />
                                            <span>
                                                Parece que não existem dados
                                                disponíveis com esses filtros
                                            </span>
                                        </div>
                                    ) : (
                                        <GraficoServicosContratados
                                            labels={dashboardData.servicos.map(
                                                ({ servico }) => servico,
                                            )}
                                            data={dashboardData.servicos.map(
                                                ({ quantidade }) => quantidade,
                                            )}
                                        />
                                    )
                                ) : (
                                    <CirclesWithBar
                                        height="100"
                                        width="100"
                                        color="#4fa94d"
                                        visible={true}
                                        ariaLabel="circles-with-bar-loading"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div
                        className="w-[74.5%] flex flex-col"
                        ref={graficoMediaServico}
                    >
                        <div className="py-2 max-w-[90%] w-fit bg-[#008042] flex items-center px-3 rounded-t-xl text-white font-semibold">
                            Média de avaliações em cada serviço
                        </div>
                        <div className="min-h-[240px] h-full w-full bg-[#008042] rounded-b-xl rounded-tr-xl flex items-center justify-center p-2">
                            <div className="w-full h-full bg-white p-3 rounded-xl flex items-center justify-center">
                                {dashboardData ? (
                                    dashboardData.servicos.length === 0 ? (
                                        <div className="h-[200px] flex flex-col items-center justify-center text-center">
                                            <img
                                                src={ChartsAmico}
                                                className="h-[100%]"
                                            />
                                            <span>
                                                Parece que não existem dados
                                                disponíveis com esses filtros
                                            </span>
                                        </div>
                                    ) : (
                                        <GraficoMediaServico
                                            labels={dashboardData?.servicos.map(
                                                ({ servico }) => servico,
                                            )}
                                            data={dashboardData?.servicos.map(
                                                ({ mediaAvaliacoes }) =>
                                                    mediaAvaliacoes,
                                            )}
                                            width={
                                                graficoMediaServico?.current
                                                    ?.clientWidth - 100 ||
                                                "100%"
                                            }
                                        />
                                    )
                                ) : (
                                    <CirclesWithBar
                                        height="100"
                                        width="100"
                                        color="#4fa94d"
                                        visible={true}
                                        ariaLabel="circles-with-bar-loading"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="w-[23%] flex flex-col" ref={palavrasChave}>
                        <div className="py-2 max-w-[90%] w-fit bg-[#008042] flex items-center px-3 rounded-t-xl text-white font-semibold">
                            Palavras-chave comuns em suas avaliações
                        </div>
                        <div className="min-h-[240px] h-full w-full bg-[#008042] rounded-b-xl rounded-tr-xl flex items-center justify-center p-2">
                            <div className="w-full h-full bg-white p-3 rounded-xl flex items-center justify-center">
                                {dashboardData ? (
                                    dashboardData.avaliacoes.length === 0 ? (
                                        <div className="h-[200px] flex flex-col items-center justify-center text-center">
                                            <img
                                                src={ChartsAmico}
                                                className="h-[100%]"
                                            />
                                            <span>
                                                Parece que não existem dados
                                                disponíveis com esses filtros
                                            </span>
                                        </div>
                                    ) : (
                                        <WordCloudAvaliacoes
                                            words={dashboardData.avaliacoes}
                                            width={
                                                palavrasChave?.current
                                                    ?.clientWidth - 50 || 300
                                            }
                                            height={
                                                palavrasChave?.current
                                                    ?.clientHeight - 100 || 300
                                            }
                                        />
                                    )
                                ) : (
                                    <CirclesWithBar
                                        height="100"
                                        width="100"
                                        color="#4fa94d"
                                        visible={true}
                                        ariaLabel="circles-with-bar-loading"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div
                        className="w-[74.5%] flex flex-col"
                        ref={graficoSolicitacoesConcluidas}
                    >
                        <div className="max-w-[90%] flex items-center gap-2">
                            <span className="w-fit bg-[#008042] text-white font-semibold px-3 py-2 rounded-t-xl">
                                Quantidade mensal de solicitações recebidas e
                                concluídas
                            </span>
                            <span className="text-[rgb(43,43,43)]">
                                *esse gráfico não é influenciado pelos filtros
                            </span>
                        </div>
                        <div className="min-h-[240px] h-full w-full bg-[#008042] rounded-b-xl rounded-tr-xl flex items-center justify-center p-2">
                            <div className="w-full h-full bg-white p-3 rounded-xl flex items-center justify-center">
                                {dashboardData ? (
                                    <GraficoSolicitacoesConcluidas
                                        mesesTotais={[
                                            ...ultimos12Meses,
                                        ].reverse()}
                                        solicitacoes={
                                            dashboardData.solicitacoesMensais
                                        }
                                        width={
                                            graficoSolicitacoesConcluidas
                                                ?.current?.clientWidth - 50 || 0
                                        }
                                    />
                                ) : (
                                    <CirclesWithBar
                                        height="100"
                                        width="100"
                                        color="#4fa94d"
                                        visible={true}
                                        ariaLabel="circles-with-bar-loading"
                                    />
                                )}
                                <Tooltip id="my-tooltip" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
