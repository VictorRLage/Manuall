import { UserIcon } from "@heroicons/react/24/solid";

export default function Chat(props) {
    return (
        <div className='absolute'>
            {props.dropDown
                ? <div>
                    <div className="z-50 absolute mt-1 border-triangulo-cima rounded-sm"></div>
                    <div id='drop_drown_notificacao' className='z-40 absolute ml-[-16rem] mt-5 w-80 bg-cinza-claro-2  rounded shadow leading-tight focus:outline-none focus:shadow-outline'>
                        {props.json.map((data, i) => (
                            <div key={i} id="notificacao" className="flex py-2 border-b-2 border-verde-padrao">
                                <div className="bg-white w-13 h-13 rounded-full border-2 ml-2 border-verde-padrao drop-shadow-all-icon flex justify-center items-center">
                                    <UserIcon className='w-9 h-9 text-verde-padrao' />
                                </div>
                                <div className="flex flex-col ml-2">
                                    <span className="text-xl font-medium ml-2">{data.nome}</span>
                                    <span className="text-sm ml-2 text-gray-600">{data.mensagem}</span>
                                </div>
                            </div>
                        ))}
                        <div className='w-full h-14 bg-verde-escuro-2 text-white text-2xl text-bold flex items-center px-4 rounded-sm'>
                            CHAT
                        </div>
                    </div>
                </div>
                : null}
        </div>
    );
}
