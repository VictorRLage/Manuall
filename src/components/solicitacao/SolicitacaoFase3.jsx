import SolicitacaoImg from "@/components/solicitacao/SolicitacaoImg";

export default function SolicitacaoFase3({
    descricao: { descricao, setDescricao },
    imagens: { imagens, setImagens },
    openCreateImageModal,
}) {
    const deleteImagem = (url) => {
        setImagens(imagens.filter((img) => img !== url));
    };

    return (
        <div className="w-full h-full flex items-center min900:justify-center max900:py-[10px] max900:my-[20px] gap-4 max900:flex-col max900:overflow-y-scroll">
            <textarea
                className="w-[290px] h-[180px] max-h-[200px] min-h-[180px] rounded-lg border-cinza-claro-1 border-2 focus:outline-none focus:ring-0 focus:border-[#90cd93] p-2"
                placeholder="Descreva mais sobre o serviço/aula desejado"
                value={descricao}
                onChange={({ target }) => setDescricao(target.value)}
            />
            <div className="grid grid-cols-3 rounded-3xl w-[290px] min-h-[180px] overflow-hidden gap-[4px]">
                {Array.from({ length: 6 }, (_, i) => (
                    <SolicitacaoImg
                        openCreateImageModal={openCreateImageModal}
                        key={i}
                        deleteImagem={deleteImagem}
                        isNextToBeUploaded={imagens.length === i}
                        currentImg={imagens[i]}
                    />
                ))}
            </div>
        </div>
    );
}
