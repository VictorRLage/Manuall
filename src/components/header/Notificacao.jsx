import { useEffect, useState } from "react";
import { BellIcon, UserIcon } from "@heroicons/react/24/solid";
import { Oval } from "react-loader-spinner";
import axios from "@/api/axios";

export default function Notificacoes(props) {

    const [on, setOn] = useState(false)
    const [notificacoes, setNotificacoes] = useState()

    const getNotificacoes = () => {
        axios.get("/perfil/solicitacoes")
            .then((res) => {
                if (res.status === 200) {
                    setNotificacoes(res.data)
                    if (res.data.length !== 0) {
                        // setTemNotificacao(true)
                    }
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        getNotificacoes()
    }, [])

    return (
        <div className="relative">
            <button
                onClick={() => { setOn(!on) }}
                className="bg-verde-padrao w-11 h-11 border-2 border-verde-padrao drop-shadow-all-icon rounded-full flex justify-center items-center"
            >
                <BellIcon className='w-7 text-white' />
            </button>
            {/* <div className="absolute z-10 ml-8">
                <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
            </div> */}
            {on && <>
                <button
                    onClick={() => { setOn(false) }}
                    className="cursor-auto z-30 fixed h-screen w-screen top-0 left-0"
                />
                <div className="absolute">
                    <div className="z-50 absolute mt-1 border-triangulo-cima rounded-sm"></div>
                    <div className="z-40 absolute ml-[-20rem] mt-5 w-96 bg-cinza-claro-2 border  rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <div>
                            <div className="text-center text-2xl py-2 text-verde-padrao font-bold">
                                Notificações
                            </div>
                            {notificacoes
                                ? notificacoes.map((data, i) => (
                                    <div key={i} className="flex py-2 border-t-2 border-verde-padrao">
                                        <div className="bg-white w-13 h-13 rounded-full border-2 ml-2 border-verde-padrao drop-shadow-all-icon flex justify-center items-center overflow-hidden">
                                            {props.tipoUsuario === 1
                                                ? <UserIcon className='w-9 h-9 text-verde-padrao' />
                                                : <img src={data.ftPerfil} className="object-cover w-[100%] h-[100%]" alt="" />}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xl font-medium ml-2">{data.nome}</span>
                                            <span className="text-sm ml-2">{data.notificacao} {data.nome}.</span>
                                        </div>
                                    </div>
                                ))
                                : <div className="flex justify-center items-center h-40 border-t-2 border-verde-padrao">
                                    <Oval
                                        height={50}
                                        color="#00cc69"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                        ariaLabel='oval-loading'
                                        secondaryColor="#00cc69"
                                        strokeWidth={1}
                                        strokeWidthSecondary={4}
                                    />
                                </div>}
                        </div>
                    </div>
                </div>
            </>}
        </div>
    )
}
