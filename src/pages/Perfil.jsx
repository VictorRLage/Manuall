import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/header/Header";
import ModalUrlPfp from "@/components/perfil/ModalUrlPfp";
import axios from "@/api/axios";
import PerfilBg from "@/assets/shapes/PerfilBg.svg";
import ModalSolicitacao from "@/components/perfil/ModalSolicitacao";
import Breadcrumb from "@/components/main/Breadcrumb";
import PrestadorCard from "@/components/perfil/PrestadorCard";
import PrestadorServicos from "@/components/perfil/PrestadorServicos";
import PrestadorAvaliacoes from "@/components/perfil/PrestadorAvaliacoes";
import defaultImg from "@/assets/demo/default_img.jpg";
import { useNavigate } from "react-router-dom";
import { useData } from "@/data/CreateContext";

export default function Perfil({ isOwnProfile }) {
    const navigate = useNavigate();
    const location = useLocation();

    const { windowWidth } = useData();

    const [prestador, setPrestador] = useState();
    const [modalUrlPfp, setModalUrlPfp] = useState(false);
    const [modalSolicitacao, setModalSolicitacao] = useState(false);

    const alterarDesc = () => {
        // axios
        //     .patch("/perfil/alterar/desc", {
        //         descricao: prestador?.descricao,
        //     })
        //     .catch((err) => console.log(err));
    };

    useEffect(() => {
        axios
            .get(
                `/perfil${
                    isOwnProfile ? "" : "/" + location.pathname.substring(13)
                }`,
            )
            .then(({ data }) => setPrestador(data))
            .catch(({ response }) => {
                if (response.status === 403 || response.status === 404) {
                    navigate("/prestadores");
                }
            });
    }, []);

    return (
        <>
            <ModalUrlPfp
                modalGettr={modalUrlPfp}
                modalSettr={setModalUrlPfp}
                currentPfp={prestador?.pfp}
            />
            <ModalSolicitacao
                modalGettr={modalSolicitacao}
                modalSettr={setModalSolicitacao}
            />
            <Header />
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
                        backgroundSize: "100%",
                        backgroundImage: `url(${PerfilBg})`,
                        backgroundPosition: "0 -100px",
                    }}
                >
                    <div
                        className={`py-6 ${
                            windowWidth < 500
                                ? "flex items-center justify-center text-center bg-white px-8"
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
                                            (prestador?.prestaAula ? (
                                                <>
                                                    <button className="bg-verde-padrao text-white px-6 py-2 text-xl mt-6 m-auto rounded-full">
                                                        Contratar com aula
                                                    </button>
                                                    <button className="text-verde-padrao px-6 py-2 text-lg mt-2 m-auto">
                                                        Contratar apenas serviço
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        setModalSolicitacao(
                                                            true,
                                                        )
                                                    }
                                                    className="bg-verde-padrao text-white px-6 py-2 text-2xl mt-6 m-auto rounded-full"
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
                                    (prestador?.prestaAula ? (
                                        <>
                                            <button className="bg-verde-padrao text-white px-6 py-2 text-xl m-auto rounded-full">
                                                Contratar com aula
                                            </button>
                                            <button className="text-verde-padrao px-6 py-2 text-lg mt-2 m-auto">
                                                Contratar apenas serviço
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                setModalSolicitacao(true)
                                            }
                                            className="bg-verde-padrao text-white px-6 py-2 text-2xl m-auto rounded-full"
                                        >
                                            Contratar
                                        </button>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
                <div
                    className={`flex flex-col pb-4 gap-4 ${
                        windowWidth < 700
                            ? windowWidth < 500
                                ? "px-8"
                                : "px-16"
                            : "px-32"
                    }`}
                >
                    <span className="text-3xl font-semibold text-gray-900">
                        Galeria de{" "}
                        <span className="text-verde-escuro-1">Imagens</span>
                    </span>
                    <div className="py-4">
                        <div
                            className={`flex flex-wrap ${
                                windowWidth <= 1180
                                    ? windowWidth <= 876
                                        ? "max-w-[300px]"
                                        : "max-w-[604px]"
                                    : "max-w-[908px]"
                            } rounded-3xl overflow-hidden gap-[4px]`}
                        >
                            {prestador &&
                                Array.from({ length: 6 }, (_, i) => (
                                    <img
                                        key={i}
                                        onError={({ target }) => {
                                            target.src = defaultImg;
                                        }}
                                        src={prestador.imagens[i]}
                                        alt=" "
                                        className="w-[300px] h-[150px] bg-gray-200 object-cover border-0"
                                    />
                                ))}
                        </div>
                    </div>
                </div>
                <PrestadorServicos servicos={prestador?.servicos} />
                <PrestadorAvaliacoes />
                <div className="h-80 w-full" />
            </div>
        </>
    );
}
