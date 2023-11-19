import banner2_elemento1 from "@/assets/manuall/banner_2_element_1.png";
import banner2_elemento2 from "@/assets/manuall/banner_2_element_2.png";
import banner3_elemento1 from "@/assets/manuall/banner_3_element_1.png";
import banner3_elemento2 from "@/assets/manuall/banner_3_element_2.png";
import BannerBase1 from "@/assets/manuall/banner_base1.jpg";
import BannerBase1Responsive from "@/assets/manuall/banner_base1_responsive.jpg";
import BannerBase2 from "@/assets/manuall/banner_base2.jpg";
import BannerBase3 from "@/assets/manuall/banner_base3.jpg";
import BannerBase3Responsive from "@/assets/manuall/banner_base3_responsive.jpg";
import Carousel from "@/components/home/Carousel";
import { useData } from "@/data/CreateContext";
import { useNavigate } from "react-router-dom";

export default function CarouselHome() {
    const navigate = useNavigate();
    const { windowWidth } = useData();

    return (
        <Carousel
            slides={[
                <div
                    className="min-w-full h-full bg-cover flex items-center bg-[#278054] max1000:justify-center"
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
                    <div className="min-w-[480px] w-[40%] h-full relative flex items-center justify-center min1200:ml-[50%] min1100:ml-[45%] min1000:ml-[40%] min800:scale-[1] min600:scale-[0.8] min500:scale-[0.6] scale-[0.5]">
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
                            className="text-[#278054] bg-white hover:bg-gray-200 transition-colors px-8 font-extrabold text-3xl rounded-3xl py-3 absolute mt-[350px] ml-[50px]"
                            onClick={() => {
                                navigate("/prestadores?pagina=1");
                            }}
                        >
                            ENCONTRAR
                        </button>
                    </div>
                </div>,
                <div
                    className="min-w-full h-full bg-cover bg-[#09dea6] flex max1000:justify-center"
                    style={
                        windowWidth > 1000
                            ? {
                                  backgroundImage: `url(${BannerBase2})`,
                                  backgroundPosition: "bottom",
                              }
                            : {}
                    }
                >
                    <div className="min-w-[480px] w-[40%] h-full relative flex items-center justify-center min1000:ml-[5%] min1200:ml-[7.5%] min800:scale-[1] min600:scale-[0.8] min500:scale-[0.6] scale-[0.5]">
                        <span className="rounded-full px-4 font-extrabold text-2xl tracking-wide absolute mb-[300px]">
                            PROMOÇÃO PARA PRESTADORES:
                        </span>
                        <img
                            src={banner2_elemento1}
                            className="mb-[100px] w-[450px]"
                            alt=""
                        />
                        <div className="absolute flex justify-center items-center w-[500px] mb-[100px] text-white font-extrabold text-[80px] leading-[70px] text-center">
                            PRIMEIRO MÊS
                        </div>
                        <div
                            className="absolute flex justify-center items-center mt-[120px] w-[400px] h-[60px]"
                            style={{
                                backgroundImage: `url(${banner2_elemento2})`,
                                backgroundSize: "100% 100%",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="w-full h-full relative flex items-center justify-center">
                                <span className="absolute text-white font-extrabold text-[55px] tracking-wide mr-[50%]">
                                    15%
                                </span>
                                <span className="absolute font-bold text-3xl ml-[40%]">
                                    de desconto
                                </span>
                            </div>
                        </div>
                        <span className="text-[#edfff6] font-bold text-2xl tracking-wide absolute mt-[225px]">
                            *em qualquer plano de serviço
                        </span>
                        <button
                            className="text-[#278054] bg-white hover:bg-gray-200 transition-colors px-8 font-extrabold text-3xl rounded-3xl py-3 absolute mt-[330px]"
                            onClick={() => navigate("/cadastro/prestador")}
                        >
                            CADASTRAR
                        </button>
                    </div>
                </div>,
                <div
                    className="min-w-full h-full bg-cover bg-[#278054] flex max1000:justify-center"
                    style={
                        windowWidth > 1000
                            ? {
                                  backgroundImage: `url(${BannerBase3})`,
                                  backgroundPosition: "bottom",
                              }
                            : {
                                  backgroundImage: `url(${BannerBase3Responsive})`,
                                  backgroundSize: "100% 100%",
                              }
                    }
                >
                    <div className="min-w-[480px] w-[40%] h-full relative flex items-center justify-center min1000:ml-[10%] min800:scale-[1] min600:scale-[0.8] min500:scale-[0.6] scale-[0.5]">
                        <div
                            className="absolute w-[25px] h-[25px] bg-[#0dd99f] mt-[50px] mr-[420px] rounded-full"
                            style={{
                                boxShadow: "0 0 75px 75px #0cdda3",
                            }}
                        >
                            <div className="w-full h-full flex justify-center items-center relative">
                                <img
                                    src={banner3_elemento2}
                                    className="absolute min-w-[200px]"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="text-white bg-[#0cdda3] font-medium text-3xl tracking-wide relative mb-[250px] h-[45px] w-[360px] flex items-center justify-center">
                            <img
                                className="absolute w-[135px] h-[80%] -left-18"
                                src={banner3_elemento1}
                                alt="decorativa"
                            />
                            <span className="ml-[40px]">FÁCIL CONTATO</span>
                        </div>
                        <span
                            className="text-[#c6faed] text-center leading-[70px] mt-[20px] font-bold text-8xl tracking-wide absolute"
                            style={{
                                textShadow: "0 0 10px, 0 0 20px #0cdda3",
                            }}
                        >
                            ENCONTRE PRESTADORES
                        </span>
                        <button
                            className="text-[#278054] bg-white hover:bg-gray-200 transition-colors px-7 font-bold text-3xl rounded-full py-3 absolute mt-[300px]"
                            onClick={() => {
                                navigate("/prestadores?pagina=1");
                            }}
                        >
                            ENCONTRAR
                        </button>
                    </div>
                </div>,
            ]}
        />
    );
}
