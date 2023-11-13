import Card from "@/components/home/Card";
import NaoEncontrado from "@/components/prestadores/NaoEncontrado";
import Skeleton from "react-loading-skeleton";
import ModalNaoLogado from "@/components/main/ModalNaoLogado";
import { useState } from "react";

export default function Cards({ areas, prestadores, isHome }) {
    const [modalNaoLogado, setModalNaoLogado] = useState(false);

    return (
        <>
            <ModalNaoLogado
                modalGettr={modalNaoLogado}
                modalSettr={setModalNaoLogado}
            />
            <div className="min500:px-16 px-8 mt-12 flex flex-wrap justify-center gap-20 self-center">
                {prestadores ? (
                    prestadores.length === 0 ? (
                        <NaoEncontrado isHome={isHome} />
                    ) : (
                        prestadores.map((data, i) => (
                            <Card
                                key={i}
                                prestador={data}
                                area={
                                    areas?.find((area) => area.id === data.area)
                                        ?.nome
                                }
                                openModalNaoLogado={() =>
                                    setModalNaoLogado(true)
                                }
                            />
                        ))
                    )
                ) : (
                    Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton
                            key={i}
                            width={"320px"}
                            height={"480px"}
                            borderRadius={"1.5rem"}
                        />
                    ))
                )}
            </div>
        </>
    );
}
