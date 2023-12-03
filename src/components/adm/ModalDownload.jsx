import ModalCustom from "@/components/main/ModalCustom";
import CsvIcon from "@/assets/icons/csv_icon.png";
import TxtIcon from "@/assets/icons/txt_icon.png";
import pdf from "@/assets/pdf/Documento de Layout - Manuall.pdf";
import axios from "@/api/axios";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "react-tooltip";
import { useState } from "react";
import { ThreeCircles } from "react-loader-spinner";

export default function ModalDownload({ modalGettr, modalSettr }) {
    const [csvLoading, setCsvLoading] = useState(false);
    const [txtLoading, setTxtLoading] = useState(false);

    const csv = () => {
        setCsvLoading(true);
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
            .catch(console.log)
            .finally(() => setCsvLoading(false));
    };

    const txt = () => {
        setTxtLoading(true);
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
            .catch(console.log)
            .finally(() => setTxtLoading(false));
    };

    return (
        <ModalCustom modalGettr={modalGettr} modalSettr={modalSettr} canClose>
            <div className="flex flex-col justify-center items-center gap-12 p-12">
                <span className="text-lg text-center">
                    Baixe a lista de prestadores para acessar de onde quiser
                </span>
                <div className="flex justify-evenly w-full">
                    <button
                        className="w-[150px] h-[150px] bg-white border-2 hover:bg-gray-100 transition-colors border-gray-300 rounded-xl flex items-center justify-center"
                        onClick={csv}
                    >
                        {csvLoading ? (
                            <ThreeCircles
                                height={80}
                                width={80}
                                color="#1fb35b"
                                visible={true}
                                ariaLabel="three-circles-rotating"
                            />
                        ) : (
                            <div
                                className="gap-2 w-full h-full flex flex-col items-center justify-center"
                                onClick={csv}
                            >
                                <img
                                    src={CsvIcon}
                                    className="h-[80px]"
                                    alt=""
                                />
                                Formato CSV
                            </div>
                        )}
                    </button>
                    <button className="relative w-[150px] h-[150px] bg-white border-2 hover:bg-gray-100 transition-colors border-gray-300 rounded-xl flex items-center justify-center">
                        {txtLoading ? (
                            <ThreeCircles
                                height={80}
                                width={80}
                                color="#1fb35b"
                                visible={true}
                                ariaLabel="three-circles-rotating"
                            />
                        ) : (
                            <div
                                className="gap-2 w-full h-full flex flex-col items-center justify-center"
                                onClick={txt}
                            >
                                <img
                                    src={TxtIcon}
                                    className="h-[80px]"
                                    alt=""
                                />
                                Formato TXT
                            </div>
                        )}
                        <InformationCircleIcon
                            className="h-6 absolute top-2 right-2 text-gray-800"
                            data-tooltip-id="tooltipsId"
                            data-tooltip-content="Abrir documento de Layout"
                            data-tooltip-place="top"
                            onClick={() => (window.location.href = pdf)}
                        />
                    </button>
                </div>
            </div>
            <Tooltip id="tooltipsId" />
        </ModalCustom>
    );
}
