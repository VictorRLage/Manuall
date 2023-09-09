import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { StarIcon as StarIconCheio } from "@heroicons/react/24/solid";
import { StarIcon as StarIconVazio } from "@heroicons/react/24/outline";
import Header from "@/components/header/Header";
import axios from "@/api/AxiosConfig";

// 2. Define the component function
export default function Perfil(props) {

    const [prestador, setPrestador] = useState({});
    const navigate = useNavigate();
    const location = useLocation();


    const getInfoPrestador = () => {
        const receivedId = location.state?.id;
        if (!receivedId) return;

        axios.get(`/perfil/${receivedId}`)
            .then((res) => {
                setPrestador(res.data);
            });
    }

    useEffect(() => {
        getInfoPrestador();
        window.scrollTo(0, 0);
    }, []);

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollThreshold = 100;
    const translateYValue = scrollY > scrollThreshold ? 0 : scrollThreshold - scrollY;

    let notas = [];

    if (prestador && prestador.avaliacoes) {
        for (let avaliacao of prestador.avaliacoes) {
            notas.push(avaliacao.nota);
        }
    }
    const media = notas.reduce((acc, num) => acc + num, 0) / notas.length;

    const estrelas = Array.from({ length: 5 }, (_, i) => {
        const estrela = i + 1
        return media >= estrela
            ? <StarIconCheio key={estrela} className="w-6 h-6 text-yellow-500" />
            : <StarIconVazio key={estrela} className="w-6 h-6 text-yellow-500" />
    });

    return (
        <>
            <Header />
            <div className="w-full h-full " >
                <div id="section1" className="bg-verde-claro-3 h-[70vh] pt-10 pl-32 pr-32 flex flex-col">
                    <div id="crumbs" className="">
                        <span className="text-2xl"> <span onClick={() => { navigate("/") }} className="text-cinza-claro-3 cursor-pointer">Página Inicial </span><span onClick={() => { navigate("/prestadores") }} className="text-cinza-claro-3 cursor-pointer">/ Prestadores</span> / <span className="text-verde-escuro-1 text font-bold">{prestador.nome}</span></span>
                    </div>
                    <div id="tags" className="ml-36 mr-36 mt-10  space-x-4 ">
                        <button className="text-2xl bg-white h-10 pl-5 pr-5 font-semibold text-verde-escuro-1 rounded-full drop-shadow-all">{prestador.area}</button>
                        <button onClick={() => console.log(prestador.avaliacoes)} className="text-2xl bg-white h-10 pl-5 pr-5 font-semibold text-verde-escuro-1 rounded-full drop-shadow-all">{prestador.cidade}</button>
                        <button className="text-2xl bg-white h-10 pl-5 pr-5 font-semibold text-verde-escuro-1 rounded-full drop-shadow-all">{prestador.prestaAula ? "Serviço + Aula" : "Serviço"}</button>
                    </div>
                    <div id="content" className="flex justify-between pt-5 pl-36 pr-36 ">
                        <div id="texto" className="max-w-[50%] text-xl">
                            <span>{prestador.descricao}</span>
                        </div>

                        <div id="conteinerCard">
                            <div id="card" style={{ transform: `translateY(${translateYValue}px)` }} className={`fixed  top-18 right-72 transition-transform duration-500 z-40 flex flex-col p-5 bg-white w-84 h-120  rounded-3xl drop-shadow-all`}>
                                <img src={prestador.pfp} id="foto" className="bg-cover bg-no-repeat h-48 w-48 rounded-3xl ml-auto mr-auto"></img>
                                <span className="mt-4 font-bold ml-auto mr-auto text-3xl">{prestador.nome}</span>
                                <div className="flex flex-row mr-auto ml-auto mt-2">
                                    {estrelas}<span className="ml-2 text-lg">{media.toFixed(1)}</span>
                                </div>
                                <span className="ml-auto mr-auto text-cinza-claro-3">(100 avaliações)</span>
                                <span>Faixa de preço</span>
                                <span>Estado</span>
                                <button>Contratar</button>

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