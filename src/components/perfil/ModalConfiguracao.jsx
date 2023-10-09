import BgModal from "@/assets/shapes/ModalBg.png";
import ModalCustom from "@/components/main/ModalCustom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ModalConfiguracao({
  modalGettr,
  modalSettr,
}) {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRating = (index) => {
    setRating(index);
  };

  return (
    <ModalCustom
      modalGettr={modalGettr}
      modalSettr={modalSettr}
      canClose={false}
    >
      <div
        className="bg-white w-144 h-88 flex flex-col items-center rounded-lg bg-cover bg-center"
        style={{ backgroundImage: `url(${BgModal})` }}
      >
        <div className="h-[33%] w-full flex justify-center items-center text-verde-escuro-1 text-3xl font-extrabold">
          Como foi o serviço do (NOME)?
        </div>
        <div className="h-[18%] w-full flex justify-center items-center">
          {[1, 2, 3, 4, 5].map((star, index) => (
            <span
              key={index}
              onMouseEnter={() => setHoveredRating(index + 1)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => handleRating(index + 1)}
              className={
                (hoveredRating > 0 && index < hoveredRating) ||
                (hoveredRating === 0 && index < rating)
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
          />
          <button
            className="bg-verde-padrao hover:bg-[rgb(16,166,93)] text-white rounded-lg text-xl px-6 py-2 transition-all"
            onClick={() => {
              navigate("/login");
            }}
          >
            Avaliar
          </button>
        </div>
      </div>
    </ModalCustom>
  );
}
