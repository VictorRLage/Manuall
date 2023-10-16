import ModalCustom from "@/components/main/ModalCustom";
import { BellIcon } from "@heroicons/react/24/solid";

export default function ModalNotificacoes({ modalGettr, modalSettr }) {
    return (
        <ModalCustom
            modalGettr={modalGettr}
            modalSettr={modalSettr}
            canClose={true}
            blurBackgroundStyle={{
                zIndex: "600",
            }}
            modalBackgroundStyle={{
                zIndex: "601",
            }}
            modalStyle={{
                backgroundColor: "#268054",
            }}
        >
            <div className="w-[700px] p-[4%] h-[500px] gap-8 flex flex-col items-center justify-center">
                <div className="w-full flex items-center justify-center gap-4 text-white text-3xl font-semibold">
                    <BellIcon className="w-8 h-8" />
                    Notificações
                </div>
                <div className="h-[90%] w-full bg-white rounded-xl flex flex-col items-center p-2 gap-2 overflow-y-auto">
                    <div className="min-h-[70px] w-full bg-white border-[1px] border-[#268054] rounded-lg flex items-center justify-between p-4">
                        <span className="text-xl text-[#1F1F1F]">
                            Carlos Santana te enviou uma solicitação
                        </span>
                        <button className="bg-[#4DAF7F] text-white px-4 py-1 rounded-lg font-semibold">
                            Checar
                        </button>
                    </div>
                    <div className="min-h-[70px] w-full bg-white border-[1px] border-[#268054] rounded-lg flex items-center justify-between p-4">
                        <span className="text-xl text-[#1F1F1F]">
                            Você recusou a solicitação de Mario Carlos
                        </span>
                        <span className="text-[#767676]">10/10/23 15:32</span>
                    </div>
                    <div className="min-h-[70px] w-full bg-white border-[1px] border-[#268054] rounded-lg flex items-center justify-between p-4">
                        <span className="text-xl text-[#1F1F1F]">
                            Você aceitou a solicitação de Lucas Monte
                        </span>
                        <button className="bg-[#4DAF7F] text-white px-4 py-1 rounded-lg font-semibold">
                            Chat
                        </button>
                    </div>
                    <div className="min-h-[70px] w-full bg-white border-[1px] border-[#268054] rounded-lg flex items-center justify-between p-4">
                        <span className="text-xl text-[#1F1F1F]">
                            O seu serviço para Maria Santos já foi finalizado?
                        </span>
                    </div>
                </div>
            </div>
        </ModalCustom>
    );
}
