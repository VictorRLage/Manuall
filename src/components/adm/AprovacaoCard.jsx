import AprovacaoCardGridSection from "@/components/adm/AprovacaoCardGridSection";
import { formatAs } from "@/utils/functions";

export default function AprovacaoCard({
    prestador: {
        id,
        nome,
        email,
        telefone,
        cpf,
        cidade,
        estado,
        area,
        servicos,
        orcamentoMin,
        orcamentoMax,
        ensino,
        statusProcesso,
    },
    aprovar,
    alterarStatusProcessoAprovacao,
}) {
    return (
        <div className="gap-4 flex flex-col justify-center items-center bg-[#008042] p-4 rounded-lg min min1150:w-[49%] max1150:w-[100%]">
            <div className="grid grid-cols-[auto_auto] gap-x-2 gap-y-2 text-white text-lg">
                <AprovacaoCardGridSection label="Nome" value={nome} />
                <AprovacaoCardGridSection label="Email" value={email} />
                <AprovacaoCardGridSection
                    label="Telefone"
                    value={formatAs("telefone", telefone)}
                />
                <AprovacaoCardGridSection
                    label="CPF"
                    value={formatAs("cpf", cpf)}
                />
                <AprovacaoCardGridSection
                    label="Região"
                    value={`${cidade} - ${estado}`}
                />
                <span className="justify-self-end text-end">
                    Área/Serviços:
                </span>
                <div>
                    <span className="font-bold">{area}</span>
                    <ul className="list-disc">
                        {servicos.map((servico, i) => (
                            <li key={i}>{servico}</li>
                        ))}
                    </ul>
                </div>
                <AprovacaoCardGridSection
                    label="Faixa de Preço"
                    value={`R$ ${orcamentoMin} - R$ ${orcamentoMax}`}
                />
                <AprovacaoCardGridSection
                    label="Interesse em ensinar"
                    value={ensino ? "Sim" : "Não"}
                />
                <span className="justify-self-end text-end">
                    Status do processo:
                </span>
                <select
                    value={statusProcesso || 1}
                    onChange={({ target }) =>
                        alterarStatusProcessoAprovacao(id, target.value)
                    }
                    className="text-black w-fit px-2 py-1 bg-white rounded-lg"
                >
                    <option value={1}>Pendente</option>
                    <option value={2}>Agendado</option>
                    <option value={3}>Finalizado</option>
                </select>
            </div>
            {statusProcesso === 3 && (
                <div className="w-full flex justify-center items-center gap-4 text-white">
                    <button
                        className="px-4 py-2 bg-green-500 hover:bg-green-400 transition-colors rounded-lg text-lg"
                        onClick={() => aprovar(id, 2)}
                    >
                        Aprovar
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 hover:bg-red-400 transition-colors rounded-lg text-lg"
                        onClick={() => aprovar(id, 4)}
                    >
                        Reprovar
                    </button>
                </div>
            )}
        </div>
    );
}
