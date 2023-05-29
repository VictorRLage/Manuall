import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserIcon, EnvelopeIcon, IdentificationIcon, LockClosedIcon, ChevronDoubleRightIcon, ChevronDoubleLeftIcon, PhoneIcon } from '@heroicons/react/24/solid'
import logo_extensa from '../../assets/img/logo_manuall_extensa_branca.png'
import axiosInstance from "../../api/AxiosConfig";
import ModalAviso from "../main/ModalAviso";

function CadastroStep1(props) {

	const [modalAviso, setMoldaAviso] = useState(false)
	const [avisoTitulo, setAvisoTitulo] = useState('')
	const [avisoDescricao, setAvisoDescricao] = useState('')

	const navigate = useNavigate()

	const [validacaoNome, setValidacaoNome] = useState(0);
	const [validacaoEmail, setValidacaoEmail] = useState(0);
	const [validacaoCpf, setValidacaoCpf] = useState(0);
	const [validacaoTelefone, setValidacaoTelefone] = useState(0);
	const [validacaoSenha, setValidacaoSenha] = useState(0);
	// 0  não mexeu ainda | 1 mexeu e não validou | 2 mexeu e validou

	const [nomeFormatado, setNomeFormatado] = useState('');
	const [label, setLabel] = useState('');


	const nome_input = useRef(null)
	const email_input = useRef(null)
	const cpf_input = useRef(null)
	const telefone_input = useRef(null)
	const senha_input = useRef(null)

	function formatNome(string) {
		return string
			.split(' ')
			.map(word => {
				const lowercasedWord = word.toLowerCase();
				return lowercasedWord.charAt(0).toUpperCase() + lowercasedWord.slice(1);
			})
			.join(' ')
			.replace(/(\b[a-zA-Z]{2}\b)/g, match => match.toUpperCase());
	}


	const validarNome = () => {

		const nome = nome_input.current.value

		if (
			nome === "" ||
			nome.indexOf("1") !== -1 ||
			nome.indexOf("2") !== -1 ||
			nome.indexOf("3") !== -1 ||
			nome.indexOf("4") !== -1 ||
			nome.indexOf("5") !== -1 ||
			nome.indexOf("6") !== -1 ||
			nome.indexOf("7") !== -1 ||
			nome.indexOf("8") !== -1 ||
			nome.indexOf("9") !== -1 ||
			nome.indexOf("!") !== -1 ||
			nome.indexOf("@") !== -1 ||
			nome.indexOf("#") !== -1 ||
			nome.indexOf("$") !== -1 ||
			nome.indexOf("%") !== -1 ||
			nome.indexOf("&") !== -1 ||
			nome.length >= 100
		) {
			setLabel('Campo inválido')
			setValidacaoNome(1)
			return
		} else {
			setValidacaoNome(2)
			const nomeFormatar = formatNome(nome);
			//console.log(nomeFormatar)
			setNomeFormatado(nomeFormatar)
		}
	}

	const validarEmail = () => {

		const email = email_input.current.value

		if (
			email === "" ||
			email.indexOf("@") === -1 ||
			email.indexOf("@") === 0 ||
			email.indexOf("@") === email.length - 1 ||
			email.indexOf(" ") !== -1 ||
			email.length >= 256 ||
			email.indexOf("$") !== -1
		) {
			setLabel("Campo inválido")
			setValidacaoEmail(1)
			return
		} else {
			setValidacaoEmail(2)
		}
	}

	const validarCpf = () => {

		const cpf = cpf_input.current.value

		if (
			cpf === "" ||
			cpf.length !== 11 
		) {
			setLabel("Campo inválido")
			setValidacaoCpf(1)
			return
		} else {
			setValidacaoCpf(2)
		}
	}

	const validarTelefone = () => {

		const telefone = telefone_input.current.value

		if (
			telefone === "" ||
			telefone.indexOf("a") !== -1 ||
			telefone.indexOf("b") !== -1 ||
			telefone.indexOf("c") !== -1 ||
			telefone.indexOf("d") !== -1 ||
			telefone.indexOf("e") !== -1 ||
			telefone.indexOf("f") !== -1 ||
			telefone.indexOf("g") !== -1 ||
			telefone.indexOf("h") !== -1 ||
			telefone.indexOf("i") !== -1 ||
			telefone.indexOf("j") !== -1 ||
			telefone.indexOf("k") !== -1 ||
			telefone.indexOf("l") !== -1 ||
			telefone.indexOf("m") !== -1 ||
			telefone.indexOf("n") !== -1 ||
			telefone.indexOf("o") !== -1 ||
			telefone.indexOf("p") !== -1 ||
			telefone.indexOf("q") !== -1 ||
			telefone.indexOf("r") !== -1 ||
			telefone.indexOf("s") !== -1 ||
			telefone.indexOf("t") !== -1 ||
			telefone.indexOf("u") !== -1 ||
			telefone.indexOf("v") !== -1 ||
			telefone.indexOf("x") !== -1 ||
			telefone.indexOf("y") !== -1 ||
			telefone.indexOf("z") !== -1 ||
			telefone.indexOf("!") !== -1 ||
			telefone.indexOf("@") !== -1 ||
			telefone.indexOf("#") !== -1 ||
			telefone.indexOf("$") !== -1 ||
			telefone.indexOf("%") !== -1 ||
			telefone.indexOf("&") !== -1 ||
			telefone.length !== 11
		) {
			setLabel("Campo inválido")
			setValidacaoTelefone(1)
			return
		} else {
			setValidacaoTelefone(2)
		}
	}

	const validarSenha = () => {

		const senha = senha_input.current.value

		if (
			senha === "" ||
			senha.length < 8 ||
			senha.length > 24
		) {
			setLabel("Campo inválido")
			setValidacaoSenha(1)
			return
		} else {
			setValidacaoSenha(2)
		}
	}

	const avancar = () => {
		const nome = nomeFormatado
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
			setAvisoTitulo('Campos inválidos')
			setAvisoDescricao('Preencha todos os campos')
			return
		}
		axiosInstance.post("/cadastrar/1", {
			nome: nome,
			email: email,
			cpf: cpf,
			telefone: telefone,
			senha: senha,
			tipoUsuario: 1
		})
			.then((res) => {
				if (res.status === 201) {
					localStorage.setItem("ID_CADASTRANTE", res.data)
					props.mudarStep()
				} else {
					setMoldaAviso(true)
					setAvisoTitulo('Erro interno')
					setAvisoDescricao('Por favor tente novamente mais tarde')
				}
			})
			.catch((err) => {
				if (err.response.status === 400) {
					let textoModal = ""
					for (let i = 0; i < err.response.data.errors.length; i++) {
						textoModal +=
							`Erro no campo ${err.response.data.errors[i].field}:\n${err.response.data.errors[i].defaultMessage}\n`
					}
					alert(textoModal)
				} else if (err.response.status === 409) {
					alert("Email já cadastrado")
					setMoldaAviso(true)
					setAvisoTitulo('Email já cadastrado')
					setAvisoDescricao('Tente acessar sua conta')
				} else {
					setMoldaAviso(true)
					setAvisoTitulo('Erro interno')
					setAvisoDescricao('Por favor tente novamente mais tarde')
				}
			})
	}

	const pegarDadosPipefy = () => {
		axiosInstance.post("/cadastrar/prospect", {
			email: email_input.current.value,
			tipoUsuario: 1
		})
			.then((res) => {
				if (res.status === 200) {
					if (nome_input.current.value === "") {
						nome_input.current.value = res.data.nome
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
		<div className="flex justify-center h-screen">
			{modalAviso ? <ModalAviso titulo={avisoTitulo} descricao={avisoDescricao} tempo={10000} modal={setMoldaAviso} /> : null}
			<div id="container" className="2xl:bg-white 2xl:h-144 2xl:w-288 xl:h-120 xl:w-240 self-center rounded-lg drop-shadow-all flex flex-row">
				<div id="container_esquerda" className="bg-white h-full w-70per rounded-l-lg flex flex-col">
					<div id="container_steps" className="flex 2xl:h-16 xl:h-14 w-full justify-center items-center 2xl:mt-8 xl:mt-6">
						<div id="step_1" className="bg-white border-4 border-verde-padrao rounded-full 2xl:h-12 2xl:w-12 xl:h-10 xl:w-10"></div>
						<div id="linha" className="bg-black h-1 2xl:w-14 xl:w-10"></div>
						<div onClick={props.mudarStep} id="step_2" className="bg-white border-2 border-black rounded-full 2xl:h-12 2xl:w-12 xl:h-10 xl:w-10"></div>
					</div>
					<div id="container-inputs" className="2xl:w-112  xl:w-96 rounded-lg  self-center  2xl:justify-center grid 2xl:grid-cols-13.5x13.5 xl:grid-cols-11.5x11.5 2xl:gap-8 xl:gap-6 2xl:gap-x-4 xl:gap-x-4 2xl:mt-10 xl:mt-6">
						<div className="relative col-span-2">
							<input onBlur={() => { validarNome() }} ref={nome_input} type="text" id="nome_inp" className={`block px-2.5 pb-2.5 pt-4 w-full 2xl:text-lg xl:text-base text-gray-900 bg-transparent rounded-lg border-2  ${validacaoNome === 1 ? `border-red-500` : `border-cinza-claro-1`}  appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer`} placeholder=" " />
							<label htmlFor="nome_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><UserIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Nome completo</label>
							{validacaoNome !== 1 ? null : <label className="absolute ml-1 text-red-500 font-medium">{label}</label>}

						</div>
						<div className="relative col-span-2">
							<input onBlur={() => { validarEmail() }} onChange={pegarDadosPipefy} ref={email_input} type="email" id="email_inp" className={`block px-2.5 pb-2.5 pt-4 w-full 2xl:text-lg xl:text-base text-gray-900 bg-transparent rounded-lg border-2  ${validacaoEmail === 1 ? `border-red-500` : `border-cinza-claro-1`}  appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer`} placeholder=" " />
							<label htmlFor="email_inp" className="absolute xl:text-lg 2xl:text-xl  text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><EnvelopeIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Endereço de email</label>
							{validacaoEmail !== 1 ? null : <label className="absolute ml-1 text-red-500 font-medium">{label}</label>}
						</div>
						<div className="relative ">
							<input onBlur={() => { validarCpf() }} ref={cpf_input} type="text" id="cpf_inp" className={`block px-2.5 pb-2.5 pt-4 w-full 2xl:text-lg xl:text-base text-gray-900 bg-transparent rounded-lg border-2  ${validacaoCpf === 1 ? `border-red-500` : `border-cinza-claro-1`}  appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer`} placeholder=" " />
							<label htmlFor="cpf_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><IdentificationIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />CPF</label>
							{validacaoCpf !== 1 ? null : <label className="absolute ml-1 text-red-500 font-medium">{label}</label>}
						</div>
						<div className="relative">
							<input onBlur={() => { validarTelefone() }} ref={telefone_input} type="text" id="numero_inp" className={`block px-2.5 pb-2.5 pt-4 w-full 2xl:text-lg xl:text-base text-gray-900 bg-transparent rounded-lg border-2  ${validacaoTelefone === 1 ? `border-red-500` : `border-cinza-claro-1`}  appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer`} placeholder=" " />
							<label htmlFor="numero_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><PhoneIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Telefone</label>
							{validacaoTelefone !== 1 ? null : <label className="absolute ml-1 text-red-500 font-medium">{label}</label>}

						</div>
						<div className="relative col-span-2">
							<input onBlur={() => { validarSenha() }} ref={senha_input} type="password" id="senha_inp" className={`block px-2.5 pb-2.5 pt-4 w-full 2xl:text-lg xl:text-base text-gray-900 bg-transparent rounded-lg border-2  ${validacaoSenha === 1 ? `border-red-500` : `border-cinza-claro-1`}  appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer`} placeholder=" " />
							<label htmlFor="senha_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><LockClosedIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Senha</label>
							{validacaoSenha !== 1 ? null : <label className="absolute ml-1 text-red-500 font-medium">{label}</label>}
						</div>
					</div>
					<div id="container_proximo" className="w-full h-10 flex justify-end">
						<button className="2xl:text-2xl xl:text-xl 2xl:mr-12 xl:mr-11 2xl:mt-18 xl:mt-12 font-bold text-verde-padrao flex items-center" onClick={avancar}>Próximo <ChevronDoubleRightIcon className='2xl:h-10 2xl:w-10 xl:h-8 xl:w-8' /></button>
					</div>
				</div>
				<div id="container_direita" className="bg-verde-padrao h-full w-30per rounded-r-lg flex flex-col">
					<img src={logo_extensa} alt="Logo da Manuall por extensa" className='2xl:w-60 xl:w-52 2xl:mt-12 xl:mt-10 self-center' />
					<p className='2xl:text-4xl xl:text-2xl  font-bold text-white w-full text-center self-center 2xl:leading-relaxed 2xl:mt-10 xl:mt-8'>Cadastro de <br /> Contratante</p>
					<p className='2xl:text-2xl xl:text-xl  font-semibold text-white w-full text-center self-center 2xl:leading-relaxed mt-32'>Já possui uma conta?</p>
					<button className='2xl:text-2xl xl:text-xl font-bold text-white w-full underline' onClick={() => { navigate("/login") }}>Entre aqui</button>
					<button className='2xl:text-2xl xl:text-xl font-bold text-white self-center leading-relaxed 2xl:mt-13 xl:mt-12.5 flex items-center'> <ChevronDoubleLeftIcon className='2xl:h-10 2xl:w-10 xl:h-8 xl:w-8' /> Voltar à Tela inicial</button>
				</div>
			</div>
		</div>
	);
}

export default CadastroStep1;