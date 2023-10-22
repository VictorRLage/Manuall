import Chart from "react-apexcharts";

export default function GraficoSolicitacoesConcluidas({
    mesesTotais,
    solicitacoes,
    width,
}) {
    return (
        <Chart
            series={[
                {
                    name: "Solicitações Totais",
                    data: mesesTotais.map(({ mes, ano }) => {
                        const solicitacao = solicitacoes.find(
                            (s) => s.mes === mes + 1 && s.ano === ano,
                        );

                        return solicitacao ? solicitacao.qntTotal : 0;
                    }),
                },
                {
                    name: "Solicitações Realizadas",
                    data: mesesTotais.map(({ mes, ano }) => {
                        const solicitacao = solicitacoes.find(
                            (s) => s.mes === mes && s.ano === ano,
                        );

                        return solicitacao ? solicitacao.qntRealizadas : 0;
                    }),
                },
            ]}
            options={{
                colors: [
                    "#00CC69",
                    "#4DFFA9",
                    "rgba(17, 173, 14, 0.25)",
                    "#008042",
                    "#268054",
                ],
                stroke: {
                    curve: "straight",
                },
                grid: {
                    row: {
                        colors: ["#f3f3f3", "transparent"],
                        opacity: 0.5,
                    },
                },
                xaxis: {
                    categories: mesesTotais.map(
                        ({ mes, ano }) =>
                            `${(mes + 1).toString().padStart(2, "0")}/${ano
                                .toString()
                                .substring(2)}`,
                    ),
                },
                legend: {
                    enabled: false,
                },
            }}
            type="line"
            height="100%"
            width={width}
        />
    );
}
