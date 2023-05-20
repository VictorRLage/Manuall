import { useNavigate } from "react-router-dom";
import { MapIcon, MapPinIcon, BuildingOffice2Icon, HomeIcon, HomeModernIcon, BuildingLibraryIcon, HashtagIcon, ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'
import logo_extensa from '../../assets/img/logo_manuall_extensa.png'

function CadastroContratanteStep2(props) {

    let navigate = useNavigate();
    const routeChangeToLogin = () => {
        let path = `/login`;
        navigate(path);
    }

    return (
        <div id='container' className="bg-white 2xl:h-144 2xl:w-288 xl:h-120 xl:w-240 self-center rounded-lg drop-shadow-all flex flex-row">
            <div id="container_esquerda" className="bg-verde-padrao h-full w-30per rounded-l-lg flex flex-col ">
                <img src={logo_extensa} alt="Logo da Manuall por extensa" className='2xl:w-60 xl:w-52 2xl:mt-12 xl:mt-10 self-center' />
                <p className='2xl:text-4xl xl:text-2xl  font-bold text-white w-full self-center 2xl:leading-relaxed text-center 2xl:mt-10 xl:mt-8'>Cadastro de <br /> Contratante</p>
                <p className='2xl:text-2xl xl:text-xl  font-semibold text-white w-full self-center 2xl:leading-relaxed text-center mt-32'>Já possui uma conta?</p>
                <button className='2xl:text-2xl xl:text-xl font-bold text-white w-full text-center underline' onClick={routeChangeToLogin}>Entre aqui</button>
                <button className='2xl:text-2xl xl:text-xl font-bold text-white self-center leading-relaxed 2xl:mt-13 xl:mt-12.5 flex items-center'> <ChevronDoubleLeftIcon className='2xl:h-10 2xl:w-10 xl:h-8 xl:w-8' /> Voltar à Tela inicial</button>
            </div>
            <div id='container_direita' className='bg-white h-full w-70per rounded-r-lg flex flex-col'>
                <div id="container_steps" className="flex 2xl:h-16 xl:h-14 w-full justify-center items-center 2xl:mt-8 xl:mt-6">
                    <div id="step_1" className="bg-verde-padrao rounded-full 2xl:h-12 2xl:w-12 xl:h-10 xl:w-10"></div>
                    <div id="linha" className="bg-verde-padrao h-1 2xl:w-14 xl:w-10"></div>
                    <div id="step_2" className="bg-white border-4 border-verde-padrao rounded-full 2xl:h-12 2xl:w-12 xl:h-10 xl:w-10 "></div>
                </div>
                <div id="container-inputs" className="rounded-lg  self-center grid 2xl:grid-cols-16x16 xl:grid-cols-16x16  items-center 2xl:gap-10 xl:gap-8 2xl:mt-8 xl:mt-6">
                    <div className="relative">
                        <input type="text" id="cep_inp" className="block px-2.5 pb-2.5 pt-4 w-full 2xl:text-sm xl:text-xs text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer" placeholder=" " />
                        <label htmlFor="cep_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><MapPinIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Cep</label>
                    </div>
                    <div className="relative">
                        <input type="text" id="cidade_inp" className="block px-2.5 pb-2.5 pt-4 w-full 2xl:text-sm xl:text-xs text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer" placeholder=" " />
                        <label htmlFor="cidade_inp" className="absolute xl:text-lg 2xl:text-xl  text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><BuildingOffice2Icon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Cidade</label>
                    </div>
                    <div className="relative">
                        <input type="text" id="estado_inp" className="block px-2.5 pb-2.5 pt-4 w-full 2xl:text-sm xl:text-xs text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer" placeholder=" " />
                        <label htmlFor="estado_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><BuildingLibraryIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Estado</label>
                    </div>
                    <div className="relative">
                        <input type="text" id="bairro_inp" className="block px-2.5 pb-2.5 pt-4 w-full 2xl:text-sm xl:text-xs text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer" placeholder=" " />
                        <label htmlFor="bairro_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><HomeModernIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Bairro</label>
                    </div>
                    <div className="relative col-span-2">
                        <input type="text" id="rua_inp" className="block px-2.5 pb-2.5 pt-4 w-full 2xl:text-sm xl:text-xs text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer" placeholder=" " />
                        <label htmlFor="rua_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><MapIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Rua</label>
                    </div>
                    <div className="relative">
                        <input type="text" id="numero_inp" className="block px-2.5 pb-2.5 pt-4 w-full 2xl:text-sm xl:text-xs text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer" placeholder=" " />
                        <label htmlFor="numero_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><HomeIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Número</label>
                    </div>
                    <div className="relative">
                        <input type="text" id="complemento_inp" className="block px-2.5 pb-2.5 pt-4 w-full 2xl:text-sm xl:text-xs text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer" placeholder=" " />
                        <label htmlFor="complemento_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><HashtagIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Complemento</label>
                    </div>
                </div>
                <div id="container_finalizar" className="w-full h-10 flex justify-end ">
                    <button className="bg-verde-escuro-2 2xl:w-40 2xl:h-12 xl:w-32 xl:h-10 rounded-full 2xl:text-2xl xl:text-xl 2xl:mr-16 xl:mr-16 2xl:mt-14 xl:mt-10 font-semibold text-white ">Finalizar</button>
                </div>
            </div>
        </div>

    );
}

export default CadastroContratanteStep2;