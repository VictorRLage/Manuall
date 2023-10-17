import ModalCustom from "@/components/main/ModalCustom";

export default function ModalReceberSolicitacao({
    modalGettr,
    modalSettr,
    solicitacao,
}) {
    return (
        <ModalCustom
            modalGettr={modalGettr}
            modalSettr={modalSettr}
            canClose
            blurBackgroundStyle={{
                zIndex: "602",
            }}
            modalBackgroundStyle={{
                zIndex: "603",
            }}
        >
            <div className="w-[800px] p-[4%] h-[400px] gap-8 flex flex-col items-center justify-center">
                Modal de aprovar solicitação
                {solicitacao}
            </div>
        </ModalCustom>
    );
}
