import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/header/Header";
import ModalLinkPFP from "@/components/perfil/ModalLinkPFP";
import axios from "@/api/axios";
import PerfilBg from "@/assets/shapes/PerfilBg.svg";
import ModalSolicitacao from "@/components/perfil/ModalSolicitacao";
import Breadcrumb from "@/components/main/Breadcrumb";
import PerfilCard from "@/components/perfil/PerfilCard";
import defaultImg from "@/assets/demo/default_img.jpg";
import { useNavigate } from "react-router-dom";

export default function Perfil({ isOwnProfile }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [prestador, setPrestador] = useState();
    const [modalLinkPFP, setModalLinkPFP] = useState(false);
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
            {modalLinkPFP && <ModalLinkPFP modal={setModalLinkPFP} />}
            <ModalSolicitacao
                modalGettr={modalSolicitacao}
                modalSettr={setModalSolicitacao}
            />
            <Header />
            <div className="w-full bg-gray-100">
                <div
                    className="flex flex-col bg-no-repeat px-32 pb-16"
                    style={{
                        backgroundSize: "100%",
                        backgroundImage: `url(${PerfilBg})`,
                        backgroundPosition: "0 -100px",
                    }}
                >
                    <div className="py-6">
                        <Breadcrumb
                            items={
                                isOwnProfile
                                    ? [
                                          { to: "/", desc: "Página Inicial" },
                                          { to: null, desc: "Perfil" },
                                      ]
                                    : [
                                          { to: "/", desc: "Página Inicial" },
                                          {
                                              to: "/prestadores",
                                              desc: "Prestadores",
                                          },
                                          { to: null, desc: prestador?.nome },
                                      ]
                            }
                        />
                    </div>
                    <div className="flex grow">
                        <div className="w-[50%]">
                            <div className="flex gap-2 flex-wrap">
                                <div className="text-2xl px-5 py-1 bg-white font-semibold text-verde-escuro-1 rounded-full drop-shadow-xl">
                                    {`Serviço${
                                        prestador?.prestaAula ? " + Aula" : ""
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
                                />
                            ) : (
                                <p className="my-6 p-2 text-lg w-full">
                                    {prestador?.descricao}
                                </p>
                            )}
                        </div>
                        <div className="w-[50%] flex justify-end">
                            <PerfilCard
                                isOwnProfile={isOwnProfile}
                                prestador={prestador}
                            />
                        </div>
                    </div>
                </div>
                <div className="px-32 flex flex-col pb-4 gap-4">
                    <span className="text-3xl font-semibold text-gray-900">
                        Galeria de{" "}
                        <span className="text-verde-escuro-1">Imagens</span>
                    </span>
                    <div className="py-4">
                        <div className="flex flex-wrap max-w-[908px] rounded-3xl overflow-hidden gap-[4px]">
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
                <div
                    className="h-40 w-full bg-verde-escuro-1 px-32 flex items-end"
                    style={{
                        clipPath:
                            "polygon(0 100%, 100% 100%, 100% 0, 85% 15%, 72% 20%, 59% 25%, 48% 22%, 39% 17%, 31% 10%, 24% 6%, 14% 4%, 5% 7%, 0 13%)",
                    }}
                >
                    <div className="bg-white w-[600px] h-24 text-verde-escuro-1 text-3xl font-semibold flex items-center px-16 rounded-tr-[90%] rounded-tl-[80px]">
                        Serviços Oferecidos
                    </div>
                </div>
                <div className="w-full px-32 bg-verde-escuro-1">
                    <div className="bg-white w-[600px] py-4 text-verde-escuro-1 text-xl font-semibold flex flex-col justify-center px-16 gap-4">
                        {prestador?.servicos.map(({ id, nome }) => (
                            <div key={id} className="flex gap-2">
                                <div className="text-[8px]">⬤</div>
                                {nome}
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className="h-30 w-full bg-verde-escuro-1 px-32 flex items-start"
                    style={{
                        clipPath:
                            "polygon(0% 0%, 100% 0%, 100% 88%, 90% 78%, 82% 71%, 73% 70%, 61% 73%, 56% 76%, 50% 79%, 41% 83%, 40% 84%, 34% 85%, 24% 86%, 14% 81%, 5% 70%, 0 58%)",
                    }}
                >
                    <div className="bg-white w-[600px] h-12 rounded-bl-[50px] rounded-br-[50px]" />
                </div>
                <div className="h-80 w-full" />
            </div>
        </>
    );
}
