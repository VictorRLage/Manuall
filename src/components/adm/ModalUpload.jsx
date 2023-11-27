import ModalCustom from "@/components/main/ModalCustom";
import axios from "@/api/axios";

export default function ModalUpload({ modalGettr, modalSettr }) {
    const upload = ({ target }) => {
        const blob = new Blob([target.files[0]], {
            type: "application/json",
        });
        const data = new FormData();
        data.append("arquivo", blob);
        axios.post("/usuario/aprovacoesPendentes/atualizarCsv", data);
    };

    return (
        <ModalCustom modalGettr={modalGettr} modalSettr={modalSettr} canClose>
            <div className="w-[500px] h-[500px] flex flex-col justify-center items-center gap-12">
                <input type="file" multiple={false} onChange={upload} />
            </div>
        </ModalCustom>
    );
}
