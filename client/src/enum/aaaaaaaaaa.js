
const codigosPossiveis = [
    10234, 20458, 36592, 48601, 57238, 69472, 78503, 89156, 92078, 14567, 23569, 31704, 42865, 53910, 65421,
    76829, 87041, 98235, 14369, 25781, 39274, 40895, 51678, 62743, 73892, 84921, 96135, 17316, 18425, 29630,
    43186, 54297, 65302, 76458, 87539, 98641, 29725, 10387, 21459, 32546, 43670, 54728, 65894, 76931, 81054,
    92163, 43278, 12496, 23850, 34029, 45213, 56347, 67490, 78521, 89603, 91745, 32859, 13024, 24530, 35674,
    47206, 58312, 69048, 70159, 81235, 92346, 53472, 14928, 26013, 37104, 48251, 59327, 60418, 71562, 82604,
    93721, 64875, 15923, 27048, 38125, 49372, 50018, 62103, 73249, 84375, 95401, 76512, 17623, 28734, 39820,
    50416, 61528, 72639, 83701, 94815, 25924, 17058, 28136, 39274, 40385, 51467, 62581, 73692, 84703, 95821,
    26931, 17580, 28649, 39705, 50816, 52473, 63597, 74608, 85714, 96802, 17945, 18529, 29674, 40785, 51829,
    53482, 64017, 75138, 86249, 97351, 98462, 19578, 20613, 31745, 42803, 54491, 65520, 76142, 87253, 98314,
    89427, 20536, 31647, 42758, 53869, 55049, 66125, 77236, 88347, 99450, 30561, 11672, 22783, 33894, 44005,
    56058, 67134, 78245, 89356, 10428, 21539, 32641, 43752, 54863, 65974, 57063, 68142, 79253, 80364, 91475,
    72586, 13697, 24708, 35819, 46920, 58072, 69151, 80262, 91373, 62484, 13595, 24606, 35717, 46828, 57939,
    59081, 70160, 81271, 92382, 53493, 14504, 25615, 36726, 47837, 58948, 60085, 71169, 82174, 93285, 44396,
    15407, 26518, 37629, 48740, 59851,
]

export default [{
    id: 10234,
    title: "Mensagens sobre aquilo lá",
    msgsType: "ANSWER",
    getMensagens(todosOsParametrosDoUsuario) {
        return [
            ""
        ]
    },
    getProximo(todosOsParametrosDoUsuario) {
        return 20458
    },
},
{
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
    getProximo(todosOsParametrosDoUsuario) {
        return 78503
    }
},
{
    id: 78503,
    msgsType: "ANSWER",
    getMensagens(todosOsParametrosDoUsuario) {
        return [
            "Sim", // 36592
            "Não", // 48601
        ]
    },
    getProximo(todosOsParametrosDoUsuario) {
        return 1
    }
},
{
    id: 36592,
    msgsType: "COSTUMER",
    getMensagens(todosOsParametrosDoUsuario) {
        return [
            "Sim"
        ]
    },
    getProximo(todosOsParametrosDoUsuario) {
        return 57238
    }
},
{
    id: 57238,
    msgsType: "CHATBOT",
    getMensagens(todosOsParametrosDoUsuario) {
        return [
            "Ok, vou te mostrar alguns serviços que temos disponíveis!",
        ]
    },
    getProximo(todosOsParametrosDoUsuario) {
        return "TODO"
    }
},
{
    id: 48601,
    msgsType: "COSTUMER",
    getMensagens(todosOsParametrosDoUsuario) {
        return [
            "Não"
        ]
    },
    getProximo(todosOsParametrosDoUsuario) {
        return 69472
    }
},
{
    id: 69472,
    msgsType: "CHATBOT",
    getMensagens(todosOsParametrosDoUsuario) {
        return [
            "Ok, você ainda pode entrar em contato se mudar de ideia!",
        ]
    },
    getProximo(todosOsParametrosDoUsuario) {
        return "FIM DO FLUXO"
    }
},]