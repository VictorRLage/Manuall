import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactSlider from "react-slider";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/solid";
import axios from "@/api/axios";
import CadastroProgress from "@/components/cadastro/CadastroProgress";
import SelectArrowIcon from "@/assets/icons/select_arrow.svg";

export default function Fase3({
    stepInfo,
    passarFase,
    voltarFase,
    isNextLoading,
}) {
    const [modalAviso, setMoldaAviso] = useState(false);
    const [avisoTitulo, setAvisoTitulo] = useState("");
    const [avisoDescricao, setAvisoDescricao] = useState("");

    const [validacaoArea, setValidacaoArea] = useState(0);
    const [validacaoServico, setValidacaoServico] = useState(0);
    const [validacaoEnsinar, setValidacaoEnsinar] = useState(0);
    const [validacaoValorMin, setValidacaoValorMin] = useState(0);
    const [validacaoValorMax, setValidacaoValorMax] = useState(0);

    const [label, setLabel] = useState("");

    const navigate = useNavigate();

    const [areas, setAreas] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [mapArea, setMapArea] = useState(false);
    const [mapServico, setMapServico] = useState(false);
    const [selectedArea, setSelectedArea] = useState(0);
    const [dropDown, setdropDown] = useState(false);
    const [range, setRange] = useState([1500, 3500]);
    const [modalVisible, setModalVisible] = useState(false);

    const area_input = useRef(null);
    const ensinar_input = useRef(null);
    const min = useRef(null);
    const max = useRef(null);

    const validarArea = () => {
        const area = area_input.current.value;
        console.log(area);

        if (area === "0") {
            setLabel("Campo inválido");
            setValidacaoArea(1);
        } else {
            setValidacaoArea(2);
        }
    };

    const validarServico = () => {
        let servicosSelecionados = [];
        let algumSelecionado = false;
        for (let i = 0; i < servicos.length; i++) {
            if (servicos[i].checked) {
                servicosSelecionados.push(servicos[i].item.id);
                algumSelecionado = true;
            }
        }

        if (!algumSelecionado) {
            setLabel("Campo inválido");
            setValidacaoServico(1);
        } else {
            setValidacaoServico(2);
        }
    };

    const validarEnsinar = () => {
        const ensinar = ensinar_input.current.value;
        console.log(ensinar);

        if (ensinar === "0") {
            setLabel("Campo inválido");
            setValidacaoEnsinar(1);
        } else {
            setValidacaoEnsinar(2);
        }
    };

    const validarMin = () => {
        const minn = min.current.value;

        if (minn < 0 || minn > 4950) {
            setLabel("Campo inválido");
            setValidacaoValorMin(1);
        } else {
            setValidacaoValorMin(2);
        }
    };

    const validarMax = () => {
        const maxx = max.current.value;

        if (maxx < 50 || maxx > 5000) {
            setLabel("Campo inválido");
            setValidacaoValorMax(1);
        } else {
            setValidacaoValorMax(2);
        }
    };

    const avancar = () => {
        const area = area_input.current.value;
        const ensinar = ensinar_input.current.value;
        const minn = min.current.value;
        const maxx = max.current.value;

        let servicosSelecionados = [];
        let algumSelecionado = false;
        for (let i = 0; i < servicos.length; i++) {
            if (servicos[i].checked) {
                servicosSelecionados.push(servicos[i].item.id);
                algumSelecionado = true;
            }
        }

        if (
            area === "" ||
            ensinar === "" ||
            !algumSelecionado ||
            minn === "" ||
            maxx === ""
        ) {
            alert("Preencha todos os campos");
            return;
        }

        axios
            .put(`/cadastrar/3/${localStorage.getItem("ID_CADASTRANTE")}`, {
                area: area,
                servico: servicosSelecionados,
                prestaAula: ensinar === "1",
                orcamentoMin: minn,
                orcamentoMax: maxx,
            })
            .then((res) => {
                if (res.status === 201) {
                    setModalVisible(true);
                } else {
                    alert("Erro interno");
                }
            })
            .catch((err) => {
                if (err.response.status === 403) {
                    setMoldaAviso(true);
                    setAvisoTitulo("Tipo usuário inválido");
                    setAvisoDescricao("Por favor tente novamente mais tarde");
                } else if (err.response.status === 404) {
                    setMoldaAviso(true);
                    setAvisoTitulo("Você ainda não chegou nessa fase");
                    setAvisoDescricao("Por favor tente novamente mais tarde");
                } else if (err.response.status === 409) {
                    setMoldaAviso(true);
                    setAvisoTitulo("Você já passou dessa fase");
                    setAvisoDescricao("Por favor tente novamente mais tarde");
                } else {
                    setMoldaAviso(true);
                    setAvisoTitulo("Erro interno");
                    setAvisoDescricao("Por favor tente novamente mais tarde");
                }
            });
    };

    const alterarChecked = (index, check) => {
        const s = [...servicos];

        s[index].checked = check;

        setServicos(s);
    };

    useEffect(() => {
        if (localStorage.getItem("ID_CADASTRANTE") === null) {
            navigate("/cadastro/prestador");
        }
        if (sessionStorage.getItem("optEnsinar") !== null) {
            ensinar_input.current.value = JSON.parse(
                sessionStorage.getItem("optEnsinar"),
            )
                ? "1"
                : "2";
        }
        if (
            sessionStorage.getItem("optMin") !== null &&
            sessionStorage.getItem("optMax") !== null
        ) {
            setRange([
                Number(sessionStorage.getItem("optMin")),
                Number(sessionStorage.getItem("optMax")),
            ]);
        }
        axios.get("/usuario/areas").then((res1) => {
            setAreas(res1.data);
            setMapArea(true);
        });
    }, []); // eslint-disable-line

    useEffect(() => {
        axios.get(`/usuario/servico/${selectedArea}`).then((res2) => {
            let newArray = [];
            for (let i = 0; i < res2.data.length; i++) {
                newArray.push({
                    item: res2.data[i],
                    checked: false,
                });
            }
            setServicos(newArray);
        });
    }, [selectedArea]);

    useEffect(() => {
        if (localStorage.getItem("ID_CADASTRANTE") === null) {
            navigate("/cadastro/prestador");
        }
        if (sessionStorage.getItem("optArea") !== null) {
            area_input.current.value = Number(
                sessionStorage.getItem("optArea"),
            );
            setSelectedArea(Number(sessionStorage.getItem("optArea")));
        }
    }, [mapArea]); // eslint-disable-line

    return (
        <div className="bg-white h-full min-w-[100%] flex flex-col items-center">
            <CadastroProgress
                fase={3}
                fases={stepInfo.fases}
                mudarStep={stepInfo.passarFaseAtalho}
                flagIsAtLeft={stepInfo.fases % 2 === 0}
            />
            <div className="w-full h-[85%] flex flex-col items-center justify-center">
                <div className="w-full h-[50%] flex justify-center items-center">
                    <div className="w-[40%] h-full flex flex-col justify-center items-center p-5 gap-5">
                        <select
                            name=""
                            id=""
                            className={`
							block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2
							appearance-none focus:outline-none focus:ring-0 focus:border-verde-padrao peer
							${true === false ? "border-red-500" : "border-cinza-claro-1"}
						`}
                            style={{
                                appearance: "none",
                                backgroundImage: `url(${SelectArrowIcon})`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 0.7rem top 50%",
                                backgroundSize: "20px",
                            }}
                        >
                            <option value="">
                                Marque a sua área de atuação
                            </option>
                        </select>
                        <select
                            name=""
                            id=""
                            className={`
							block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2
							appearance-none focus:outline-none focus:ring-0 focus:border-verde-padrao peer
							${true === false ? "border-red-500" : "border-cinza-claro-1"}
						`}
                            style={{
                                appearance: "none",
                                backgroundImage: `url(${SelectArrowIcon})`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 0.7rem top 50%",
                                backgroundSize: "20px",
                            }}
                        >
                            <option value="">
                                Marque seus serviços prestados
                            </option>
                        </select>
                    </div>
                    <div className="w-[2px] h-[80%] bg-gray-300"></div>
                    <div className="w-[40%] h-full flex flex-col justify-center items-center p-5">
                        <div className="w-full h-[80%]">
                            <span className="text-lg">Deseja ensinar?</span>
                            <div>Sim</div>
                            <div>Não</div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[50%] flex justify-center items-center">
                    
                </div>
            </div>
            {/* <div className="flex flex-row">
                <div className="flex flex-col justify-around mt-8 gap-8 h-40 w-120 pr-12 pl-12 border-r-2 after:border-slate-300 border-slate-300">
                    <div className="relative">
                        <div className="relative inline-block w-full">
                            <select
                                ref={area_input}
                                onBlur={validarArea}
                                onChange={({ target }) =>
                                    setSelectedArea(target.value)
                                }
                                className={`cursor-pointer block appearance-none w-full text-xl font-bold h-14 bg-white border ${
                                    validacaoArea === 1
                                        ? `border-red-500`
                                        : `border-cinza-claro-1`
                                } hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline`}
                            >
                                <option
                                    key="0"
                                    value="0"
                                    className="font-normal"
                                >
                                    Selecione sua area de atuação:
                                </option>
                                {mapArea &&
                                    areas.map(({ id, nome }) => (
                                        <option key={id} id={nome} value={id}>
                                            {nome}
                                        </option>
                                    ))}
                            </select>
                            {validacaoArea === 1 && (
                                <label className="absolute ml-1 text-red-500 font-medium">
                                    {label}
                                </label>
                            )}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                    className="fill-current h-4 w8-"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative inline-block w-full">
                            <button
                                onFocus={() => {
                                    setMapServico(true);
                                }}
                                onClick={() => {
                                    setdropDown(!dropDown);
                                }}
                                className={`cursor-pointer flex items-center appearance-none w-full text-xl font-bold h-14 bg-white border ${
                                    validacaoServico === 1
                                        ? `border-red-500`
                                        : `border-cinza-claro-1`
                                } hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline`}
                            >
                                <span>
                                    Selecione os serviços que você presta:
                                </span>
                            </button>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                        {dropDown && (
                            <>
                                <button
                                    onClick={() => {
                                        setdropDown(false);
                                    }}
                                    className="z-40 fixed h-screen w-screen top-0 left-0 right-0 bottom-0 cursor-default"
                                />
                                <div
                                    className={`z-50 absolute w-full bg-white border ${
                                        validacaoServico === 1
                                            ? `border-red-500`
                                            : `border-cinza-claro-1`
                                    } hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline`}
                                >
                                    {mapServico &&
                                        servicos?.map((data, index) => (
                                            <div
                                                key={index}
                                                className="block min-h-6"
                                            >
                                                <label className="flex items-center">
                                                    <input
                                                        defaultChecked={
                                                            data.checked
                                                        }
                                                        onChange={(e) => {
                                                            alterarChecked(
                                                                index,
                                                                e.target
                                                                    .checked,
                                                            );
                                                        }}
                                                        id={data.item.id}
                                                        className="w-5 h-5 ease-soft text-base rounded-md checked:bg-verde-padrao after:text-base relative cursor-pointer appearance-none border-2 border-solid checked:outline outline-offset-2 outline-2 outline-verde-padrao border-slate-400 bg-white  after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-[''] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                        type="checkbox"
                                                    />
                                                    <label
                                                        htmlFor={data.item.id}
                                                        className="cursor-pointer select-none text-slate-700 ml-2 text-xl"
                                                    >
                                                        {data.item.nome}
                                                    </label>
                                                </label>
                                            </div>
                                        ))}
                                </div>
                                {validacaoServico !== 1 ? null : (
                                    <label className="absolute ml-1 text-red-500 font-medium">
                                        {label}
                                    </label>
                                )}
                            </>
                        )}
                    </div>
                </div>

                <div className="flex flex-col justify-around mt-8 gap-8 h-40 w-120 pr-12 pl-12 border-l-2 after:border-slate-300 border-slate-300">
                    <div className="w-full text-start h-14">
                        <span className="text-[36px] inline-block align-middle text-verde-padrao">
                            Deseja ensinar?
                        </span>
                    </div>
                    <div className="relative inline-block w-full">
                        <select
                            onBlur={() => {
                                validarEnsinar();
                            }}
                            ref={ensinar_input}
                            className={`cursor-pointer block appearance-none w-full text-xl font-bold h-14 bg-white border ${
                                validacaoEnsinar === 1
                                    ? `border-red-500`
                                    : `border-cinza-claro-1`
                            } hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline`}
                        >
                            <option key="0" value="0">
                                Escolha uma opção
                            </option>
                            <option key="1" value="1">
                                Sim
                            </option>
                            <option key="2" value="2">
                                Não
                            </option>
                        </select>
                        {validacaoEnsinar !== 1 ? null : (
                            <label className="absolute ml-1 text-red-500 font-medium">
                                {label}
                            </label>
                        )}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                                className="fill-current h-4 w8-"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center flex-col items-center w-full">
                <div className="text-4xl ml-24 w-full font-medium mt-4 text-verde-padrao">
                    <span>Faixa de valor cobrado:</span>
                </div>
                <div className="flex justify-center w-full mt-7">
                    <div
                        className={`relative w-20 h-8 border-4 ${
                            validacaoValorMin === 1
                                ? `border-red-500`
                                : `border-verde-padrao`
                        } rounded-md text-xl font-medium`}
                    >
                        <span>
                            R${" "}
                            <input
                                onBlur={() => {
                                    validarMin();
                                }}
                                className={`min-max-inputs w-16 ml-1 appearance-none focus:ring-0 focus:outline-none focus:border-none bg-transparent absolute`}
                                value={range[0]}
                                type="number"
                                ref={min}
                                onChange={() => {
                                    setRange([
                                        min.current.value,
                                        ...range.slice(1),
                                    ]);
                                }}
                            />
                        </span>
                    </div>
                    <span className="text-2xl font-medium text-verde-padrao ml-2 mr-2">
                        Min
                    </span>
                    <ReactSlider
                        value={range}
                        className="horizontal-slider"
                        thumbClassName="example-thumb"
                        trackClassName="example-track"
                        min={0}
                        max={5000}
                        ariaLabel={["Lower thumb", "Upper thumb"]}
                        ariaValuetext={(state) =>
                            `Thumb value ${state.valueNow}`
                        }
                        pearling
                        minDistance={50}
                        onChange={(value) => setRange(value)}
                    />
                    <span className="text-2xl font-medium text-verde-padrao ml-2 mr-2">
                        Max
                    </span>
                    <div
                        className={`w-20 h-8 border-4 ${
                            validacaoValorMax === 1
                                ? `border-red-500`
                                : `border-verde-padrao`
                        } rounded-md text-xl font-medium`}
                    >
                        <span>
                            R$
                            <input
                                onBlur={() => {
                                    validarMax();
                                }}
                                className={`min-max-inputs w-16 ml-1 appearance-none focus:ring-0 focus:outline-none focus:border-none bg-transparent absolute`}
                                value={range[1]}
                                type="number"
                                ref={max}
                                onChange={() => {
                                    setRange([
                                        range[0],
                                        max.current.value,
                                        ...range.slice(2),
                                    ]);
                                }}
                            />
                        </span>
                    </div>
                </div>
                <div className="flex flex-row w-full">
                    <div className="w-full h-10 flex justify-start">
                        <button
                            onClick={() => {
                                voltarFase();
                            }}
                            className="text-xl ml-11 mt-7 font-bold text-verde-padrao flex items-center"
                        >
                            <ChevronDoubleLeftIcon className="h-8 w-8" /> Voltar
                            à Tela inicial
                        </button>
                    </div>
                    <div className="w-full h-10 flex justify-end ">
                        <button
                            onClick={avancar}
                            className="bg-verde-escuro-2 w-32 h-11 rounded-full text-xl mr-12 mt-3 font-semibold text-white"
                        >
                            Finalizar
                        </button>
                    </div>
                </div>
            </div> */}
        </div>
    );
}
