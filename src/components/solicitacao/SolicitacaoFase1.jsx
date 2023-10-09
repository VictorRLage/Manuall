export default function SolicitacaoFase1({
    idServico: { idServico, setIdServico },
    servicos,
    setIsEveryThingValidated,
}) {
    return (
        <div className="flex flex-col m-5 justify-center items-start text-2xl font-base text-center w-auto gap-2 h-[80%] max-h-[80%] overflow-y-auto">
            {servicos?.map(({ id, nome }) => (
                <label className="flex items-center" key={id}>
                    <input
                        className="accent-verde-escuro-1 w-[60px]"
                        type="radio"
                        name="idServico"
                        value={id}
                        checked={idServico == id}
                        onChange={({ target }) => {
                            setIdServico(target.value);
                            setIsEveryThingValidated(target.value && true);
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
