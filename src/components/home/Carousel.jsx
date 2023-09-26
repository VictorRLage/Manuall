import ChevronArrow from "@/assets/icons/ChevronArrow.svg";
import homeBg from "@/assets/demo/home_bg.jpeg";
import HomeBg1 from "@/assets/shapes/home_bg_1.svg?react";
import HomeBg2 from "@/assets/shapes/home_bg_2.svg?react";
import HomeBg3 from "@/assets/shapes/home_bg_3.svg?react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Carousel() {
    const navigate = useNavigate();

    const size = 3;

    const [carouselIndex, setCarouselIndex] = useState(0);
    const [carouselAutoChangingTimeout, setCarouselAutoChangingTimeout] =
        useState(0);

    useEffect(() => {
        clearTimeout(carouselAutoChangingTimeout);

        setCarouselAutoChangingTimeout(
            setTimeout(() => {
                setCarouselIndex((carouselIndex + 1) % 3);
            }, 5000),
        );
    }, [carouselIndex]);

    const slides = [
        <div className="min-w-full h-full bg-red-950" />,
        <div className="min-w-full h-full bg-blue-950" />,
        <div className="min-w-full h-full bg-green-950" />,
    ]

    return (
        <div
            className="w-full h-120 bg-center bg-cover group flex justify-center relative overflow-x-hidden"
            style={{
                backgroundImage: `url(${homeBg})`,
            }}
        >
            <div
                onClick={() => {
                    setCarouselIndex((carouselIndex + size - 1) % size);
                }}
                className="w-12 h-12 bg-no-repeat z-30 absolute left-[-56px] self-center cursor-pointer flex group-hover:left-4 bg-gray-100 hover:bg-gray-200 transition-all rounded-full items-center justify-center"
                style={{
                    backgroundImage: `url(${ChevronArrow})`,
                    backgroundSize: "80%",
                    backgroundPosition: "1px 5px",
                }}
            />
            <div
                onClick={() => {
                    setCarouselIndex((carouselIndex + 1) % 3);
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
                            className="w-6 h-2 bg-gray-400 cursor-pointer"
                            onClick={() => {
                                setCarouselIndex(i);
                            }}
                        >
                            <div
                                className="h-full w-0 bg-verde-escuro-1"
                                style={{
                                    width: carouselIndex > i ? "100%" : "0%",
                                    animation:
                                        carouselIndex === i &&
                                        "preenchimento 5000ms linear forwards",
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            Array
            {/* {carouselIndex === 0 ? (
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
            )} */}
        </div>
    );
}
