import { useEffect, useRef, useState } from "react";
import CadastroSidebar from "@/components/cadastro/CadastroSidebar";
import Fase1 from "@/components/cadastro/Fase1";
import Fase2 from "@/components/cadastro/Fase2";
import Fase3 from "@/components/cadastro/Fase3";
import ModalAviso from "@/components/main/ModalAviso";
import CadastroBg from "@/assets/shapes/CadastroBg.svg";
import axios from "@/api/axios";
import ModalConclusaoCadastroPrestador from "@/components/cadastro/ModalConclusaoCadastroPrestador";
import { useLocation } from "react-router-dom";
import ModalJaPossuiConta from "@/components/cadastro/ModalJaPossuiConta";
import ModalFaseCadastro from "@/components/cadastro/ModalFaseCadastro";

export default function CadastroPrestador() {
    const location = useLocation();

    const scrollingDiv = useRef(null);

    const [modalConclusaoCadastro, setModalConclusaoCadastro] = useState(false);
    const [modalJaPossuiConta, setModalJaPossuiConta] = useState(false);

    const [voltaCadastro1Dados, setVoltaCadastro1Dados] = useState();
    const [voltaCadastro2Dados, setVoltaCadastro2Dados] = useState();

    const [isReturning, setIsReturning] = useState(false);

    const [modalFaseCadastro, setModalFaseCadastro] = useState(false);
    const [modalFaseCadastroFase, setModalFaseCadastroFase] = useState(null);

    const [modalAviso, setModalAviso] = useState(false);
    const [avisoTitulo, setAvisoTitulo] = useState("");
    const [avisoDescricao, setAvisoDescricao] = useState("");

    const [stepAtual, setStepAtual] = useState(
        location.state?.fase ? location.state.fase : 1,
    );
    const [delayedStepAtual, setDelayedStepAtual] = useState(
        location.state?.fase ? location.state.fase : 1,
    );

    const [fase1FinalLoading, setFase1FinalLoading] = useState(false);
    const [fase2FinalLoading, setFase2FinalLoading] = useState(false);
    const [fase3FinalLoading, setFase3FinalLoading] = useState(false);

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
                tipoUsuario: 2,
                isReturning,
                id: localStorage.getItem("ID_CADASTRANTE") || null,
            })
            .then((res) => {
                if (res.status === 201) {
                    localStorage.setItem("ID_CADASTRANTE", res.data.usuarioId);
                    setStepAtual(2);
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
                    setStepAtual(3);
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

    const validarStep3 = (
        validado,
        { area, servicos, prestaAula, orcamentoMin, orcamentoMax },
    ) => {
        if (!validado) {
            setModalAviso(true);
            setAvisoTitulo("Campos inválidos");
            setAvisoDescricao("Preencha todos os campos");
            return;
        }

        setFase3FinalLoading(true);

        axios
            .put(`/cadastrar/3/${localStorage.getItem("ID_CADASTRANTE")}`, {
                area,
                servico: servicos,
                prestaAula,
                orcamentoMin,
                orcamentoMax,
            })
            .then((res) => {
                if (res.status === 201) {
                    setIsReturning(false);
                    setModalConclusaoCadastro(true);
                } else {
                    setModalAviso(true);
                    setAvisoTitulo("Erro interno");
                    setAvisoDescricao("Por favor tente novamente mais tarde");
                }
            })
            .catch((err) => {
                if (err.response.status === 403) {
                    setModalAviso(true);
                    setAvisoTitulo("Tipo usuário inválido");
                    setAvisoDescricao("Por favor tente novamente mais tarde");
                } else if (err.response.status === 404) {
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
                setFase3FinalLoading(false);
            });
    };

    useEffect(() => {
        if (stepAtual % 2 !== 0) {
            scrollingDiv.current.style.scrollBehavior = "auto";
            scrollingDiv.current.scrollLeft = 2000;
        }
        if (location.state?.id) {
            localStorage.setItem("ID_CADASTRANTE", location.state.id);
        }
    }, []); // eslint-disable-line

    useEffect(() => {
        if (stepAtual === 3) {
            setDelayedStepAtual(3);
            setTimeout(() => {
                scrollingDiv.current.style.scrollBehavior = "smooth";
                scrollingDiv.current.scrollLeft =
                    stepAtual % 2 !== 0 ? 2000 : 0;
            }, 1);
        } else {
            scrollingDiv.current.style.scrollBehavior = "smooth";
            scrollingDiv.current.scrollLeft = stepAtual % 2 !== 0 ? 2000 : 0;

            setTimeout(() => {
                setDelayedStepAtual(stepAtual);
            }, 150);
        }
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
            <ModalConclusaoCadastroPrestador
                modalGettr={modalConclusaoCadastro}
                modalSettr={setModalConclusaoCadastro}
            />
            <ModalJaPossuiConta
                modalGettr={modalJaPossuiConta}
                modalSettr={setModalJaPossuiConta}
                tipoUsuario="prestador"
            />
            <ModalFaseCadastro
                modalGettr={modalFaseCadastro}
                modalSettr={setModalFaseCadastro}
                fase={modalFaseCadastroFase}
                changePhaseTo={setStepAtual}
            />
            <div
                className="flex bg-white h-144 w-288 rounded-lg drop-shadow-all overflow-x-hidden"
                ref={scrollingDiv}
            >
                <Fase2
                    stepInfo={{
                        passarFaseAtalho: () => {
                            setStepAtual(3);
                            setIsReturning(false);
                        },
                        fases: 3,
                    }}
                    voltarFase={() => {
                        setStepAtual(1);
                        setIsReturning(true);
                        axios
                            .get(
                                `/cadastrar/1/${localStorage.getItem(
                                    "ID_CADASTRANTE",
                                )}`,
                            )
                            .then(({ data }) => {
                                setVoltaCadastro1Dados(data);
                            });
                    }}
                    passarFase={validarStep2}
                    voltaCadastroDados={voltaCadastro2Dados}
                    isNextLoading={fase2FinalLoading}
                />
                <CadastroSidebar mainText="Cadastro de Prestador" />
                {delayedStepAtual <= 1 ? (
                    <Fase1
                        stepInfo={{
                            passarFaseAtalho: () => {
                                setStepAtual(2);
                                setIsReturning(false);
                            },
                            fases: 3,
                        }}
                        passarFase={validarStep1}
                        voltaCadastroDados={voltaCadastro1Dados}
                        isNextLoading={fase1FinalLoading}
                    />
                ) : (
                    <Fase3
                        stepInfo={{
                            passarFaseAtalho: () => {
                                setStepAtual(4);
                                setIsReturning(false);
                            },
                            fases: 3,
                        }}
                        passarFase={validarStep3}
                        voltarFase={() => {
                            setStepAtual(2);
                            setIsReturning(true);
                            axios
                                .get(
                                    `/cadastrar/2/${localStorage.getItem(
                                        "ID_CADASTRANTE",
                                    )}`,
                                )
                                .then(({ data }) => {
                                    setVoltaCadastro2Dados(data);
                                });
                        }}
                        isNextLoading={fase3FinalLoading}
                    />
                )}
            </div>
        </div>
    );
}
