import Carousel from "@/components/home/Carousel";
import BannerBase1 from "@/assets/manuall/banner_base1.jpg";
import BannerBase1Responsive from "@/assets/manuall/banner_base1_responsive.jpg";
import BannerBase2 from "@/assets/manuall/banner_base2.jpg";
import BannerBase3 from "@/assets/manuall/banner_base3.jpg";
import { useNavigate } from "react-router-dom";
import { useData } from "@/data/CreateContext";

export default function CarouselHome() {
    const navigate = useNavigate();
    const { windowWidth } = useData();

    return (
        <Carousel
            slides={[
                <div
                    className={`min-w-full h-full bg-cover flex items-center ${
                        windowWidth <= 1000 && "justify-center"
                    }`}
                    style={
                        windowWidth > 1000
                            ? {
                                  backgroundImage: `url(${BannerBase1})`,
                                  backgroundPosition: "bottom",
                              }
                            : {
                                  backgroundImage: `url(${BannerBase1Responsive})`,
                                  backgroundSize: "100% 100%",
                              }
                    }
                >
                    <div
                        className={`min-w-[480px] w-[40%] h-full relative flex items-center justify-center ${
                            windowWidth > 1200
                                ? "ml-[50%]"
                                : windowWidth > 1100
                                ? "ml-[45%]"
                                : windowWidth > 1000
                                ? "ml-[40%]"
                                : ""
                        } ${
                            windowWidth > 800
                                ? "scale-[1]"
                                : windowWidth > 600
                                ? "scale-[0.8]"
                                : windowWidth > 500
                                ? "scale-[0.6]"
                                : "scale-[0.5]"
                        }`}
                    >
                        <span className="text-[#02ff88] bg-[#278054] rounded-full px-4 font-extrabold text-9xl tracking-wide absolute mb-[150px] mr-[200px]">
                            serviços
                        </span>
                        <span className="text-white bg-[#278054] rounded-full px-4 font-extrabold text-8xl tracking-wide absolute mt-[50px] ml-[50px]">
                            especializados
                        </span>
                        <span className="text-[#35e995] font-bold text-3xl tracking-wide absolute mt-[200px] ml-[50px]">
                            *a partir de R$49,99
                        </span>
                        <button
                            className="text-[#278054] bg-white px-8 font-extrabold text-3xl rounded-3xl py-3 absolute mt-[350px] ml-[50px]"
                            onClick={() => {
                                navigate("/prestadores");
                            }}
                        >
                            ENCONTRAR
                        </button>
                    </div>
                </div>,
                <div
                    className="min-w-full h-full bg-cover"
                    style={{
                        backgroundImage: `url(${BannerBase2})`,
                        backgroundPosition: "bottom",
                    }}
                />,
                <div
                    className="min-w-full h-full bg-cover"
                    style={{
                        backgroundImage: `url(${BannerBase3})`,
                        backgroundPosition: "bottom",
                    }}
                />,
            ]}
        />
    );
}
