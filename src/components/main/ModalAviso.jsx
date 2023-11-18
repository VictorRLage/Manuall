import { defer } from "@/utils/functions";
import useWatch from "@/utils/useWatch";
import { useRef } from "react";
import ModalCustom from "./ModalCustom";

export default function ModalAviso({
    modalGettr,
    modalSettr,
    tempo,
    titulo,
    descricao,
}) {
    const transition_bar = useRef(null);

    useWatch(async () => {
        if (!transition_bar?.current) return;
        if (modalGettr) {
            transition_bar.current.style.transition = "0s linear";
            transition_bar.current.style.width = "100%";
            await defer();
            transition_bar.current.style.transition = tempo + "ms linear";
            transition_bar.current.style.width = "0%";
        }
    }, [modalGettr]);

    return (
        <ModalCustom
            modalGettr={modalGettr}
            modalSettr={modalSettr}
            tempo={tempo}
            canClose
        >
            <div className="max-w-[300px] min500:max-w-[400px] min700:max-w-[576px] bg-white rounded-lg">
                <div className="w-full h-1 relative">
                    <div className="absolute w-full h-1 bg-verde-claro-3" />
                    <div
                        className="absolute h-1 bg-verde-padrao"
                        ref={transition_bar}
                    />
                </div>
                <div className="w-full rounded-b-lg bg-white flex flex-col items-center p-10 gap-6">
                    {titulo && (
                        <span className="text-3xl font-medium text-center">
                            {titulo}
                        </span>
                    )}
                    {descricao && (
                        <span className="text-xl font-medium text-center">
                            {descricao}
                        </span>
                    )}
                </div>
            </div>
        </ModalCustom>
    );
}
