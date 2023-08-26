import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRightIcon, ChevronLeftIcon, XCircleIcon } from "@heroicons/react/24/solid";
import ModalCustom from "@/components/main/ModalCustom";

export default function ModaisSolicitacaoServico(props) {

    // solicitacao
    const modalVisible1 = props.modalSolicitacao
    const [modalVisible2, setModalVisible2] = useState(false)
    const [modalVisible3, setModalVisible3] = useState(false)
    const [modalVisible4, setModalVisible4] = useState(false)
    const navigate = useNavigate()

    const closeModal = () => {
        if (props.canClose) {
            props.modalSettr(false)
        }
    }

    return (
        <>
            <ModalCustom modalGettr={modalVisible1} modalSettr={props.modalSolicitacao} canClose={true} w={'1000px'} h={'500px'}>
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
                        <div id="botoes" className="flex flex-row ml-[300px] mt-[30px] space-x-8" >
                            <div className="flex justify-center items-center rounded-full border-2  border-verde-padrao w-[120px]">
                            <ChevronLeftIcon className="text-verde-padrao w-[25px] h-[25px]" />
                                <button className="white text-verde-padrao text-lg mr-[5px] " onClick={() => { navigate("/inicio") }}>
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
                        <div id="botoes" className="flex flex-row ml-[300px] mt-[30px] space-x-8" >
                            <div className="flex justify-center items-center rounded-full border-2  border-verde-padrao w-[120px]">
                            <ChevronLeftIcon className="text-verde-padrao w-[25px] h-[25px]" />
                                <button className="white text-verde-padrao text-lg mr-[5px] " onClick={() => { setModalVisible2(false) }}>
                                    Voltar
                                </button>
                            </div>
                            <div className="bg-verde-padrao flex justify-center items-center rounded-full border-2 border-verde-padrao w-[120px]">
                                <button className="text-white text-lg ml-[5px]" onClick={() => { setModalVisible2(false);setModalVisible3(true) }}>
                                    Próximo
                                </button>
                                <ChevronRightIcon className="text-white w-[25px] h-[25px]  " />
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
            </ModalCustom>
            <ModalCustom modalGettr={modalVisible4} modalSettr={setModalVisible4} canClose={true} w={'1000px'} h={'500px'}>
                <div className="bg-white flex flex-col rounded-lg bg-cover bg-center" >
                    <div className="border-[30px] rounded-lg w-[900px] h-[450px]">
                        <div onClick={closeModal} className="ml-[790px] mt-[10px]">
                            <XCircleIcon className="w-[35px] h-[35px] text-verde-escuro-1 " ></XCircleIcon>
                        </div>
                        <div className="w-full mt-[50px] flex justify-center items-center text-verde-escuro-1 text-2xl font-extrabold">
                            SUA SOLICITAÇÃO FOI REALIZADA COM SUCESSO!
                        </div>
                        <div className="flex justify-center items-center text-black text-lg font-base text-center">
                            Aguarde o retorno do prestador!
                        </div>
                    </div>
                </div>
            </ModalCustom>

        </>

    )
}
