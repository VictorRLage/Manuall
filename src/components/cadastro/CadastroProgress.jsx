import React from "react";
import CadastroFlag from "@/components/cadastro/CadastroFlag";
import { useData } from "@/data/CreateContext";

/**
 * @param {{
 * isFlagAtLeft: boolean
 * }}
 */
export default function CadastroProgress({
    fase,
    fases,
    mudarStep,
    isFlagAtLeft,
}) {
    const { windowWidth } = useData();

    return (
        <div className="min-h-[15%] w-full relative flex justify-center items-center">
            {windowWidth > 500 && <CadastroFlag isFlagAtLeft={isFlagAtLeft} />}
            {Array.from({ length: fases }, (_, i) => (
                <React.Fragment key={i}>
                    <div
                        onClick={() => {
                            i == fase && mudarStep?.();
                        }}
                        className={`${
                            i + 1 < fase
                                ? "bg-verde-padrao"
                                : i + 1 == fase
                                ? "bg-white border-4 border-verde-padrao"
                                : "bg-white border-2 border-gray-500"
                        } rounded-full h-10 w-10`}
                    />
                    {i + 1 !== fases && (
                        <div
                            className={`${
                                i + 1 < fase ? "bg-verde-padrao" : "bg-gray-500"
                            } h-1 w-10`}
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}
