const FalasManuelENUM = {
    /* tipoUsuario: */ 1: {},
    /* tipoUsuario: */ 2: /* next: */[{
        get(nomeUsuario = "") {
            const dataAtual = new Date().getHours();
            return `${dataAtual >= 4 && dataAtual <= 12
                ? "Bom dia"
                : dataAtual > 12 && dataAtual <= 18
                    ? "Boa tarde"
                    : dataAtual > 18 && dataAtual <= 1
                        ? "Boa noite"
                        : "Boa madrugada"
                }${nomeUsuario ? " " + nomeUsuario : nomeUsuario}, eu sou Manuel, o seu assistente virtual!`;
        },
        next: [{
            get: (plano = "ERROR") => `Vimos no nosso sistema que você possui o plano ${plano}, e estamos com uma oportunidade para você!`,
            next: [{
                get: () => "Gostaria de saber mais",
                next: [{
                    get: (plano = "avançado") => `Eu gostaria de te oferecer 10% de desconto se assinar o plano ${plano}, o que acha? Com ele vem vários benefícios!`,
                    next: [{
                        get: () => "Sim",
                        next: [{
                            get: () => "Ok, basta assinar o plano e na hora do pagamento o valor será descontado automaticamente!",
                            next: []
                        }]
                    }, {
                        get: () => "Não tenho interesse",
                        next: [{
                            get: () => "Ok, você ainda pode entrar em contato se mudar de ideia!",
                            next: []
                        }]
                    }]
                }, {
                    get: () => "Eu gostaria de te oferecer 10% de desconto na renovação do seu plano atual, o que acha?",
                    next: [{
                        get: () => "Sim",
                        next: [{
                            get: () => "Ok, basta assinar o plano e na hora do pagamento o valor será descontado automaticamente!",
                            next: []
                        }]
                    }, {
                        get: () => "Não tenho interesse",
                        next: [{
                            get: () => "Ok, você ainda pode entrar em contato se mudar de ideia!",
                            next: []
                        }]
                    }]
                }]
            },
            {
                get: () => "Não tenho interesse em economizar dinheiro",
                next: [{
                    get: () => "Ok, você ainda pode entrar em contato se mudar de ideia!",
                    next: []
                }]
            }]
        },
        {
            get: () => "Gostaria de saber formas de alavancar seu negócio com nossas dicas?",
            next: [{
                get: () => "Sim",
                next: [{
                    get: () => "Ok, vou te enviar um e-mail com algumas dicas!",
                    next: []
                }]
            }, {
                get: () => "Não, eu prefiro perder essa oportunidade",
                next: [{
                    get: () => "Ok, você ainda pode entrar em contato se mudar de ideia!",
                    next: []
                }]
            }],
        },
        ],
    }],
};

// Read-only
Object.freeze(FalasManuelENUM);
export default FalasManuelENUM;