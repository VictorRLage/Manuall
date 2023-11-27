import ModalCustom from "@/components/main/ModalCustom";

export default function ModalEsqueciMinhaSenha({
    modalGettr,
    modalSettr
}) {
    const handleEnviarLinkRecuperacao = () => {
        // Lógica para enviar o link de recuperação
        // Você pode adicionar a lógica de envio de e-mail aqui
        console.log("Link de recuperação enviado para:", email);
        // Fechar o modal após o envio do link de recuperação
        modalSettr(false);
    };

    return (
        <ModalCustom modalGettr={modalGettr} modalSettr={modalSettr} canClose>
            <div className="bg-white rounded-lg flex flex-col items-center p-8 gap-8 border-2 border-green-600">
                <div className="w-120 h-60 flex flex-col justify-center items-center gap-4">
                    <span className="text-2xl text-center font-semibold">
                        Esqueci Minha Senha
                    </span>
                    <div className="flex flex-col gap-4 w-full mt-10 text-center items-center">
                        <label htmlFor="email" className="text-lg">
                            Digite seu e-mail:
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="border-2 p-2 rounded w-80 border-green-600"
                                placeholder="Seu e-mail"
                            />
                        </div>
                    </div>
                    <button
                        className="bg-verde-padrao text-white px-4 py-2 rounded hover:bg-verde-escuro-1 mt-9"
                        onClick={handleEnviarLinkRecuperacao}
                    >
                        Enviar Link de Recuperação
                    </button>
                </div>
            </div>
        </ModalCustom>
    );
}
