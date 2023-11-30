import React, { useState } from "react";
import ModalCustom from "@/components/main/ModalCustom";
import axios from "@/api/axios";

export default function ModalEsqueciMinhaSenha({
    modalGettr,
    modalSettr
}) {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleEnviarLinkRecuperacao = () => {
        // Lógica para enviar o link de recuperação
        // Você pode adicionar a lógica de envio de e-mail aqui
        enviarEmail()
        console.log("Link de recuperação enviado para:", email);
        // Avançar para o próximo passo (passo 2)
        setStep(2);
    };

    const handleVerificarCodigo = () => {
        // Lógica para verificar o código aqui (conexão com o banco de dados, etc.)
        // Se o código for válido, você pode permitir a redefinição de senha
        console.log("Código verificado com sucesso:", code);

        // Avançar para o próximo passo (passo 3)
        setStep(3);
    };

    const handleRedefinirSenha = () => {
        // Lógica para redefinir a senha aqui (conexão com o banco de dados, etc.)
        console.log("Senha redefinida com sucesso.");

        // Fechar o modal após a redefinição da senha
        modalSettr(false);
    };

    const subject = "Teste"
    const text = "Texto"

    const enviarEmail = () => {
        axios
            .post("/email/enviaremail", {
                email,
                subject,
                text,
            })
    };

    return (
        <ModalCustom modalGettr={modalGettr} modalSettr={modalSettr} canClose>
            <div className="bg-white rounded-lg flex flex-col items-center p-8 gap-8 border-2 border-green-600">
                <div className="w-120 h-60 flex flex-col justify-center items-center gap-4">
                    <span className="text-2xl text-center font-semibold">
                        {step === 1 ? 'Esqueci Minha Senha' : step === 2 ? 'Verificar Código' : 'Redefinir Senha'}
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
                                    className="border-2 p-2 rounded w-80 border-green-600"
                                    placeholder="Seu e-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
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
                            <label htmlFor="code" className="text-lg">
                                Digite o código enviado por e-mail:
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="code"
                                    name="code"
                                    className="border-2 p-2 rounded w-80 border-green-600"
                                    placeholder="Código de Recuperação"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
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
                                    onChange={(e) => setNewPassword(e.target.value)}
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
