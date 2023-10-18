import { useNavigate } from "react-router-dom";
import Header from "@/components/header/Header";
import Breadcrumb from "@/components/main/Breadcrumb";
import axios from "@/api/axios";
import { useEffect, useState } from "react";


export default function Erro() {
    const [areas, setAreas] = useState();

    const getPrestadores = () => {
        console.log("oi");
        axios
            .get("/historico/buscarHistorico")
            .then(({ data }) => console.log(data)) 
            .catch((err) => console.log(err));
    };

    return (
        <>
            <Header />
            <div className="w-full h-full bg-[#fafafa]">
                <div id="content" className="pt-14 pb-0 p-32">
                    <div onClick={getPrestadores} id="titulo" className="">
                        <p  className="text-base pb-3 text-gray-400 font-semibold">Olá Fulano! Bem vindo ao seu</p>
                        <p className="text-5xl font-semibold">Historico de compras</p>
                    </div>

                </div>

            </div>

        </>
    );
}