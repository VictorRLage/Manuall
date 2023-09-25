import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import homeBg from "@/assets/demo/home_bg.jpeg";
import HomeBg1 from "@/assets/shapes/home_bg_1.svg?react";
import HomeBg2 from "@/assets/shapes/home_bg_2.svg?react";
import HomeBg3 from "@/assets/shapes/home_bg_3.svg?react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Carousel() {
    const navigate = useNavigate();

    const [carouselIndex, setCarouselIndex] = useState(0);

    return (
        <div
            className="w-full h-120 bg-center bg-cover duration-500 group"
            style={{
                backgroundImage: `url(${homeBg})`,
            }}
        >
            {carouselIndex === 0 ? (
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
            )}
            <div className="flex flex-row justify-between">
                <div
                    onClick={() => {
                        setCarouselIndex((carouselIndex + 3 - 1) % 3);
                    }}
                    className="z-30 mt-48 cursor-pointer hidden group-hover:block"
                >
                    <ChevronLeftIcon className="text-white w-16 h-16" />
                </div>
                <div
                    onClick={() => {
                        setCarouselIndex((carouselIndex + 1) % 3);
                    }}
                    className="z-30 mt-48 right-0 cursor-pointer hidden group-hover:block"
                >
                    <ChevronRightIcon className="text-white w-16 h-16" />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="z-30 hidden group-hover:flex cursor-pointer w-24 mt-48 justify-between ">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            onClick={() => setCarouselIndex(i)}
                            className={`w-6 h-6 border-2 border-verde-escuro-2 rounded-full ${
                                carouselIndex === i ? "bg-#268054" : "bg-white"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
