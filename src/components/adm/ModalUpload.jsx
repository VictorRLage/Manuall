import ModalCustom from "@/components/main/ModalCustom";
import axios from "@/api/axios";
import FileUploadGreen from "@/assets/icons/file_upload_green.png";
import FileUploadWhite from "@/assets/icons/file_upload_white.png";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useEffect } from "react";
import GreenOk from "@/assets/icons/green_ok.svg";

export default function ModalUpload({ modalGettr, modalSettr, refetch }) {
    const [file, setFile] = useState(undefined);
    const [dragging, setDragging] = useState(false);
    const [loading, setLoading] = useState(false);
    const [allRight, setAllRight] = useState(false);

    const [errorMsg, setErrorMsg] = useState(undefined);

    const getFile = (currFile) => {
        setFile(currFile);
        let splitted = currFile.name.split(".");
        const extension = splitted[splitted.length - 1];

        if (!["csv", "txt"].includes(extension)) {
            setErrorMsg("O arquivo deve ter o formato .csv ou .txt");
            return;
        } else {
            setErrorMsg(undefined);
        }
    };

    const upload = () => {
        let splitted = file.name.split(".");
        const extension = splitted[splitted.length - 1];

        if (!["csv", "txt"].includes(extension)) {
            setErrorMsg("O arquivo deve ter o formato .csv ou .txt");
            return;
        }

        setLoading(true);

        const blob = new Blob([file], {
            type: "application/json",
        });
        const data = new FormData();
        data.append("arquivo", blob);
        axios
            .post(`/usuario/aprovacoesPendentes/${extension}`, data)
            .then(() => {
                setAllRight(true);
                setFile(undefined);
                refetch();
            })
            .catch(() => {
                setErrorMsg(
                    "Ocorreu um erro ao enviar o arquivo; Revise os dados e tente novamente",
                );
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (modalGettr && allRight) {
            setAllRight(false);
        }
    }, [modalGettr]);

    return (
        <ModalCustom modalGettr={modalGettr} modalSettr={modalSettr} canClose>
            <div className="flex flex-col justify-center items-center gap-6 p-8">
                <span className="text-lg text-center">
                    Reenvie a lista de prestadores com os status alterados
                </span>
                {allRight ? (
                    <div className="p-6 flex flex-col items-center justify-center gap-4">
                        <img src={GreenOk} className="h-[50px]" alt="" />
                        <span>Dados atualizados com sucesso!</span>
                    </div>
                ) : (
                    <>
                        <div className="w-[300px] h-[150px] flex items-center justify-center">
                            <input
                                type="file"
                                className="hidden w-0 h-0 absolute"
                                id="ghostinput"
                                onChange={({ target }) =>
                                    getFile(target.files[0])
                                }
                            />
                            <label
                                htmlFor="ghostinput"
                                className={`w-[100%] h-[100%] rounded-xl flex items-center gap-3 transition-colors justify-center flex-col cursor-pointer ${
                                    dragging
                                        ? "bg-[#008042]"
                                        : "hover:bg-gray-100 border-2 border-gray-300"
                                }`}
                                onDragEnter={() => setDragging(true)}
                                onDragLeave={() => setDragging(false)}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setDragging(false);
                                    getFile(e.dataTransfer.files[0]);
                                }}
                            >
                                {dragging ? (
                                    <img
                                        src={FileUploadWhite}
                                        alt=""
                                        className="h-[60px]"
                                    />
                                ) : (
                                    <>
                                        <img
                                            src={FileUploadGreen}
                                            alt=""
                                            className="h-[60px]"
                                        />
                                        {file ? (
                                            <span className="text-black font-normal overflow-hidden max-w-[90%]">
                                                {file.name}
                                            </span>
                                        ) : (
                                            <span className="text-[#008042] font-semibold">
                                                Selecione um arquivo...
                                            </span>
                                        )}
                                    </>
                                )}
                            </label>
                        </div>
                        {errorMsg && (
                            <span className="text-yellow-600 text-center">
                                *{errorMsg}
                            </span>
                        )}
                        <button
                            onClick={upload}
                            className={`text-white w-[80px] h-[40px] flex items-center justify-center text-lg rounded-lg ${
                                errorMsg || !file
                                    ? "bg-gray-300"
                                    : "bg-[#008042] hover:bg-green-800 transition-colors"
                            }`}
                            disabled={errorMsg || !file}
                        >
                            {loading ? (
                                <ThreeDots height="15" color="#fff" />
                            ) : (
                                "Enviar"
                            )}
                        </button>
                    </>
                )}
            </div>
        </ModalCustom>
    );
}
