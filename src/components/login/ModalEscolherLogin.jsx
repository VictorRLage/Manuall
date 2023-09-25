import ModalCustom from "@/components/main/ModalCustom";

export default function ModalEscolherConta({
    modalGettr,
    modalSettr,
    setarUsuario,
    entrar,
    check,
    notCheck,
}) {
    return (
        <ModalCustom
            modalGettr={modalGettr}
            modalSettr={modalSettr}
            canClose={false}
        >
            <div className="bg-white rounded-lg flex flex-col items-center p-8 gap-8">
                <div className="max-w-[450px] flex flex-col justify-center items-center flex-wrap gap-4">
                    <span className="text-2xl text-center font-semibold">
                        Parece que você possui duas contas cadastradas neste
                        endereço de e-mail.
                    </span>
                    <span className="text-2xl text-center">
                        Com qual conta deseja acessar?
                    </span>
                </div>
                <div className=" flex items-center gap-4">
                    <button
                        onClick={() => {
                            navigate("/cadastro/contratante");
                        }}
                        className="w-42 h-12 text-2xl bg-verde-padrao rounded-full text-white"
                    >
                        Contratante
                    </button>
                    <button
                        onClick={() => {
                            setarUsuario(2);
                            modalSettr(false);
                            entrar(true);
                            check(true);
                            notCheck(false);
                        }}
                        className="w-42 h-12 text-2xl bg-verde-padrao rounded-full text-white"
                    >
                        Prestador
                    </button>
                </div>
            </div>
        </ModalCustom>
    );
}
