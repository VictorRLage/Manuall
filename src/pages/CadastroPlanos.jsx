import PlanosBg from "@/assets/shapes/PlanosBg.png";
import PlanoMinorCard from "@/components/planos/PlanoMinorCard.jsx";
import PlanoMainCard from "../components/planos/PlanoMainCard";
import axios from "@/api/axios";
import ModalCompraAprovada from "@/components/planos/ModalCompraAprovada";
import { useState } from "react";

const AcessoManual = () => (
    <>
        Acesso a <span className="font-extrabold">Manuall</span>
    </>
);
const MetricasDesempenho = () => (
    <>
        <span className="font-extrabold">Métricas</span> de{" "}
        <span className="font-extrabold">Desempenho</span>
    </>
);
const PerfilPaginaPrincipal = () => (
    <>
        Perfil na <span className="font-extrabold">Página Principal</span>
    </>
);

export default function CadastroPlanos() {
    const [modalCompraAprovada, setModalCompraAprovada] = useState(false);
    const [mouseX, setMouseX] = useState(0);

    const comprarPlano = (plano) => {
        axios
            .put(`/cadastrar/4/${plano}`)
            .then(({ status }) => {
                if (status === 201) {
                    setModalCompraAprovada(true);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <ModalCompraAprovada
                modalGettr={modalCompraAprovada}
                modalSettr={setModalCompraAprovada}
            />
            <div
                className="w-screen h-screen flex items-center justify-center"
                onMouseMove={(e) => {
                    setMouseX(e.pageX);
                }}
            >
                <div
                    className="w-full h-[97.5%] bg-center"
                    style={{
                        backgroundImage: `url(${PlanosBg})`,
                        backgroundSize: "100% 100%",
                    }}
                >
                    <div className="w-full h-full flex items-center justify-center gap-2">
                        <PlanoMinorCard
                            titulo="Advanced"
                            preco="30,00"
                            comprar={() => {
                                comprarPlano(2);
                            }}
                            items={[
                                { component: <AcessoManual />, has: true },
                                {
                                    component: <MetricasDesempenho />,
                                    has: true,
                                },
                                {
                                    component: <PerfilPaginaPrincipal />,
                                    has: false,
                                },
                            ]}
                            mouseX={mouseX}
                        />
                        <PlanoMainCard
                            titulo="Premium"
                            preco="45,00"
                            comprar={() => {
                                comprarPlano(3);
                            }}
                            items={[
                                { component: <AcessoManual />, has: true },
                                {
                                    component: <MetricasDesempenho />,
                                    has: true,
                                },
                                {
                                    component: <PerfilPaginaPrincipal />,
                                    has: true,
                                },
                            ]}
                            mouseX={mouseX}
                        />
                        <PlanoMinorCard
                            titulo="Basic"
                            preco="15,00"
                            comprar={() => {
                                comprarPlano(1);
                            }}
                            items={[
                                { component: <AcessoManual />, has: true },
                                {
                                    component: <MetricasDesempenho />,
                                    has: false,
                                },
                                {
                                    component: <PerfilPaginaPrincipal />,
                                    has: false,
                                },
                            ]}
                            mouseX={mouseX}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
