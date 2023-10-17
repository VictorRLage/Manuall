import Carousel from "@/components/home/Carousel";
import BannerBase1 from "@/assets/manuall/banner_base1.jpg";
import BannerBase1Responsive from "@/assets/manuall/banner_base1_responsive.jpg";
import BannerBase2 from "@/assets/manuall/banner_base2.jpg";
import BannerBase3 from "@/assets/manuall/banner_base3.jpg";
import elemento1 from "@/assets/manuall/banner_2_element_1.png";
import elemento2 from "@/assets/manuall/banner_2_element_2.png";
import elemento3 from "@/assets/manuall/banner_3_element_3.png";
import { useNavigate } from "react-router-dom";
import { useData } from "@/data/CreateContext";

export default function CarouselHome() {
    const navigate = useNavigate();
    const { windowWidth } = useData();

    return (
        <Carousel
            slides={[
                <div
                    className={`min-w-full h-full bg-cover flex items-center bg-[#278054] ${
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
                    className="min-w-full h-full bg-cover bg-[#09dea6]"
                    style={{
                        backgroundImage: `url(${BannerBase2})`,
                        backgroundPosition: "bottom",
                    }}
                >
                    <div
                    className={`min-w-[480px] w-[40%] h-full relative flex items-center justify-center ${windowWidth > 1200
                            ? "mr-[50%]"
                            : windowWidth > 1100
                                ? "mr-[45%]"
                                : windowWidth > 1000
                                    ? "mr-[40%]"
                                    : ""} ${windowWidth > 800
                            ? "scale-[1]"
                            : windowWidth > 600
                                ? "scale-[0.8]"
                                : windowWidth > 500
                                    ? "scale-[0.6]"
                                    : "scale-[0.5]"}`}
                    >
                    <span className="text-black rounded-full px-4 font-extrabold text-2xl tracking-wide absolute mb-[270px] ml-[110px]"> 
                    PROMOÇÃO PARA PRESTADORES: 
                    </span>
                    <div className="absolute flex justify-center items-center mb-[70px] ml-[100px]"
                        style={{
                            backgroundImage: `url(${elemento1})`,
                            backgroundSize: "100% 100%",
                            backgroundPosition: "center",
                            
                        }}
                    >
                        <span className="text-white rounded-full px-14 font-extrabold text-7xl tracking-wide text-center ">
                        PRIMEIRO MÊS
                        </span>
                    </div>
                
                    <div
                        className="absolute flex justify-center items-center mt-[140px] ml-[100px] w-[300px] h-[50px]"
                        style={{
                            backgroundImage: `url(${elemento2})`,
                            backgroundSize: "100% 100%",
                            backgroundPosition: "center",
                        }}
                    >
                        <span className="text-white font-bold text-5xl tracking-wide relative mr-[25px]">
                            15% 
                        </span>
                        <span className="text-black font-bold text-2xl">
                            de desconto
                        </span>
                    </div>
                    
                    <span className="text-[#278054] font-bold text-2xl tracking-wide absolute mt-[225px] ml-[100px]">
                       *em qualquer plano de serviço
                    </span>
                    <button
                        className="text-[#278054] bg-white px-8 font-extrabold text-3xl rounded-3xl py-3 absolute mt-[350px] ml-[100px]"
                        onClick={() => {
                            navigate("/cadastro/prestador");
                        } }
                    >
                        CADASTRAR
                    </button>
                    </div>
                </div>,
    
                <div
                        className="min-w-full h-full bg-cover bg-[#278054]"
                        style={{
                            backgroundImage: `url(${BannerBase3})`,
                            backgroundPosition: "bottom",
                        }} 
                >
                    <div
                    className={`min-w-[480px] w-[40%] h-full relative flex items-center justify-center ${windowWidth > 1200
                            ? "mr-[50%]"
                            : windowWidth > 1100
                                ? "mr-[45%]"
                                : windowWidth > 1000
                                    ? "mr-[40%]"
                                    : ""} ${windowWidth > 800
                            ? "scale-[1]"
                            : windowWidth > 600
                                ? "scale-[0.8]"
                                : windowWidth > 500
                                    ? "scale-[0.6]"
                                    : "scale-[0.5]"}`}
                >
                    <div className="absolute mb-[300px] ml-[170px] w-[500px]"
                        // style={{
                        //     backgroundImage: `url(${elemento3})`,
                        //     backgroundSize: "100% 100%",
                        //     backgroundPosition: "center",
                        // }}
                    >
                        <span className="text-white bg-[#278054] px-4 font-extrabold text-4xl tracking-wide ">
                                FÁCIL CONTATO
                        </span>
                    </div>
            
                    <span className="text-[#c6faed] bg-[#278054] rounded-full px-4 font-bold text-8xl tracking-wide absolute mb-[100px] ml-[160px]"
                        style={{ 
                            textShadow: "0 0 10px, 0 0 20px, 0 0 30px #8aefd1, 0 0 40px #8aefd1"
                        }}
                    >
                    ENCONTRE
                    </span>
                    <span className="text-[#c6faed] bg-[#278054] font-bold text-8xl tracking-wide absolute mt-[90px] ml-[200px] "
                        style={{ 
                            textShadow: "0 0 10px, 0 0 20px, 0 0 30px #8aefd1, 0 0 40px #8aefd1"
                        }}
                    >
                    PRESTADORES
                    </span>
                    <button
                        className="text-[#278054] bg-white px-8 font-extrabold text-3xl rounded-3xl py-3 absolute mt-[350px] ml-[150px]"
                        onClick={() => {
                            navigate("/prestadores");
                        } }
                    >
                        ENCONTRAR
                    </button>
                    </div>
                </div>
            ]}
        />
    );
}
