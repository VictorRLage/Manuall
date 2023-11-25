import axios from "@/api/axios";
import HistoricoRow from "@/components/dashboard/HistoricoRow";
import Header from "@/components/header/Header";
import ModalAvaliacao from "@/components/perfil/ModalAvaliacao";
import { useData } from "@/data/CreateContext";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function Historico() {
    const { windowWidth, userName } = useData();

    const [solicitacoes, setSolicitacoes] = useState();
    const [modalAvaliacao, setModalAvaliacao] = useState(false);
    const [solicitacaoId, setSolicitacaoId] = useState();

    const fetch = () => {
        axios
            .get("/historico/buscarHistorico")
            .then((res) => {
                if (res.status === 200) {
                    setSolicitacoes(res.data);
                }
            })
            .catch(console.log);
    };

    useEffect(() => {
        fetch();
    }, []);

    return (
        <>
            <ModalAvaliacao
                modalGettr={modalAvaliacao}
                modalSettr={setModalAvaliacao}
                notificacao={{
                    solicitacaoId: solicitacaoId,
                    nomeUsuario: userName,
                }}
                refetch={fetch}
            />
            <Header />
            <div className="min-w-full h-full bg-[#fafafa] min700:px-32 min500:px-16 px-2 pt-3 min500:pt-8 pb-16">
                {windowWidth > 500 && (
                    <div className="mb-8">
                        <p className="text-base pb-1 text-gray-400 font-semibold">
                            Olá {userName}! Bem vindo ao seu
                        </p>
                        <p className="text-5xl font-semibold text-gray-900">
                            Histórico de compras
                        </p>
                    </div>
                )}
                <div className="overflow-x-scroll flex-wrap flex flex-col">
                    <div className="flex relative h-[50px] justify-between gap-1">
                        <div className="min-w-[190px] text-center text-white h-full w-[20%] flex items-center justify-center bg-[#00cc69] font-semibold text-xl rounded-tl-xl">
                            Data de Início
                        </div>
                        <div className="min-w-[190px] text-center text-white h-full w-[20%] flex items-center justify-center bg-[#00cc69] font-semibold text-xl">
                            Prestador
                        </div>
                        <div className="min-w-[380px] text-center text-white h-full w-[40%] flex items-center justify-center bg-[#00cc69] font-semibold text-xl">
                            Serviço
                        </div>
                        <div className="min-w-[190px] text-center text-white h-full w-[20%] flex items-center justify-center bg-[#00cc69] font-semibold text-xl rounded-tr-xl">
                            Valor
                        </div>
                    </div>
                    <div className="pt-2 w-auto flex flex-col gap-1">
                        {solicitacoes
                            ? solicitacoes.map((solicitacao, i) => (
                                  <HistoricoRow
                                      key={i}
                                      solicitacao={solicitacao}
                                      avaliar={(solicitacaoId) => {
                                          setSolicitacaoId(solicitacaoId);
                                          setModalAvaliacao(true);
                                      }}
                                  />
                              ))
                            : Array.from({ length: 5 }).map((_, i) => (
                                  <Skeleton
                                      key={i}
                                      width={"100%"}
                                      height={"50px"}
                                  />
                              ))}
                    </div>
                </div>
            </div>
        </>
    );
}
