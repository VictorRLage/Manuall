import ModalCustom from "@/components/main/ModalCustom";
import TipoUsuarioENUM from "@/enum/TipoUsuarioENUM";

export default function ModalEscolherTipoUsuario({
    modalGettr,
    modalSettr,
    contas,
    setarUsuario,
}) {
    return (
        <ModalCustom modalGettr={modalGettr} modalSettr={modalSettr}>
            <div className="bg-white rounded-lg flex flex-col items-center p-8 gap-8">
                <div className="max-w-[300px] min550:max-w-[450px] flex flex-col justify-center items-center flex-wrap gap-4">
                    <span className="text-2xl text-center font-semibold">
                        Parece que você possui mais de uma conta cadastrada
                        neste endereço de e-mail.
                    </span>
                    <span className="text-2xl text-center">
                        Com qual conta deseja acessar?
                    </span>
                </div>
                <div className="flex flex-col items-center gap-4">
                    {TipoUsuarioENUM.map(
                        ({ id, nome }) =>
                            contas?.includes(id) && (
                                <button
                                    key={id}
                                    onClick={() => {
                                        setarUsuario(id);
                                        modalSettr(false);
                                    }}
                                    className="w-42 h-12 text-2xl bg-verde-padrao rounded-full text-white"
                                >
                                    {nome}
                                </button>
                            ),
                    )}
                </div>
            </div>
        </ModalCustom>
    );
}
