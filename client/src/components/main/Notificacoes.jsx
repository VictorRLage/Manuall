import { UserIcon } from "@heroicons/react/24/solid";
import axiosInstance from "../../api/AxiosConfig";


function Notificacoes(props) {

    return (
        <div className='absolute'>
            {props.dropDown ?
                <div>
                    <div className="z-50 absolute mt-1 border-triangulo-cima rounded-sm"></div>
                    <div id='drop_drown_notificacao' className='z-40 absolute ml-[-20rem] mt-5 w-96 bg-cinza-claro-2 border  rounded shadow leading-tight focus:outline-none focus:shadow-outline'>
                        <div className="">
                            <div className=" text-center text-2xl py-2 text-verde-padrao font-bold">Notificações</div>
                            {props.tipoUsuario === '1' ?
                                props.json.map(function (data, i) {
                                    return (
                                        <div key={i} id="notificacao" className="flex py-2 border-t-2 border-verde-padrao">
                                            <div className="bg-white w-13 h-13 rounded-full border-2 ml-2 border-verde-padrao drop-shadow-all-icon flex justify-center items-center"><UserIcon className='w-9 h-9 text-verde-padrao' /></div>
                                            <div className="flex flex-col">
                                                <span className="text-xl font-medium ml-2">{data.nome}</span>
                                                <span className="text-sm ml-2">{data.notificacao} {data.nome}.</span>
                                            </div>
                                        </div>
                                    )
                                })
                                : props.json.map(function (data, i) {
                                    return (
                                        <div key={i} id="notificacao" className="flex py-2 border-t-2 border-verde-padrao">
                                            <div key={i+1} className="bg-white w-13 h-13 rounded-full border-2 ml-2 border-verde-padrao drop-shadow-all-icon flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url(${data.ftPerfil})` }}></div>
                                            <div key={i+2} className="flex flex-col">
                                                <span key={i+3} className="text-xl font-medium ml-2">{data.nome}</span>
                                                <span key={i+4} className="text-sm ml-2">{data.notificacao} {data.nome}.</span>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>

                    </div>
                </div>
                : null}
        </div>
    );
}

export default Notificacoes;