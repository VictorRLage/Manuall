import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDoubleRightIcon, MapIcon, MapPinIcon, BuildingOffice2Icon, HomeIcon, HomeModernIcon, BuildingLibraryIcon, HashtagIcon, ChevronDoubleLeftIcon } from "@heroicons/react/24/solid";
import logo_extensa from "@/assets/img/logo_manuall_extensa_branca.png";
import axios from "@/api/AxiosConfig";
import { viaCep } from "@/api/AxiosConfig";
import ModalAviso from "@/components/main/ModalAviso";

export default function CadastroPrestadorStep2(props) {

    const [modalAviso, setMoldaAviso] = useState(false)
    const [avisoTitulo, setAvisoTitulo] = useState('')
    const [avisoDescricao, setAvisoDescricao] = useState('')

    const navigate = useNavigate()

    const [validacaoCep, setValidacaoCep] = useState(0);
    const [validacaoEstado, setValidacaoEstado] = useState(0);
    const [validacaoCidade, setValidacaoCidade] = useState(0);
    const [validacaoBairro, setValidacaoBairro] = useState(0);
    const [validacaoRua, setValidacaoRua] = useState(0);
    const [validacaoNumero, setValidacaoNumero] = useState(0);
    // 0  não mexeu ainda | 1 mexeu e não validou | 2 mexeu e validou

    const [label, setLabel] = useState('');

    const cep_input = useRef(null)
    const estado_input = useRef(null)
    const cidade_input = useRef(null)
    const bairro_input = useRef(null)
    const rua_input = useRef(null)
    const numero_input = useRef(null)
    const complemento_input = useRef(null)


    const validarCep = () => {

        const cep = cep_input.current.value

        if (
            cep === "" ||
            cep.indexOf("a") !== -1 ||
            cep.indexOf("b") !== -1 ||
            cep.indexOf("c") !== -1 ||
            cep.indexOf("d") !== -1 ||
            cep.indexOf("e") !== -1 ||
            cep.indexOf("f") !== -1 ||
            cep.indexOf("g") !== -1 ||
            cep.indexOf("h") !== -1 ||
            cep.indexOf("i") !== -1 ||
            cep.indexOf("j") !== -1 ||
            cep.indexOf("k") !== -1 ||
            cep.indexOf("l") !== -1 ||
            cep.indexOf("m") !== -1 ||
            cep.indexOf("n") !== -1 ||
            cep.indexOf("o") !== -1 ||
            cep.indexOf("p") !== -1 ||
            cep.indexOf("q") !== -1 ||
            cep.indexOf("r") !== -1 ||
            cep.indexOf("s") !== -1 ||
            cep.indexOf("t") !== -1 ||
            cep.indexOf("u") !== -1 ||
            cep.indexOf("v") !== -1 ||
            cep.indexOf("W") !== -1 ||
            cep.indexOf("x") !== -1 ||
            cep.indexOf("y") !== -1 ||
            cep.indexOf("z") !== -1 ||
            cep.indexOf("A") !== -1 ||
            cep.indexOf("B") !== -1 ||
            cep.indexOf("C") !== -1 ||
            cep.indexOf("D") !== -1 ||
            cep.indexOf("E") !== -1 ||
            cep.indexOf("F") !== -1 ||
            cep.indexOf("G") !== -1 ||
            cep.indexOf("H") !== -1 ||
            cep.indexOf("I") !== -1 ||
            cep.indexOf("J") !== -1 ||
            cep.indexOf("K") !== -1 ||
            cep.indexOf("L") !== -1 ||
            cep.indexOf("M") !== -1 ||
            cep.indexOf("N") !== -1 ||
            cep.indexOf("O") !== -1 ||
            cep.indexOf("P") !== -1 ||
            cep.indexOf("Q") !== -1 ||
            cep.indexOf("R") !== -1 ||
            cep.indexOf("S") !== -1 ||
            cep.indexOf("T") !== -1 ||
            cep.indexOf("U") !== -1 ||
            cep.indexOf("V") !== -1 ||
            cep.indexOf("W") !== -1 ||
            cep.indexOf("X") !== -1 ||
            cep.indexOf("Y") !== -1 ||
            cep.indexOf("Z") !== -1 ||
            cep.indexOf("!") !== -1 ||
            cep.indexOf("@") !== -1 ||
            cep.indexOf("#") !== -1 ||
            cep.indexOf("$") !== -1 ||
            cep.indexOf("%") !== -1 ||
            cep.indexOf("&") !== -1 ||
            cep.indexOf("-") !== -1 ||
            cep.length !== 8
        ) {
            setLabel('Campo inválido')
            setValidacaoCep(1)
            return
        } else {
            setValidacaoCep(2)
        }
    }

    const validarCidade = () => {

        setValidacaoCidade(2)

    }

    const validarEstado = () => {

        setValidacaoEstado(2)

    }

    const validarBairro = () => {

        setValidacaoBairro(2)

    }

    const validarRua = () => {

        setValidacaoRua(2)

    }

    const validarNumero = () => {

        const numero = numero_input.current.value

        if (
            numero === "" ||
            numero.indexOf("a") !== -1 ||
            numero.indexOf("b") !== -1 ||
            numero.indexOf("c") !== -1 ||
            numero.indexOf("d") !== -1 ||
            numero.indexOf("e") !== -1 ||
            numero.indexOf("f") !== -1 ||
            numero.indexOf("g") !== -1 ||
            numero.indexOf("h") !== -1 ||
            numero.indexOf("i") !== -1 ||
            numero.indexOf("j") !== -1 ||
            numero.indexOf("k") !== -1 ||
            numero.indexOf("l") !== -1 ||
            numero.indexOf("m") !== -1 ||
            numero.indexOf("n") !== -1 ||
            numero.indexOf("o") !== -1 ||
            numero.indexOf("p") !== -1 ||
            numero.indexOf("q") !== -1 ||
            numero.indexOf("r") !== -1 ||
            numero.indexOf("s") !== -1 ||
            numero.indexOf("t") !== -1 ||
            numero.indexOf("u") !== -1 ||
            numero.indexOf("v") !== -1 ||
            numero.indexOf("W") !== -1 ||
            numero.indexOf("x") !== -1 ||
            numero.indexOf("y") !== -1 ||
            numero.indexOf("z") !== -1 ||
            numero.indexOf("A") !== -1 ||
            numero.indexOf("B") !== -1 ||
            numero.indexOf("C") !== -1 ||
            numero.indexOf("D") !== -1 ||
            numero.indexOf("E") !== -1 ||
            numero.indexOf("F") !== -1 ||
            numero.indexOf("G") !== -1 ||
            numero.indexOf("H") !== -1 ||
            numero.indexOf("I") !== -1 ||
            numero.indexOf("J") !== -1 ||
            numero.indexOf("K") !== -1 ||
            numero.indexOf("L") !== -1 ||
            numero.indexOf("M") !== -1 ||
            numero.indexOf("N") !== -1 ||
            numero.indexOf("O") !== -1 ||
            numero.indexOf("P") !== -1 ||
            numero.indexOf("Q") !== -1 ||
            numero.indexOf("R") !== -1 ||
            numero.indexOf("S") !== -1 ||
            numero.indexOf("T") !== -1 ||
            numero.indexOf("U") !== -1 ||
            numero.indexOf("V") !== -1 ||
            numero.indexOf("W") !== -1 ||
            numero.indexOf("X") !== -1 ||
            numero.indexOf("Y") !== -1 ||
            numero.indexOf("Z") !== -1 ||
            numero.indexOf("!") !== -1 ||
            numero.indexOf("@") !== -1 ||
            numero.indexOf("#") !== -1 ||
            numero.indexOf("$") !== -1 ||
            numero.indexOf("%") !== -1 ||
            numero.indexOf("&") !== -1 ||
            numero.indexOf("-") !== -1 ||
            numero <= 0 ||
            numero.length >= 9
        ) {
            setLabel('Campo inválido')
            setValidacaoNumero(1)
            return
        } else {
            setValidacaoNumero(2)
        }

    }



    const buscarPorCep = () => {
        if (cep_input.current.value === "") {
            return
        }
        viaCep.get(`/${cep_input.current.value}/json/`)
            .then((res) => {
                const e = res.data
                console.log(e)
                if (e.erro) {
                    setLabel('CEP inexistente')
                    setValidacaoCep(1)
                } else {
                    estado_input.current.value = e.localidade
                    cidade_input.current.value = e.uf
                    bairro_input.current.value = e.bairro
                    rua_input.current.value = e.logradouro

                    if (numero_input.current.value === "") {
                        numero_input.current.focus()
                    }
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

        if (
            validacaoCep !== 2 &&
            validacaoEstado !== 2 &&
            validacaoCidade !== 2 &&
            validacaoBairro !== 2 &&
            validacaoRua !== 2 &&
            validacaoNumero !== 2
        ) {
            setMoldaAviso(true)
            setAvisoTitulo('Campos inválidos')
            setAvisoDescricao('Preencha todos os campos')
            return
        }
        axios.put(`/cadastrar/2/${localStorage.getItem("ID_CADASTRANTE")}`, {
            cep: cep,
            estado: estado,
            cidade: cidade,
            bairro: bairro,
            rua: rua,
            numero: numero,
            complemento: complemento === "" ? null : complemento,
        })
            .then((res) => {
                if (res.status === 201) {
                    console.log('cadastrou')
                    props.passarStep()
                } else {
                    setMoldaAviso(true)
                    setAvisoTitulo('Erro interno')
                    setAvisoDescricao('Por favor tente novamente mais tarde')
                }
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    setMoldaAviso(true)
                    setAvisoTitulo('Você ainda não chegou nessa fase')
                    setAvisoDescricao('Por favor tente novamente mais tarde')
                } else if (err.response.status === 409) {
                    setMoldaAviso(true)
                    setAvisoTitulo('Você já passou dessa fase')
                    setAvisoDescricao('Por favor tente novamente mais tarde')
                } else {
                    setMoldaAviso(true)
                    setAvisoTitulo('Erro interno')
                    setAvisoDescricao('Por favor tente novamente mais tarde')
                }
            })
    }

    useEffect(() => {
        if (localStorage.getItem("ID_CADASTRANTE") === null) {
            navigate("/cadastroPrestador")
        }
        if (sessionStorage.getItem("optCidade") !== undefined) {
            rua_input.current.value = sessionStorage.getItem("optCidade")
        }
    }, []) // eslint-disable-line

    return (
        <div className="flex justify-center h-screen">
            {modalAviso ? <ModalAviso titulo={avisoTitulo} descricao={avisoDescricao} tempo={10000} modal={setMoldaAviso} /> : null}
            <div id='container' className="bg-white 2xl:h-144 2xl:w-288 xl:h-120 xl:w-240 self-center rounded-lg drop-shadow-all flex flex-row">
                <div id="container_esquerda" className="bg-verde-padrao h-full w-30per rounded-l-lg flex flex-col ">
                    <img src={logo_extensa} alt="Logo da Manuall por extensa" className='2xl:w-60 xl:w-52 2xl:mt-12 xl:mt-10 self-center' />
                    <p className='2xl:text-4xl xl:text-2xl  font-bold text-white w-full self-center 2xl:leading-relaxed text-center 2xl:mt-10 xl:mt-8'>Cadastro de <br /> Prestador</p>
                    <p className='2xl:text-2xl xl:text-xl  font-semibold text-white w-full self-center 2xl:leading-relaxed text-center mt-32'>Já possui uma conta?</p>
                    <button className='2xl:text-2xl xl:text-xl font-bold text-white w-full text-center underline' onClick={() => { navigate("/login") }}>Entre aqui</button>
                    <button onClick={() => { navigate("/") }} className='2xl:text-2xl xl:text-xl font-bold text-white self-center leading-relaxed 2xl:mt-13 xl:mt-12.5 flex items-center'> <ChevronDoubleLeftIcon className='2xl:h-10 2xl:w-10 xl:h-8 xl:w-8' /> Voltar à Tela inicial</button>
                </div>
                <div id='container_direita' className='bg-white h-full w-70per rounded-r-lg flex flex-col'>
                    <div id="container_steps" className="flex 2xl:h-16 xl:h-14 w-full justify-center items-center 2xl:mt-8 xl:mt-6">
                        <div id="step_1" className="bg-verde-padrao rounded-full 2xl:h-12 2xl:w-12 xl:h-10 xl:w-10"></div>
                        <div id="linha" className="bg-verde-padrao h-1 2xl:w-14 xl:w-10"></div>
                        <div id="step_2" className="bg-white border-4 border-verde-padrao rounded-full 2xl:h-12 2xl:w-12 xl:h-10 xl:w-10 "></div>
                        <div id="linha" className="bg-black h-1 2xl:w-14 xl:w-10"></div>
                        <div id="step_3" onClick={props.passarStep} className="bg-white border-2 border-black rounded-full 2xl:h-12 2xl:w-12 xl:h-10 xl:w-10"></div>
                    </div>
                    <div id="container-inputs" className="rounded-lg  self-center grid 2xl:grid-cols-16x16 xl:grid-cols-16x16  items-center 2xl:gap-10 xl:gap-8 2xl:mt-8 xl:mt-6">
                        <div className="relative">
                            <input onBlur={() => { buscarPorCep(); validarCep() }} ref={cep_input} type="text" id="cep_inp" className={`block px-2.5 pb-2.5 pt-4 w-full 2xl:text-lg xl:text-base text-gray-900 bg-transparent rounded-lg border-2  ${validacaoCep === 1 ? `border-red-500` : `border-cinza-claro-1`}  appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer`} placeholder=" " />
                            <label htmlFor="cep_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><MapPinIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />CEP</label>
                            {validacaoCep !== 1 ? null : <label className="absolute ml-1 text-red-500 font-medium">{label}</label>}
                        </div>
                        <div className="relative">
                            <input onBlur={() => { validarCidade() }} ref={cidade_input} type="text" id="cidade_inp" className={`block px-2.5 pb-2.5 pt-4 w-full 2xl:text-lg xl:text-base text-gray-900 bg-transparent rounded-lg border-2  ${validacaoCidade === 1 ? `border-red-500` : `border-cinza-claro-1`}  appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer`} placeholder=" " />
                            <label htmlFor="cidade_inp" className="absolute xl:text-lg 2xl:text-xl  text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><BuildingLibraryIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Estado </label>
                            {validacaoCidade !== 1 ? null : <label className="absolute ml-1 text-red-500 font-medium">{label}</label>}
                        </div>
                        <div className="relative">
                            <input onBlur={() => { validarEstado() }} ref={estado_input} type="text" id="estado_inp" className={`block px-2.5 pb-2.5 pt-4 w-full 2xl:text-lg xl:text-base text-gray-900 bg-transparent rounded-lg border-2  ${validacaoEstado === 1 ? `border-red-500` : `border-cinza-claro-1`}  appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer`} placeholder=" " />
                            <label htmlFor="estado_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><BuildingOffice2Icon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Cidade</label>
                            {validacaoEstado !== 1 ? null : <label className="absolute ml-1 text-red-500 font-medium">{label}</label>}
                        </div>
                        <div className="relative">
                            <input onBlur={() => { validarBairro() }} ref={bairro_input} type="text" id="bairro_inp" className={`block px-2.5 pb-2.5 pt-4 w-full 2xl:text-lg xl:text-base text-gray-900 bg-transparent rounded-lg border-2  ${validacaoBairro === 1 ? `border-red-500` : `border-cinza-claro-1`}  appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer`} placeholder=" " />
                            <label htmlFor="bairro_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><HomeModernIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Bairro</label>
                            {validacaoBairro !== 1 ? null : <label className="absolute ml-1 text-red-500 font-medium">{label}</label>}

                        </div>
                        <div className="relative col-span-2">
                            <input onBlur={() => { validarRua() }} ref={rua_input} type="text" id="rua_inp" className={`block px-2.5 pb-2.5 pt-4 w-full 2xl:text-lg xl:text-base text-gray-900 bg-transparent rounded-lg border-2  ${validacaoRua === 1 ? `border-red-500` : `border-cinza-claro-1`}  appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer`} placeholder=" " />
                            <label htmlFor="rua_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><MapIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Rua</label>
                            {validacaoRua !== 1 ? null : <label className="absolute ml-1 text-red-500 font-medium">{label}</label>}

                        </div>
                        <div className="relative">
                            <input onBlur={() => { validarNumero() }} ref={numero_input} type="text" id="numero_inp" className={`block px-2.5 pb-2.5 pt-4 w-full 2xl:text-lg xl:text-base text-gray-900 bg-transparent rounded-lg border-2  ${validacaoNumero === 1 ? `border-red-500` : `border-cinza-claro-1`}  appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer`} placeholder=" " />
                            <label htmlFor="numero_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><HomeIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Número</label>
                            {validacaoNumero !== 1 ? null : <label className="absolute ml-1 text-red-500 font-medium">{label}</label>}
                        </div>
                        <div className="relative">
                            <input ref={complemento_input} type="text" id="complemento_inp" className="block px-2.5 pb-2.5 pt-4 w-full 2xl:text-sm xl:text-xs text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer" placeholder=" " />
                            <label htmlFor="complemento_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><HashtagIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Complemento</label>
                        </div>
                    </div>
                    <div id="container_proximo" className="w-full h-10 flex justify-end">
						<button className="2xl:text-2xl xl:text-xl 2xl:mr-12 xl:mr-11 2xl:mt-16 xl:mt-12 font-bold text-verde-padrao flex items-center" onClick={avancar}>Próximo <ChevronDoubleRightIcon className='2xl:h-10 2xl:w-10 xl:h-8 xl:w-8' /></button>
					</div>
                </div>
            </div>
        </div>

    );
}
