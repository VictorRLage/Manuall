import ModalCustom from "@/components/main/ModalCustom";
import axios from "@/api/axios";

export default function ModalDownload({ modalGettr, modalSettr }) {
    const csv = () => {
        axios
            .get("/usuario/aprovacoesPendentes/csv")
            .then((res) => {
                const element = document.createElement("a");
                element.setAttribute(
                    "href",
                    "data:text/plain;charset=utf-8," +
                        encodeURIComponent(res.data),
                );
                element.setAttribute("download", "aprovacoesPendentes.csv");
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            })
            .catch(console.log);
    };

    const txt = () => {
        axios
            .get("/usuario/aprovacoesPendentes/txt")
            .then((res) => {
                const element = document.createElement("a");
                element.setAttribute(
                    "href",
                    "data:text/plain;charset=utf-8," +
                        encodeURIComponent(res.data),
                );
                element.setAttribute("download", "aprovacoesPendentes.txt");
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            })
            .catch(console.log);
    };

    return (
        <ModalCustom modalGettr={modalGettr} modalSettr={modalSettr} canClose>
            <div className="w-[500px] h-[500px] flex flex-col justify-center items-center gap-12">
                <button className="px-4 py-2 bg-pink-500" onClick={csv}>
                    CSV
                </button>
                <button className="px-4 py-2 bg-pink-500" onClick={txt}>
                    TXT
                </button>
            </div>
        </ModalCustom>
    );
}
