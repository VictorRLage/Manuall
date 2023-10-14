import WhiteOk from "@/assets/icons/white_ok.svg";
import RedX from "@/assets/icons/red_x.svg";
import { useEffect, useRef } from "react";
import { useState } from "react";

export default function PlanoMainCard({
    titulo,
    preco,
    comprar,
    items,
    mouseX,
}) {
    const main = useRef(null);

    const [mainElementScale, setMainElementScale] = useState(1.025);

    const [windowWidth, setWindowWidth] = useState(null);

    const [mainXLimitFrom, setMainXLimitFrom] = useState(null);
    const [mainXLimitTo, setMainXLimitTo] = useState(null);

    useEffect(() => {
        setWindowWidth(window.innerWidth);

        const { x: mainX, width: mainWidth } =
            main.current.getBoundingClientRect();

        setMainXLimitFrom(mainX);
        setMainXLimitTo(mainX + mainWidth);
    }, []);

    useEffect(() => {
        if (!mainXLimitFrom || !mainXLimitTo) return;

        if (mouseX > mainXLimitTo) {
            setMainElementScale(
                1 +
                    1 / 40 -
                    (mouseX - mainXLimitTo) /
                        (40 * (windowWidth - mainXLimitTo)),
            );
        } else if (mouseX < mainXLimitFrom) {
            setMainElementScale(1 + mouseX / mainXLimitFrom / 40);
        } else {
            setMainElementScale(1.025);
        }
    }, [mouseX]);

    return (
        <div
            className="bg-[#00793E] relative rounded-lg flex flex-col items-center px-10"
            style={{
                width: 325 * mainElementScale + "px",
                height: 500 * mainElementScale + "px",
            }}
            ref={main}
        >
            <div className="absolute right-4 -top-4 w-10 h-12 flex">
                <div className="w-2 h-4 border-b-[8px] border-t-[8px] border-l-[4px] border-r-[4px] border-b-[#C6A634] border-r-[#C6A634] border-transparent" />
                <div
                    className="w-8 h-12 bg-[#FFCE21]"
                    style={{
                        clipPath:
                            "polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%)",
                    }}
                />
            </div>
            <div className="mt-[50px] flex flex-col items-center justify-center text-center text-white font-extrabold mb-4">
                <span className="text-lg leading-6">Plano</span>
                <span className="text-4xl leading-6">{titulo}</span>
            </div>
            <div className="flex flex-col justify-center gap-10 grow text-white">
                {items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <img
                            src={item.has ? WhiteOk : RedX}
                            alt={
                                item.has
                                    ? "Green Confirmation Icon"
                                    : "Red Negation Icon"
                            }
                            className="w-6"
                        />
                        <span className="text-lg">{item.component}</span>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center w-full">
                <button
                    onClick={comprar}
                    className="bg-[#FFCE21] hover:bg-[rgb(255,219,87)] transition-colors w-[70%] h-[60px] mb-[33px] rounded-md text-[#222] font-extrabold text-2xl"
                >
                    R${preco}/mês
                </button>
            </div>
        </div>
    );
}
