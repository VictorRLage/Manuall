export default function SolicitacaoFase3({
    descricao: { descricao, setDescricao },
}) {
    return (
        <textarea
            className="w-[422px] h-[140px] max-h-[200px] min-h-[50px] rounded-lg border-cinza-claro-1 border-2 focus:outline-none focus:ring-0 focus:border-[#90cd93] p-2"
            placeholder="Descreva mais sobre o serviço/aula desejado"
            value={descricao}
            onChange={({ target }) => setDescricao(target.value)}
        />
    );
}
