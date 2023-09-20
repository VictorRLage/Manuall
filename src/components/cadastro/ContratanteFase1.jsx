import { useRef, useState } from "react";
import { UserIcon, EnvelopeIcon, IdentificationIcon, LockClosedIcon, ChevronDoubleRightIcon, PhoneIcon } from "@heroicons/react/24/solid";
import axios from "@/api/axios";
import CadastroProgress from "@/components/cadastro/CadastroProgress"
import Regex from "@/enum/Regex";

export default function CadastroStep1({ mudarStep }) {

	const [modalAviso, setMoldaAviso] = useState(false)
	const [avisoTitulo, setAvisoTitulo] = useState("")
	const [avisoDescricao, setAvisoDescricao] = useState("")

	const [validacaoNome, setValidacaoNome] = useState(0);
	const [validacaoEmail, setValidacaoEmail] = useState(0);
	const [validacaoCpf, setValidacaoCpf] = useState(0);
	const [validacaoTelefone, setValidacaoTelefone] = useState(0);
	const [validacaoSenha, setValidacaoSenha] = useState(0);
	// 0  não mexeu ainda | 1 mexeu e não validou | 2 mexeu e validou

	const nome_input = useRef(null)
	const email_input = useRef(null)
	const cpf_input = useRef(null)
	const telefone_input = useRef(null)
	const senha_input = useRef(null)

	const validarNome = () => {
		const nome = nome_input.current.value
		setValidacaoNome(1 + Number(nome && Regex.TEXT_SPACE.test(nome)))
	}

	const validarEmail = () => {
		const email = email_input.current.value
		setValidacaoEmail(1 + Number(Regex.EMAIL.test(email)))
	}

	const validarCpf = () => {
		const cpf = cpf_input.current.value
		setValidacaoCpf(1 + Number(Regex.CPF.test(cpf)))
	}

	const validarTelefone = () => {
		const telefone = telefone_input.current.value
		setValidacaoTelefone(1 + Number(telefone && Regex.PHONE.test(telefone)))
	}

	const validarSenha = () => {
		const senha = senha_input.current.value
		setValidacaoSenha(1 + Number(senha && Regex.BETWEEN_8_AND_24.test(senha)))
	}

	const avancar = () => {

		const nome = nome_input.current.value
		const email = email_input.current.value
		const cpf = cpf_input.current.value
		const telefone = telefone_input.current.value
		const senha = senha_input.current.value

		if (
			validacaoNome !== 2 &&
			validacaoEmail !== 2 &&
			validacaoCpf !== 2 &&
			validacaoTelefone !== 2 &&
			validacaoSenha !== 2
		) {
			setMoldaAviso(true)
			setAvisoTitulo("Campos inválidos")
			setAvisoDescricao("Preencha todos os campos")
			return
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

	const pegarDadosPipefy = () => {
		axios.post("/cadastrar/prospect", {
			email: email_input.current.value,
			tipoUsuario: 1
		})
			.then((res) => {
				if (res.status === 200) {
					if (nome_input.current.value === "") {
						nome_input.current.value = res.data.nome
						validarNome()
					}
					if (telefone_input.current.value === "") {
						if (res.data.telefone.length > 11) {
							telefone_input.current.value = res.data.telefone.substring(2)
						} else {
							telefone_input.current.value = res.data.telefone
						}
					}
					if (res.data.optCidade != null) {
						sessionStorage.setItem("optCidade", res.data.optCidade)
					}
				}
			})
	}

	return (
		<div className="bg-white h-full min-w-[70%] flex flex-col items-center">
			<CadastroProgress fase={1} fases={2} mudarStep={mudarStep} flagIsAtLeft={true} />
			<div className="w-full h-[65%] flex flex-col items-center justify-evenly">
				<div className="w-[60%] relative">
					<input
						onBlur={validarNome}
						ref={nome_input}
						maxLength={60}
						type="text"
						id="nome_inp"
						placeholder=" "
						className={`
							block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2
							appearance-none focus:outline-none focus:ring-0 focus:border-verde-padrao peer
							${validacaoNome === 1 ? "border-red-500" : "border-cinza-claro-1"}
						`}
					/>
					<label
						htmlFor="nome_inp"
						className="absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center">
						<UserIcon className="h-5 w-5 mr-1" />
						Nome completo
					</label>
					{validacaoNome === 1 &&
						<label className="absolute ml-1 text-red-500 font-medium">
							Campo inválido
						</label>}
				</div>
				<div className="w-[60%] relative">
					<input
						onBlur={validarEmail}
						onChange={pegarDadosPipefy}
						ref={email_input}
						maxLength={256}
						type="email"
						id="email_inp"
						placeholder=" "
						className={`
							block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2
							appearance-none focus:outline-none focus:ring-0 focus:border-verde-padrao peer
							${validacaoEmail === 1 ? "border-red-500" : "border-cinza-claro-1"}
						`}
					/>
					<label
						htmlFor="email_inp"
						className="absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center">
						<EnvelopeIcon className="h-5 w-5 mr-1" />
						Endereço de email
					</label>
					{validacaoEmail === 1 &&
						<label className="absolute ml-1 text-red-500 font-medium">
							Campo inválido
						</label>}
				</div>
				<div className="w-full flex items-center justify-center gap-[2%]">
					<div className="w-[29%] relative">
						<input
							onBlur={validarCpf}
							ref={cpf_input}
							type="text"
							id="cpf_inp"
							placeholder=" "
							className={`
							block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2
							appearance-none focus:outline-none focus:ring-0 focus:border-verde-padrao peer
							${validacaoCpf === 1 ? "border-red-500" : "border-cinza-claro-1"}
						`}
						/>
						<label
							htmlFor="cpf_inp"
							className="absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center">
							<IdentificationIcon className="h-5 w-5 mr-1" />
							CPF
						</label>
						{validacaoCpf === 1 &&
							<label className="absolute ml-1 text-red-500 font-medium">
								Campo inválido
							</label>}
					</div>
					<div className="w-[29%] relative">
						<input
							onBlur={validarTelefone}
							ref={telefone_input}
							type="text"
							id="telefone_inp"
							placeholder=" "
							className={`
							block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2
							appearance-none focus:outline-none focus:ring-0 focus:border-verde-padrao peer
							${validacaoTelefone === 1 ? "border-red-500" : "border-cinza-claro-1"}
						`}
						/>
						<label
							htmlFor="telefone_inp"
							className="absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center">
							<PhoneIcon className="h-5 w-5 mr-1" />
							Telefone
						</label>
						{validacaoTelefone === 1 &&
							<label className="absolute ml-1 text-red-500 font-medium">
								Campo inválido
							</label>}
					</div>
				</div>
				<div className="w-[60%] relative">
					<input
						onBlur={validarSenha}
						ref={senha_input}
						type="password"
						id="senha_inp"
						placeholder=" "
						className={`
							block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2
							appearance-none focus:outline-none focus:ring-0 focus:border-verde-padrao peer
							${validacaoSenha === 1 ? "border-red-500" : "border-cinza-claro-1"}
						`}
					/>
					<label
						htmlFor="senha_inp"
						className="absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center">
						<LockClosedIcon className="h-5 w-5 mr-1" />
						Senha
					</label>
					{validacaoSenha === 1 &&
						<label className="absolute ml-1 text-red-500 font-medium">
							Campo inválido
						</label>}
				</div>
			</div>
			<div className="w-full h-[20%] flex justify-end">
				<button className="text-xl mr-11 font-bold text-verde-padrao flex items-center" onClick={avancar}>
					Próximo <ChevronDoubleRightIcon className="h-8 w-8" />
				</button>
			</div>
		</div>
	);
}
