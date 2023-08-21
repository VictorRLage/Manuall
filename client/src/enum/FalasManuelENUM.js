export default function FalasManuelENUM(
    nomeUsuario = "usuário",
    ultimaDataCliente = new Date()
) {
    return {
        /* tipoUsuario: */1: [
            /* fase: */[
                /* resposta: */{}
            ]
        ],
        /* tipoUsuario: */2: [
            /* fase: */[
                /* resposta: */{
                    selfsender: false,
                    strings: [
                        `${(() => {
                            const dataAtual = new Date().getHours()
                            return dataAtual >= 4 && dataAtual <= 12 ? "Bom dia"
                                : dataAtual > 12 && dataAtual <= 18 ? "Boa tarde"
                                    : dataAtual > 18 && dataAtual <= 1 ? "Boa noite"
                                        : "Boa madrugada"
                        })()} ${nomeUsuario}, eu sou Manuel, o seu assistente virtual!`,
                        ultimaDataCliente - new Date() > 1000 * 60 * 60 * 24 * 30
                        ? "Vimos no nosso sistema que você possui o Plano (x), e estamos com uma novidade para você!"
                        : "Gostaria de saber formas de alavancar seu negócio com nossas dicas?"
                    ],
                }
            ]
        ],
    }
}