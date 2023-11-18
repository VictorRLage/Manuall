import BgModal from "@/assets/shapes/ModalBg.png";
import ModalCustom from "@/components/main/ModalCustom";
import { useState } from "react";
import axios from "@/api/axios";

export default function ModalAvaliacao({
    modalGettr,
    modalSettr,
    notificacao,
    refetch,
}) {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);

    const [txtDescricao, setTxtDescricao] = useState("");

    const postarAvaliacao = () => {
        axios
            .post(`/solicitacao/postarAvaliacao`, {
                solicitacaoId: notificacao?.solicitacaoId,
                nota: rating,
                descricao: txtDescricao,
            })
            .then(() => {
                refetch();
                modalSettr(false);
            })
            .catch((err) => console.log(err));
    };

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
            <div
                className="bg-white text-center w-[300px] min500:w-[400px] min600:w-[576px] h-88 flex flex-col items-center rounded-lg bg-cover bg-center"
                style={{ backgroundImage: `url(${BgModal})` }}
            >
                <div className="h-[33%] w-full flex justify-center items-center text-verde-escuro-1 text-3xl font-extrabold">
                    Como foi o serviço de {notificacao?.nomeUsuario}?
                </div>
                <div className="h-[18%] w-full flex justify-center items-center">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                        <span
                            key={i}
                            onMouseEnter={() => setHoveredRating(i + 1)}
                            onMouseLeave={() => setHoveredRating(0)}
                            onClick={() => setRating(i + 1)}
                            className={
                                (hoveredRating > 0 && i < hoveredRating) ||
                                (hoveredRating === 0 && i < rating)
                                    ? "text-yellow-500 text-5xl cursor-pointer"
                                    : "text-gray-400 text-5xl cursor-pointer"
                            }
                        >
                            ★
                        </span>
                    ))}
                </div>
                <div className="h-[40%] w-full flex flex-col justify-center items-center">
                    <textarea
                        type="text"
                        placeholder="Escreva aqui sua avaliação:"
                        className="mb-4 px-4 py-2 w-3/4 border-2 rounded-2xl border-verde-escuro-1 focus:outline-none focus:border-verde-escuro-2"
                        value={txtDescricao}
                        onChange={(e) => setTxtDescricao(e.target.value)}
                    />
                    <button
                        className="bg-verde-padrao hover:bg-[rgb(16,166,93)] text-white rounded-lg text-xl px-6 py-2 transition-all"
                        onClick={postarAvaliacao}
                    >
                        Avaliar
                    </button>
                </div>
            </div>
        </ModalCustom>
    );
}
