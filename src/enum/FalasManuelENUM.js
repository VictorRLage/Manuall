import PlanosENUM from "@/enum/PlanosENUM.js"

export default [{
    // começo do fluxo contratante
    id: 20458,
    msgsType: "CHATBOT",
    getMensagens({ nome }) {
        const dataAtual = new Date().getHours();
        return [
            `${dataAtual >= 4 && dataAtual <= 12
                ? "Bom dia"
                : dataAtual > 12 && dataAtual <= 18
                    ? "Boa tarde"
                    : dataAtual > 18 && dataAtual <= 1
                        ? "Boa noite"
                        : "Boa madrugada"
            }${nome && " " + nome}, eu sou Manuel, o seu assistente virtual!`,
            "Vimos que você acessou nosso site recentemente, está precisando de algum serviço?",
        ]
    },
    getProximo: () => 78503
},
{
    id: 78503,
    msgsType: "ANSWER",
    getMensagens() {
        return [
            {
                nextId: 36592,
                msg: "Sim",
                atualizarCampo: {
                    column: "area",
                    value: "TODO"
                }
            },
            {
                nextId: 48601,
                msg: "Não",
                atualizarCampo: {
                    column: "area2",
                    value: "TODO2"
                }
            },
        ]
    },
    getProximo: () => undefined
},
{
    id: 36592,
    msgsType: "COSTUMER",
    getMensagens() {
        return [
            "Sim"
        ]
    },
    getProximo: () => 57238
},
{
    id: 57238,
    msgsType: "CHATBOT",
    getMensagens() {
        return [
            "Ok, vou te mostrar alguns serviços que temos disponíveis!",
        ]
    },
    getProximo: () => 89156
},
{
    id: 89156,
    msgsType: "ANSWER",
    getMensagens() {
        return [{
            nextId: 92078,
            msg: "Jardineiro(a)",
            atualizarCampo: { column: "area", value: 1 }
        }, {
            nextId: 23569,
            msg: "Pintor(a)",
            atualizarCampo: { column: "area", value: 2 }
        }, {
            nextId: 31704,
            msg: "Eletricista",
            atualizarCampo: { column: "area", value: 3 }
        }, {
            nextId: 42865,
            msg: "Encanador(a)",
            atualizarCampo: { column: "area", value: 4 }
        }, {
            nextId: 53910,
            msg: "Marceneiro(a)",
            atualizarCampo: { column: "area", value: 5 }
        }, {
            nextId: 65421,
            msg: "Montador(a)",
            atualizarCampo: { column: "area", value: 6 }
        }, {
            nextId: 76829,
            msg: "Gesseiro(a)",
            atualizarCampo: { column: "area", value: 7 }
        }]
    },
    getProximo: () => undefined
},
{
    id: 92078,
    msgsType: "COSTUMER",
    getMensagens: () => ["Jardineiro(a)"],
    getProximo: () => 14567
},
{
    id: 23569,
    msgsType: "COSTUMER",
    getMensagens: () => ["Pintor(a)"],
    getProximo: () => 14567
},
{
    id: 31704,
    msgsType: "COSTUMER",
    getMensagens: () => ["Eletricista"],
    getProximo: () => 14567
},
{
    id: 42865,
    msgsType: "COSTUMER",
    getMensagens: () => ["Encanador(a)"],
    getProximo: () => 14567
},
{
    id: 53910,
    msgsType: "COSTUMER",
    getMensagens: () => ["Marceneiro(a)"],
    getProximo: () => 14567
},
{
    id: 65421,
    msgsType: "COSTUMER",
    getMensagens: () => ["Montador(a)"],
    getProximo: () => 14567
},
{
    id: 76829,
    msgsType: "COSTUMER",
    getMensagens: () => ["Gesseiro(a)"],
    getProximo: () => 14567
},
{
    id: 14567,
    msgsType: "CHATBOT",
    getMensagens() {
        return [
            "Entendido!",
            "Poderia confirmar a região que você mora para um atendimento mais personalizado?"
        ]
    },
    getProximo: () => 87041
},
{
    id: 87041,
    msgsType: "ANSWER",
    getMensagens() {
        return [{
            nextId: 98235,
            msg: "São Paulo",
            atualizarCampo: { column: "cidade", value: 1 }
        }, {
            nextId: 14369,
            msg: "São Bernardo do Campo",
            atualizarCampo: { column: "cidade", value: 2 }
        }, {
            nextId: 25781,
            msg: "São Caetano do Sul",
            atualizarCampo: { column: "cidade", value: 3 }
        }, {
            nextId: 39274,
            msg: "Santo André",
            atualizarCampo: { column: "cidade", value: 4 }
        }, {
            nextId: 40895,
            msg: "Osasco",
            atualizarCampo: { column: "cidade", value: 5 }
        }, {
            nextId: 51678,
            msg: "Bauru",
            atualizarCampo: { column: "cidade", value: 6 }
        }, {
            nextId: 62743,
            msg: "Outro",
            atualizarCampo: { column: "cidade", value: 7 }
        }]
    },
    getProximo: () => undefined
},
{
    id: 98235,
    msgsType: "COSTUMER",
    getMensagens: () => ["São Paulo"],
    getProximo: () => 73892
},
{
    id: 14369,
    msgsType: "COSTUMER",
    getMensagens: () => ["São Bernardo do Campo"],
    getProximo: () => 73893
},
{
    id: 25781,
    msgsType: "COSTUMER",
    getMensagens: () => ["São Caetano do Sul"],
    getProximo: () => 73894
},
{
    id: 39274,
    msgsType: "COSTUMER",
    getMensagens: () => ["Santo André"],
    getProximo: () => 73895
},
{
    id: 40895,
    msgsType: "COSTUMER",
    getMensagens: () => ["Osasco"],
    getProximo: () => 73896
},
{
    id: 51678,
    msgsType: "COSTUMER",
    getMensagens: () => ["Bauru"],
    getProximo: () => 73897
},
{
    id: 62743,
    msgsType: "COSTUMER",
    getMensagens: () => ["Outro"],
    getProximo: () => 73898
},
{
    id: 73892,
    msgsType: "CHATBOT",
    getMensagens() {
        return [
            "Entendido!",
            "Vou te encaminhar à uma página especial que mostra apenas prestadores de São Paulo!"
        ]
    },
    getProximo: () => 84921
},
{
    id: 73893,
    msgsType: "CHATBOT",
    getMensagens() {
        return [
            "Entendido!",
            "Vou te encaminhar à uma página especial que mostra apenas prestadores de São Bernardo do Campo!"
        ]
    },
    getProximo: () => 84922
},
{
    id: 73894,
    msgsType: "CHATBOT",
    getMensagens() {
        return [
            "Entendido!",
            "Vou te encaminhar à uma página especial que mostra apenas prestadores de São Caetano do Sul!"
        ]
    },
    getProximo: () => 84923
},
{
    id: 73895,
    msgsType: "CHATBOT",
    getMensagens() {
        return [
            "Entendido!",
            "Vou te encaminhar à uma página especial que mostra apenas prestadores de Santo André!"
        ]
    },
    getProximo: () => 84924
},
{
    id: 73896,
    msgsType: "CHATBOT",
    getMensagens() {
        return [
            "Entendido!",
            "Vou te encaminhar à uma página especial que mostra apenas prestadores de Osasco!"
        ]
    },
    getProximo: () => 84925
},
{
    id: 73897,
    msgsType: "CHATBOT",
    getMensagens() {
        return [
            "Entendido!",
            "Vou te encaminhar à uma página especial que mostra apenas prestadores de Bauru!"
        ]
    },
    getProximo: () => 84926
},
{
    id: 73898,
    msgsType: "CHATBOT",
    getMensagens() {
        return [
            "Entendido!",
            "Vou te encaminhar à página de prestadores!"
        ]
    },
    getProximo: () => 84927
},
{
    id: 84921,
    msgsType: "ANSWER",
    getMensagens() {
        return [{
            nextId: 96135,
            msg: "Sim",
            redirecionar: "/prestadores?pagina=1&cidade=sopaulo"
        }]
    },
    getProximo: () => undefined
},
{
    id: 84922,
    msgsType: "ANSWER",
    getMensagens() {
        return [{
            nextId: 96135,
            msg: "Sim",
            redirecionar: "/prestadores?pagina=1&cidade=sobernardodocampo"
        }]
    },
    getProximo: () => undefined
},
{
    id: 84923,
    msgsType: "ANSWER",
    getMensagens() {
        return [{
            nextId: 96135,
            msg: "Sim",
            redirecionar: "/prestadores?pagina=1&cidade=socaetanodosul"
        }]
    },
    getProximo: () => undefined
},
{
    id: 84924,
    msgsType: "ANSWER",
    getMensagens() {
        return [{
            nextId: 96135,
            msg: "Sim",
            redirecionar: "/prestadores?pagina=1&cidade=santoandr"
        }]
    },
    getProximo: () => undefined
},
{
    id: 84925,
    msgsType: "ANSWER",
    getMensagens() {
        return [{
            nextId: 96135,
            msg: "Sim",
            redirecionar: "/prestadores?pagina=1&cidade=osasco"
        }]
    },
    getProximo: () => undefined
},
{
    id: 84926,
    msgsType: "ANSWER",
    getMensagens() {
        return [{
            nextId: 96135,
            msg: "Sim",
            redirecionar: "/prestadores?pagina=1&cidade=bauru"
        }]
    },
    getProximo: () => undefined
},
{
    id: 84927,
    msgsType: "ANSWER",
    getMensagens() {
        return [{
            nextId: 96135,
            msg: "Sim",
            redirecionar: "/prestadores"
        }]
    },
    getProximo: () => undefined
},
{
    id: 48601,
    msgsType: "COSTUMER",
    getMensagens() {
        return [
            "Não"
        ]
    },
    getProximo: () => 69472
},
{
    id: 69472,
    msgsType: "CHATBOT",
    getMensagens() {
        return [
            "Ok, você ainda pode entrar em contato se mudar de ideia!",
        ]
    },
    getProximo() {
        return undefined
    }
},
// começo fluxo do prestador
{
    id: 10428,
    msgsType: "CHATBOT",
    getMensagens({ nome, plano }) {
        plano = PlanosENUM.fromIdToName(plano)?.toLowerCase()
        const dataAtual = new Date().getHours();
        return [
            `${dataAtual >= 4 && dataAtual <= 12
                ? "Bom dia"
                : dataAtual > 12 && dataAtual <= 18
                    ? "Boa tarde"
                    : dataAtual > 18 || dataAtual <= 1
                        ? "Boa noite"
                        : "Boa madrugada"
            }${nome && " " + nome}, eu sou Manuel, o seu assistente virtual!`,
            `Vimos no nosso sistema que você possui o plano ${plano}, e estamos com uma oportunidade para você!`
        ]
    },
    getProximo: () => 91373
},
{
    id: 91373,
    msgsType: "ANSWER",
    getMensagens() {
        return [{
            nextId: 62484,
            msg: "Gostaria de saber mais",
        }, {
            nextId: 13595,
            msg: "Não tenho interesse em economizar dinheiro",
        }]
    },
    getProximo: () => undefined
},
{
    id: 62484,
    msgsType: "COSTUMER",
    getMensagens() {
        return [
            "Gostaria de saber mais"
        ]
    },
    getProximo: () => 13697
},
{
    id: 13697,
    msgsType: "CHATBOT",
    getMensagens({ plano }) {
        plano = PlanosENUM.fromIdToName(plano + 1)?.toLowerCase()
        return [
            `Eu gostaria de te oferecer 10% de desconto se assinar o plano ${plano}, o que acha? Com ele vem vários benefícios!`,
        ]
    },
    getProximo: () => 24708
},
{
    id: 24708,
    msgsType: "ANSWER",
    getMensagens() {
        return [{
            nextId: 35819,
            msg: "Sim",
        }, {
            nextId: 46920,
            msg: "Não tenho interesse",
        }]
    },
    getProximo: () => undefined
},
{
    id: 35819,
    msgsType: "COSTUMER",
    getMensagens() {
        return [
            "Sim"
        ]
    },
    getProximo: () => 58072
},
{
    id: 58072,
    msgsType: "CHATBOT",
    getMensagens() {
        return [
            "Ok, desconto ativado! Agora basta assinar o plano e na hora do pagamento o valor será descontado automaticamente!",
        ]
    },
    getProximo: () => undefined
},
{
    id: 46920,
    msgsType: "COSTUMER",
    getMensagens() {
        return [
            "Não tenho interesse"
        ]
    },
    getProximo: () => 69151
},
{
    id: 69151,
    msgsType: "CHATBOT",
    getMensagens() {
        return [
            "Ok, você ainda pode entrar em contato se mudar de ideia!",
        ]
    },
    getProximo: () => undefined
},
{
    id: 13595,
    msgsType: "COSTUMER",
    getMensagens() {
        return [
            "Não tenho interesse em economizar dinheiro"
        ]
    },
    getProximo: () => 24606
},
{
    id: 24606,
    msgsType: "CHATBOT",
    getMensagens() {
        return [
            "Ok, você ainda pode entrar em contato se mudar de ideia!",
        ]
    },
    getProximo: () => undefined
},
{
    id: 21539,
    msgsType: "CHATBOT",
    getMensagens({ nome }) {
        const dataAtual = new Date().getHours();
        return [
            `${dataAtual >= 4 && dataAtual <= 12
                ? "Bom dia"
                : dataAtual > 12 && dataAtual <= 18
                    ? "Boa tarde"
                    : dataAtual > 18 || dataAtual <= 1
                        ? "Boa noite"
                        : "Boa madrugada"
            }${nome && " " + nome}, eu sou Manuel, o seu assistente virtual!`,
            "Gostaria de saber formas de alavancar seu negócio com nossas dicas?"
        ]
    },
    getProximo: () => 32641
},
{
    id: 32641,
    msgsType: "ANSWER",
    getMensagens() {
        return [{
            nextId: 43752,
            msg: "Sim",
        }, {
            nextId: 54863,
            msg: "Não, eu prefiro perder essa oportunidade",
        }]
    },
    getProximo: () => undefined
},
{
    id: 43752,
    msgsType: "COSTUMER",
    getMensagens() {
        return [
            "Sim"
        ]
    },
    getProximo: () => 65974
},
{
    id: 65974,
    msgsType: "CHATBOT",
    getMensagens() {
        return [
            "Ok, vou te enviar um e-mail com algumas dicas!",
        ]
    },
    getProximo: () => undefined
},
{
    id: 54863,
    msgsType: "COSTUMER",
    getMensagens() {
        return [
            "Não, eu prefiro perder essa oportunidade"
        ]
    },
    getProximo: () => 65974
},
{
    id: 65974,
    msgsType: "CHATBOT",
    getMensagens() {
        return [
            "Ok, você ainda pode entrar em contato se mudar de ideia!",
        ]
    },
    getProximo: () => undefined
},
]