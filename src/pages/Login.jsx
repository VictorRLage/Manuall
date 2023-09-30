import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import CheckCircleIcon from "@/assets/icons/check_circle.svg";
import XCircleIcon from "@/assets/icons/x_circle.svg";
import LoadingGif from "@/assets/icons/loading.gif";
import axios from "@/api/axios";
import ModalEscolherLogin from "@/components/login/ModalEscolherLogin";
import ModalAviso from "@/components/main/ModalAviso";
import ModalEscolherCadastro from "@/components/main/ModalEscolherCadastro";
import CadastroSidebar from "@/components/cadastro/CadastroSidebar";
import CadastroBg from "@/assets/shapes/CadastroBg.svg";
import CadastroFlag from "@/components/cadastro/CadastroFlag";
import Regex from "@/enum/RegexENUM";

export default function Login() {
    const navigate = useNavigate();

    const [isEmailValidado, setIsEmailValidado] = useState();
    /* 1: Loading, 2: True, 3: False */
    const [isSenhaValidado, setIsSenhaValidado] = useState();

    const [modalEscolherCadastro, setModalEscolherCadastro] = useState(false);
    const [modalEscolherLogin, setModalEscolherLogin] = useState(false);
    const [modalAviso, setModalAviso] = useState(false);
    const [avisoTitulo, setAvisoTitulo] = useState("");
    const [avisoDescricao, setAvisoDescricao] = useState("");

    const [tipoUsuario, setTipoUsuario] = useState();

    const email_input = useRef(null);
    const senha_input = useRef(null);

    const validar = {
        email({ target }) {
            setIsEmailValidado(1);
            axios
                .post("/usuario/login/checar", {
                    email: target.value,
                })
                .then(({ status, data }) => {
                    if (status === 200) {
                        setTipoUsuario(data);
                        setIsEmailValidado(2);
                    } else if (status === 204) {
                        setIsEmailValidado(3);
                    }
                })
                .catch(({ response }) => {
                    if (response.status === 400) {
                        setIsEmailValidado(3);
                    } else if (response.status === 409) {
                        setIsEmailValidado(undefined);
                        setModalEscolherLogin(true);
                    } else {
                        setIsEmailValidado(3);
                        setModalAviso(true);
                        setAvisoTitulo("Erro inesperado");
                        setAvisoDescricao(
                            "Por favor tente novamente mais tarde",
                        );
                    }
                });
        },
        senha() {
            const senha = senha_input.current.value;
            setIsSenhaValidado(Regex.BETWEEN_8_AND_24.test(senha));
        },
    };

    const login = () => {
        axios
            .post("/usuario/login/efetuar", {
                email: email_input.current.value,
                senha: senha_input.current.value,
                tipoUsuario: tipoUsuario,
            })
            .then(({ status, data }) => {
                if (status === 200 || status === 206) {
                    localStorage.TOKEN = data;
                    localStorage.TIPO_USUARIO = tipoUsuario;
                    if (tipoUsuario === 1) {
                        navigate("/prestadores");
                    } else if (tipoUsuario === 2) {
                        navigate("/perfil");
                    } else if (tipoUsuario === 3) {
                        navigate("/adm/aprovacao");
                    }
                }
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    setModalAviso(true);
                    setAvisoTitulo("Credenciais inválidas");
                    setAvisoDescricao("Por favor tente novamente");
                } else if (err.response.status === 403) {
                    if (
                        err.response.data === "Usuário não finalizou o cadastro"
                    ) {
                        //modal usuário não finalizou o cadastro
                        setModalAviso(true);
                        setAvisoTitulo(err.response.data);
                        setAvisoDescricao(
                            "Irei redirecionar você para tela de cadastro para finaliza-lo",
                        );
                    }
                    if (err.response.data === "Aprovação negada") {
                        //modal aprovação negada
                        setModalAviso(true);
                        setAvisoTitulo(err.response.data);
                        setAvisoDescricao(
                            "Infelizmente sua aprovação foi negada",
                        );
                    }
                    if (err.response.data === "Aprovação pendente") {
                        //modal Aprovação pendente
                        setModalAviso(true);
                        setAvisoTitulo(err.response.data);
                        setAvisoDescricao(
                            "Por favor aguarde a sua conta ser aprovada",
                        );
                    }
                }
            });
    };

    return (
        <div
            className="flex justify-center items-center h-screen bg-no-repeat bg-center"
            style={{
                backgroundImage: `url(${CadastroBg})`,
                backgroundSize: "100%",
            }}
        >
            <ModalEscolherLogin
                modalGettr={modalEscolherLogin}
                modalSettr={setModalEscolherLogin}
                setarUsuario={setTipoUsuario}
            />
            <ModalAviso
                modalGettr={modalAviso}
                modalSettr={setModalAviso}
                tempo={5000}
                titulo={avisoTitulo}
                descricao={avisoDescricao}
            />
            <ModalEscolherCadastro
                modalGettr={modalEscolherCadastro}
                modalSettr={setModalEscolherCadastro}
            />
            <div className="flex bg-white h-144 w-288 rounded-lg drop-shadow-all">
                <CadastroSidebar
                    isLogin
                    setModalEscolherCadastro={setModalEscolherCadastro}
                />
                <div className="w-full h-full flex flex-col items-center justify-evenly">
                    <CadastroFlag isFlagAtLeft={false} />
                    <div className="w-full flex flex-col text-center gap-2">
                        <p className="text-verde-padrao font-extrabold text-5xl">
                            Bem-vindo de volta!
                        </p>
                        <p className="text-verde-padrao font-normal text-2xl">
                            Acesse a sua conta agora mesmo.
                        </p>
                    </div>
                    <div className="flex flex-col justify-center items-center w-full gap-10">
                        <div className="flex flex-col justify-center items-center w-full gap-8">
                            <div className="w-[50%] relative">
                                <input
                                    onBlur={validar.email}
                                    onFocus={() => {
                                        setIsEmailValidado(undefined);
                                    }}
                                    onChange={({ target }) => {
                                        target.value = target.value.replace(
                                            Regex.EMAIL_REPLACEABLE,
                                            "",
                                        );
                                    }}
                                    ref={email_input}
                                    maxLength={256}
                                    type="email"
                                    id="email"
                                    placeholder=" "
                                    className={`
                                        block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2
                                        appearance-none bg-no-repeat focus:outline-none focus:ring-0 focus:border-verde-padrao peer transition-colors
                                        ${
                                            isEmailValidado === 3
                                                ? "border-red-500"
                                                : "border-cinza-claro-1 hover:border-green-300"
                                        }
                                    `}
                                    style={{
                                        backgroundImage: `url(${
                                            isEmailValidado === 1
                                                ? LoadingGif
                                                : isEmailValidado === 2
                                                ? CheckCircleIcon
                                                : isEmailValidado === 3 &&
                                                  XCircleIcon
                                        })`,
                                        backgroundPosition:
                                            "right 0.7rem top 50%",
                                        backgroundSize: "30px",
                                    }}
                                />
                                <label
                                    htmlFor="email"
                                    className="cursor-text absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"
                                >
                                    <EnvelopeIcon className="h-5 w-5 mr-1" />
                                    Endereço de email
                                </label>
                                {isEmailValidado === 3 && (
                                    <label className="absolute ml-1 text-red-500 font-medium">
                                        Campo inválido
                                    </label>
                                )}
                            </div>
                            <div className="w-[50%] relative">
                                <input
                                    onBlur={validar.senha}
                                    ref={senha_input}
                                    onKeyDown={({ key }) => {
                                        if (key !== "Enter") return;
                                        isEmailValidado === 2 && login();
                                    }}
                                    maxLength={24}
                                    type="password"
                                    id="senha"
                                    placeholder=" "
                                    className={`
                                        block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2
                                        appearance-none focus:outline-none focus:ring-0 focus:border-verde-padrao peer transition-colors
                                        ${
                                            isSenhaValidado === false
                                                ? "border-red-500"
                                                : "border-cinza-claro-1 hover:border-green-300"
                                        }
                                    `}
                                />
                                <label
                                    htmlFor="senha"
                                    className="cursor-text absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"
                                >
                                    <LockClosedIcon className="h-5 w-5 mr-1" />
                                    Senha
                                </label>
                                {isSenhaValidado === false && (
                                    <label className="absolute ml-1 text-red-500 font-medium">
                                        Campo inválido
                                    </label>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2">
                            <div className="flex justify-center mt-3">
                                <button
                                    onClick={() => {
                                        isEmailValidado === 2 && login();
                                    }}
                                    className={`rounded-full text-2xl font-semibold text-white px-16 py-2 ${
                                        isEmailValidado === 2
                                            ? "bg-verde-padrao"
                                            : "bg-cinza-claro-1 cursor-default"
                                    }`}
                                >
                                    Entrar
                                </button>
                            </div>
                            <div className="w-full flex justify-center">
                                <Link
                                    to={"/development"}
                                    className="text-center text-verde-padrao font-medium underline text-base"
                                >
                                    Esqueci minha senha
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
