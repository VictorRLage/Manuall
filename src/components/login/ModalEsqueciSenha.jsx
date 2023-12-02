import React, { useState } from "react";
import ModalCustom from "@/components/main/ModalCustom";
import axios from "@/api/axios";
import { EnvelopeIcon} from "@heroicons/react/24/solid";

export default function ModalEsqueciMinhaSenha({ modalGettr, modalSettr }) {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [codigo, setcodigo] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [mensagem, setMensagem] = useState(null);

    const handleEnviarLinkRecuperacao = () => {
        const subject = "";
        const text = "";

        axios
            .post("/email/enviaremail", {
                email,
                subject,
                text,
            })
            .then(() => setStep(2));

        console.log("Link de recuperação enviado para:", email);
    };

    const handleVerificarCodigo = () => {
        console.log("Código verificado com sucesso:", codigo);

        axios
            .post("/usuario/login/checar", {
                email,
                codigo,
            })
            .then((response) => {
                if (response.status === 200) {
                    // Código válido
                    setMensagem(
                        "Código verificado com sucesso. Prossiga para redefinir a senha.",
                    );
                    // Avançar para o próximo passo (passo 3)
                    setStep(3);
                } else {
                    // Código inválido
                    setMensagem(
                        "Código inválido ou expirado. Por favor, verifique e tente novamente.",
                    );
                }
            })
            .catch((error) => {
                // Ocorreu um erro na chamada
                console.error("Erro ao verificar código:", error);
                setMensagem(
                    "Ocorreu um erro ao verificar o código. Tente novamente mais tarde.",
                );
            });
    };

    const handleRedefinirSenha = () => {
        axios
            .patch("/usuario/atualizar-senha", {
                email,
                novaSenha: newPassword,
            })
            .then((response) => {
                if (response.status === 200) {
                    // Senha redefinida com sucesso
                    console.log("Senha redefinida com sucesso.");
                    // Fechar o modal após a redefinição da senha
                    modalSettr(false);
                } else {
                    // Trate erros de acordo com a resposta do servidor
                    console.error("Erro ao redefinir a senha:", response.data);
                }
            })
            .catch((error) => {
                // Ocorreu um erro na chamada
                console.error("Erro ao redefinir a senha:", error);
            });
    };

    return (
        <ModalCustom modalGettr={modalGettr} modalSettr={modalSettr} canClose>
            <div className="bg-white rounded-lg flex flex-col items-center p-8 gap-8 border-2">
                <div className="w-120 h-60 flex flex-col justify-center items-center gap-4">
                    <span className="text-2xl text-center font-semibold">
                        {step === 1
                            ? "Esqueci Minha Senha"
                            : step === 2
                            ? "Verificar Código"
                            : "Redefinir Senha"}
                    </span>
                    {step === 1 ? (
                        <div className="flex flex-col gap-4 w-full mt-10 text-center items-center">
                            <label htmlFor="email" className="text-lg">
                                Digite seu e-mail:
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="block px-2.5 pb-2.5 pt-4 w-84 text-base text-gray-900 bg-transparent rounded-lg border-2 appearance-none focus:outline-none focus:ring-0 focus:border-verde-padrao peer transition-colors border-cinza-claro-1 hover:border-green-300"
                                    placeholder="Seu e-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label
                                    htmlFor="email"
                                    className="cursor-text absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"
                                >
                                    <EnvelopeIcon className="h-5 w-5 mr-1" />
                                    Endereço de email
                                </label>
                            </div>
                            <button
                                className="bg-verde-padrao text-white px-4 py-2 rounded hover:bg-verde-escuro-1 mt-9"
                                onClick={handleEnviarLinkRecuperacao}
                            >
                                Enviar Link de Recuperação
                            </button>
                        </div>
                    ) : step === 2 ? (
                        <div className="flex flex-col gap-4 w-full mt-10 text-center items-center">
                            <label htmlFor="codigo" className="text-lg">
                                Digite o código enviado por e-mail:
                            </label>
                            {mensagem && (
                                <p
                                    className={
                                        mensagem.includes("sucesso")
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }
                                >
                                    {mensagem}
                                </p>
                            )}
                            <div className="relative">
                                <input
                                    type="text"
                                    id="codigo"
                                    name="codigo"
                                    className="border-2 p-2 rounded w-80 border-green-600"
                                    placeholder="Código de Recuperação"
                                    value={codigo}
                                    onChange={(e) => setcodigo(e.target.value)}
                                />
                            </div>
                            <button
                                className="bg-verde-padrao text-white px-4 py-2 rounded hover:bg-verde-escuro-1 mt-9"
                                onClick={handleVerificarCodigo}
                            >
                                Verificar Código
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 w-full mt-10 text-center items-center">
                            <label htmlFor="newPassword" className="text-lg">
                                Digite sua nova senha:
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    className="border-2 p-2 rounded w-80 border-green-600"
                                    placeholder="Nova Senha"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                />
                            </div>
                            <button
                                className="bg-verde-padrao text-white px-4 py-2 rounded hover:bg-verde-escuro-1 mt-9"
                                onClick={handleRedefinirSenha}
                            >
                                Redefinir Senha
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </ModalCustom>
    );
}
