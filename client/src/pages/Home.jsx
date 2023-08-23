import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import Header from "../components/main/Header";
import { useEffect, useState } from "react";
import axios from "../api/AxiosConfig";
import Card from "../components/main/Card";
import { useNavigate } from "react-router-dom";
import ModalCustom from "../components/main/ModalCustom";
import Skeleton from 'react-loading-skeleton';

export default function Home(props) {
    const slides = [
        {
            url: 'https://i.imgur.com/BQlaUcO.jpeg',
        },
        {
            url: 'https://i.imgur.com/BQlaUcO.jpeg',
        },
        {
            url: 'https://i.imgur.com/BQlaUcO.jpeg',
        },
    ];

    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [areas, setAreas] = useState();
    const [prestadores, setPrestadores] = useState();
    const [areaAtiva, setAreaAtiva] = useState(0);
    // solicitacao
    const [modalVisible1, setModalVisible1] = useState(false)
    const [modalVisible2, setModalVisible2] = useState(false)
    const [modalVisible3, setModalVisible3] = useState(false)
    const [modalVisible4, setModalVisible4] = useState(false)

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    const getAreas = () => {
        axios.get("/usuario/areas", {
        }).then((res) => {
            setAreas(res.data)
        })
    }

    const getPrestadores = () => {
        axios.get("/usuario/prestadores")
            .then((res) => {
                setPrestadores(res.data)
            })
    }

    const changeAreaAtiva = (idArea) => {
        if (areaAtiva === idArea) {
            getPrestadores()
            setAreaAtiva(0)
        } else {
            axios.get(`/usuario/prestadores/${idArea}`)
                .then((res) => {
                    setPrestadores(res.data)
                    setAreaAtiva(idArea)
                })
        }
    }

    useEffect(() => {
        getAreas()
        getPrestadores()
    }, [])

    return (
        <>
            <ModalCustom modalGettr={modalVisible1} modalSettr={setModalVisible1} canClose={false} w={'1000px'} h={'500px'}>
                {/* <svg width="199" height="171" viewBox="0 0 199 171" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute">
                    <g filter="url(#filter0_d_58_243)">
                        <path d="M49.5886 90.0657C82.9039 -29.7075 242.667 48.4445 180.079 -39.6362C117.49 -127.717 15.9489 -74.6179 1.00283 -41.3637C-13.9433 -8.1096 -80.7015 -68.6921 -78.3172 50.5829C-75.9329 169.858 16.2733 209.839 49.5886 90.0657Z" fill="#92E3A9" />
                    </g>
                    <defs>
                        <filter id="filter0_d_58_243" x="-82.3799" y="-87.8804" width="280.854" height="258.28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="4" />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_58_243" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_58_243" result="shape" />
                        </filter>
                    </defs>
                </svg> */}
                <div className="bg-white flex flex-col rounded-lg bg-cover bg-center " >
                    <div className="border-[30px] rounded-lg w-[900px] h-[450px]">
                        <div className="bg-cinza flex w-[450px] h-[15px] rounded-full ml-[200px] mt-[20px]">
                            <div className="bg-verde-padrao w-[150px] rounded-full">
                            </div>
                        </div>
                        <div className="w-full flex justify-center items-center text-black text-2xl font-extrabold mt-3">
                            Qual serviço você necessita?
                        </div>
                        <div className="flex flex-col m-5 justify-center items-center text-black text-2xl font-base text-center gap-2">
                            <div>
                                <input className="bg-verde-escuro-1 w-[60px]" type="checkbox" name="" id="opcao1" />
                                <label className="mx-2" htmlFor="opcao1">Serviço 1 </label>
                            </div>
                            <div>
                                <input className="bg-verde-escuro-1 w-[60px]" type="checkbox" name="" id="opcao2" />
                                <label className="mx-2" htmlFor="">Serviço 2</label>
                            </div>
                            <div>
                                <input className="bg-verde-escuro-1 w-[60px]" type="checkbox" name="" id="opcao3" />
                                <label className="mx-2" htmlFor="">Serviço 3</label>
                            </div>
                            <div>
                                <input className="bg-verde-escuro-1 w-[60px]" type="checkbox" name="" id="opcao4" />
                                <label className="mx-2" htmlFor="">Serviço 4</label>
                            </div>
                            <div>
                                <input className="bg-verde-escuro-1 w-[60px]" type="checkbox" name="" id="opcao5" />
                                <label className="mx-2" htmlFor="">Serviço 5</label>
                            </div>
                        </div>
                        <div id="botoes" className="flex flex-row ml-[320px] mt-[30px] space-x-8" >
                            <div className="flex justify-center items-center">
                                <button className="w-[100px] white text-verde-padrao rounded-full text-lg border-2 border-verde-padrao" onClick={() => { navigate("/inicio") }}>
                                    {'<'} Voltar
                                </button>
                            </div>
                            <div className="flex justify-center items-center">
                                <button className="w-[100px] bg-verde-padrao text-white rounded-full text-lg" onClick={() => { setModalVisible2(true); setModalVisible1(false) }}>
                                    Próximo {'>'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalCustom>
            <ModalCustom modalGettr={modalVisible2} modalSettr={setModalVisible2} canClose={false} w={'1000px'} h={'500px'}>
                {/* <svg width="199" height="171" viewBox="0 0 199 171" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute">
                    <g filter="url(#filter0_d_58_243)">
                        <path d="M49.5886 90.0657C82.9039 -29.7075 242.667 48.4445 180.079 -39.6362C117.49 -127.717 15.9489 -74.6179 1.00283 -41.3637C-13.9433 -8.1096 -80.7015 -68.6921 -78.3172 50.5829C-75.9329 169.858 16.2733 209.839 49.5886 90.0657Z" fill="#92E3A9" />
                    </g>
                    <defs>
                        <filter id="filter0_d_58_243" x="-82.3799" y="-87.8804" width="280.854" height="258.28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="4" />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_58_243" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_58_243" result="shape" />
                        </filter>
                    </defs>
                </svg> */}
                <div className="bg-white flex flex-col rounded-lg bg-cover bg-center " >
                    <div className="border-[30px] rounded-lg w-[900px] h-[450px]">
                        <div className="bg-cinza flex w-[450px] h-[15px] rounded-full ml-[200px] mt-[20px]">
                            <div className="bg-verde-padrao w-[300px] rounded-full">
                            </div>
                        </div>
                        <div className="w-full flex justify-center items-center text-black text-2xl font-extrabold mt-3">
                            Informe o tamanho e a medida do serviço:
                        </div>
                        <div className="flex flex-row ml-[280px] mt-[20px]  w-[275px] h-[170px] rounded-lg border-verde-padrao border-2 justify-center items-center text-black text-2xl font-base text-center gap-2">
                            <input placeholder="Tamanho" type="text" className="w-[95px] text-lg" />
                            <select className="text-lg" name="" id="">
                                <option className="bg-verde-escuro-1 w-[25px] text-lg" value="">Unidade</option>
                                <option className="bg-verde-padrao" value="">m²</option>
                                <option className="bg-verde-padrao" value="">m</option>
                                <option className="bg-verde-padrao" value="">cm</option>
                            </select>
                        </div>
                        <div id="botoes" className="flex flex-row ml-[300px] mt-[45px] space-x-8" >
                            <div className="flex justify-center items-center">
                                <button className=" w-[100px] white text-verde-padrao rounded-full text-lg border-2 border-verde-padrao" onClick={() => { setModalVisible2(false); setModalVisible1(true) }}>
                                    {'<'} Voltar
                                </button>
                            </div>
                            <div className="flex justify-center items-center">
                                <button className=" w-[100px] bg-verde-padrao text-white rounded-full text-lg" onClick={() => { setModalVisible2(false); setModalVisible3(true) }}>
                                    Próximo {'>'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalCustom>
            <ModalCustom modalGettr={modalVisible3} modalSettr={setModalVisible3} canClose={false} w={'1000px'} h={'500px'}>
                <div className="bg-white flex flex-col rounded-lg bg-cover bg-center " >
                    <div className="border-[30px] rounded-lg w-[900px] h-[450px]">
                        <div className="bg-cinza flex w-[450px] h-[15px] rounded-full ml-[200px] mt-[20px]">
                            <div className="bg-verde-padrao w-[450px] rounded-full">
                            </div>
                        </div>
                        <div className="w-full flex justify-center items-center text-black text-2xl font-extrabold mt-3">
                            Algo mais a acrescentar? (Opcional)
                        </div>
                        <div className="flex flex-col ml-[210px] mt-[20px] w-[422px] h-[92px] rounded-lg border-verde-padrao border-2 justify-center text-black text-2xl">
                            <input placeholder="Descreva mais sobre o serviço/aula desejado" type="text" className="w-[350px] h-[30px] text-lg ml-[10px]" />

                        </div>
                        <div className="flex flex-col ml-[370px] mt-[20px] w-[102px] h-[100px] px-2 rounded-lg border-verde-padrao border-2 justify-center text-black text-xs">
                            Insira aqui sua mídia +
                        </div>

                        <div id="botoes" className="flex flex-row ml-[300px] mt-[30px] space-x-8" >
                            <div className="flex justify-center items-center">
                                <button className=" w-[100px] white text-verde-padrao rounded-full text-lg border-2 border-verde-padrao" onClick={() => { setModalVisible2(true); setModalVisible3(false) }}>
                                    {'<'} Voltar
                                </button>
                            </div>
                            <div className="flex justify-center items-center">
                                <button className=" w-[100px] bg-verde-padrao text-white rounded-full text-lg" onClick={() => { setModalVisible4(true); setModalVisible3(false) }}>
                                    Enviar {'>'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalCustom>
            <ModalCustom modalGettr={modalVisible4} modalSettr={setModalVisible4} canClose={false} w={'1000px'} h={'500px'}>
                <div className="bg-white flex flex-col rounded-lg bg-cover bg-center" >
                    <div className="border-[30px] rounded-lg w-[900px] h-[450px]">
                        <div className="w-full mt-[50px] flex justify-center items-center text-verde-escuro-1 text-2xl font-extrabold">
                            SUA SOLICITAÇÃO FOI REALIZADA COM SUCESSO!
                        </div>
                        <div className="flex justify-center items-center text-black text-lg font-base text-center">
                            Aguarde o retorno do prestador!
                        </div>
                    </div>
                </div>
            </ModalCustom>
            <div>
                <Header pag={'inicio'} />
                <div className='w-full h-full'>
                    <div id='container_carousel' className="group">
                        <div style={{ backgroundImage: `url(${slides[currentIndex].url})` }} className='w-full h-120 bg-center bg-cover duration-500'>
                            {currentIndex === 0 ?
                                <div className="absolute">
                                    <div className="absolute ml-20 mt-20 text-white text-6xl">
                                        Encontre <br /> prestadores de <br /> serviço <span className="font-bold">excelentes</span> <br /> prontos para te <br /> <span className="font-bold">ensinar!</span>
                                    </div>
                                    <button
                                        className="absolute w-32 h-12 bg-white rounded-full text-2xl text-verde-escuro-2 font-semibold mt-88 ml-112 outline outline-offset-4 outline-4 outline-verde-padrao"
                                        onClick={() => { setModalVisible1(true) }}
                                    >
                                        Encontrar
                                    </button>
                                    <svg width="100%" height="480" viewBox="0 0 883 631" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M883 292.237C883 678.017 842.268 628.986 355.217 628.986C-988.334 628.986 -45.5207 664.039 -45.5207 391.338C-45.5207 118.638 -207.46 0.595234 109.373 0.595234C426.205 0.595234 883 -26.9222 883 292.237Z" fill="#008042" />
                                    </svg>
                                </div>
                                : currentIndex === 1 ?
                                    <div className="absolute flex">
                                        <div className="absolute ml-[66rem] mt-20 text-white text-6xl text-right">
                                            Venha <span className=" font-bold">mudar</span> <br /> o mercado de <br /> <span className="font-bold">prestadores de <br /> serviço </span> com <br /> a gente
                                        </div>
                                        <button className="absolute w-32 h-12 bg-white rounded-full text-2xl text-verde-escuro-2 font-semibold mt-88 ml-[62rem] outline outline-offset-4 outline-4 outline-verde-padrao " onClick={() => { navigate("/cadastroPrestador") }}>Cadastrar</button>
                                        <svg className="ml-[52rem]" width="698" height="480" viewBox="0 0 698 630" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1493.41 307.649C1493.41 693.19 1187.61 617.686 891.5 624.5C-303.5 652 78.5055 564.169 4.00007 141.5C-48.9945 -89.8309 589.006 6.66897 864.456 -25.1818C1140.6 -25.1818 1493.41 -11.3115 1493.41 307.649Z" fill="#008042" />
                                        </svg>
                                    </div>
                                    : currentIndex === 2 ?
                                        <div className="absolute flex justify-center">
                                            <div className="absolute ml-52 mt-13 text-white text-6xl text-center">
                                                Com a <span className="font-bold">Manuall</span> <br /> você pode passar o seu <br /> <span className="font-bold">conhecimento</span> adiante e <br /> deixar o seu <span className="font-bold">legado</span>
                                            </div>
                                            <button className="absolute w-32 h-12 bg-white rounded-full text-2xl text-verde-escuro-2 font-semibold mt-84 ml-52 outline outline-offset-4 outline-4 outline-verde-padrao " onClick={() => { navigate("/cadastroPrestador") }}>Cadastrar</button>
                                            <svg className="ml-52 mt-3" width="1102" height="430" viewBox="0 0 1102 523" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1102 258.803C1102 575.057 874.193 513.122 653.593 518.712C-236.658 541.27 60.9612 483.439 5.4562 136.729C-34.0237 -53.0297 441.274 26.1281 646.478 0.00128042C852.199 0.00128042 1102 -2.8374 1102 258.803Z" fill="#008042" />
                                            </svg>
                                        </div>
                                        : null
                            }
                            <div className="flex flex-row justify-between">
                                <div onClick={prevSlide} id='seta_direita' className="z-30 mt-48 cursor-pointer hidden group-hover:block ">
                                    <ChevronLeftIcon className="text-white w-16 h-16" />
                                </div>
                                <div onClick={nextSlide} id='seta_esquerda' className="z-30 mt-48 right-0 cursor-pointer hidden group-hover:block ">
                                    <ChevronRightIcon className="text-white w-16 h-16" />
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <div className='z-30 hidden group-hover:flex cursor-pointer w-24 mt-48 justify-between '>
                                    {Array(3).fill().map((_, i) => (
                                        <div key={i} onClick={() => goToSlide(i)} style={{ backgroundColor: currentIndex === i ? "#268054" : "white" }} className="w-6 h-6 bg-white border-2 border-verde-escuro-2 rounded-full"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="container_filtro_cards" className="flex justify-center flex-col w-full">
                        <div id="titulo" className="p-12 text-5xl font-semibold text-center">O que você <span className="text-verde-padrao">precisa?</span></div>
                        <div id="botoes" className="w-full flex justify-center flex-wrap">
                            {areas
                                ? areas.slice(0, 6).map((data, i) => (
                                    <button
                                        onClick={() => { changeAreaAtiva(data.id) }}
                                        key={i}
                                        className={
                                            `${areaAtiva === data.id ? 'bg-verde-padrao text-white' : 'bg-white text-verde-padrao'}
                                    w-32 h-10 rounded-full text-xl font-semibold border-verde-padrao border-2 p-6 flex justify-center items-center m-3`}
                                    >
                                        {data.nome}
                                    </button>
                                ))
                                : <>
                                    {Array(6).fill().map((_, i) => (
                                        <div key={i} className="w-32 h-[52px] m-3">
                                            <Skeleton height={"100%"} borderRadius={"9999px"} />
                                        </div>
                                    ))}
                                </>}
                        </div>
                        <div id="cards" className="px-16 mt-12 flex flex-wrap justify-center gap-20 self-center">
                            {prestadores ? prestadores.slice(0, 6).map((data, i) => (
                                <Card
                                    key={i}
                                    nome={data.nome}
                                    cidade={data.cidade}
                                    foto={data.anexoPfp}
                                    area={areas?.find(area => area.id === data.idArea)?.nome}
                                    min={data.orcamentoMin}
                                    max={data.orcamentoMax}
                                    aula={data.prestaAula}
                                    mediaNota={data.mediaAvaliacoes}
                                />
                            )) : <>
                                {Array(6).fill().map((_, i) => (
                                    <div key={i}>
                                        <Skeleton width={"320px"} height={"480px"} borderRadius={"1.5rem"} />
                                    </div>
                                ))}
                            </>}
                        </div>
                    </div>
                    <div id="container_contratar" className="w-full flex p-32  flex-col">
                        <div className="w-full text-6xl font-semibold text-center">Como <span className="text-verde-padrao">contratar?</span></div>
                        <div id="conteiner_contratar" className=" mt-12 grid grid-cols-3 grid-rows-1 gap-20 self-center">
                            <div className='w-80 h-120 rounded-3xl drop-shadow-all'>
                                <div className='h-[60%] w-full rounded-t-3xl bg-white py-12'>
                                    <img src='https://i.imgur.com/tLVE79n.png' alt="" />
                                </div>
                                <div className='h-[40%] w-full rounded-b-3xl bg-white py-14 px-6 text-center'>
                                    <span className='text-2xl font-medium'>Cadastre-se e <span className="text-verde-padrao font-semibold">pesquise</span> pelo prestador que <span className="text-verde-padrao font-semibold">você precisa!</span></span>
                                </div>
                            </div>
                            <div className='w-80 h-120 rounded-3xl drop-shadow-all'>
                                <div className='h-[60%] w-full rounded-t-3xl bg-white py-12'>
                                    <img src='https://i.imgur.com/cOE0Z8a.png' alt="" />
                                </div>
                                <div className='h-[40%] w-full rounded-b-3xl bg-white py-14 px-6 text-center'>
                                    <span className='text-2xl font-medium'>Faça <span className="text-verde-padrao font-semibold">a sua escolha</span> e solicite o serviço (+ aula, se você quiser) em apenas 3 etapas!</span>
                                </div>
                            </div>
                            <div className='w-80 h-120 rounded-3xl drop-shadow-all'>
                                <div className='h-[60%] w-full rounded-t-3xl bg-white py-12'>
                                    <img src='https://i.imgur.com/vAR85g2.png' alt="" />
                                </div>
                                <div className='h-[40%] w-full rounded-b-3xl bg-white py-14 px-6 text-center'>
                                    <span className='text-2xl font-medium'>Termine de negociar pelo chat e pronto! Seu <span className="text-verde-padrao font-semibold">prestador (e professor)</span> irá até você!</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="container_ensinar" className=" w-full flex px-32 flex-col">
                        <div className="w-full text-6xl font-semibold text-center">Como <span className="text-verde-padrao">ensinar?</span></div>
                        <div id="conteiner_contratar" className=" mt-12 grid grid-cols-3 grid-rows-1 gap-20 self-center">
                            <div className='w-80 h-120 rounded-3xl drop-shadow-all'>
                                <div className='h-[60%] w-full rounded-t-3xl bg-white py-12'>
                                    <img src='https://i.imgur.com/23p0hm6.png' alt="" />
                                </div>
                                <div className='h-[40%] w-full rounded-b-3xl bg-white py-14 px-6 text-center'>
                                    <span className='text-2xl font-medium'>Cadastre-se e converse conosco para sua <span className="text-verde-padrao font-semibold">aprovação!</span></span>
                                </div>
                            </div>
                            <div className='w-80 h-120 rounded-3xl drop-shadow-all'>
                                <div className='h-[60%] w-full rounded-t-3xl bg-white py-12'>
                                    <img src='https://i.imgur.com/bHeWCih.png' alt="" />
                                </div>
                                <div className='h-[40%] w-full rounded-b-3xl bg-white py-14 px-6 text-center'>
                                    <span className='text-2xl font-medium'>Compre seu <span className="text-verde-padrao font-semibold">plano </span> e monte seu perfil!</span>
                                </div>
                            </div>
                            <div className='w-80 h-120 rounded-3xl drop-shadow-all'>
                                <div className='h-[60%] w-full rounded-t-3xl bg-white py-12'>
                                    <img src='https://i.imgur.com/up9fCD3.png' alt="" />
                                </div>
                                <div className='h-[40%] w-full rounded-b-3xl bg-white py-14 px-6 text-center'>
                                    <span className='text-2xl font-medium'>Receba solicitações de <span className="text-verde-padrao font-semibold">serviço (e ensino)</span>  e negocie pelo chat!</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="w-full relative">
                    <svg width="1920" height="288" viewBox="0 0 1920 288" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_701_17813)">
                            <path d="M0 352C0 365.807 10.8338 377 24.6409 377C168.22 377 907.084 377 1387 377C1733.96 377 1858.45 377 1903.09 377C1916.89 377 1928 365.807 1928 352V0.5V0.5C1928 12.575 1918.74 22.5535 1906.69 23.2898C1769.2 31.6889 1001.18 79.8099 618.065 129.441C249.565 177.178 53.1672 59.4728 9.44733 28.9888C3.32833 24.7222 0 17.6802 0 10.2206V4.49988V352Z" fill="#008042" />
                        </g>
                        <defs>
                            <filter id="filter0_d_701_17813" x="-4" y="0.5" width="1936" height="384.5" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="4" />
                                <feGaussianBlur stdDeviation="2" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_701_17813" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_701_17813" result="shape" />
                            </filter>
                        </defs>
                    </svg>
                </footer>
            </div>
        </>
    );
}
