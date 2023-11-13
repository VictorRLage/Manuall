import Sidebar from "@/components/adm/Sidebar";
import { Oval } from "react-loader-spinner";
import { useEffect, useState } from "react";
import axios from "@/api/axios";
import ModalAviso from "@/components/main/ModalAviso";
import done from "@/assets/storyset/Done-rafiki.svg";
import AprovacaoSection from "@/components/adm/AprovacaoSection";
import lupaIcon from "@/assets/icons/lupa.png";
import FileDownload from "@/assets/icons/file_download.png";
import FileUpload from "@/assets/icons/file_upload.png";
import RegexENUM from "@/enum/RegexENUM";
import SelectArrowIcon from "@/assets/icons/select_arrow_gray_600.svg";
import AprovacaoDesfazer from "../components/adm/AprovacaoDesfazer";

export default function AdmAprovacao() {
    const [prestadores, setPrestadores] = useState();

    const [filtro, setFiltro] = useState("");
    const [agrupamentoSelecionado, setAgrupamentoSelecionado] = useState(0);

    const [modalAviso, setModalAviso] = useState(false);
    const [decisoes, setDecisoes] = useState([]);

    const { prestadoresPendente, prestadoresAgendado, prestadoresFinalizado } =
        prestadores?.reduce(
            (acc, prestador) => {
                if (filtro) {
                    if (
                        !prestador.nome
                            .toLowerCase()
                            .replace(RegexENUM.LOCALELESS_TEXT_REPLACEABLE, "")
                            .includes(
                                filtro
                                    .toLowerCase()
                                    .replace(
                                        RegexENUM.LOCALELESS_TEXT_REPLACEABLE,
                                        "",
                                    ),
                            )
                    ) {
                        return acc;
                    }
                }

                if (
                    prestador.statusProcesso === 1 ||
                    !prestador.statusProcesso
                ) {
                    acc.prestadoresPendente.push(prestador);
                } else if (prestador.statusProcesso === 2) {
                    acc.prestadoresAgendado.push(prestador);
                } else if (prestador.statusProcesso === 3) {
                    acc.prestadoresFinalizado.push(prestador);
                }
                return acc;
            },
            {
                prestadoresPendente: [],
                prestadoresAgendado: [],
                prestadoresFinalizado: [],
            },
        ) || {
            prestadoresPendente: [],
            prestadoresAgendado: [],
            prestadoresFinalizado: [],
        };

    const aprovar = (idPrestador, aprovar, salvarRefazer = true) => {
        setPrestadores();
        axios
            .patch(`/usuario/aprovacoesPendentes/${idPrestador}/${aprovar}`)
            .then(() => {
                fetch();
                if (salvarRefazer) {
                    setDecisoes((prevItems) => [...prevItems, idPrestador]);
                }
            })
            .catch((err) => console.log(err));
    };

    const alterarStatusProcessoAprovacao = (
        idPrestador,
        statusProcessoAprovacao,
    ) => {
        setPrestadores();
        axios
            .patch(
                `/usuario/aprovacoesPendentes/alterarStatusProcesso/${idPrestador}/${statusProcessoAprovacao}`,
            )
            .then(() => {
                fetch();
            })
            .catch((err) => console.log(err));
    };

    const fetch = () => {
        axios
            .get("/usuario/aprovacoesPendentes")
            .then(({ status, data }) => {
                if (status === 200) setPrestadores(data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(fetch, []);

    return (
        <>
            {decisoes.length > 0 && (
                <AprovacaoDesfazer
                    desfazer={() => {
                        aprovar(decisoes[decisoes.length - 1], 1, false);
                        setDecisoes(decisoes.slice(0, decisoes.length - 1));
                    }}
                />
            )}
            <ModalAviso
                modalGettr={modalAviso}
                modalSettr={setModalAviso}
                tempo={5000}
                titulo={"Não existem decisões para serem desfeitas"}
            />
            <div className="h-screen w-screen flex bg-cinza-claro-2">
                <Sidebar />
                <div className="grow h-full overflow-y-scroll">
                    <div className="h-[15%] w-full flex items-center justify-center">
                        <span className="text-gray-900 font-bold text-[30px]">
                            Aprovação de Prestadores
                        </span>
                    </div>
                    <div className="h-[50px] w-full flex px-12 gap-4">
                        <input
                            className="h-full border-2 border-[rgb(134,134,134)] rounded-xl grow px-2 outline-none bg-no-repeat"
                            placeholder="Busca por nome"
                            style={{
                                backgroundImage: `url(${lupaIcon})`,
                                backgroundPosition: "right 16px top 50%",
                                backgroundSize: "20px",
                            }}
                            value={filtro}
                            onChange={({ target }) => setFiltro(target.value)}
                        />
                        <select
                            className="h-full border-2 border-[rgb(134,134,134)] rounded-xl w-[30%] bg-no-repeat appearance-none bg-white px-2"
                            style={{
                                backgroundImage: `url(${SelectArrowIcon})`,
                                backgroundPosition: "right 0.7rem top 50%",
                                backgroundSize: "20px",
                            }}
                            value={agrupamentoSelecionado}
                            onChange={({ target }) =>
                                setAgrupamentoSelecionado(Number(target.value))
                            }
                        >
                            <option value={0}>Todos</option>
                            <option value={1}>Pendente</option>
                            <option value={2}>Agendado</option>
                            <option value={3}>Finalizado</option>
                        </select>
                        <div
                            className="h-full border-2 border-[rgb(134,134,134)] rounded-xl min-w-[50px] flex items-center justify-center cursor-pointer bg-white"
                            onClick={() => {}}
                        >
                            <img
                                src={FileDownload}
                                className="h-[70%]"
                                alt="file download icon"
                            />
                        </div>
                        <div
                            className="h-full border-2 border-[rgb(134,134,134)] rounded-xl min-w-[50px] flex items-center justify-center cursor-pointer bg-white"
                            onClick={() => {}}
                        >
                            <img
                                src={FileUpload}
                                className="h-[70%]"
                                alt="file upload icon"
                            />
                        </div>
                    </div>
                    {prestadores ? (
                        prestadores.length > 0 ? (
                            <div className="flex flex-col px-12 pt-4 pb-20 gap-4">
                                {(agrupamentoSelecionado === 1 ||
                                    agrupamentoSelecionado === 0) && (
                                    <AprovacaoSection
                                        label="Pendente"
                                        prestadores={prestadoresPendente}
                                        aprovar={aprovar}
                                        alterarStatusProcessoAprovacao={
                                            alterarStatusProcessoAprovacao
                                        }
                                    />
                                )}
                                {agrupamentoSelecionado === 0 && (
                                    <div className="bg-gray-300 w-full h-[2px] my-4" />
                                )}
                                {(agrupamentoSelecionado === 2 ||
                                    agrupamentoSelecionado === 0) && (
                                    <AprovacaoSection
                                        label="Agendado"
                                        prestadores={prestadoresAgendado}
                                        aprovar={aprovar}
                                        alterarStatusProcessoAprovacao={
                                            alterarStatusProcessoAprovacao
                                        }
                                    />
                                )}
                                {agrupamentoSelecionado === 0 && (
                                    <div className="bg-gray-300 w-full h-[2px] my-4" />
                                )}
                                {(agrupamentoSelecionado === 3 ||
                                    agrupamentoSelecionado === 0) && (
                                    <AprovacaoSection
                                        label="Finalizado"
                                        prestadores={prestadoresFinalizado}
                                        aprovar={aprovar}
                                        alterarStatusProcessoAprovacao={
                                            alterarStatusProcessoAprovacao
                                        }
                                    />
                                )}
                            </div>
                        ) : (
                            <div className="w-full flex flex-col items-center">
                                <img
                                    src={done}
                                    className="w-[400px] h-[400px] mt-10"
                                    alt=""
                                />
                                <span className="text-verde-escuro-1 text-xl">
                                    Todos os prestadores já foram aprovados!
                                </span>
                            </div>
                        )
                    ) : (
                        <div className="w-full flex justify-center">
                            <Oval
                                height={500}
                                width={100}
                                color="#00cc69"
                                wrapperClass=""
                                visible={true}
                                ariaLabel="oval-loading"
                                secondaryColor="#00cc69"
                                strokeWidth={1}
                                strokeWidthSecondary={4}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
