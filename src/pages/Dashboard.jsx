import Header from "@/components/header/Header";
import Breadcrumb from "@/components/main/Breadcrumb";
import GreenArrowhead from "@/assets/icons/green_arrowhead.svg";
import { useState } from "react";
import { useEffect } from "react";
import axios from "@/api/axios";

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

        axios
            .get(`dashboard/${intervalo[0]}/${intervalo[1]}`)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));
    }, [intervalo]);

    return (
        <div className="bg-[#FBFBFB] min-h-screen">
            <Header />
            <div className="w-full py-6 px-32 flex flex-col gap-6">
                <Breadcrumb
                    items={[
                        { to: "/", desc: "Página Inicial" },
                        { to: null, desc: "Dashboard" },
                    ]}
                />
                <div className="w-full flex gap-8">
                    <div className="h-[120px] w-[25%] flex items-center justify-center flex-col gap-2">
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
                    <div className="h-[120px] w-[25%] bg-[#008042] rounded-xl text-white flex items-center justify-center flex-col gap-2 text-center">
                        <span className="text-lg">Serviços Concluídos</span>
                        <h2 className="text-4xl font-bold">N/A</h2>
                    </div>
                    <div className="h-[120px] w-[25%] bg-[#008042] rounded-xl text-white flex items-center justify-center flex-col gap-2 text-center">
                        <span className="text-lg">Tempo médio de resposta</span>
                        <h2 className="text-4xl font-bold">N/A</h2>
                    </div>
                    <div className="h-[120px] w-[25%] bg-[#008042] rounded-xl text-white flex items-center justify-center flex-col gap-2 text-center">
                        <span className="text-lg">Valor arrecadado</span>
                        <h2 className="text-4xl font-bold">N/A</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
