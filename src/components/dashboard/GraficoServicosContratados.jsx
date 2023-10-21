import Chart from "react-apexcharts";

export default function GraficoServicosContratados({ labels, data }) {
    return (
        <Chart
            series={data}
            options={{
                chart: {
                    type: "donut",
                },
                labels,
                dataLabels: {
                    enabled: true,
                    style: {
                        colors: ["#fff"],
                        fontWeight: "bold",
                    },
                    dropShadow: {
                        enabled: false,
                    },
                },
                legend: {
                    show: false,
                },
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200,
                            },
                            legend: {
                                position: "bottom",
                            },
                        },
                    },
                ],
            }}
            type="donut"
            width="100%"
        />
    );
}
