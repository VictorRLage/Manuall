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
                    "#33b2df",
                    "#546E7A",
                    "#d4526e",
                    "#13d8aa",
                    "#A5978B",
                    "#2b908f",
                    "#f9a3a4",
                    "#90ee7e",
                    "#f48024",
                    "#69d2e7",
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
