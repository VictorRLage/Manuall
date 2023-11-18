import Skeleton from "react-loading-skeleton";
import { useData } from "@/data/CreateContext";

export default function ContratarButtons({
    hasInfoLoaded,
    isOwnProfile,
    prestaAula,
    setModalSolicitacao,
    setIncluiAula,
}) {
    const { userType } = useData();

    return hasInfoLoaded ? (
        !isOwnProfile &&
            userType !== 2 &&
            (prestaAula ? (
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
            ))
    ) : (
        <Skeleton width={200} height={40} borderRadius={20} />
    );
}
