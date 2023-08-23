import { useNavigate } from "react-router-dom"
import Sidebar from "../components/adm/Sidebar"
import { useEffect, useState } from "react"
import axios from "../api/AxiosConfig"

export default function AdmAprovacao(props) {

    const [prestadores, setPrestadores] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        axios.get("/usuario/login/checar/validade", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`
            }
        })
        .then((res) => {
            if (res.status !== 200 || res.data !== 3) {
                localStorage.removeItem("TOKEN")
                navigate("/login")
            }
        })
        .catch((err) => {
            localStorage.removeItem("TOKEN")
            navigate("/login")
        })
        buscarNovosPrestadores()
    }, []) // eslint-disable-line

    const btnClick = (idPrestador, aprovar) => {
        axios.get(`/usuario/aprovacoesPendentes/${idPrestador}/${aprovar}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`
            }
        })
        .then(buscarNovosPrestadores)
    }

    const buscarNovosPrestadores = () => {
        axios.get("/usuario/aprovacoesPendentes", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`
            }
        })
        .then((res) => {
            if (res.status === 200) {
                setPrestadores(res.data)
            }
        })
    }

    return (
        <div className="h-screen w-screen flex bg-cinza-claro-2">
            <Sidebar />
            <div className="w-[82%] h-full overflow-y-scroll">
                <div className="h-[20%] w-full flex items-center">
                    <span className="text-verde-escuro-1 font-bold ml-10 text-[30px]">Aprovações pendentes</span>
                </div>
                <div className="h-[80%] w-full flex flex-wrap justify-evenly">
                    {prestadores.map((prestador, index) => (
                        <div key={index} className="h-[80%] min-w-[350px] w-[40%] m-5 flex justify-center items-center flex-col border-verde-escuro-1 border-2 rounded-lg">
                            <div className="h-[30%] w-[90%] flex justify-center items-center">
                                <img src={prestador.dados.fotoPerfil} className="h-full object-cover w-[25%]" alt="" />
                                <div className="h-full w-[75%] flex flex-col">
                                    <span className="w-full h-[25%] overflow-hidden pl-3 font-bold text-lg">{prestador.dados.nome}</span>
                                    <span className="w-full h-[25%] overflow-hidden pl-3 underline">{prestador.dados.email}</span>
                                    <span className="w-full h-[25%] overflow-hidden pl-3">{prestador.dados.telefone}</span>
                                    <span className="w-full h-[25%] overflow-hidden pl-3">{prestador.dados.cpf}</span>
                                </div>
                            </div>
                            <div className="max-h-[50%] w-[90%] flex justify-center items-center">
                                <div className="h-full w-[50%] p-1">
                                    <div className="w-full break-words font-bold">Endereço</div>
                                    <div className="w-full break-words">{prestador.dados.cidade} - {prestador.dados.estado}</div>
                                    <div className="w-full break-words"><b>CEP:</b> {prestador.dados.cep}</div>
                                    <div className="w-full break-words"><b>Bairro:</b> {prestador.dados.bairro}</div>
                                    <div className="w-full break-words"><b>Rua:</b> {prestador.dados.rua}</div>
                                    <div className="w-full break-words"><b>Número:</b> {prestador.dados.numero}</div>
                                    <div className="w-full break-words"><b>Complemento:</b> {prestador.dados.complemento}</div>
                                </div>
                                <div className="h-full w-[50%] p-1">
                                    <div className="w-full break-words font-bold">Serviço</div>
                                    <div className="w-full break-words"><b>Área:</b> {prestador.dados.area}</div>
                                    <div className="w-full break-words"><b>Serviços:</b></div>
                                    {prestador.servicos.map((servico, index2) => (
                                        <div className="w-full break-words" key={index2}>● {servico};</div>
                                    ))}
                                    <div className="w-full break-words"><b>Ensino:</b> {prestador.dados.ensino ? "SIM" : "NÃO"}</div>
                                    <div className="w-full break-words"><b>Faixa de preço:</b></div>
                                    <div className="w-full break-words">R${prestador.dados.orcamentoMin} - R${prestador.dados.orcamentoMax}</div>
                                </div>
                            </div>
                            <div className="h-[15%] w-[90%] flex justify-center items-center">
                                <div onClick={() => { btnClick(prestador.dados.id, true) }} className="cursor-pointer w-[30%] h-[60%] mr-4 bg-[#47AE3E] text-white rounded-lg flex justify-center items-center">Aprovar</div>
                                <div onClick={() => { btnClick(prestador.dados.id, false) }} className="cursor-pointer w-[30%] h-[60%] ml-4 bg-[#D02B2B] text-white rounded-lg flex justify-center items-center">Reprovar</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}