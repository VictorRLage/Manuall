import Header from "@/components/header/Header";
import Breadcrumb from "@/components/main/Breadcrumb";
import axios from "@/api/axios";
import { useEffect, useState } from "react";
import HistoricoRow from "@/components/dashboard/HistoricoRow";
import Skeleton from "react-loading-skeleton";

export default function Historico() {
    const [solicitacoes, setSolicitacoes] = useState();

    useEffect(() => {
        axios
            .get("/historico/buscarHistorico")
            .then((res) => {
                if (res.status === 200) {
                    setSolicitacoes(res.data.reverse());
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Header />
            <div className="w-full h-full bg-[#fafafa] px-32 pt-8 pb-16">
                {/* <Breadcrumb
                    items={[
                        { to: "/", desc: "Página Inicial" },
                        { to: null, desc: "Histórico" },
                    ]}
                /> */}
                <div>
                    <p className="text-base pb-1 text-gray-400 font-semibold">
                        Olá Fulano! Bem vindo ao seu
                    </p>
                    <p className="text-5xl font-semibold">
                        Histórico de compras
                    </p>
                </div>
                <div className="flex w-full h-[50px] justify-between gap-1 mt-8">
                    <div className="text-white h-full w-[20%] flex items-center justify-center bg-[#00cc69] font-semibold text-xl rounded-tl-xl">
                        Data
                    </div>
                    <div className="text-white h-full w-[20%] flex items-center justify-center bg-[#00cc69] font-semibold text-xl">
                        Prestador
                    </div>
                    <div className="text-white h-full w-[40%] flex items-center justify-center bg-[#00cc69] font-semibold text-xl">
                        Serviço
                    </div>
                    <div className="text-white h-full w-[20%] flex items-center justify-center bg-[#00cc69] font-semibold text-xl rounded-tr-xl">
                        Valor
                    </div>
                </div>
                <div className="pt-2 flex flex-col gap-1">
                    {solicitacoes
                        ? solicitacoes.map((solicitacao, i) => (
                              <HistoricoRow key={i} solicitacao={solicitacao} />
                          ))
                        : Array.from({ length: 5 }).map((_, i) => (
                              <Skeleton width={"100%"} height={"50px"} />
                          ))}
                </div>
            </div>
        </>
    );
}
