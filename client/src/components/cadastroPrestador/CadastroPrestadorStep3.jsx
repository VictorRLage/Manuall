import '../../index.css'
// import { UserIcon } from '@heroicons/react/24/solid'
import { useState } from "react"
import { MapIcon, MapPinIcon, BuildingOffice2Icon, HomeIcon, HomeModernIcon, BuildingLibraryIcon, HashtagIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/solid'
import axiosInstance from '../../api/AxiosConfig'
// import Slider from "./Slider";
import ReactSlider from 'react-slider'



function CadastroPrestadorStep3(props) {

    const [areas, setAreas] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [mapArea, setMapArea] = useState(false);
    const [mapServico, setMapServico] = useState(false);
    const [selectedArea, setSelectedArea] = useState(0);
    const [dropDown, setdropDown] = useState(false);
    const [range, setRange] = useState([]);


    const mudarDropDown = () => {
        setdropDown(!dropDown);
    };

    const mudarSelectedArea = (e) => {
        setSelectedArea(e.target.value);
    };

    const getAreas = () => {
        console.log("Buscando areas")
        axiosInstance.get("/usuarios/cadastrar/3/prestador/areas", {
        }).then((res) => {
            setAreas(res.data)
            setMapArea(true)
        })

    }

    const getServicos = (props) => {
        console.log("Buscando servicos")
        axiosInstance.get('/usuarios/cadastrar/3/prestador/buscarServicos/' + selectedArea, {
        }).then((res) => {
            setServicos(res.data)
            setMapServico(true)
        })
    }

    return (
        <div className="bg-white 2xl:h-144 2xl:w-288 xl:h-120 xl:w-240 self-center rounded-lg drop-shadow-all">
            <div id="container_steps" className="flex 2xl:h-16 xl:h-14 w-full justify-center items-center 2xl:mt-8 xl:mt-6">
                <div id="step_1" className="bg-verde-padrao rounded-full 2xl:h-12 2xl:w-12 xl:h-10 xl:w-10"></div>
                <div id="linha" className="bg-verde-padrao h-1 2xl:w-14 xl:w-10"></div>
                <div id="step_2" className="bg-verde-padrao border-4 border-verde-padrao rounded-full 2xl:h-12 2xl:w-12 xl:h-10 xl:w-10 "></div>
                <div id="linha" className="bg-verde-padrao h-1 2xl:w-14 xl:w-10"></div>
                <div id="step_3" className="bg-white border-4 border-verde-padrao rounded-full 2xl:h-12 2xl:w-12 xl:h-10 xl:w-10"></div>
            </div>

            <div id='cont_encima' className='flex flex-row'>

                <div id='cont_esquerda' className='flex flex-col justify-around mt-6 h-40 w-120 pr-12 pl-12  border-r-2 border-slate-300'>

                    <div className='relative'>
                        <div className="relative inline-block w-full">
                            <select id='select_inp' onChange={mudarSelectedArea} onFocus={getAreas} className="cursor-pointer block appearance-none w-full text-xl font-bold h-14 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                <option id='null_opt' key='0' value='0' >Selecione sua area de atuação:</option>
                                {mapArea ? areas.map(function (data) {
                                    return (
                                        <option key={data.id} id={data.nome} value={data.id}>{data.nome}</option>
                                    )
                                }
                                ) : null}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w8-" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className='relative'>
                        <div className="relative inline-block w-full">
                            <button id='drop_down_servico' onFocus={getServicos} onClick={mudarDropDown} className="cursor-pointer flex items-center appearance-none w-full text-xl font-bold h-14 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                <span className=''>Selecione os serviços que você presta:</span>
                            </button>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                        {dropDown ? <button onClick={() => { setdropDown(false) }} className='z-40 fixed h-full w-full top-0 left-0 right-0 bottom-0 cursor-default'></button> : null}
                        {dropDown ? <div id='drop_drown_servico' className='z-50 absolute w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'>
                            {mapServico ? servicos.map(function (data) {
                                return (
                                    <div className="block min-h-6">
                                        <label className='flex items-center'>
                                            <input id={data.id} className="w-5 h-5 ease-soft text-base rounded-md  checked:bg-verde-padrao after:text-base relative cursor-pointer appearance-none border-2 border-solid checked:outline outline-offset-2 outline-2 outline-verde-padrao border-slate-400 bg-white  after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-[''] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100" type="checkbox" />
                                            <label htmlFor={data.id} className="cursor-pointer select-none text-slate-700 ml-2 text-xl">{data.nome}</label>
                                        </label>
                                    </div>
                                )
                            }
                            ) : null}
                        </div> : null}
                    </div>

                </div>

                <div id='cont_direita' className='flex flex-col justify-around mt-6 h-40 w-120 pr-12 pl-12  border-l-2 border-slate-300'>
                    <div className="w-full text-start h-14">
                        <span className="text-[36px] inline-block align-middle">Deseja ensinar?</span>
                    </div>
                    <div className="relative inline-block w-full">
                        <select id='select_inp_ensinar' className="cursor-pointer block appearance-none w-full text-xl font-bold h-14 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option id='null_opt' key='0' value='0' >Escolha uma opção</option>
                            <option id='sim' key='1' value='1' >Sim</option>
                            <option id='nao' key='2' value='2' >Não</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w8-" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>
            </div>
            <div id="cont_enbaixo" className="flex justify-center flex-col items-center w-full">
                <div className='text-4xl font-medium mt-6'>
                    <span>Selecione a media do valor cobrado:</span>
                </div>
                <div className='flex justify-center w-full mt-6'>
                    <div className='w-20 h-8 border-4 border-verde-padrao rounded-md text-xl font-medium'>
                        <span>R$ {range[0]}</span>
                    </div>
                    <span className='text-2xl font-medium text-verde-padrao ml-2 mr-2'>Min</span>
                    <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="example-thumb"
                        trackClassName="example-track"
                        defaultValue={[1500, 3500]}
                        min={0}
                        max={5000}
                        ariaLabel={['Lower thumb', 'Upper thumb']}
                        ariaValuetext={state => `Thumb value ${state.valueNow}`}
                        pearling
                        minDistance={300}
                        onChange={(value) => setRange(value)}
                    />
                    <span className='text-2xl font-medium text-verde-padrao ml-2 mr-2'>Max</span>
                    <div className='w-20 h-8 border-4 border-verde-padrao rounded-md text-xl font-medium'>
                        <span>R$ {range[1]}</span>
                    </div>
                </div>
                <div className='flex flex-row w-full'>
                    <div id="container_proximo" className="w-full h-10 flex justify-start">
                        <button className="2xl:text-2xl xl:text-xl 2xl:ml-12 xl:ml-11 2xl:mt-22 xl:mt-7 font-bold text-verde-padrao flex items-center" onClick={props.passarStep}><ChevronDoubleLeftIcon className='2xl:h-10 2xl:w-10 xl:h-8 xl:w-8' /> Voltar à Tela inicial</button>
                    </div>
                    <div id="container_finalizar" className="w-full h-10 flex justify-end ">
                        <button className="bg-verde-escuro-2 2xl:w-40 2xl:h-12 xl:w-32 xl:h-10 rounded-full 2xl:text-2xl xl:text-xl 2xl:mr-16 xl:mr-12 2xl:mt-14 xl:mt-4 font-semibold text-white ">Finalizar</button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default CadastroPrestadorStep3;