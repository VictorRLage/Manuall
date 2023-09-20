import CadastroFlag from "@/assets/shapes/CadastroFlag.svg";

export default function CadastroProgress({ fase, fases, mudarStep, flagIsAtLeft }) {

    return (
        <div className="h-[15%] w-full relative flex justify-center items-center">
            <div className={`absolute ${flagIsAtLeft ? "left-8" : "right-8"} top-0 h-16 w-1h-16`}>
                <img src={CadastroFlag} className="w-full h-full" alt="" />
            </div>
            {Array.from({ length: fases }, (_, i) => <div className="flex justify-center items-center" key={i}>
                <div onClick={() => { i == fase && mudarStep?.() }} className={`${i + 1 < fase
                    ? "bg-verde-padrao"
                    : i + 1 == fase
                        ? "bg-white border-4 border-verde-padrao"
                        : "bg-white border-2 border-black"
                    } rounded-full h-10 w-10`} />
                {i + 2 == fases &&
                    <div className={`${i + 1 < fase
                        ? "bg-verde-padrao"
                        : "bg-black"
                        } h-1 w-10`} />
                }
            </div>)}
        </div>
    )
}