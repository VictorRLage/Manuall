import { useState, useRef, useEffect } from "react";
import CadastroSidebar from "@/components/cadastro/CadastroSidebar";
import ContratanteFase1 from "@/components/cadastro/ContratanteFase1";
import ContratanteFase2 from "@/components/cadastro/ContratanteFase2";
import ModalAviso from "@/components/main/ModalAviso";
import CadastroBg from "@/assets/shapes/CadastroBg.svg"

export default function CadastroContratante() {

    const scrollingDiv = useRef(null);

    const [modalAviso, setMoldaAviso] = useState(false)
    const [avisoTitulo, setAvisoTitulo] = useState("")
    const [avisoDescricao, setAvisoDescricao] = useState("")

    useEffect(() => { scrollingDiv.current.scrollLeft = 0 }, [])
    const mudarStep = () => scrollingDiv.current.scrollLeft = 2000;

    const validarStep1 = (validado, { nome, email, cpf, telefone, senha }) => {

        console.log(validado)
        if (!validado) {
            setMoldaAviso(true)
            setAvisoTitulo("Campos inválidos")
            setAvisoDescricao("Preencha todos os campos")
            return
        } else {
            console.log("tudo validado")
            return;
        }
        axios.post("/cadastrar/1", {
            nome,
            email,
            cpf,
            telefone,
            senha,
            tipoUsuario: 1
        })
            .then((res) => {
                if (res.status === 201) {
                    localStorage.setItem("ID_CADASTRANTE", res.data)
                    mudarStep()
                } else {
                    setMoldaAviso(true)
                    setAvisoTitulo("Erro interno")
                    setAvisoDescricao("Por favor tente novamente mais tarde")
                }
            })
            .catch((err) => {
                console.log(err)
                if (err.response.status === 400) {
                    for (let i = 0; i < err.response.data.errors.length; i++) {
                        const stringOriginal = err.response.data.errors[i].field
                        const stringMaiuscula = stringOriginal.toUpperCase();
                        setMoldaAviso(true)
                        setAvisoTitulo(`${stringMaiuscula} inválido`)
                        setAvisoDescricao(err.response.data.errors[i].defaultMessage)
                    }

                } else if (err.response.status === 409) {
                    setMoldaAviso(true)
                    setAvisoTitulo("Email já cadastrado")
                    setAvisoDescricao("Tente acessar sua conta")
                } else {
                    setMoldaAviso(true)
                    setAvisoTitulo("Erro interno")
                    setAvisoDescricao("Por favor tente novamente mais tarde")
                }
            })
    }

    return (
        <div className="flex justify-center items-center h-screen bg-no-repeat bg-center" style={{
            backgroundImage: `url(${CadastroBg})`, backgroundSize: "100%",
        }}>
            {modalAviso && <ModalAviso titulo={avisoTitulo} descricao={avisoDescricao} tempo={10000} modal={setMoldaAviso} />}
            <div className="flex bg-white h-144 w-288 rounded-lg drop-shadow-all overflow-x-hidden scroll-smooth" ref={scrollingDiv}>
                <ContratanteFase1 mudarStep={mudarStep} passarFase={validarStep1} />
                <CadastroSidebar />
                <ContratanteFase2 mudarStep={mudarStep} passarFase={validarStep1} />
            </div>
        </div>
    );
}
