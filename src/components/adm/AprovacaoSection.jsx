import AprovacaoCard from "@/components/adm/AprovacaoCard";
import done from "@/assets/storyset/Done-rafiki.svg";

export default function AprovacaoSection({
    label,
    prestadores,
    aprovar,
    alterarStatusProcessoAprovacao,
}) {
    return (
        <>
            <span className="text-2xl">{label}</span>
            <div className="w-full flex flex-wrap justify-center gap-4">
                {prestadores.length > 0 ? (
                    prestadores.map((prestador, i) => (
                        <AprovacaoCard
                            prestador={prestador}
                            key={i}
                            aprovar={aprovar}
                            alterarStatusProcessoAprovacao={
                                alterarStatusProcessoAprovacao
                            }
                        />
                    ))
                ) : (
                    <div className="w-full flex flex-col items-center">
                        <img
                            src={done}
                            className="w-[400px] h-[400px] mt-10"
                            alt=""
                        />
                        <span className="text-verde-escuro-1 text-xl">
                            Não existem prestadores nesta categoria!
                        </span>
                    </div>
                )}
            </div>
        </>
    );
}
