import { Fragment } from "react";
import ChevronArrow from "@/assets/icons/ChevronArrow.svg";
import HomeBg1 from "@/assets/shapes/home_bg_1.svg?react";
import HomeBg2 from "@/assets/shapes/home_bg_2.svg?react";
import HomeBg3 from "@/assets/shapes/home_bg_3.svg?react";
import React, { useEffect, useRef, useState } from "react";

export default function Carousel() {
    const scrollingDiv = useRef(null);

    const [carouselIndex, setCarouselIndex] = useState(0);
    const [currentSlides, setCurrentSlides] = useState([]);
    const [carouselAutoChangingTimeout, setCarouselAutoChangingTimeout] =
        useState(0);
    const [carouselIndexesTimeout, setCarouselIndexesTimeout] = useState(0);

    const [canUserChange, setCanUserChange] = useState(true);

    useEffect(() => {
        clearTimeout(carouselIndexesTimeout);
        clearTimeout(carouselAutoChangingTimeout);

        setCurrentSlides([...currentSlides, carouselIndex]);
        setCarouselAutoChangingTimeout(
            setTimeout(() => {
                setCarouselIndex((carouselIndex + 1) % 3);
            }, 15000),
        );
    }, [carouselIndex]);

    useEffect(() => {
        if (currentSlides.length >= 2) {
            scrollingDiv.current.scrollLeft = 15000;

            setCanUserChange(false);

            setCarouselIndexesTimeout(
                setTimeout(() => {
                    setCanUserChange(true);
                    setCurrentSlides([currentSlides[currentSlides.length - 1]]);
                }, 500),
            );
        }
    }, [currentSlides]);

    const allSlides = [
        <div className="min-w-full h-full bg-red-950" />,
        <div className="min-w-full h-full bg-blue-950" />,
        <div className="min-w-full h-full bg-green-950" />,
    ];

    return (
        <div className="w-full h-120 group flex justify-center relative overflow-x-hidden">
            <button
                onClick={() => {
                    canUserChange &&
                        setCarouselIndex(
                            (carouselIndex + allSlides.length - 1) %
                                allSlides.length,
                        );
                }}
                className="w-12 h-12 bg-no-repeat z-30 absolute left-[-56px] self-center cursor-pointer flex group-hover:left-4 bg-gray-100 hover:bg-gray-200 transition-all rounded-full items-center justify-center"
                style={{
                    backgroundImage: `url(${ChevronArrow})`,
                    backgroundSize: "80%",
                    backgroundPosition: "1px 5px",
                }}
            />
            <button
                onClick={() => {
                    canUserChange && setCarouselIndex((carouselIndex + 1) % 3);
                }}
                className="rotate-180 w-12 h-12 bg-no-repeat z-30 absolute right-[-56px] self-center cursor-pointer flex group-hover:right-4 bg-gray-100 hover:bg-gray-200 transition-all rounded-full items-center justify-center"
                style={{
                    backgroundImage: `url(${ChevronArrow})`,
                    backgroundSize: "80%",
                    backgroundPosition: "1px 5px",
                }}
            />
            <div className="self-end absolute">
                <div className="flex gap-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className="w-6 h-2 bg-gray-400 cursor-pointer"
                            onClick={() => {
                                canUserChange && setCarouselIndex(i);
                            }}
                        >
                            <div
                                className="h-full w-0 bg-verde-escuro-1"
                                style={{
                                    width: carouselIndex > i ? "100%" : "0%",
                                    animation:
                                        carouselIndex === i &&
                                        "preenchimento 15000ms linear forwards",
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div
                className="min-w-full max-w-full h-full overflow-x-hidden flex scroll-smooth"
                ref={scrollingDiv}
            >
                {currentSlides.map((it, i) => (
                    <Fragment key={i}>{allSlides[it]}</Fragment>
                ))}
            </div>
        </div>
    );
}

{
    /* {carouselIndex === 0 ? (
                <div className="absolute">
                    <div className="absolute ml-20 mt-20 text-white text-6xl">
                        Encontre <br /> prestadores de <br /> serviço{" "}
                        <span className="font-bold">excelentes</span> <br />{" "}
                        prontos para te <br />{" "}
                        <span className="font-bold">ensinar!</span>
                    </div>
                    <button
                        onClick={() => {
                            navigate("/login");
                        }}
                        className="absolute w-32 h-12 bg-white rounded-full text-2xl text-verde-escuro-2 font-semibold mt-88 ml-112 ring-4 ring-verde-padrao focus:outline-none focus:ring"
                    >
                        Encontrar
                    </button>
                    <HomeBg1 />
                </div>
            ) : carouselIndex === 1 ? (
                <div className="absolute flex">
                    <div className="absolute ml-[66rem] mt-20 text-white text-6xl text-right">
                        Venha <span className=" font-bold">mudar</span> <br /> o
                        mercado de <br />{" "}
                        <span className="font-bold">
                            prestadores de <br /> serviço{" "}
                        </span>{" "}
                        com <br /> a gente
                    </div>
                    <button
                        className="absolute w-32 h-12 bg-white rounded-full text-2xl text-verde-escuro-2 font-semibold mt-88 ml-[62rem] ring-4 ring-verde-padrao focus:outline-none focus:ring "
                        onClick={() => {
                            navigate("/cadastro/prestador");
                        }}
                    >
                        Cadastrar
                    </button>
                    <HomeBg2 className="ml-[52rem]" />
                </div>
            ) : (
                carouselIndex === 2 && (
                    <div className="absolute flex justify-center">
                        <div className="absolute ml-52 mt-13 text-white text-6xl text-center">
                            Com a <span className="font-bold">Manuall</span>{" "}
                            <br /> você pode passar o seu <br />{" "}
                            <span className="font-bold">conhecimento</span>{" "}
                            adiante e <br /> deixar o seu{" "}
                            <span className="font-bold">legado</span>
                        </div>
                        <button
                            className="absolute w-32 h-12 bg-white rounded-full text-2xl text-verde-escuro-2 font-semibold mt-84 ml-52 ring-4 ring-verde-padrao focus:outline-none focus:ring "
                            onClick={() => {
                                navigate("/cadastro/prestador");
                            }}
                        >
                            Cadastrar
                        </button>
                        <HomeBg3 className="ml-52 mt-3" />
                    </div>
                )
            )} */
}