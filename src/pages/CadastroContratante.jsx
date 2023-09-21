import { useState, useRef, useEffect } from "react";
import CadastroSidebar from "@/components/cadastro/CadastroSidebar";
import Fase1 from "@/components/cadastro/Fase1";
import Fase2 from "@/components/cadastro/Fase2";
import ModalAviso from "@/components/main/ModalAviso";
import CadastroBg from "@/assets/shapes/CadastroBg.svg";
import axios from "@/api/axios";
import { useNavigate } from "react-router-dom";

export default function CadastroContratante() {
    const navigate = useNavigate();

    // const { refetch, error, isLoading, whenCompleted } = await "http://localhost:8080/".post({
    //     body: {},
    //     headers: {},
    //     apiOptions: {
    //         refetchTimeout: 15000,
    //         refetchOnWindowFocus: false,
    //     }
    // }, {
    //     onFinish: (promise) => {},
    //     onSuccess: (data) => {

    //     },
    // })

    const scrollingDiv = useRef(null);

    const [modalAviso, setMoldaAviso] = useState(false);
    const [avisoTitulo, setAvisoTitulo] = useState("");
    const [avisoDescricao, setAvisoDescricao] = useState("");

    const [fase1FinalLoading, setFase1FinalLoading] = useState(false);
    const [fase2FinalLoading, setFase2FinalLoading] = useState(false);

    const validarStep1 = (validado, { nome, email, cpf, telefone, senha }) => {
        if (!validado) {
            setMoldaAviso(true);
            setAvisoTitulo("Campos inválidos");
            setAvisoDescricao("Preencha todos os campos");
            return;
        }

        setFase1FinalLoading(true);

        axios
            .post("/cadastrar/1", {
                nome,
                email,
                cpf,
                telefone,
                senha,
                tipoUsuario: 1,
            })
            .then((res) => {
                if (res.status === 201) {
                    localStorage.setItem("ID_CADASTRANTE", res.data);
                    mudarStep();
                } else {
                    setMoldaAviso(true);
                    setAvisoTitulo("Erro interno");
                    setAvisoDescricao("Por favor tente novamente mais tarde");
                }
            })
            .catch((err) => {
                console.log(err);
                if (err.response.status === 400) {
                    for (let i = 0; i < err.response.data.errors.length; i++) {
                        setMoldaAviso(true);
                        setAvisoTitulo(
                            `${err.response.data.errors[
                                i
                            ]?.field.toUpperCase()} inválido`
                        );
                        setAvisoDescricao(
                            err.response.data.errors[i]?.defaultMessage
                        );
                    }
                } else if (err.response.status === 409) {
                    setMoldaAviso(true);
                    setAvisoTitulo("Email já cadastrado");
                    setAvisoDescricao("Tente acessar sua conta");
                } else {
                    setMoldaAviso(true);
                    setAvisoTitulo("Erro interno");
                    setAvisoDescricao("Por favor tente novamente mais tarde");
                }
            })
            .finally(() => {
                setFase1FinalLoading(false);
            });
    };

    const validarStep2 = (
        validado,
        { cep, estado, cidade, bairro, rua, numero, complemento }
    ) => {
        if (!validado) {
            setMoldaAviso(true);
            setAvisoTitulo("Campos inválidos");
            setAvisoDescricao("Preencha todos os campos");
            return;
        }

        setFase2FinalLoading(true);

        axios
            .put(`/cadastrar/2/${localStorage.getItem("ID_CADASTRANTE")}`, {
                cep,
                estado,
                cidade,
                bairro,
                rua,
                numero,
                complemento: !complemento ? null : complemento,
            })
            .then((res) => {
                if (res.status === 201) {
                    navigate("/login");
                } else {
                    setMoldaAviso(true);
                    setAvisoTitulo("Erro interno");
                    setAvisoDescricao("Por favor tente novamente mais tarde");
                }
            })
            .catch((err) => {
                console.log(err);
                if (err.response.status === 404) {
                    setMoldaAviso(true);
                    setAvisoTitulo("Você ainda não chegou nessa fase");
                    setAvisoDescricao("Por favor tente novamente mais tarde");
                } else if (err.response.status === 409) {
                    setMoldaAviso(true);
                    setAvisoTitulo("Você já passou dessa fase");
                    setAvisoDescricao("Por favor tente novamente mais tarde");
                } else {
                    setMoldaAviso(true);
                    setAvisoTitulo("Erro interno");
                    setAvisoDescricao("Por favor tente novamente mais tarde");
                }
            })
            .finally(() => {
                setFase2FinalLoading(false);
            });
    };

    useEffect(() => {
        scrollingDiv.current.scrollLeft = 0;
    }, []);
    const mudarStep = () => (scrollingDiv.current.scrollLeft = 2000);

    return (
        <div
            className="flex justify-center items-center h-screen bg-no-repeat bg-center"
            style={{
                backgroundImage: `url(${CadastroBg})`,
                backgroundSize: "100%",
            }}
        >
            {modalAviso && (
                <ModalAviso
                    titulo={avisoTitulo}
                    descricao={avisoDescricao}
                    tempo={10000}
                    modal={setMoldaAviso}
                />
            )}
            <div
                className="flex bg-white h-144 w-288 rounded-lg drop-shadow-all overflow-x-hidden scroll-smooth"
                ref={scrollingDiv}
            >
                <Fase1
                    stepInfo={{
                        passarFaseAtalho: mudarStep,
                        fases: 2,
                    }}
                    passarFase={validarStep1}
                    isNextLoading={fase1FinalLoading}
                />
                <CadastroSidebar mainText="Cadastro de Contratante" />
                <Fase2
                    stepInfo={{
                        passarFaseAtalho: mudarStep,
                        fases: 2,
                    }}
                    passarFase={validarStep2}
                    isNextLoading={fase2FinalLoading}
                />
            </div>
        </div>
    );
}
