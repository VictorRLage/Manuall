import { useState, useRef, useEffect } from "react";
import CadastroSidebar from "@/components/cadastro/CadastroSidebar";
import Fase1 from "@/components/cadastro/Fase1";
import Fase2 from "@/components/cadastro/Fase2";
import ModalAviso from "@/components/main/ModalAviso";
import CadastroBg from "@/assets/shapes/CadastroBg.svg";
import axios from "@/api/axios";
import ModalConclusaoCadastroContratante from "@/components/cadastro/ModalConclusaoCadastroContratante";
import ModalJaPossuiConta from "@/components/cadastro/ModalJaPossuiConta";
import ModalFaseCadastro from "@/components/cadastro/ModalFaseCadastro";

export default function CadastroContratante() {
    const scrollingDiv = useRef(null);

    const [modalConclusaoCadastro, setModalConclusaoCadastro] = useState(false);
    const [modalJaPossuiConta, setModalJaPossuiConta] = useState(false);

    const [modalFaseCadastro, setModalFaseCadastro] = useState(false);
    const [modalFaseCadastroFase, setModalFaseCadastroFase] = useState(null);

    const [voltaCadastroDados, setVoltaCadastroDados] = useState();

    const [isReturning, setIsReturning] = useState(false);

    const [modalAviso, setModalAviso] = useState(false);
    const [avisoTitulo, setAvisoTitulo] = useState("");
    const [avisoDescricao, setAvisoDescricao] = useState("");

    const [fase1FinalLoading, setFase1FinalLoading] = useState(false);
    const [fase2FinalLoading, setFase2FinalLoading] = useState(false);

    const [stepAtual, setStepAtual] = useState(1);

    const validarStep1 = (validado, { nome, email, cpf, telefone, senha }) => {
        if (!validado) {
            setModalAviso(true);
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
                isReturning,
                id: localStorage.getItem("ID_CADASTRANTE") || null,
            })
            .then((res) => {
                if (res.status === 201) {
                    localStorage.setItem("ID_CADASTRANTE", res.data.usuarioId);
                    mudarStep();
                } else if (res.status === 206) {
                    localStorage.setItem("ID_CADASTRANTE", res.data.usuarioId);
                    setModalFaseCadastroFase(res.data.fase);
                    setModalFaseCadastro(true);
                } else {
                    setModalAviso(true);
                    setAvisoTitulo("Erro interno");
                    setAvisoDescricao("Por favor tente novamente mais tarde");
                }
            })
            .catch(({ response }) => {
                if (response.status === 400) {
                    for (let i = 0; i < response.data.errors.length; i++) {
                        setModalAviso(true);
                        setAvisoTitulo(
                            `${response.data.errors[
                                i
                            ]?.field.toUpperCase()} inválido`,
                        );
                        setAvisoDescricao(
                            response.data.errors[i]?.defaultMessage,
                        );
                    }
                } else if (response.status === 409) {
                    setModalJaPossuiConta(true);
                } else {
                    setModalAviso(true);
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
        { cep, estado, cidade, bairro, rua, numero, complemento },
    ) => {
        if (!validado) {
            setModalAviso(true);
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
                    setModalConclusaoCadastro(true);
                } else {
                    setModalAviso(true);
                    setAvisoTitulo("Erro interno");
                    setAvisoDescricao("Por favor tente novamente mais tarde");
                }
            })
            .catch((err) => {
                console.log(err);
                if (err.response.status === 404) {
                    setModalAviso(true);
                    setAvisoTitulo("Você ainda não chegou nessa fase");
                    setAvisoDescricao("Por favor tente novamente mais tarde");
                } else if (err.response.status === 409) {
                    setModalAviso(true);
                    setAvisoTitulo("Você já passou dessa fase");
                    setAvisoDescricao("Por favor tente novamente mais tarde");
                } else {
                    setModalAviso(true);
                    setAvisoTitulo("Erro interno");
                    setAvisoDescricao("Por favor tente novamente mais tarde");
                }
            })
            .finally(() => {
                setFase2FinalLoading(false);
            });
    };

    useEffect(() => {
        setStepAtual(1);
    }, []);
    const mudarStep = () => {
        setStepAtual(2);
    };
    const voltarStep = () => {
        setStepAtual(1);

        axios
            .get(`/cadastrar/1/${localStorage.getItem("ID_CADASTRANTE")}`)
            .then(({ data }) => {
                setVoltaCadastroDados(data);
            });
    };

    useEffect(() => {
        scrollingDiv.current.scrollLeft = stepAtual % 2 === 0 ? 2000 : 0;
    }, [stepAtual]);

    return (
        <div
            className="flex justify-center items-center h-screen bg-no-repeat bg-center"
            style={{
                backgroundImage: `url(${CadastroBg})`,
                backgroundSize: "100%",
            }}
        >
            <ModalAviso
                modalGettr={modalAviso}
                modalSettr={setModalAviso}
                tempo={5000}
                titulo={avisoTitulo}
                descricao={avisoDescricao}
            />
            <ModalConclusaoCadastroContratante
                modalGettr={modalConclusaoCadastro}
                modalSettr={setModalConclusaoCadastro}
            />
            <ModalJaPossuiConta
                modalGettr={modalJaPossuiConta}
                modalSettr={setModalJaPossuiConta}
                tipoUsuario="contratante"
            />
            <ModalFaseCadastro
                modalGettr={modalFaseCadastro}
                modalSettr={setModalFaseCadastro}
                fase={modalFaseCadastroFase}
                changePhaseTo={mudarStep}
            />
            <div
                className="scroll-smooth flex bg-white overflow-x-hidden h-full min800:h-[580px] rounded-none min800:rounded-lg min800:drop-shadow-all w-full min800:w-[800px] min1000:w-[900px] min1200:w-[1152px]"
                ref={scrollingDiv}
            >
                <Fase1
                    stepInfo={{
                        passarFaseAtalho: mudarStep,
                        fases: 2,
                    }}
                    passarFase={validarStep1}
                    voltaCadastroDados={voltaCadastroDados}
                    isNextLoading={fase1FinalLoading}
                />
                <CadastroSidebar mainText="Cadastro de Contratante" />
                <Fase2
                    stepInfo={{
                        passarFaseAtalho: mudarStep,
                        fases: 2,
                    }}
                    voltarFase={() => {
                        voltarStep();
                        setIsReturning(true);
                    }}
                    passarFase={validarStep2}
                    isNextLoading={fase2FinalLoading}
                />
            </div>
        </div>
    );
}
