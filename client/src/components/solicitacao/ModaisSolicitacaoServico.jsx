import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRightIcon, ChevronLeftIcon, XCircleIcon, PhotoIcon } from "@heroicons/react/24/solid";
import ModalCustom from "@/components/main/ModalCustom";
import WaitingBro from "@/assets/svg/Waiting_bro.svg"
import SentMessage from "@/assets/svg/SentMessage.svg"
import CantoEsquerdo from "@/assets/svg/CantoEsquerdo.svg"
import CantoDireito from "@/assets/svg/CantoDireito.svg"
import axios from "@/api/AxiosConfig";

export default function ModaisSolicitacaoServico(props) {

    // solicitacao
    const modalVisible1 = props.modalSolicitacao
    const [modalVisible2, setModalVisible2] = useState(false)
    const [modalVisible3, setModalVisible3] = useState(false)
    const [modalVisible4, setModalVisible4] = useState(false)
    const navigate = useNavigate()
    // solictacao etapa2 select
    const [validacaoServico, setValidacaoServico] = useState(0);
    const [dropDown, setdropDown] = useState(false)
    const [mapServico, setMapServico] = useState(false)
    const [servicos, setServicos] = useState([])

    const closeModal = () => {
        if (props.canClose) {
            // props.modalSettr(false)
            console.log(props)
        }
    }
    

    useEffect(() => {
        axios.get(`solicitacao/servicos/1`) // pegar a info dinâmica do ID do prestador
            .then((response) => {
                let servicosPrestador = []
                for (let i = 0; i < response.data.length; i++) {
                    servicosPrestador.push({
                        item: response.data[i]
                    })
                }
                setServicos(servicosPrestador)
            })
    }, [])

    const alterarChecked = (index, check) => {
        const s = [...servicos]

        s[index].checked = check

        setServicos(s)
    }


    return (
        <>
            <ModalCustom modalGettr={modalVisible1} modalSettr={props.modalSolicitacao} canClose={true} w={'1000px'} h={'500px'}>
                <div className="relative w-full h-full flex flex-col justify-center items-center">
                    <img src={CantoEsquerdo} alt="" className="absolute top-0 left-0 w-[170px]" />
                    <img src={CantoDireito} alt="" className="absolute bottom-0 right-0 w-[150px]" />
                    <div className="bg-white flex flex-col rounded-lg bg-cover bg-center " >
                        <div className="border-[30px] rounded-lg w-[900px] h-[450px] flex flex-col justify-center items-center">
                            <div className="bg-cinza flex w-[450px] h-[15px] rounded-full mt-[10px]">
                                <div className="bg-verde-padrao w-[150px] rounded-full">
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center text-black text-2xl font-extrabold mt-3">
                                Qual serviço você necessita?
                            </div>
                            <div className="flex flex-col m-5 justify-center items-center text-black text-2xl font-base text-center gap-2">
                                {/* para integrar rota */}
                            {servicos.map((data, index) => (
                                <div key={index} className="block min-h-6">
                                    <label className='flex items-center'>
                                        <input className="bg-verde-escuro-1 w-[60px]" onChange={(e) => { alterarChecked(index, e.target.checked) }} id={data.item.id} type="checkbox" />
                                        <label htmlFor={data.item.id} className="cursor-pointer select-none text-slate-700 mx-2 text-xl">{data.item.nome}</label>
                                    </label>
                                </div>
                                ))}
                            </div>
                            <div id="botoes" className="flex flex-row mt-[15px] space-x-8" >
                                <div className="flex justify-center items-center rounded-full border-2  border-verde-padrao w-[120px]">
                                    <ChevronLeftIcon className="text-verde-padrao w-[25px] h-[25px]" />
                                    <button className="white text-verde-padrao text-lg mr-[5px] " onClick={() => { props.modalSettr(false) }}>
                                        Voltar
                                    </button>
                                </div>
                                <div className="bg-verde-padrao flex justify-center items-center rounded-full border-2 border-verde-padrao w-[120px]">
                                    <button className="text-white text-lg ml-[5px]" onClick={() => { setModalVisible2(true) }}>
                                        Próximo
                                    </button>
                                    <ChevronRightIcon className="text-white w-[25px] h-[25px]  " />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </ModalCustom>
            <ModalCustom modalGettr={modalVisible2} modalSettr={setModalVisible2} canClose={false} w={'1000px'} h={'500px'}>
                <div className="relative w-full h-full flex flex-col justify-center items-center">
                    <img src={CantoEsquerdo} alt="" className="absolute top-0 left-0 w-[170px]" />
                    <img src={CantoDireito} alt="" className="absolute bottom-0 right-0 w-[150px]" />
                    <div className="bg-white flex flex-col rounded-lg bg-cover bg-center " >
                        <div className="border-[30px] rounded-lg w-[900px] h-[450px] flex flex-col justify-center items-center">
                            <div className="bg-cinza flex w-[450px] h-[15px] rounded-full mt-[10px]">
                                <div className="bg-verde-padrao w-[300px] rounded-full">
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center text-black text-2xl font-extrabold mt-3">
                                Informe o tamanho e a medida do serviço:
                            </div>
                            <div className=" shadow-xl flex flex-row p-[50px] w-[275px] mt-[20px] rounded-lg border-verde-escuro-1 border-2 justify-center items-center text-black text-2xl font-base text-center gap-2">
                                <input placeholder="Tamanho" type="text" className="w-[95px] text-lg" />
                                <select className="cursor-pointer flex items-center w-[180px] text-xl font-bold h-14 bg-white border hover:border-gray-500 rounded shadow leading-tight focus:outline-none focus:shadow-outline" name="" id="">
                                    <option className="z-50 absolute w-full bg-white border hover:border-gray-500 rounded shadow leading-tight focus:outline-none focus:shadow-outline" value="">Unidade</option>
                                    <option className="z-50 absolute w-full bg-white border hover:border-gray-500 rounded shadow leading-tight focus:outline-none focus:shadow-outline" value="">m²</option>
                                    <option className="z-50 absolute w-full bg-white border hover:border-gray-500 rounded shadow leading-tight focus:outline-none focus:shadow-outline" value="">m</option>
                                    <option className="z-50 absolute w-full bg-white border hover:border-gray-500 rounded shadow leading-tight focus:outline-none focus:shadow-outline" value="">cm</option>
                                </select>
                            </div>
                            <img src={SentMessage} alt="Ícone de rapaz enviando arquivo" className="w-[200px] absolute bottom-0 left-0 ml-[75px] mb-[55px]" />
                            <div id="botoes" className="flex flex-row mt-[30px] space-x-8" >
                                <div className="flex justify-center items-center rounded-full border-2  border-verde-padrao w-[120px]">
                                    <ChevronLeftIcon className="text-verde-padrao w-[25px] h-[25px]" />
                                    <button className="white text-verde-padrao text-lg mr-[5px] " onClick={() => { setModalVisible2(false) }}>
                                        Voltar
                                    </button>
                                </div>
                                <div className="bg-verde-padrao flex justify-center items-center rounded-full border-2 border-verde-padrao w-[120px]">
                                    <button className="text-white text-lg ml-[5px]" onClick={() => { setModalVisible2(false); setModalVisible3(true) }}>
                                        Próximo
                                    </button>
                                    <ChevronRightIcon className="text-white w-[25px] h-[25px]  " />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </ModalCustom>
            <ModalCustom modalGettr={modalVisible3} modalSettr={setModalVisible3} canClose={false} w={'1000px'} h={'500px'}>
                <div className="relative w-full h-full flex flex-col justify-center items-center">
                    <img src={CantoEsquerdo} alt="" className="absolute top-0 left-0 w-[170px]" />
                    <img src={CantoDireito} alt="" className="absolute bottom-0 right-0 w-[150px]" />
                    <div className="bg-white flex flex-col rounded-lg bg-cover bg-center " >
                        <div className="border-[30px] rounded-lg w-[900px] h-[450px] flex flex-col justify-center items-center">
                            <div className="bg-cinza flex w-[450px] h-[15px] rounded-full mt-[10px]">
                                <div className="bg-verde-padrao w-[450px] rounded-full">
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center text-black text-2xl font-extrabold mt-3">
                                Algo mais a acrescentar? (Opcional)
                            </div>
                            <div className="flex flex-col mt-[20px] w-[422px] h-[92px] rounded-lg border-verde-escuro-1 border-2 justify-center text-black text-2xl">
                                <input placeholder="Descreva mais sobre o serviço/aula desejado" type="text" className="flex w-full h-full text-lg rounded-lg px-[10px]" />

                            </div>
                            <div className="shadow-xl flex flex-col mt-[20px] w-[90px] h-[100px] px-2 rounded-lg border-verde-escuro-1 border-2 justify-center items-center text-black text-xs text-center">
                                <PhotoIcon className="w-[50px] h-[50px] text-verde-escuro-1" />
                                Insira aqui sua mídia

                            </div>
                            <div id="botoes" className="flex flex-row mt-[30px] space-x-8" >
                                <div className="flex justify-center items-center rounded-full border-2  border-verde-padrao w-[120px]">
                                    <ChevronLeftIcon className="text-verde-padrao w-[25px] h-[25px]" />
                                    <button className="white text-verde-padrao text-lg mr-[5px] " onClick={() => { setModalVisible2(true); setModalVisible3(false) }}>
                                        Voltar
                                    </button>
                                </div>
                                <div className="bg-verde-padrao flex justify-center items-center rounded-full border-2 border-verde-padrao w-[120px]">
                                    <button className="text-white text-lg ml-[5px]" onClick={() => { setModalVisible4(true); setModalVisible3(false) }}>
                                        Enviar
                                    </button>
                                    <ChevronRightIcon className="text-white w-[25px] h-[25px]  " />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </ModalCustom>
            <ModalCustom modalGettr={modalVisible4} modalSettr={setModalVisible4} canClose={true} w={'1000px'} h={'500px'}>
                <div className="relative w-full h-full flex flex-col justify-center items-center">
                    <img src={CantoEsquerdo} alt="" className="absolute top-0 left-0 w-[170px]" />
                    <img src={CantoDireito} alt="" className="absolute bottom-0 right-0 w-[150px]" />
                    <div className="bg-white flex flex-col justify-center items-center rounded-lg bg-cover bg-center" >
                        <div className="flex flex-col justify-center items-center border-[30px] rounded-lg w-[900px] h-[450px]">
                            <div onClick={() => { props.modalSettr(false) }} className="absolute top-0 right-0 mr-[15px] mt-[10px]">
                                <XCircleIcon className="w-[35px] h-[35px] mr-[75px] mt-[60px] text-verde-escuro-1 " ></XCircleIcon>
                            </div>
                            <div className="w-full mt-[40px] flex justify-center items-center text-verde-escuro-1 text-2xl font-extrabold">
                                SUA SOLICITAÇÃO FOI REALIZADA COM SUCESSO!
                            </div>
                            <div className="flex justify-center items-center text-black text-lg font-base text-center">
                                Aguarde o retorno do prestador!
                            </div>
                            <img src={WaitingBro} alt="Ícone de Rapaz esperando" className="w-[450px] " />
                        </div>
                    </div>
                </div>

            </ModalCustom>

        </>

    )
}