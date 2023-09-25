import Card from "@/components/home/Card";
import NenhumPrestadorEncontrado from "@/components/prestadores/NaoEncontrado";
import Skeleton from "react-loading-skeleton";

export default function Cards({ areas, prestadores }) {
    return (
        <div className="px-16 mt-12 flex flex-wrap justify-center gap-20 self-center">
            {prestadores ? (
                prestadores.length === 0 ? (
                    <NenhumPrestadorEncontrado home={true} />
                ) : (
                    prestadores.map((data, i) => (
                        <Card
                            key={i}
                            prestador={data}
                            area={
                                areas?.find((area) => area.id === data.idArea)
                                    ?.nome
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
    );
}
