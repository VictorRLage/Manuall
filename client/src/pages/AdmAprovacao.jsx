import Sidebar from "../components/adm/Sidebar"

const AdmAprovacao = (props) => {

    const dadosSimuladosEnquantoMarcoNaoFazARota = [{
        id: 1,
        nome: "Jorge",
        fotoPerfil: "https://d17x34b9fcvxk7.cloudfront.net/static/marketing/images/hero-backgrounds/gardener.jpg",
        email: "jorgesilva68@gmail.com",
        telefone: "11923459087",
        cpf: "45978693013",
        cidade: "São Paulo",
        estado: "SP",
        cep: "04347050",
        bairro: "Jardim Oriental",
        rua: "Jandiroba",
        numero: "325",
        complemento: "Ap 13",
        area: "Jardinagem",
        servicos: [
            "Poda",
            "Controle de pragas",
        ],
        ensino: true,
        orcamentoMin: 200,
        orcamentoMax: 1000
    }]

    return (
        <div className="h-screen w-screen flex bg-cinza-claro-2">
            <Sidebar />
            <div className="w-[82%] h-full overflow-y-scroll">
                <div className="h-[20%] w-full flex items-center">
                    <span className="text-verde-escuro-1 font-bold ml-10 text-[30px]">Aprovações pendentes</span>
                </div>
                <div className="h-[80%] w-full flex flex-wrap justify-evenly">
                    {dadosSimuladosEnquantoMarcoNaoFazARota.map((prestador, index) => (
                        <div key={index} className="h-[80%] w-[40%] m-5 flex justify-center items-center flex-col border-verde-escuro-1 border-2 rounded-lg">
                            <div className="h-[30%] w-[90%] flex justify-center items-center">
                                <img src={prestador.fotoPerfil} className="h-full object-cover w-[25%]" alt="" />
                                <div className="h-full w-[75%] flex flex-col">
                                    <span className="w-full h-[25%] overflow-hidden pl-3 font-bold text-lg">{prestador.nome}</span>
                                    <span className="w-full h-[25%] overflow-hidden pl-3 underline">{prestador.email}</span>
                                    <span className="w-full h-[25%] overflow-hidden pl-3">{prestador.telefone}</span>
                                    <span className="w-full h-[25%] overflow-hidden pl-3">{prestador.cpf}</span>
                                </div>
                            </div>
                            <div className="max-h-[50%] w-[90%] flex justify-center items-center">
                                <div className="h-full w-[50%] p-1">
                                    <div className="w-full break-words font-bold">Endereço</div>
                                    <div className="w-full break-words">{prestador.cidade} - {prestador.estado}</div>
                                    <div className="w-full break-words"><b>CEP:</b> {prestador.cep}</div>
                                    <div className="w-full break-words"><b>Bairro:</b> {prestador.bairro}</div>
                                    <div className="w-full break-words"><b>Rua:</b> {prestador.rua}</div>
                                    <div className="w-full break-words"><b>Número:</b> {prestador.numero}</div>
                                    <div className="w-full break-words"><b>Complemento:</b> {prestador.complemento}</div>
                                </div>
                                <div className="h-full w-[50%] p-1">
                                    <div className="w-full break-words font-bold">Serviço</div>
                                    <div className="w-full break-words"><b>Área:</b> {prestador.area}</div>
                                    <div className="w-full break-words"><b>Serviços:</b></div>
                                    {prestador.servicos.map((servico, index2) => (
                                        <div className="w-full break-words" key={index2}>● {servico};</div>
                                    ))}
                                    <div className="w-full break-words"><b>Ensino:</b> {prestador.ensino ? "SIM" : "NÃO"}</div>
                                    <div className="w-full break-words"><b>Faixa de preço:</b></div>
                                    <div className="w-full break-words">R${prestador.orcamentoMin} - R${prestador.orcamentoMax}</div>
                                </div>
                            </div>
                            <div className="h-[15%] w-[90%] flex justify-center items-center">
                                <div className="cursor-pointer w-[30%] h-[60%] mr-4 bg-[#47AE3E] text-white rounded-lg flex justify-center items-center">Aprovar</div>
                                <div className="cursor-pointer w-[30%] h-[60%] ml-4 bg-[#D02B2B] text-white rounded-lg flex justify-center items-center">Reprovar</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdmAprovacao