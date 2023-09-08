import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/header/Header";
import axios from "@/api/AxiosConfig";

// 2. Define the component function
export default function Perfil(props) {

    const [prestador, setPrestador] = useState({});
    const getInfoPrestador = () => {
        axios.get("/perfil/2")
            .then((res) => {
                setPrestador(res.data)
            });
    }

    return (
        <>
            <Header />
            <div className="w-full h-full " >
                <div id="section1" className="bg-verde-claro-3 h-[70vh] pt-10 pl-32 pr-32 flex flex-col">
                    <div id="crumbs" className="">
                        <span className="text-2xl"> <span onClick={() => { navigate("/") }} className="text-cinza-claro-3 cursor-pointer">Página Inicial </span><span onClick={() => { navigate("/prestadores") }} className="text-cinza-claro-3 cursor-pointer">/ Prestadores</span> / <span className="text-verde-escuro-1 text"><b>João Gomes</b></span></span>
                    </div>
                    <div id="tags" className="ml-36 mt-10 w-full space-x-6 ">
                        <button onClick={getInfoPrestador} className="text-2xl bg-white h-10 pl-5 pr-5 font-semibold text-verde-escuro-1 rounded-full drop-shadow-all">Eletricista</button>
                        <button onClick={() => console.log(console.log(props.location.state.id))} className="text-2xl bg-white h-10 pl-5 pr-5 font-semibold text-verde-escuro-1 rounded-full drop-shadow-all">São Paulo</button>
                        <button className="text-2xl bg-white h-10 pl-5 pr-5 font-semibold text-verde-escuro-1 rounded-full drop-shadow-all">Serviço</button>
                    </div>
                    <div id="content" className="flex justify-between pt-5 pl-36 pr-36 ">
                        <div id="texto" className="max-w-[50%] text-xl ">
                            Olá, eu sou o Mário, um eletricista com 20 anos de experiência na área. Durante todo esse tempo, venho prestando serviços de qualidade para meus clientes, garantindo soluções elétricas eficientes e seguras. Minha vasta experiência me permite identificar rapidamente os problemas e oferecer as melhores soluções para cada situação.
                        </div>
                        
                        <div id="conteinerCard">
                            <div id="card" className="z-40 fixed flex flex-col p-5 bg-white w-84 h-120 top-[11.75rem] right-72 rounded-3xl drop-shadow-all">
                                <img src="https://i.imgur.com/KLKeel7.png" id="foto" className="bg-cover bg-no-repeat h-48 w-48 rounded-3xl ml-auto mr-auto"></img>
                                <span className="mt-2 font-bold ml-auto mr-auto text-3xl">João Gomes</span>

                            </div>
                        </div>
                    </div>
                </div>
                <div id="section2" className="bg-red-900 h-176">

                </div>
            </div>
        </>
    );
}