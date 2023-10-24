import Chart from "react-apexcharts";

export default function GraficoServicosContratados({ labels, data }) {
    return (
        <Chart
            series={data}
            options={{
                plotOptions: {
                    pie: {
                        donut: {
                            size: "50%",
                        },
                    },
                },
                colors: [
                    "#00CC69",
                    "#0bb562",
                    "rgba(17, 173, 14, 0.25)",
                    "#008042",
                    "#268054",
                ],
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
