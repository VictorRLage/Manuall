export default function ModalEscolherConta({ setarUsuario, modal, entrar, check, notCheck }) {
    return (
        <div className="z-50 fixed h-screen w-screen bg-blur flex justify-center items-center">
            <div className="h-72 w-100 bg-white rounded-lg flex flex-col items-center p-10">
                <span className="text-3xl font-semibold">Você possui duas contas.</span>
                <span className="text-2xl mt-4">Com qual conta deseja acessar?</span>
                <div className=" flex flex-col items-center py-6 gap-4">
                    <button onClick={() =>{setarUsuario(1); modal(false); entrar(true); check(true); notCheck(false)}} className="w-42 h-12 text-2xl bg-verde-padrao rounded-full text-white">Contratante</button>
                    <button onClick={() =>{setarUsuario(2); modal(false); entrar(true); check(true); notCheck(false)}} className="w-42 h-12 text-2xl bg-verde-padrao rounded-full text-white">Prestador</button>
                </div>
            </div>
        </div>
    );
}
