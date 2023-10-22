import Chart from "react-apexcharts";

export default function GraficoServicosContratados({ labels, data, width }) {
    return (
        <Chart
            series={[
                {
                    data,
                },
            ]}
            options={{
                plotOptions: {
                    bar: {
                        barHeight: "100%",
                        distributed: true,
                        horizontal: true,
                        dataLabels: {
                            position: "bottom",
                        },
                    },
                },
                colors: [
                    "#00CC69",
                    "#4DFFA9",
                    "rgba(17, 173, 14, 0.25)",
                    "#008042",
                    "#268054",
                ],
                dataLabels: {
                    enabled: true,
                    textAnchor: "start",
                    style: {
                        colors: ["#fff"],
                    },
                    formatter: function (val, opt) {
                        return (
                            opt.w.globals.labels[opt.dataPointIndex] +
                            ":  " +
                            val
                        );
                    },
                },
                xaxis: {
                    categories: labels,
                },
                legend: {
                    show: false,
                },
                yaxis: {
                    labels: {
                        show: false,
                    },
                },
                tooltip: {
                    theme: "dark",
                    x: {
                        show: true,
                    },
                    y: {
                        title: {
                            formatter: function () {
                                return "";
                            },
                        },
                    },
                },
            }}
            type="bar"
            height="100%"
            width={width}
        />
    );
}
