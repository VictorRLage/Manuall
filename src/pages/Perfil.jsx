import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/header/Header";
import ModalLinkPFP from "@/components/perfil/ModalLinkPFP";
import axios from "@/api/axios";
import PerfilBg from "@/assets/shapes/PerfilBg.svg";
import ModalSolicitacao from "@/components/perfil/ModalSolicitacao";
import Breadcrumb from "@/components/main/Breadcrumb";
import PerfilCard from "@/components/perfil/PerfilCard";

export default function Perfil() {
    const location = useLocation();

    const [prestador, setPrestador] = useState();
    const [modalLinkPFP, setModalLinkPFP] = useState(false);
    const [modalSolicitacao, setModalSolicitacao] = useState(false);

    useEffect(() => {
        axios
            .get(`/perfil/${location.state?.id}`)
            .then(({ data }) => setPrestador(data))
            .catch((err) => console.log(err));

        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {modalLinkPFP && <ModalLinkPFP modal={setModalLinkPFP} />}
            {modalSolicitacao && (
                <ModalSolicitacao modal={setModalSolicitacao} />
            )}
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
                                        prestador?.prestaAula ? "+ Aula" : ""
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
                <div className="h-[60vh] px-32">
                    <span className="text-3xl font-semibold text-gray-900">
                        Galeria de{" "}
                        <span className="text-verde-escuro-1">Imagens</span>
                    </span>
                    <div className="flex"></div>
                </div>
                <div className="bg-white h-184 pt-10 pl-32 pr-32 flex flex-col">
                    <span className="mt-14 ml-36 mr-36 text-3xl font-bold">
                        Galeria de imagens
                    </span>
                </div>
                <div className="min-h-[18rem] bg-verde-escuro-2 pt-10 pl-36 pr-32 flex flex-col">
                    <div className="bg-white rounded-3xl min-h-48 w-[40%] ml-32 mr-32 p-10 drop-shadow-all">
                        <span className=" text-3xl font-bold">
                            Serviços oferecidos
                        </span>
                        <div className="mt-2 text-lg flex flex-col">
                            {prestador?.servicos.map(({ nome }, i) => (
                                <span key={i}>{nome}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
