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

export default function Perfil() {
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
        console.log(location);
        axios
            .get(`/perfil/${location.pathname.substring(13)}`)
            .then(({ data }) => {
                setPrestador(data);
            })
            .catch((err) => console.log(err));

        // window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {modalLinkPFP && <ModalLinkPFP modal={setModalLinkPFP} />}
            <ModalSolicitacao
                modalGettr={modalSolicitacao}
                modalSettr={setModalSolicitacao}
            />
            <Header />
            <div className="w-full">
                <div
                    className="h-[90vh] flex flex-col bg-no-repeat px-32"
                    style={{
                        backgroundSize: "100%",
                        backgroundImage: `url(${PerfilBg})`,
                        backgroundPosition: "0 -100px",
                    }}
                >
                    <div className="py-6">
                        <Breadcrumb
                            items={[
                                { to: "/", desc: "Página Inicial" },
                                { to: "/prestadores", desc: "Prestadores" },
                                { to: null, desc: prestador?.nome },
                            ]}
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
                            <textarea
                                className="my-6 p-2 outline-none w-full rounded-lg border border-gray-300 h-[200px]"
                                placeholder="Escreva sua descrição aqui..."
                            />
                        </div>
                        <div className="w-[50%] flex justify-end">
                            <PerfilCard prestador={prestador} />
                        </div>
                    </div>
                </div>
                <div className="px-32 flex flex-col py-4 gap-4">
                    <span className="text-3xl font-semibold text-gray-900">
                        Galeria de{" "}
                        <span className="text-verde-escuro-1">Imagens</span>
                    </span>
                    <div className="flex flex-col gap-[4px]">
                        <div className="flex flex-wrap max-w-[908px] rounded-3xl overflow-hidden gap-[4px]">
                            {prestador &&
                                Array.from({ length: 6 }, (_, i) => (
                                    <img
                                        key={i}
                                        onError={({ target }) => {
                                            target.src = defaultImg;
                                        }}
                                        src={prestador.imagens[i]}
                                        alt=""
                                        className="w-[300px] h-[150px] bg-gray-300 object-cover border-0"
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
