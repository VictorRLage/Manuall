import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserIcon, EnvelopeIcon, IdentificationIcon, LockClosedIcon, ChevronDoubleRightIcon, ChevronDoubleLeftIcon, PhoneIcon } from '@heroicons/react/24/solid'
import logo_extensa from '../../assets/img/logo_manuall_extensa_branca.png'
import axiosInstance from "../../api/AxiosConfig";

function CadastroPrestadorStep1(props) {

    const navigate = useNavigate()

	const nome_input = useRef(null)
	const email_input = useRef(null)
	const cpf_input = useRef(null)
	const telefone_input = useRef(null)
	const senha_input = useRef(null)

    const avancar = () => {
		const nome = nome_input.current.value
		const email = email_input.current.value
		const cpf = cpf_input.current.value
		const telefone = telefone_input.current.value
		const senha = senha_input.current.value

		if (
			nome === "" ||
			email === "" ||
			cpf === "" ||
			telefone === "" ||
			senha === ""
		) {
			alert("Preencha todos os campos")
			return
		}
		axiosInstance.post("/cadastrar/1", {
			nome: nome,
			email: email,
			cpf: cpf,
			telefone: telefone,
			senha: senha,
			tipoUsuario: 2
		})
		.then((res) => {
			if (res.status === 201) {
				localStorage.setItem("ID_CADASTRANTE", res.data)
                props.passarStep()
			} else {
				alert("Erro interno")
			}
		})
		.catch((err) => {
			if (err.response.status === 409) {
				alert("Email já cadastrado")
			} else {
				alert("Erro interno")
			}
		})
    }

    const pegarDadosPipefy = () => {
        axiosInstance.post("/usuario/prospect", {
            email: email_input.current.value,
            tipoUsuario: 2
        })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div id="container" className="2xl:bg-white 2xl:h-144 2xl:w-288 xl:h-120 xl:w-240 self-center rounded-lg drop-shadow-all flex flex-row">
            <div id="container_esquerda" className="bg-white h-full w-70per rounded-l-lg flex flex-col">
                <div id="container_steps" className="flex 2xl:h-16 xl:h-14 w-full justify-center items-center 2xl:mt-8 xl:mt-6">
                    <div id="step_1" className="bg-white border-4 border-verde-padrao rounded-full 2xl:h-12 2xl:w-12 xl:h-10 xl:w-10"></div>
                    <div id="linha" className="bg-black h-1 2xl:w-14 xl:w-10"></div>
                    <div id="step_2" onClick={props.passarStep} className="bg-white border-2 border-black rounded-full 2xl:h-12 2xl:w-12 xl:h-10 xl:w-10"></div>
                    <div id="linha" className="bg-black h-1 2xl:w-14 xl:w-10"></div>
                    <div id="step_3" className="bg-white border-2 border-black rounded-full 2xl:h-12 2xl:w-12 xl:h-10 xl:w-10"></div>
                </div>
                <div id="container-inputs" className="2xl:w-112  xl:w-96 rounded-lg  self-center  2xl:justify-center grid 2xl:grid-cols-13.5x13.5 xl:grid-cols-11.5x11.5 2xl:gap-8 xl:gap-6 2xl:gap-x-4 xl:gap-x-4 2xl:mt-10 xl:mt-6">
                    <div className="relative col-span-2">
                        <input ref={nome_input} type="text" id="nome_inp" className="block px-2.5 pb-2.5 pt-4 w-full 2xl:text-lg xl:text-base text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer" placeholder=" " />
                        <label htmlFor="nome_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><UserIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Nome completo</label>
                    </div>
                    <div className="relative col-span-2">
                        <input onChange={pegarDadosPipefy} ref={email_input} type="text" id="email_inp" className="block px-2.5 pb-2.5 pt-4 w-full 2xl:text-lg xl:text-base text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer" placeholder=" " />
                        <label htmlFor="email_inp" className="absolute xl:text-lg 2xl:text-xl  text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><EnvelopeIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Endereço de email</label>
                    </div>
                    <div className="relative ">
                        <input ref={cpf_input} type="text" id="cpf_inp" className="block px-2.5 pb-2.5 pt-4 w-full 2xl:text-lg xl:text-base text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer" placeholder=" " />
                        <label htmlFor="cpf_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><IdentificationIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />CPF</label>
                    </div>
                    <div className="relative">
                        <input ref={telefone_input} type="text" id="numero_inp" className="block px-2.5 pb-2.5 pt-4 w-full 2xl:text-lg xl:text-base text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer" placeholder=" " />
                        <label htmlFor="numero_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><PhoneIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Telefone</label>
                    </div>
                    <div className="relative col-span-2">
                        <input ref={senha_input} type="text" id="senha_inp" className="block px-2.5 pb-2.5 pt-4 w-full 2xl:text-lg xl:text-base text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer" placeholder=" " />
                        <label htmlFor="senha_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><LockClosedIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Senha</label>
                    </div>
                </div>
                <div id="container_proximo" className="w-full h-10 flex justify-end">
                    <button className="2xl:text-2xl xl:text-xl 2xl:mr-12 xl:mr-11 2xl:mt-18 xl:mt-12 font-bold text-verde-padrao flex items-center" onClick={avancar}>Próximo <ChevronDoubleRightIcon className='2xl:h-10 2xl:w-10 xl:h-8 xl:w-8' /></button>
                </div>
            </div>
            <div id="container_direita" className="bg-verde-padrao h-full w-30per rounded-r-lg flex flex-col">
                <img src={logo_extensa} alt="Logo da Manuall por extensa" className='2xl:w-60 xl:w-52 2xl:mt-12 xl:mt-10 self-center' />
                <p className='2xl:text-4xl xl:text-2xl  font-bold text-white w-full text-center self-center 2xl:leading-relaxed 2xl:mt-10 xl:mt-8'>Cadastro de <br /> Prestador</p>
                <p className='2xl:text-2xl xl:text-xl  font-semibold text-white w-full text-center self-center 2xl:leading-relaxed mt-32'>Já possui uma conta?</p>
                <button className='2xl:text-2xl xl:text-xl font-bold text-white w-full underline' onClick={() => {navigate("/login")}}>Entre aqui</button>
                <button className='2xl:text-2xl xl:text-xl font-bold text-white self-center leading-relaxed 2xl:mt-13 xl:mt-12.5 flex items-center'> <ChevronDoubleLeftIcon className='2xl:h-10 2xl:w-10 xl:h-8 xl:w-8' /> Voltar à Tela inicial</button>
            </div>
        </div>
    );
}

export default CadastroPrestadorStep1;