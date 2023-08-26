import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactSlider from "react-slider";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/solid";
import axios from "@/api/AxiosConfig";
import ModalAviso from "@/components/main/ModalAviso";
import ModalCustom from "@/components/main/ModalCustom";
import bgmodal from "@/assets/img/bg-modal.png";

export default function CadastroPrestadorStep3(props) {

    const [modalAviso, setMoldaAviso] = useState(false)
    const [avisoTitulo, setAvisoTitulo] = useState('')
    const [avisoDescricao, setAvisoDescricao] = useState('')

    const [validacaoArea, setValidacaoArea] = useState(0);
    const [validacaoServico, setValidacaoServico] = useState(0);
    const [validacaoEnsinar, setValidacaoEnsinar] = useState(0);
    const [validacaoValorMin, setValidacaoValorMin] = useState(0);
    const [validacaoValorMax, setValidacaoValorMax] = useState(0);

    const [label, setLabel] = useState('');

    const navigate = useNavigate()

    const [areas, setAreas] = useState([])
    const [servicos, setServicos] = useState([])
    const [mapArea, setMapArea] = useState(false)
    const [mapServico, setMapServico] = useState(false)
    const [selectedArea, setSelectedArea] = useState(0)
    const [dropDown, setdropDown] = useState(false)
    const [range, setRange] = useState([1500, 3500])
    const [modalVisible, setModalVisible] = useState(false)

    const area_input = useRef(null)
    const ensinar_input = useRef(null)
    const min = useRef(null)
    const max = useRef(null)

    const validarArea = () => {
        const area = area_input.current.value
        console.log(area)

        if (
            area === '0'
        ) {
            setLabel('Campo inválido')
            setValidacaoArea(1)
        } else{
            setValidacaoArea(2)
        }
    }

    const validarServico = () =>{

        let servicosSelecionados = []
        let algumSelecionado = false
        for (let i = 0; i < servicos.length; i++) {
            if (servicos[i].checked) {
                servicosSelecionados.push(servicos[i].item.id)
                algumSelecionado = true
            }
        }

        if(
            !algumSelecionado
        ){
            setLabel('Campo inválido')
            setValidacaoServico(1)
        } else{
            setValidacaoServico(2)
        }

    }

    const validarEnsinar = () => {
        const ensinar = ensinar_input.current.value
        console.log(ensinar)


        if (
            ensinar === '0'
        ) {
            setLabel('Campo inválido')
            setValidacaoEnsinar(1)
        } else{
            setValidacaoEnsinar(2)
        }
    }


    const validarMin = ()=>{
        const minn = min.current.value

        if(
            minn < 0 ||
            minn > 4950
        ){
            setLabel('Campo inválido')
            setValidacaoValorMin(1)
        }else{
            setValidacaoValorMin(2)
        }
    }

    const validarMax = ()=>{
        const maxx = max.current.value

        if(
            maxx < 50 ||
            maxx > 5000
        ){
            setLabel('Campo inválido')
            setValidacaoValorMax(1)
        }else{
            setValidacaoValorMax(2)
        }
    }


    const avancar = () => {

        const area = area_input.current.value
        const ensinar = ensinar_input.current.value
        const minn = min.current.value
        const maxx = max.current.value

        let servicosSelecionados = []
        let algumSelecionado = false
        for (let i = 0; i < servicos.length; i++) {
            if (servicos[i].checked) {
                servicosSelecionados.push(servicos[i].item.id)
                algumSelecionado = true
            }
        }

        if (
            area === "" ||
            ensinar === "" ||
            !algumSelecionado ||
            minn === "" ||
            maxx === ""
        ) {
            alert("Preencha todos os campos")
            return
        }

        axios.put(`/cadastrar/3/${localStorage.getItem("ID_CADASTRANTE")}`, {
            area: area,
            servico: servicosSelecionados,
            prestaAula: ensinar === "1",
            orcamentoMin: minn,
            orcamentoMax: maxx
        })
            .then((res) => {
                if (res.status === 201) {
                    setModalVisible(true)
                } else {
                    alert("Erro interno")
                }
            })
            .catch((err) => {
                if (err.response.status === 403) {
                    setMoldaAviso(true)
                    setAvisoTitulo('Tipo usuário inválido')
                    setAvisoDescricao('Por favor tente novamente mais tarde')
                } else if (err.response.status === 404) {
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
                    setAvisoDescricao('Por favor tente novamente mais tarde')                }
            })
    }

    const alterarChecked = (index, check) => {
        const s = [...servicos]

        s[index].checked = check

        setServicos(s)
    }

    useEffect(() => {
        if (localStorage.getItem("ID_CADASTRANTE") === null) {
            navigate("/cadastroPrestador")
        }
        if (sessionStorage.getItem("optEnsinar") !== null) {
            ensinar_input.current.value = JSON.parse(sessionStorage.getItem("optEnsinar")) ? "1" : "2"
        }
        if (sessionStorage.getItem("optMin") !== null && sessionStorage.getItem("optMax") !== null) {
            setRange([Number(sessionStorage.getItem("optMin")), Number(sessionStorage.getItem("optMax"))])
        }
        axios.get("/usuario/areas")
            .then((res1) => {
                setAreas(res1.data)
                setMapArea(true)
            })
    }, []) // eslint-disable-line

    useEffect(() => {
        axios.get(`/usuario/servico/${selectedArea}`)
            .then((res2) => {
                let newArray = []
                for (let i = 0; i < res2.data.length; i++) {
                    newArray.push({
                        item: res2.data[i],
                        checked: false
                    })
                }
                setServicos(newArray)
            })
    }, [selectedArea])

    useEffect(() => {
        if (localStorage.getItem("ID_CADASTRANTE") === null) {
            navigate("/cadastroPrestador")
        }
        if (sessionStorage.getItem("optArea") !== null) {
            area_input.current.value = Number(sessionStorage.getItem("optArea"))
            setSelectedArea(Number(sessionStorage.getItem("optArea")))
        }
    }, [mapArea]) // eslint-disable-line

    return (
        <>
            <div className="flex justify-center h-screen">
                {modalAviso ? <ModalAviso titulo={avisoTitulo} descricao={avisoDescricao} tempo={10000} modal={setMoldaAviso} /> : null}
                <div className="bg-white 2xl:h-144 2xl:w-288 xl:h-120 xl:w-240 self-center rounded-lg drop-shadow-all">
                    <div id="container_steps" className="flex 2xl:h-16 xl:h-14 w-full justify-center items-center 2xl:mt-8 xl:mt-6">
                        <div id="step_1" className="bg-verde-padrao rounded-full 2xl:h-12 2xl:w-12 xl:h-10 xl:w-10"></div>
                        <div id="linha" className="bg-verde-padrao h-1 2xl:w-14 xl:w-10"></div>
                        <div id="step_2" className="bg-verde-padrao border-4 border-verde-padrao rounded-full 2xl:h-12 2xl:w-12 xl:h-10 xl:w-10 "></div>
                        <div id="linha" className="bg-verde-padrao h-1 2xl:w-14 xl:w-10"></div>
                        <div id="step_3" className="bg-white border-4 border-verde-padrao rounded-full 2xl:h-12 2xl:w-12 xl:h-10 xl:w-10"></div>
                    </div>

                    <div id='cont_encima' className='flex flex-row 2xl:justify-center'>

                        <div id='cont_esquerda' className='flex flex-col justify-around mt-8 gap-8 h-40 w-120 pr-12 pl-12  border-r-2  after:border-slate-300 border-slate-300'>

                            <div className='relative'>
                                <div className="relative inline-block w-full">
                                    <select ref={area_input} id='select_inp' onBlur={()=> {validarArea()}} onChange={(e) => { setSelectedArea(e.target.value) }} className={`cursor-pointer block appearance-none w-full text-xl font-bold h-14 bg-white border ${validacaoArea === 1 ? `border-red-500` : `border-cinza-claro-1`} hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline`}>
                                        <option id='null_opt' key='0' value='0' >Selecione sua area de atuação:</option>
                                        {mapArea ? areas.map((data, index) => (
                                            <option key={index} id={data.nome} value={data.id}>{data.nome}</option>
                                        )) : null}
                                    </select>
                                    {validacaoArea !== 1 ? null : <label className="absolute ml-1 text-red-500 font-medium">{label}</label>}
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w8-" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div className='relative'>
                                <div className="relative inline-block w-full">
                                    <button id='drop_down_servico' onFocus={() => { setMapServico(true) }} onClick={() => { setdropDown(!dropDown) }} className={`cursor-pointer flex items-center appearance-none w-full text-xl font-bold h-14 bg-white border ${validacaoServico === 1 ? `border-red-500` : `border-cinza-claro-1`} hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline`}>
                                        <span>Selecione os serviços que você presta:</span>
                                    </button>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                                {dropDown ? <>
                                    <button onClick={() => { setdropDown(false) }} className='z-40 fixed h-screen w-screen top-0 left-0 right-0 bottom-0 cursor-default'></button>
                                    <div id='drop_drown_servico' className={`z-50 absolute w-full bg-white border ${validacaoServico === 1 ? `border-red-500` : `border-cinza-claro-1`} hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline`}>
                                        {mapServico ? servicos.map((data, index) => (
                                            <div key={index} className="block min-h-6">
                                                <label className='flex items-center'>
                                                    <input defaultChecked={data.checked} onChange={(e) => { alterarChecked(index, e.target.checked) }} id={data.item.id} className="w-5 h-5 ease-soft text-base rounded-md  checked:bg-verde-padrao after:text-base relative cursor-pointer appearance-none border-2 border-solid checked:outline outline-offset-2 outline-2 outline-verde-padrao border-slate-400 bg-white  after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-[''] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100" type="checkbox" />
                                                    <label htmlFor={data.item.id} className="cursor-pointer select-none text-slate-700 ml-2 text-xl">{data.item.nome}</label>
                                                </label>
                                            </div>
                                        )) : null}
                                    </div>
                                    {validacaoServico !== 1 ? null : <label className="absolute ml-1 text-red-500 font-medium">{label}</label>}
                                </> : null}
                            </div>
                        </div>

                        <div id='cont_direita' className='flex flex-col justify-around mt-8 gap-8 h-40 w-120 pr-12 pl-12  border-l-2   after:border-slate-300 border-slate-300'>
                            <div className="w-full text-start h-14">
                                <span className="text-[36px] inline-block align-middle text-verde-padrao">Deseja ensinar?</span>
                            </div>
                            <div className="relative inline-block w-full">
                                <select onBlur={()=>{validarEnsinar()}} ref={ensinar_input} id='select_inp_ensinar' className={`cursor-pointer block appearance-none w-full text-xl font-bold h-14 bg-white border ${validacaoEnsinar === 1 ? `border-red-500` : `border-cinza-claro-1`} hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline`}>
                                    <option id='null_opt' key='0' value='0' >Escolha uma opção</option>
                                    <option id='sim' key='1' value='1' >Sim</option>
                                    <option id='nao' key='2' value='2' >Não</option>
                                </select>
                                {validacaoEnsinar !== 1 ? null : <label className="absolute ml-1 text-red-500 font-medium">{label}</label>}
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w8-" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="cont_enbaixo" className="flex justify-center flex-col items-center w-full">
                        <div className='2xl:ml-72 text-4xl ml-24 w-full font-medium mt-4 text-verde-padrao'>
                            <span >Faixa de valor cobrado:</span>
                        </div>
                        <div className='flex justify-center w-full 2xl:w-[82%] mt-7'>
                            <div className={`relative w-20 h-8 border-4 ${validacaoValorMin === 1 ? `border-red-500` : `border-verde-padrao`} rounded-md text-xl font-medium`}>
                                <span>R$ <input onBlur={()=>{validarMin()}} className={`min-max-inputs w-16 ml-1 appearance-none focus:ring-0 focus:outline-none focus:border-none bg-transparent absolute`} value={range[0]} type="number" ref={min} onChange={() => { setRange([min.current.value, ...range.slice(1)]) }} /></span>
                            </div>
                            
                            <span className='text-2xl font-medium text-verde-padrao ml-2 mr-2'>Min</span>
                            <ReactSlider
                                value={range}
                                className="horizontal-slider"
                                thumbClassName="example-thumb"
                                trackClassName="example-track"
                                min={0}
                                max={5000}
                                ariaLabel={['Lower thumb', 'Upper thumb']}
                                ariaValuetext={state => `Thumb value ${state.valueNow}`}
                                pearling
                                minDistance={50}
                                onChange={(value) => setRange(value)}
                            />
                            <span className='text-2xl font-medium text-verde-padrao ml-2 mr-2'>Max</span>
                            <div className={`w-20 h-8 border-4 ${validacaoValorMax === 1 ? `border-red-500` : `border-verde-padrao`} rounded-md text-xl font-medium`}>
                                <span>R$<input onBlur={()=>{validarMax()}} className={`min-max-inputs w-16 ml-1 appearance-none focus:ring-0 focus:outline-none focus:border-none bg-transparent absolute`} value={range[1]} type="number" ref={max} onChange={() => { setRange([range[0], max.current.value, ...range.slice(2)]) }} /></span>
                            </div>
                        </div>
                        <div className='flex flex-row w-full'>
                            <div id="container_proximo" className="w-full h-10 flex justify-start">
                                <button onClick={() => { navigate("/inicio") }} className=" 2xl:text-2xl xl:text-xl 2xl:ml-12 xl:ml-11 2xl:mt-22 xl:mt-7 font-bold text-verde-padrao flex items-center"><ChevronDoubleLeftIcon className='2xl:h-10 2xl:w-10 xl:h-8 xl:w-8' /> Voltar à Tela inicial</button>
                            </div>
                            <div id="container_finalizar" className="w-full h-10 flex justify-end ">
                                <button onClick={avancar} className="bg-verde-escuro-2 2xl:w-40 2xl:h-12 xl:w-32 xl:h-11 rounded-full 2xl:text-2xl xl:text-xl 2xl:mr-16 xl:mr-12 2xl:mt-14 xl:mt-3 font-semibold text-white ">Finalizar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalCustom modalGettr={modalVisible} modalSettr={setModalVisible} canClose={false}>
                <div className="bg-white w-144 h-100 flex flex-col items-center rounded-lg bg-cover bg-center" style={{backgroundImage: `url(${bgmodal})`}}>
                    <div className="h-[33%] w-full flex justify-center items-center text-verde-padrao text-2xl font-extrabold">
                        Obrigado por chegar até aqui!
                    </div>
                    <div className="h-[33%] w-[50%] flex justify-center items-center text-black text-2xl font-base text-center">
                        Aguarde a sua aprovação em até 10 dias.
                        Ao retornar, você poderá escolher o seu plano!
                    </div>
                    <div className="h-[33%] w-full flex justify-center items-center">
                        <button className="h-[50%] w-[40%] bg-verde-padrao text-white rounded-lg text-lg" onClick={() => { navigate("/inicio") }}>
                            Retornar à tela inicial
                        </button>
                    </div>
                </div>
            </ModalCustom>
        </>
    )
}
