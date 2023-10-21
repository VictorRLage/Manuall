import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/header/Header";
import ModalUrlPfp from "@/components/perfil/ModalUrlPfp";
import axios from "@/api/axios";
import PerfilBg from "@/assets/shapes/PerfilBg.png";
import ModalFormOrcamento from "@/components/perfil/ModalFormOrcamento";
import ModalUrlGaleria from "@/components/perfil/ModalUrlGaleria";
import Breadcrumb from "@/components/main/Breadcrumb";
import PrestadorCard from "@/components/perfil/PrestadorCard";
import PrestadorGaleria from "@/components/perfil/PrestadorGaleria";
import PrestadorServicos from "@/components/perfil/PrestadorServicos";
import PrestadorAvaliacoes from "@/components/perfil/PrestadorAvaliacoes";
import ModalAvaliacao from "@/components/perfil/ModalAvaliacao";
import { useData } from "@/data/CreateContext";
import ModalSolicitacao from "@/components/solicitacao/ModalSolicitacao";

export default function Perfil({ isOwnProfile }) {
    const navigate = useNavigate();
    const location = useLocation();

    const { windowWidth } = useData();

    const [prestador, setPrestador] = useState();
    const [modalUrlPfp, setModalUrlPfp] = useState(false);
    const [modalFormOrcamento, setModalFormOrcamento] = useState(false);
    const [modalUrlGaleria, setModalUrlGaleria] = useState(false);
    const [modalSolicitacao, setModalSolicitacao] = useState(false);
    const [modalAvaliacao, setModalAvaliacao] = useState(false);

    const [incluiAula, setIncluiAula] = useState();

    const [headerRefetch, setHeaderRefetch] = useState(false);

    const [descricao, setDescricao] = useState("");

    const tipoUsuario =
        localStorage.TIPO_USUARIO && Number(localStorage.TIPO_USUARIO);

    const refetch = () => {
        setHeaderRefetch(!headerRefetch);
        axios
            .get(
                `/perfil${
                    isOwnProfile ? "" : "/" + location.pathname.substring(8)
                }`,
            )
            .then(({ data }) => {
                setPrestador(data);
                if (data.descricao) {
                    setDescricao(data.descricao);
                }
            })
            .catch(({ response }) => {
                if (response.status === 403 || response.status === 404) {
                    navigate("/prestadores");
                }
            });
    };

    const alterarDesc = () => {
        axios
            .patch("/perfil/alterar/desc", {
                descricao,
            })
            .then(refetch)
            .catch((err) => console.log(err));
    };

    const createImagem = (url) => {
        axios
            .post("/perfil/imagem", { imagem: url })
            .then(() => {
                setModalUrlGaleria(false);
                refetch();
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        refetch();
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <ModalUrlPfp
                modalGettr={modalUrlPfp}
                modalSettr={setModalUrlPfp}
                currentPfp={prestador?.pfp}
                refetch={refetch}
            />
            <ModalFormOrcamento
                modalGettr={modalFormOrcamento}
                modalSettr={setModalFormOrcamento}
            />
            <ModalUrlGaleria
                modalGettr={modalUrlGaleria}
                modalSettr={setModalUrlGaleria}
                createImagem={createImagem}
            />
            <ModalSolicitacao
                modalGettr={modalSolicitacao}
                modalSettr={setModalSolicitacao}
                idPrestador={location.pathname.substring(8)}
                incluiAula={incluiAula}
                servicos={prestador?.servicos}
            />
            <ModalAvaliacao
                modalGettr={modalAvaliacao}
                modalSettr={setModalAvaliacao}
            />
            <Header refetch={headerRefetch} />
            <div className="w-full bg-gray-100">
                <div
                    className={`flex flex-col bg-no-repeat ${
                        windowWidth < 700
                            ? windowWidth < 500
                                ? ""
                                : "px-16"
                            : "px-32"
                    } pb-16`}
                    style={{
                        backgroundSize: "100% 100%",
                        backgroundImage: `url(${PerfilBg})`,
                        // backgroundPosition: "0",
                    }}
                >
                    <div
                        className={`py-6 ${
                            windowWidth < 500
                                ? "flex items-center justify-center text-center bg-[#bde5be] px-8"
                                : ""
                        }`}
                    >
                        <Breadcrumb
                            items={
                                isOwnProfile
                                    ? [
                                          {
                                              to: "/",
                                              desc: "Página Inicial",
                                          },
                                          { to: null, desc: "Perfil" },
                                      ]
                                    : [
                                          {
                                              to: "/",
                                              desc: "Página Inicial",
                                          },
                                          {
                                              to: "/prestadores",
                                              desc: "Prestadores",
                                          },
                                          {
                                              to: null,
                                              desc: prestador?.nome,
                                          },
                                      ]
                            }
                        />
                    </div>
                    <div className="flex grow">
                        {windowWidth > 1000 ? (
                            <>
                                <div className="w-[50%]">
                                    <div className="flex gap-2 flex-wrap">
                                        <div className="text-2xl px-5 py-1 bg-white font-semibold text-verde-escuro-1 rounded-full drop-shadow-xl">
                                            {`Serviço${
                                                prestador?.prestaAula
                                                    ? " + Aula"
                                                    : ""
                                            }`}
                                        </div>
                                        <div className="text-2xl px-5 py-1 bg-white font-semibold text-verde-escuro-1 rounded-full drop-shadow-xl">
                                            {prestador?.area}
                                        </div>
                                    </div>
                                    {isOwnProfile ? (
                                        <textarea
                                            onBlur={alterarDesc}
                                            value={descricao}
                                            onChange={({ target }) => {
                                                setDescricao(target.value);
                                            }}
                                            className="my-6 p-2 outline-none w-full rounded-lg border border-gray-300 h-[200px]"
                                            placeholder="Escreva sua descrição aqui..."
                                            maxLength={270}
                                        />
                                    ) : (
                                        <p className="my-6 p-2 text-lg w-full">
                                            {prestador?.descricao}
                                        </p>
                                    )}
                                </div>
                                <div className="w-[50%] flex justify-end">
                                    <div className="flex flex-col items-center p-5 bg-white w-84 drop-shadow-all rounded-lg">
                                        <PrestadorCard
                                            isOwnProfile={isOwnProfile}
                                            prestador={prestador}
                                            setModalUrlPfp={setModalUrlPfp}
                                        />
                                        {!isOwnProfile &&
                                            tipoUsuario !== 2 &&
                                            (prestador?.prestaAula ? (
                                                <>
                                                    <button
                                                        className="bg-verde-padrao text-white px-6 py-2 text-xl mt-6 m-auto rounded-full"
                                                        onClick={() => {
                                                            setModalSolicitacao(
                                                                true,
                                                            );
                                                            setIncluiAula(true);
                                                        }}
                                                    >
                                                        Contratar com aula
                                                    </button>
                                                    <button
                                                        className="text-verde-padrao px-6 py-2 text-lg mt-2 m-auto"
                                                        onClick={() => {
                                                            setModalSolicitacao(
                                                                true,
                                                            );
                                                            setIncluiAula(
                                                                false,
                                                            );
                                                        }}
                                                    >
                                                        Contratar apenas serviço
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    className="bg-verde-padrao text-white px-6 py-2 text-2xl mt-6 m-auto rounded-full"
                                                    onClick={() => {
                                                        setModalSolicitacao(
                                                            true,
                                                        );
                                                        setIncluiAula(false);
                                                    }}
                                                >
                                                    Contratar
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div
                                className={`flex flex-col items-center justify-center p-5 w-full drop-shadow-all bg-white ${
                                    windowWidth > 500 ? "rounded-lg" : ""
                                }`}
                            >
                                {windowWidth > 700 ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-[48%]">
                                            <div className="flex gap-2 flex-wrap">
                                                <div className="text-2xl px-5 py-1 bg-verde-escuro-1 font-semibold text-white rounded-full drop-shadow-xl">
                                                    {`Serviço${
                                                        prestador?.prestaAula
                                                            ? " + Aula"
                                                            : ""
                                                    }`}
                                                </div>
                                                <div className="text-2xl px-5 py-1 bg-verde-escuro-1 font-semibold text-white rounded-full drop-shadow-xl">
                                                    {prestador?.area}
                                                </div>
                                            </div>
                                            {isOwnProfile ? (
                                                <textarea
                                                    onBlur={alterarDesc}
                                                    value={descricao}
                                                    onChange={({ target }) => {
                                                        setDescricao(
                                                            target.value,
                                                        );
                                                    }}
                                                    className="my-6 p-2 outline-none w-full rounded-lg border border-gray-300 h-[200px]"
                                                    placeholder="Escreva sua descrição aqui..."
                                                    maxLength={270}
                                                />
                                            ) : (
                                                <p className="my-6 p-2 text-lg w-full">
                                                    {prestador?.descricao}
                                                </p>
                                            )}
                                        </div>
                                        <div className="bg-gray-300 w-[2px] h-[90%] mx-4" />
                                        <div className="flex flex-col items-center w-[48%]">
                                            <PrestadorCard
                                                isOwnProfile={isOwnProfile}
                                                prestador={prestador}
                                                setModalUrlPfp={setModalUrlPfp}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center gap-8">
                                        <div className="flex flex-col items-center px-8">
                                            <PrestadorCard
                                                isOwnProfile={isOwnProfile}
                                                prestador={prestador}
                                                setModalUrlPfp={setModalUrlPfp}
                                            />
                                        </div>
                                        <div className="px-8">
                                            <div className="flex gap-2 flex-wrap justify-center">
                                                <div className="text-2xl px-5 py-1 bg-verde-escuro-1 font-semibold text-white rounded-full drop-shadow-xl">
                                                    {`Serviço${
                                                        prestador?.prestaAula
                                                            ? " + Aula"
                                                            : ""
                                                    }`}
                                                </div>
                                                <div className="text-2xl px-5 py-1 bg-verde-escuro-1 font-semibold text-white rounded-full drop-shadow-xl">
                                                    {prestador?.area}
                                                </div>
                                            </div>
                                            {isOwnProfile ? (
                                                <textarea
                                                    onBlur={alterarDesc}
                                                    value={descricao}
                                                    onChange={({ target }) => {
                                                        setDescricao(
                                                            target.value,
                                                        );
                                                    }}
                                                    className="my-6 p-2 outline-none w-full rounded-lg border border-gray-300 h-[200px]"
                                                    placeholder="Escreva sua descrição aqui..."
                                                    maxLength={270}
                                                />
                                            ) : (
                                                <p className="my-6 p-2 text-lg w-full">
                                                    {prestador?.descricao}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {!isOwnProfile &&
                                    tipoUsuario !== 2 &&
                                    (prestador?.prestaAula ? (
                                        <>
                                            <button
                                                className="bg-verde-padrao text-white px-6 py-2 text-xl m-auto rounded-full"
                                                onClick={() => {
                                                    setModalSolicitacao(true);
                                                    setIncluiAula(true);
                                                }}
                                            >
                                                Contratar com aula
                                            </button>
                                            <button
                                                className="text-verde-padrao px-6 py-2 text-lg mt-2 m-auto"
                                                onClick={() => {
                                                    setModalSolicitacao(true);
                                                    setIncluiAula(false);
                                                }}
                                            >
                                                Contratar apenas serviço
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className="bg-verde-padrao text-white px-6 py-2 text-2xl m-auto rounded-full"
                                            onClick={() => {
                                                setModalSolicitacao(true);
                                                setIncluiAula(false);
                                            }}
                                        >
                                            Contratar
                                        </button>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
                <PrestadorGaleria
                    prestador={prestador}
                    isOwnProfile={isOwnProfile}
                    refetch={refetch}
                    openCreateImageModal={() => setModalUrlGaleria(true)}
                />
                <PrestadorServicos servicos={prestador?.servicos} />
                {prestador?.avaliacoes?.[0] && (
                    <PrestadorAvaliacoes avaliacoes={prestador.avaliacoes} />
                )}
            </div>
        </>
    );
}
