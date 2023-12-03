import ModalCustom from "@/components/main/ModalCustom";
import axios from "@/api/axios";
import FileUploadGreen from "@/assets/icons/file_upload_green.png";
import FileUploadWhite from "@/assets/icons/file_upload_white.png";
import { useState } from "react";

export default function ModalUpload({ modalGettr, modalSettr }) {
    const [file, setFile] = useState(undefined);
    const [dragging, setDragging] = useState(false);

    const upload = () => {
        let splitted = file.name.split(".");
        const extension = splitted[splitted.length - 1];
        if (["csv", "txt"].includes(extension)) {
            const blob = new Blob([file], {
                type: "application/json",
            });
            const data = new FormData();
            data.append("arquivo", blob);
            axios
                .post(`/usuario/aprovacoesPendentes/${extension}`, data)
                .then(() => {
                    alert("td certo");
                    setFile(undefined);
                    modalSettr(false);
                })
                .catch(() => alert("deu ruim"));
        } else {
            alert("Formato de arquivo inválido");
        }
    };

    return (
        <ModalCustom modalGettr={modalGettr} modalSettr={modalSettr} canClose>
            <div className="flex flex-col justify-center items-center gap-6 p-10">
                <span className="text-lg">
                    Reenvie a lista de prestadores com os status alterados
                </span>
                <div className="w-[300px] h-[150px] flex items-center justify-center">
                    <input
                        type="file"
                        className="hidden w-0 h-0 absolute"
                        id="ghostinput"
                        onChange={({ target }) => setFile(target.files[0])}
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
                            setFile(e.dataTransfer.files[0]);
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
                                    <span className="text-black font-normal">
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
                <button
                    onClick={upload}
                    className="bg-[#008042] text-white px-4 py-1 text-lg rounded-lg hover:bg-green-800 transition-colors"
                >
                    Enviar
                </button>
            </div>
        </ModalCustom>
    );
}
