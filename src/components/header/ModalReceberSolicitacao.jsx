import ModalCustom from "@/components/main/ModalCustom";
import defaultImg from "@/assets/demo/default_img.jpg";
import axios from "@/api/axios";

export default function ModalReceberSolicitacao({
    modalGettr,
    modalSettr,
    notificacao,
    refetch,
}) {
    const aprovarSolicitacao = (aprovar) => {
        axios
            .post(`/solicitacao/${notificacao.solicitacaoId}/${aprovar}`)
            .then(() => {
                refetch();
                modalSettr(false);
            })
            .catch((err) => console.log(err));
    };

    return (
        <ModalCustom
            modalGettr={modalGettr}
            modalSettr={modalSettr}
            canClose
            blurBackgroundStyle={{
                zIndex: "602",
            }}
            modalBackgroundStyle={{
                zIndex: "603",
            }}
            modalStyle={{
                backgroundColor: "#EFFFEF",
            }}
        >
            <div className="w-[900px] h-[500px] flex flex-col items-center">
                <div className="bg-[#185738] w-full h-[20%] rounded-t-lg flex items-center justify-center text-white font-semibold text-xl">
                    Solicitação de {notificacao?.nomeUsuario}
                </div>
                <div className="w-full h-full flex px-20 gap-8 py-8">
                    <div className="w-[50%] h-full flex flex-col gap-2">
                        <span className="text-lg font-normal">
                            {notificacao?.solicitacao?.incluiAula
                                ? "Serviço + aula necessitado:"
                                : "Serviço necessitado:"}
                        </span>
                        <div className="bg-white w-fit rounded-xl drop-shadow-md px-4 text-center py-1">
                            {notificacao?.solicitacao?.servico} -{" "}
                            {notificacao?.solicitacao?.tamanho}
                            {notificacao?.solicitacao?.medida}
                        </div>
                        <span className="text-lg font-normal">
                            Comentários adicionais:
                        </span>
                        <div className="bg-white w-full h-full rounded-xl drop-shadow-md p-2 overflow-auto">
                            {notificacao?.solicitacao?.descricao}
                        </div>
                        <button
                            className="text-white bg-[#388760] w-fit self-end px-5 rounded-md text-2xl py-1 mt-4 hover:bg-[rgb(43,111,77)] transition-colors"
                            onClick={() => {
                                aprovarSolicitacao(true);
                            }}
                        >
                            Aceitar
                        </button>
                    </div>
                    <div className="w-[50%] h-full flex flex-col gap-2">
                        <span className="text-lg font-normal">
                            Imagens em anexo:
                        </span>
                        <div className="w-[350px] h-[250px] grid grid-cols-3 gap-1 rounded-xl overflow-hidden">
                            {Array.from({ length: 6 }, (_, i) => (
                                <img
                                    onError={({ target }) => {
                                        target.src = defaultImg;
                                    }}
                                    key={i}
                                    src={notificacao?.solicitacao?.imagens[i]}
                                    alt=" "
                                    className="bg-gray-200 object-fit h-[125px]"
                                />
                            ))}
                        </div>
                        <button
                            className="text-white bg-[#BE4343] w-fit self-start px-5 rounded-md text-2xl py-1 mt-4 hover:bg-[rgb(168,37,37)] transition-colors"
                            onClick={() => {
                                aprovarSolicitacao(false);
                            }}
                        >
                            Recusar
                        </button>
                    </div>
                </div>
            </div>
        </ModalCustom>
    );
}
