import Sidebar from "@/components/adm/Sidebar";
import { Oval } from "react-loader-spinner";
import { useEffect, useState } from "react";
import axios from "@/api/axios";
import ModalAviso from "@/components/main/ModalAviso";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import done from "@/assets/storyset/Done-rafiki.svg";

export default function AdmAprovacao() {
    const [prestadores, setPrestadores] = useState();

    const [modalAviso, setModalAviso] = useState(false);

    const aprovar = (idPrestador, aprovar) => {
        axios
            .get(`/usuario/aprovacoesPendentes/${idPrestador}/${aprovar}`)
            .then(() => {
                axios
                    .get("/usuario/aprovacoesPendentes")
                    .then(({ status, data }) => {
                        if (status === 200) {
                            setPrestadores(data);
                            if (aprovar !== 1) pushDecisao(idPrestador);
                        }
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        axios
            .get("/usuario/aprovacoesPendentes")
            .then(({ status, data }) => {
                if (status === 200) {
                    setPrestadores(data);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const [decisao, setDecisao] = useState([]);

    const pushDecisao = (item) => {
        setDecisao((prevItems) => [...prevItems, item]);
    };

    const popDecisao = () => {
        if (decisao.length > 0) {
            aprovar(decisao[decisao.length - 1], 1);
            const novaDecisao = decisao.slice(0, decisao.length - 1);
            setDecisao(novaDecisao);
        } else {
            setModalAviso(true);
        }
    };

    return (
        <>
            <button
                onClick={popDecisao}
                className="flex fixed bg-[#209D61] text-white pt-4 pb-4 pr-5 pl-5 right-[50px] bottom-[50px] rounded-xl items-center"
            >
                <ArrowUturnLeftIcon className="h-6 mr-2" />{" "}
                <span className="mt-1 text-lg">Desfazer última decisão</span>
            </button>
            <div className="h-screen w-screen flex bg-cinza-claro-2">
                <ModalAviso
                    modalGettr={modalAviso}
                    modalSettr={setModalAviso}
                    tempo={5000}
                    titulo={"Não existem decisões para serem desfeitas"}
                />
                <Sidebar />
                <div className="w-[82%] h-full overflow-y-scroll">
                    <div className="h-[15%] w-full flex items-center justify-center">
                        <span className="text-gray-900 font-bold text-[30px]">
                            Aprovações de Prestadores
                        </span>
                    </div>
                    <div className="h-[60px] w-full flex px-12 gap-4">
                        <div className="h-full border-2 border-[rgb(134,134,134)] rounded-xl grow" />
                        <div className="h-full border-2 border-[rgb(134,134,134)] rounded-xl w-[30%]" />
                        <div className="h-full border-2 border-[rgb(134,134,134)] rounded-xl min-w-[60px]" />
                        <div className="h-full border-2 border-[rgb(134,134,134)] rounded-xl min-w-[60px]" />
                    </div>
                    {/* {prestadores ? (
                        prestadores.length > 0 ? (
                            <div className="h-[90%] w-full flex flex-wrap justify-evenly">
                                {prestadores.map((prestador, index) => (
                                    <div
                                        key={index}
                                        className="h-[80%] min-w-[350px] w-[40%] m-5 flex justify-center items-center flex-col border-verde-escuro-1 border-2 rounded-lg"
                                    >
                                        <div className="h-[30%] w-[90%] flex justify-center items-center">
                                            <div className="h-full w-[75%] flex flex-col">
                                                <span className="w-full h-[25%] overflow-hidden font-bold text-lg flex items-center justify-center">
                                                    {prestador.dados.nome}
                                                </span>
                                                <span className="w-full h-[25%] overflow-hidden underline flex items-center justify-center">
                                                    {prestador.dados.email}
                                                </span>
                                                <span className="w-full h-[25%] overflow-hidden flex items-center justify-center">
                                                    <b>Fone: </b>{" "}
                                                    {prestador.dados.telefone}
                                                </span>
                                                <span className="w-full h-[25%] overflow-hidden flex items-center justify-center">
                                                    <b>CPF: </b>{" "}
                                                    {prestador.dados.cpf}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="max-h-[50%] w-[90%] flex justify-center items-center">
                                            <div className="h-full w-[50%] p-1">
                                                <div className="w-full break-words font-bold">
                                                    Endereço
                                                </div>
                                                <div className="w-full break-words">
                                                    {prestador.dados.cidade} -{" "}
                                                    {prestador.dados.estado}
                                                </div>
                                                <div className="w-full break-words">
                                                    <b>CEP:</b>{" "}
                                                    {prestador.dados.cep}
                                                </div>
                                                <div className="w-full break-words">
                                                    <b>Bairro:</b>{" "}
                                                    {prestador.dados.bairro}
                                                </div>
                                                <div className="w-full break-words">
                                                    <b>Rua:</b>{" "}
                                                    {prestador.dados.rua}
                                                </div>
                                                <div className="w-full break-words">
                                                    <b>Número:</b>{" "}
                                                    {prestador.dados.numero}
                                                </div>
                                                <div className="w-full break-words">
                                                    <b>Complemento:</b>{" "}
                                                    {
                                                        prestador.dados
                                                            .complemento
                                                    }
                                                </div>
                                            </div>
                                            <div className="h-full w-[50%] p-1">
                                                <div className="w-full break-words font-bold">
                                                    Serviço
                                                </div>
                                                <div className="w-full break-words">
                                                    <b>Área:</b>{" "}
                                                    {prestador.dados.area}
                                                </div>
                                                <div className="w-full break-words">
                                                    <b>Serviços:</b>
                                                </div>
                                                {prestador.servicos.map(
                                                    (servico, index2) => (
                                                        <div
                                                            className="w-full break-words"
                                                            key={index2}
                                                        >
                                                            ● {servico};
                                                        </div>
                                                    ),
                                                )}
                                                <div className="w-full break-words">
                                                    <b>Ensino:</b>{" "}
                                                    {prestador.dados.ensino
                                                        ? "SIM"
                                                        : "NÃO"}
                                                </div>
                                                <div className="w-full break-words">
                                                    <b>Faixa de preço:</b>
                                                </div>
                                                <div className="w-full break-words">
                                                    R$
                                                    {
                                                        prestador.dados
                                                            .orcamentoMin
                                                    }{" "}
                                                    - R$
                                                    {
                                                        prestador.dados
                                                            .orcamentoMax
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-[15%] w-[90%] flex justify-center items-center">
                                            <div
                                                onClick={() => {
                                                    aprovar(
                                                        prestador.dados.id,
                                                        2,
                                                    );
                                                }}
                                                className="cursor-pointer w-[30%] h-[60%] mr-4 bg-[#47AE3E] text-white rounded-lg flex justify-center items-center"
                                            >
                                                Aprovar
                                            </div>
                                            <div
                                                onClick={() => {
                                                    aprovar(
                                                        prestador.dados.id,
                                                        4,
                                                    );
                                                }}
                                                className="cursor-pointer w-[30%] h-[60%] ml-4 bg-[#D02B2B] text-white rounded-lg flex justify-center items-center"
                                            >
                                                Reprovar
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-[90%] w-full flex flex-col items-center">
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
                        <div className="h-[90%] w-full flex justify-center">
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
                    )} */}
                </div>
            </div>
        </>
    );
}
