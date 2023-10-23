import { useNavigate } from "react-router-dom";
import Header from "@/components/header/Header";
import Breadcrumb from "@/components/main/Breadcrumb";
import axios from "@/api/axios";
import { useEffect, useState } from "react";
import Historico from "@/components/dashboard/Historico";


export default function Erro() {
    const [historico, setHistorico] = useState([]);

    const getHistorico = () => {
        axios
            .get("/historico/buscarHistorico")
            .then((res) => {
                if (res.status === 200) {
                    setHistorico(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getPrestador = (id) => {
        axios
            .get(`/prefil/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Header />
            <div className="w-full h-full bg-[#fafafa]">
                <div id="content" className="pt-14 pb-0 p-32">
                    <div onClick={getHistorico} id="titulo" className="">
                        <p  className="text-base pb-3 text-gray-400 font-semibold">Olá Fulano! Bem vindo ao seu</p>
                        <p className="text-5xl font-semibold">Historico de compras</p>
                    </div>
                    <div id="labels" className="flex justify-between pt-10">
                        <div className="bg-verde-padrao pt-1 pb-1 pl-10 pr-10 text-white rounded-full text-xl">Data</div>
                        <div className="bg-verde-padrao pt-1 pb-1 pl-10 pr-10 text-white rounded-full text-xl">Prestadores</div>
                        <div className="bg-verde-padrao pt-1 pb-1 pl-10 pr-10 text-white rounded-full text-xl">Serviço</div>
                        <div className="bg-verde-padrao pt-1 pb-1 pl-10 pr-10 text-white rounded-full text-xl" >Valor</div>
                    </div>
                    <div id="historicos" className="pt-4">
                        {historico.map((item) => {
                            return (
                                <Historico
                                    key={item.id}
                                    data={item.data}
                                    prestador={item.prestador}
                                    servico={item.servico}
                                    valor={item.valor}
                                />
                            );
                        
                        }}
                    </div>

                </div>

            </div>

        </>
    );
}