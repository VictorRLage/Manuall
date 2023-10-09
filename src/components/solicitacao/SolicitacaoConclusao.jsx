import WaitingBro from "@/assets/storyset/Waiting_bro.svg";

export default function SolicitacaoConclusao() {
    return (
        <div className="w-full h-full flex flex-col justify-between items-center">
            <div className="flex flex-col justify-center items-center pt-10">
                <div className="w-full flex justify-center items-center text-verde-escuro-1 text-2xl font-extrabold">
                    SUA SOLICITAÇÃO FOI REALIZADA COM SUCESSO!
                </div>
                <div className="flex justify-center items-center text-black text-lg font-base text-center">
                    Aguarde o retorno do prestador!
                </div>
            </div>
            <img
                src={WaitingBro}
                alt="Ícone de Rapaz esperando"
                className="w-[450px]"
            />
        </div>
    );
}
