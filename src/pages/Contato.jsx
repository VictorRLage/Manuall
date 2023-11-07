import { useState } from "react";
import Header from "@/components/header/Header";
import fundoContato from "@/assets/shapes/MainBg.png";
import Skeleton from "react-loading-skeleton";
import imagemTelemarketing from "@/assets/demo/telemarketing.png";
import iconeTelefone from "@/assets/icons/phone.png";
import iconeMapa from "@/assets/icons/gps.png";
import iconeRelogio from "@/assets/icons/clock.png";
import Breadcrumb from "@/components/main/Breadcrumb";
import { useData } from "@/data/CreateContext";

export default function Contato() {
    const [iFrameIsLoading, setIFrameIsLoading] = useState(true);
    const [imgIsLoading, setImgIsLoading] = useState(true);

    const { windowWidth } = useData();

    return (
        <>
            <Header />
            <div className="w-full h-full bg-[#fafafa]">
                <div className="flex flex-row justify-center items-end h-20 relative">
                    {windowWidth > 1000 && (
                        <div className="absolute left-32">
                            <Breadcrumb
                                items={[
                                    { to: "/", desc: "Página Inicial" },
                                    { to: null, desc: "Contato" },
                                ]}
                            />
                        </div>
                    )}
                    <div className="text-4xl font-semibold text-center text-gray-900">
                        Contato
                    </div>
                </div>
                <div
                    className="flex justify-center items-center mb-16"
                    style={{
                        backgroundImage: `url(${fundoContato})`,
                        backgroundSize: "100% 100%",
                    }}
                >
                    <div
                        className={`w-full flex flex-wrap py-12 ${
                            windowWidth < 700
                                ? windowWidth < 500
                                    ? "px-8"
                                    : "px-16"
                                : "px-32"
                        } ${
                            windowWidth > 1150
                                ? "justify-between"
                                : "justify-center gap-12"
                        }`}
                    >
                        <div className="w-[400px] min-h-[450px] shadow-2xl rounded-md">
                            {iFrameIsLoading && (
                                <Skeleton width="100%" height="100%" />
                            )}
                            <iframe
                                title="formulario_contato"
                                className="w-[100%] h-[100%] rounded-md"
                                style={{
                                    display: iFrameIsLoading ? "none" : "block",
                                }}
                                src="https://app.pipefy.com/public/form/fdmepBpW?embedded=true"
                                onLoad={() => setIFrameIsLoading(false)}
                            />
                        </div>
                        <div className="w-[400px] shadow-2xl rounded-b-md flex flex-col">
                            <div className="w-[100%]">
                                {imgIsLoading && (
                                    <Skeleton width="100%" height="266.55px" />
                                )}
                                <img
                                    src={imagemTelemarketing}
                                    style={{
                                        display: imgIsLoading
                                            ? "none"
                                            : "block",
                                    }}
                                    onLoad={() => {
                                        setImgIsLoading(false);
                                    }}
                                    className="rounded-t-md"
                                />
                            </div>
                            <ul className="bg-verde-escuro-1 h-[100%] rounded-b-md flex flex-col px-4">
                                <li className="flex items-center py-4 gap-2">
                                    <img
                                        className="h-[20px]"
                                        src={iconeTelefone}
                                    />
                                    <span className="text-white">
                                        0800 773 3838
                                    </span>
                                </li>
                                <li className="flex items-center py-4 gap-2">
                                    <img className="h-[20px]" src={iconeMapa} />
                                    <span className="text-white">
                                        Rua Haddock Lobo, 595 São Paulo - SP
                                    </span>
                                </li>
                                <li className="flex items-center py-4 gap-2">
                                    <img
                                        className="h-[20px]"
                                        src={iconeRelogio}
                                    />
                                    <span className="text-white">
                                        Segunda à sexta - 8h às 17h
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
