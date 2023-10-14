import GreenOk from "@/assets/icons/green_ok.svg";
import RedX from "@/assets/icons/red_x.svg";
import { useEffect, useRef, useState } from "react";

export default function PlanoMinorCard({
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
            className="bg-white rounded-lg overflow-hidden flex flex-col"
            style={{
                width: 300 * mainElementScale + "px",
                height: 450 * mainElementScale + "px",
            }}
            ref={main}
        >
            <div className="w-full h-[90px] relative flex flex-col items-center justify-center">
                <div className="absolute flex flex-col items-center justify-center text-center text-white font-extrabold mb-4">
                    <span className="text-lg leading-6">Plano</span>
                    <span className="text-4xl leading-6">{titulo}</span>
                </div>
                <div className="bg-[#368943] h-[60px] w-full" />
                <div className="border-t-[30px] border-l-[150px] border-r-[150px] border-t-[#368943] border-transparent" />
            </div>
            <div className="flex flex-col justify-center gap-10 w-full grow px-10">
                {items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <img
                            src={item.has ? GreenOk : RedX}
                            alt={
                                item.has
                                    ? "Green Confirmation Icon"
                                    : "Red Negation Icon"
                            }
                            className="w-6"
                        />
                        <span>{item.component}</span>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center w-full">
                <button
                    onClick={comprar}
                    className="bg-[#368943] hover:bg-[#45af55] transition-colors w-[70%] h-[44px] mb-[33px] rounded-md text-white font-semibold text-xl"
                >
                    R${preco}/mês
                </button>
            </div>
        </div>
    );
}
