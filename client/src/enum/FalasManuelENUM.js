export default FalasManuelENUM = {
    /* tipoUsuario: */ 1: {},
    /* tipoUsuario: */ 2: /* next: */ [
        {
            isManuel: true,
            getFala(nomeUsuario) {
                const dataAtual = new Date().getHours();
                return `${
                    dataAtual >= 4 && dataAtual <= 12
                        ? "Bom dia"
                        : dataAtual > 12 && dataAtual <= 18
                        ? "Boa tarde"
                        : dataAtual > 18 && dataAtual <= 1
                        ? "Boa noite"
                        : "Boa madrugada"
                }
            ${nomeUsuario}, eu sou Manuel, o seu assistente virtual!`;
            },
            next: [
                {
                    isManuel: true,
                    getFala(plano) {
                        return `Vimos no nosso sistema que você possui o Plano ${plano}, e estamos com uma novidade para você!`;
                    },
                    next: [
                        {
                            getFala() {
                                return "Gostaria de"
                            }
                        },
                        {
                            getFala() {
                                return "Não tenho interesse na promoção"
                            }
                        },
                    ],
                },
                {
                    isManuel: true,
                    getFala() {
                        return "Gostaria de saber formas de alavancar seu negócio com nossas dicas?";
                    },
                    next: [],
                },
            ],
        },
    ],
};

//ultimaDataCliente - new Date() > 1000 * 60 * 60 * 24 * 30
