import Header from "@/components/header/Header";
import Breadcrumb from "@/components/main/Breadcrumb";
import axios from "@/api/axios";
import { useEffect, useState } from "react";
import HistoricoRow from "@/components/dashboard/HistoricoRow";
import Skeleton from "react-loading-skeleton";
import ModalAvaliacao from "@/components/perfil/ModalAvaliacao";

export default function Historico() {
    const [solicitacoes, setSolicitacoes] = useState();
    const [modalAvaliacao, setModalAvaliacao] = useState(false);
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [solicitacaoId, setSolicitacaoId] = useState();

    const fetch = () => {
        axios
            .get("/historico/buscarHistorico")
            .then((res) => {
                if (res.status === 200) {
                    setSolicitacoes(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetch();

        axios.get("/usuario/nome").then(({ data }) => setNomeUsuario(data));
    }, []);

    return (
        <>
            <ModalAvaliacao
                modalGettr={modalAvaliacao}
                modalSettr={setModalAvaliacao}
                notificacao={{
                    solicitacaoId: solicitacaoId,
                    nomeUsuario: nomeUsuario,
                }}
                refetch={fetch}
            />
            <Header />
            <div className="w-full h-full bg-[#fafafa] px-32 pt-8 pb-16">
                {/* <Breadcrumb
                    items={[
                        { to: "/", desc: "Página Inicial" },
                        { to: null, desc: "Histórico" },
                    ]}
                /> */}
                <div>
                    <p className="text-base pb-1 text-gray-400 font-semibold">
                        Olá {nomeUsuario}! Bem vindo ao seu
                    </p>
                    <p className="text-5xl font-semibold">
                        Histórico de compras
                    </p>
                </div>
                <div className="flex w-full h-[50px] justify-between gap-1 mt-8">
                    <div className="text-white h-full w-[20%] flex items-center justify-center bg-[#00cc69] font-semibold text-xl rounded-tl-xl">
                        Data
                    </div>
                    <div className="text-white h-full w-[20%] flex items-center justify-center bg-[#00cc69] font-semibold text-xl">
                        Prestador
                    </div>
                    <div className="text-white h-full w-[40%] flex items-center justify-center bg-[#00cc69] font-semibold text-xl">
                        Serviço
                    </div>
                    <div className="text-white h-full w-[20%] flex items-center justify-center bg-[#00cc69] font-semibold text-xl rounded-tr-xl">
                        Valor
                    </div>
                </div>
                <div className="pt-2 flex flex-col gap-1">
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
        </>
    );
}
