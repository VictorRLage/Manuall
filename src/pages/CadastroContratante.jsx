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

    return (
        <div className="flex justify-center items-center h-screen bg-cover" style={{
            backgroundImage: `url(${CadastroBg})`, backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
        }}>
            {modalAviso && <ModalAviso titulo={avisoTitulo} descricao={avisoDescricao} tempo={10000} modal={setMoldaAviso} />}
            <div className="flex bg-white h-144 w-288 rounded-lg drop-shadow-all overflow-x-hidden scroll-smooth" ref={scrollingDiv}>
                <ContratanteFase1 mudarStep={mudarStep} />
                <CadastroSidebar />
                <ContratanteFase2 />
            </div>
        </div>
    );
}
