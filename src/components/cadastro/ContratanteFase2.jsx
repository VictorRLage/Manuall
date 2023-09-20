import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapIcon, MapPinIcon, BuildingOffice2Icon, HomeIcon, HomeModernIcon, BuildingLibraryIcon, HashtagIcon } from "@heroicons/react/24/solid";
import axios, { viaCepInstance } from "@/api/axios";
import Regex from "../../enum/Regex";
import CadastroProgress from "@/components/cadastro/CadastroProgress"

export default function ContratanteFase2() {

    const navigate = useNavigate()

    const [validacaoCep, setValidacaoCep] = useState(0);
    const [validacaoEstado, setValidacaoEstado] = useState(0);
    const [validacaoCidade, setValidacaoCidade] = useState(0);
    const [validacaoBairro, setValidacaoBairro] = useState(0);
    const [validacaoRua, setValidacaoRua] = useState(0);
    const [validacaoNumero, setValidacaoNumero] = useState(0);
    // const [validacaoComplento, setValidacaoComplento] = useState(0);
    // 0  não mexeu ainda | 1 mexeu e não validou | 2 mexeu e validou

    const [label, setLabel] = useState("");

    const cep_input = useRef(null)
    const estado_input = useRef(null)
    const cidade_input = useRef(null)
    const bairro_input = useRef(null)
    const rua_input = useRef(null)
    const numero_input = useRef(null)
    const complemento_input = useRef(null)


    const validarCep = () => {

        const cep = cep_input.current.value

        if (!cep || !Regex.CEP.test(cep) || !Regex.NUMBER.test(cep)) {
            setLabel("Campo inválido")
            setValidacaoCep(1)
        } else {
            setValidacaoCep(2)
        }
    }

    const validarCidade = () => setValidacaoCidade(2)

    const validarEstado = () => setValidacaoEstado(2)

    const validarBairro = () => setValidacaoBairro(2)

    const validarRua = () => setValidacaoRua(2)

    const validarNumero = () => {
        const numero = numero_input.current.value

        if (!numero || !numero <= 0 || !Regex.NUMBER.test(numero)) {
            setLabel("Campo inválido")
            setValidacaoNumero(1)
        } else {
            setValidacaoNumero(2)
        }
    }

    const buscarPorCep = () => {
        if (cep_input.current.value === "") {
            return
        }
        viaCepInstance.get(`/${cep_input.current.value}/json/`)
            .then(({ data }) => {
                if (data.erro) {
                    setLabel("CEP inexistente")
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

        const validacoes = [
            validacaoCep,
            validacaoEstado,
            validacaoCidade,
            validacaoBairro,
            validacaoRua,
            validacaoNumero
        ];
        if (validacoes.every(validacao => validacao !== 2)) {
            setMoldaAviso(true);
            setAvisoTitulo("Campos inválidos");
            setAvisoDescricao("Preencha todos os campos");
            return;
        }

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
            rua_input.current.value = sessionStorage.getItem("optCidade")
        }
    }, []) // eslint-disable-line

    return (
        <div className="bg-white h-full min-w-[70%] flex flex-col">
            <CadastroProgress fase={2} fases={2} flagIsAtLeft={false} />
            <div className="rounded-lg self-center grid grid-cols-16x16 items-center gap-8 mt-6">
                <div className="relative">
                    <input onBlur={() => { buscarPorCep(); validarCep() }} ref={cep_input} type="text" className={`block px-2.5 pb-2.5 pt-4 w-full 2xl:text-lg xl:text-base text-gray-900 bg-transparent rounded-lg border-2  ${validacaoCep === 1 ? `border-red-500` : `border-cinza-claro-1`}  appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer`} placeholder=" " />
                    <label htmlFor="cep_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><MapPinIcon className="2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1" />CEP</label>
                    {validacaoCep !== 1 ? null : <label className="absolute ml-1 text-red-500 font-medium">{label}</label>}
                </div>
                <div className="relative">
                    <input onBlur={() => { validarCidade() }} ref={cidade_input} type="text" className={`block px-2.5 pb-2.5 pt-4 w-full 2xl:text-lg xl:text-base text-gray-900 bg-transparent rounded-lg border-2  ${validacaoCidade === 1 ? `border-red-500` : `border-cinza-claro-1`}  appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer`} placeholder=" " />
                    <label htmlFor="cidade_inp" className="absolute xl:text-lg 2xl:text-xl  text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><BuildingLibraryIcon className="2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1" />Estado </label>
                    {validacaoCidade !== 1 ? null : <label className="absolute ml-1 text-red-500 font-medium">{label}</label>}
                </div>
                <div className="relative">
                    <input onBlur={() => { validarEstado() }} ref={estado_input} type="text" className={`block px-2.5 pb-2.5 pt-4 w-full 2xl:text-lg xl:text-base text-gray-900 bg-transparent rounded-lg border-2  ${validacaoEstado === 1 ? `border-red-500` : `border-cinza-claro-1`}  appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer`} placeholder=" " />
                    <label htmlFor="estado_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><BuildingOffice2Icon className="2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1" />Cidade</label>
                    {validacaoEstado !== 1 ? null : <label className="absolute ml-1 text-red-500 font-medium">{label}</label>}
                </div>
                <div className="relative">
                    <input onBlur={() => { validarBairro() }} ref={bairro_input} type="text" className={`block px-2.5 pb-2.5 pt-4 w-full 2xl:text-lg xl:text-base text-gray-900 bg-transparent rounded-lg border-2  ${validacaoBairro === 1 ? `border-red-500` : `border-cinza-claro-1`}  appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer`} placeholder=" " />
                    <label htmlFor="bairro_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><HomeModernIcon className="2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1" />Bairro</label>
                    {validacaoBairro !== 1 ? null : <label className="absolute ml-1 text-red-500 font-medium">{label}</label>}

                </div>
                <div className="relative col-span-2">
                    <input onBlur={() => { validarRua() }} ref={rua_input} type="text" className={`block px-2.5 pb-2.5 pt-4 w-full 2xl:text-lg xl:text-base text-gray-900 bg-transparent rounded-lg border-2  ${validacaoRua === 1 ? `border-red-500` : `border-cinza-claro-1`}  appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer`} placeholder=" " />
                    <label htmlFor="rua_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><MapIcon className="2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1" />Rua</label>
                    {validacaoRua !== 1 ? null : <label className="absolute ml-1 text-red-500 font-medium">{label}</label>}

                </div>
                <div className="relative">
                    <input onBlur={() => { validarNumero() }} ref={numero_input} maxLength={9} type="text" className={`block px-2.5 pb-2.5 pt-4 w-full 2xl:text-lg xl:text-base text-gray-900 bg-transparent rounded-lg border-2  ${validacaoNumero === 1 ? `border-red-500` : `border-cinza-claro-1`}  appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer`} placeholder=" " />
                    <label htmlFor="numero_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><HomeIcon className="2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1" />Número</label>
                    {validacaoNumero !== 1 ? null : <label className="absolute ml-1 text-red-500 font-medium">{label}</label>}
                </div>
                <div className="relative">
                    <input ref={complemento_input} type="text" className="block px-2.5 pb-2.5 pt-4 w-full 2xl:text-sm xl:text-xs text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer" placeholder=" " />
                    <label htmlFor="complemento_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><HashtagIcon className="2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1" />Complemento</label>
                </div>
            </div>
            <div className="w-full h-10 flex justify-end ">
                <button onClick={avancar} className="bg-verde-escuro-2 2xl:w-40 2xl:h-12 xl:w-32 xl:h-10 rounded-full 2xl:text-2xl xl:text-xl 2xl:mr-16 xl:mr-16 2xl:mt-9 xl:mt-3 font-semibold text-white ">Finalizar</button>
            </div>
        </div>
    );
}
