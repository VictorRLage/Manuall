const FalasManuelENUM = {
    /* tipoUsuario: */ 1: {},
    /* tipoUsuario: */ 2: /* next: */ [
        {
            isManuel: true,
            getFala(nomeUsuario = "") {
                const dataAtual = new Date().getHours();
                return `${
                    dataAtual >= 4 && dataAtual <= 12
                        ? "Bom dia"
                        : dataAtual > 12 && dataAtual <= 18
                        ? "Boa tarde"
                        : dataAtual > 18 && dataAtual <= 1
                        ? "Boa noite"
                        : "Boa madrugada"
                }${nomeUsuario ? " " + nomeUsuario : nomeUsuario}, eu sou Manuel, o seu assistente virtual!`;
            },
            next: [
                {
                    isManuel: true,
                    getFala(plano = "ERROR") {
                        return `Vimos no nosso sistema que você possui o plano ${plano}, e estamos com uma oportunidade para você!`;
                    },
                    next: [
                        {
                            isManuel: false,
                            getFala() {
                                return "Gostaria de saber mais"
                            },
                            next: [
                                {
                                    isManuel: true,
                                    getFala(plano = "avançado") {
                                        return `Eu gostaria de te oferecer 10% de desconto se assinar o plano ${plano}, o que acha? Com ele vem vários benefícios!`
                                    },
                                    next: [
                                        {
                                            isManuel: false,
                                            getFala() {
                                                return "Sim"
                                            },
                                            next: [
                                                {
                                                    isManuel: true,
                                                    getFala() {
                                                        return "Ok, basta assinar o plano e na hora do pagamento o valor será descontado automaticamente!"
                                                    },
                                                    finalMessage: true,
                                                }
                                            ]
                                        },
                                        {
                                            isManuel: false,
                                            getFala() {
                                                return "Não tenho interesse"
                                            },
                                            next: [
                                                {
                                                    isManuel: true,
                                                    getFala() {
                                                        return "Ok, você ainda pode entrar em contato se mudar de ideia!"
                                                    },
                                                    finalMessage: true,
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    isManuel: true,
                                    getFala() {
                                        return "Eu gostaria de te oferecer 10% de desconto na renovação do seu plano atual, o que acha?"
                                    },
                                    next: [
                                        {
                                            isManuel: false,
                                            getFala() {
                                                return "Sim"
                                            },
                                            next: [
                                                {
                                                    isManuel: true,
                                                    getFala() {
                                                        return "Ok, basta assinar o plano e na hora do pagamento o valor será descontado automaticamente!"
                                                    },
                                                    finalMessage: true,
                                                }
                                            ]
                                        },
                                        {
                                            isManuel: false,
                                            getFala() {
                                                return "Não tenho interesse"
                                            },
                                            next: [
                                                {
                                                    isManuel: true,
                                                    getFala() {
                                                        return "Ok, você ainda pode entrar em contato se mudar de ideia!"
                                                    },
                                                    finalMessage: true,
                                                }
                                            ]
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            isManuel: false,
                            getFala() {
                                return "Não tenho interesse em economizar dinheiro"
                            },
                            next: [
                                {
                                    isManuel: true,
                                    getFala() {
                                        return "Ok, você ainda pode entrar em contato se mudar de ideia!"
                                    },
                                    finalMessage: true,
                                }
                            ]
                        },
                    ],
                },
                {
                    isManuel: true,
                    getFala() {
                        return "Gostaria de saber formas de alavancar seu negócio com nossas dicas?";
                    },
                    next: [
                        {
                            isManuel: false,
                            getFala() {
                                return "Sim"
                            },
                            next: [
                                {
                                    isManuel: true,
                                    getFala() {
                                        return "Ok, vou te enviar um e-mail com algumas dicas!"
                                    },
                                    finalMessage: true,
                                }
                            ]
                        },
                        {
                            isManuel: false,
                            getFala() {
                                return "Não, eu prefiro perder essa oportunidade"
                            },
                            next: [
                                {
                                    isManuel: true,
                                    getFala() {
                                        return "Ok, você ainda pode entrar em contato se mudar de ideia!"
                                    },
                                    finalMessage: true,
                                }
                            ]
                        },
                    ],
                },
            ],
        },
    ],
};

//ultimaDataCliente - new Date() > 1000 * 60 * 60 * 24 * 30

// Read-only
Object.freeze(FalasManuelENUM);
export default FalasManuelENUM;