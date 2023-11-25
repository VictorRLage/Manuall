import ModalCustom from "@/components/main/ModalCustom";
import { useEffect, useState } from "react";

export default function ModalChatUrlMensagem({
    modalGettr,
    modalSettr,
    mensagem: { mensagem, setMensagem },
    anexo: { anexo, setAnexo },
    enviar,
}) {
    const [isUrlLoaded, setIsUrlLoaded] = useState(false);

    const enviarMensagem = () => {
        modalSettr(false);
        enviar();
    };

    useEffect(() => {
        if (!modalGettr) {
            setAnexo("");
        }
    }, [modalGettr]);

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
                    Insira o Url da imagem
                </span>
                <div className="flex flex-col justify-center items-center gap-2">
                    <img
                        src={anexo}
                        alt=" "
                        onLoad={() => setIsUrlLoaded(true)}
                        onError={() => setIsUrlLoaded(false)}
                        className="object-cover h-52 w-52 rounded-3xl border-none bg-gray-200"
                    />
                    <textarea
                        className="border-cinza-claro-3 border-2 text-gray-900 rounded-lg"
                        value={anexo}
                        onChange={({ target }) => setAnexo(target.value)}
                    />
                    <span>Mensagem:</span>
                    <input
                        className="border-cinza-claro-3 border-2 text-gray-900 rounded-lg outline-none"
                        value={mensagem}
                        onChange={({ target }) => setMensagem(target.value)}
                    />
                    <button
                        onClick={() => {
                            isUrlLoaded && enviarMensagem();
                        }}
                        className={`text-2xl mt-4 ${
                            isUrlLoaded ? "bg-verde-padrao" : "bg-cinza-claro-1"
                        } rounded-full text-white w-32 h-10 flex items-center justify-center`}
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </ModalCustom>
    );
}
