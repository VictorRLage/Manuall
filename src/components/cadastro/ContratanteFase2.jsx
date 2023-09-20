import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapIcon, MapPinIcon, BuildingOffice2Icon, HomeIcon, HomeModernIcon, BuildingLibraryIcon, HashtagIcon } from "@heroicons/react/24/solid";
import axios, { viaCepInstance } from "@/api/axios";
import Regex from "@/enum/RegexENUM";
import CadastroProgress from "@/components/cadastro/CadastroProgress"
import InputMask from "react-input-mask";

export default function ContratanteFase2({ mudarStep }) {

    const navigate = useNavigate()

    const [isCepValidado, setIsCepValidado] = useState();
    const [isEstadoValidado, setIsEstadoValidado] = useState();
    const [isCidadeValidado, setIsCidadeValidado] = useState();
    const [isBairroValidado, setIsBairroValidado] = useState();
    const [isRuaValidado, setIsRuaValidado] = useState();
    const [isNumeroValidado, setIsNumeroValidado] = useState();
    const [isComplementoValidado, setIsComplementoValidado] = useState();

    const cep_input = useRef(null);
    const estado_input = useRef(null);
    const cidade_input = useRef(null);
    const bairro_input = useRef(null);
    const rua_input = useRef(null);
    const numero_input = useRef(null);
    const complemento_input = useRef(null);

    const validar = {
        cep() {
            const cep = cep_input.current.value.replace(/[^0-9]/g, "")
            setIsCepValidado(Regex.CEP.test(cep))
        },
        estado() {
            const estado = estado_input.current.value
            setIsEstadoValidado(Regex.TEXT_SPACE.test(estado))
        },
        cidade() {
            const cidade = cidade_input.current.value
            setIsCidadeValidado(Regex.TEXT_SPACE.test(cidade))
        },
        bairro() {
            const bairro = bairro_input.current.value
            setIsBairroValidado(Regex.TEXT_SPACE.test(bairro))
        },
        rua() {
            const rua = rua_input.current.value
            setIsRuaValidado(Regex.TEXT_SPACE.test(rua))
        },
        numero() {
            const numero = numero_input.current.value
            setIsNumeroValidado(Regex.NUMBER.test(numero))
        },
        complemento: () => setIsComplementoValidado(true),
    }

    const buscarPorCep = () => {

        if (cep_input.current.value === "") {
            return
        }
        viaCepInstance.get(`/${cep_input.current.value}/json/`)
            .then(({ data }) => {
                if (data.erro) {
                    setValidacaoCep(1)
                } else {
                    estado_input.current.value = data.localidade
                    cidade_input.current.value = data.uf
                    bairro_input.current.value = data.bairro
                    rua_input.current.value = data.logradouro

                    if (numero_input.current.value === "") numero_input.current.focus()
                }
            })
    }

    const avancar = () => {
        const cep = cep_input.current.value
        const estado = estado_input.current.value
        const cidade = cidade_input.current.value
        const bairro = bairro_input.current.value
        const rua = rua_input.current.value
        const numero = numero_input.current.value
        const complemento = complemento_input.current.value



        // if () {
        //     setMoldaAviso(true);
        //     setAvisoTitulo("Campos inválidos");
        //     setAvisoDescricao("Preencha todos os campos");
        //     return;
        // }

        axios.put(`/cadastrar/2/${localStorage.getItem("ID_CADASTRANTE")}`, {
            cep,
            estado,
            cidade,
            bairro,
            rua,
            numero,
            complemento: complemento === "" ? null : complemento,
        })
            .then((res) => {
                if (res.status === 201) {
                    navigate("/login")
                } else {
                    setMoldaAviso(true)
                    setAvisoTitulo("Erro interno")
                    setAvisoDescricao("Por favor tente novamente mais tarde")
                }
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    setMoldaAviso(true)
                    setAvisoTitulo("Você ainda não chegou nessa fase")
                    setAvisoDescricao("Por favor tente novamente mais tarde")
                } else if (err.response.status === 409) {
                    setMoldaAviso(true)
                    setAvisoTitulo("Você já passou dessa fase")
                    setAvisoDescricao("Por favor tente novamente mais tarde")
                } else {
                    setMoldaAviso(true)
                    setAvisoTitulo("Erro interno")
                    setAvisoDescricao("Por favor tente novamente mais tarde")
                }
            })
    }

    useEffect(() => {
        if (localStorage.getItem("ID_CADASTRANTE") === null) {
            navigate("/cadastro/prestador")
        }
        if (sessionStorage.getItem("optCidade") !== undefined) {
            // rua_input.current.value = sessionStorage.getItem("optCidade")
        }
    }, []) // eslint-disable-line

    return (
        <div className="bg-white h-full min-w-[70%] flex flex-col items-center">
            <CadastroProgress fase={2} fases={2} mudarStep={mudarStep} flagIsAtLeft={false} />
            <div className="w-full h-[70%] flex flex-col items-center justify-evenly">
                <div className="w-full flex items-center justify-center gap-[2%]">
                    <div className="w-[29%] relative">
                        <InputMask
                            mask="99999-999"
                            onBlur={() => { buscarPorCep(); validar.cep() }}
                            ref={cep_input}
                            onChange={({ target: { value } }) => {
                                cep_input.current.value = value
                            }}
                            type="text"
                            id="cep"
                            placeholder=" "
                            className={`
                                block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2
                                appearance-none focus:outline-none focus:ring-0 focus:border-verde-padrao peer
                                ${isCepValidado === false ? "border-red-500" : "border-cinza-claro-1"}
                            `}
                        />
                        <label
                            htmlFor="cep"
                            className="cursor-text absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center">
                            <MapPinIcon className="h-5 w-5 mr-1" />
                            CEP
                        </label>
                        {isCepValidado === false &&
                            <label className="absolute ml-1 text-red-500 font-medium">
                                Campo inválido
                            </label>}
                    </div>
                    <div className="w-[29%] relative">
                        <input
                            onBlur={validar.estado}
                            ref={estado_input}
                            type="text"
                            id="estado"
                            placeholder=" "
                            className={`
                                block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2
                                appearance-none focus:outline-none focus:ring-0 focus:border-verde-padrao peer
                                ${isEstadoValidado === false ? "border-red-500" : "border-cinza-claro-1"}
                            `}
                        />
                        <label
                            htmlFor="estado"
                            className="cursor-text absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center">
                            <BuildingLibraryIcon className="h-5 w-5 mr-1" />
                            Estado
                        </label>
                        {isEstadoValidado === false &&
                            <label className="absolute ml-1 text-red-500 font-medium">
                                Campo inválido
                            </label>}
                    </div>
                </div>
                <div className="w-full flex items-center justify-center gap-[2%]">
                    <div className="w-[29%] relative">
                        <input
                            onBlur={validar.cidade}
                            ref={cidade_input}
                            type="text"
                            id="cidade"
                            placeholder=" "
                            className={`
                                block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2
                                appearance-none focus:outline-none focus:ring-0 focus:border-verde-padrao peer
                                ${isCidadeValidado === false ? "border-red-500" : "border-cinza-claro-1"}
                            `}
                        />
                        <label
                            htmlFor="cidade"
                            className="cursor-text absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center">
                            <BuildingOffice2Icon className="h-5 w-5 mr-1" />
                            Cidade
                        </label>
                        {isCidadeValidado === false &&
                            <label className="absolute ml-1 text-red-500 font-medium">
                                Campo inválido
                            </label>}
                    </div>
                    <div className="w-[29%] relative">
                        <input
                            onBlur={validar.bairro}
                            ref={bairro_input}
                            type="text"
                            id="bairro"
                            placeholder=" "
                            className={`
                                block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2
                                appearance-none focus:outline-none focus:ring-0 focus:border-verde-padrao peer
                                ${isBairroValidado === false ? "border-red-500" : "border-cinza-claro-1"}
                            `}
                        />
                        <label
                            htmlFor="bairro"
                            className="cursor-text absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center">
                            <HomeModernIcon className="h-5 w-5 mr-1" />
                            Bairro
                        </label>
                        {isBairroValidado === false &&
                            <label className="absolute ml-1 text-red-500 font-medium">
                                Campo inválido
                            </label>}
                    </div>
                </div>
                <div className="w-[60%] relative">
                    <input
                        onBlur={validar.rua}
                        ref={rua_input}
                        type="text"
                        id="rua"
                        placeholder=" "
                        className={`
                                block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2
                                appearance-none focus:outline-none focus:ring-0 focus:border-verde-padrao peer
                                ${isRuaValidado === false ? "border-red-500" : "border-cinza-claro-1"}
                            `}
                    />
                    <label
                        htmlFor="rua"
                        className="cursor-text absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center">
                        <MapIcon className="h-5 w-5 mr-1" />
                        Rua
                    </label>
                    {isRuaValidado === false &&
                        <label className="absolute ml-1 text-red-500 font-medium">
                            Campo inválido
                        </label>}
                </div>
                <div className="w-full flex items-center justify-center gap-[2%]">
                    <div className="w-[29%] relative">
                        <input
                            onBlur={validar.numero}
                            ref={numero_input}
                            type="text"
                            id="numero"
                            placeholder=" "
                            className={`
                                block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2
                                appearance-none focus:outline-none focus:ring-0 focus:border-verde-padrao peer
                                ${isNumeroValidado === false ? "border-red-500" : "border-cinza-claro-1"}
                            `}
                        />
                        <label
                            htmlFor="numero"
                            className="cursor-text absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center">
                            <HomeIcon className="h-5 w-5 mr-1" />
                            Número
                        </label>
                        {isNumeroValidado === false &&
                            <label className="absolute ml-1 text-red-500 font-medium">
                                Campo inválido
                            </label>}
                    </div>
                    <div className="w-[29%] relative">
                        <input
                            onBlur={validar.complemento}
                            ref={complemento_input}
                            type="text"
                            id="complemento"
                            placeholder=" "
                            className={`
                                block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2
                                appearance-none focus:outline-none focus:ring-0 focus:border-verde-padrao peer
                                ${isComplementoValidado === false ? "border-red-500" : "border-cinza-claro-1"}
                            `}
                        />
                        <label
                            htmlFor="complemento"
                            className="cursor-text absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center">
                            <HashtagIcon className="h-5 w-5 mr-1" />
                            Complemento
                        </label>
                        {isComplementoValidado === false &&
                            <label className="absolute ml-1 text-red-500 font-medium">
                                Campo inválido
                            </label>}
                    </div>
                </div>
            </div>
            <div className="w-full h-[15%] flex justify-end items-center">
                <button
                    onClick={avancar}
                    className="bg-verde-escuro-2 w-32 h-10 rounded-full text-xl mb-8 mr-16 font-semibold text-white"
                >
                    Finalizar
                </button>
            </div>
        </div>
    );
}
