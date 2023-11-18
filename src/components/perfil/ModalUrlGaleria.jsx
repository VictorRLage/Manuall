import ModalCustom from "@/components/main/ModalCustom";
import { useState } from "react";

export default function ModalUrlGaleria({
    modalGettr,
    modalSettr,
    createImagem,
}) {
    const [url, setUrl] = useState("");
    const [isUrlLoaded, setIsUrlLoaded] = useState(false);

    return (
        <ModalCustom
            modalGettr={modalGettr}
            modalSettr={modalSettr}
            canClose
            blurBackgroundStyle={{
                zIndex: "600",
            }}
            modalBackgroundStyle={{
                zIndex: "601",
            }}
        >
            <div className="w-[300px] min450:w-[400px] h-full flex flex-col items-center py-8 px-10 gap-4">
                <span className="text-2xl text-gray-900 font-semibold text-center">
                    Insira o Url da sua nova imagem
                </span>
                <div className="flex flex-col justify-center items-center gap-2">
                    <img
                        src={url}
                        alt=" "
                        onLoad={() => setIsUrlLoaded(true)}
                        onError={() => setIsUrlLoaded(false)}
                        className="object-cover h-52 w-52 rounded-3xl border-none bg-gray-200"
                    />
                    <textarea
                        className="border-cinza-claro-3 border-2 text-gray-900 rounded-lg"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                    <button
                        onClick={() => {
                            if (isUrlLoaded) {
                                createImagem(url);
                                setUrl("");
                            }
                        }}
                        className={`text-2xl mt-4 ${
                            isUrlLoaded ? "bg-verde-padrao" : "bg-cinza-claro-1"
                        } rounded-full text-white w-32 h-10`}
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </ModalCustom>
    );
}
