export default function SolicitacaoFase1({
    idServico: { idServico, setIdServico },
    servicos,
}) {
    return (
        <div className="flex flex-col m-5 justify-center items-start text-2xl font-base text-center w-auto gap-2 h-[80%] max-h-[80%] overflow-y-auto">
            {servicos?.map(({ id, nome }, i) => (
                <label className="flex items-center" key={i}>
                    <input
                        className="accent-verde-escuro-1 w-[60px]"
                        type="radio"
                        name="idServico"
                        value={id}
                        checked={idServico == id}
                        onChange={({ target }) => {
                            setIdServico(target.value);
                        }}
                    />
                    <div className="cursor-pointer select-none text-slate-700 mx-2 text-xl">
                        {nome}
                    </div>
                </label>
            ))}
        </div>
    );
}
