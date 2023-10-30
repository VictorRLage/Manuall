import { useData } from "@/data/CreateContext";
import Skeleton from "react-loading-skeleton";

export default function PrestadorServicos({ servicos, hasInfoLoaded }) {
    const { windowWidth } = useData();

    return (
        <div className="flex flex-col">
            <div
                className={`h-40 w-full bg-verde-escuro-1 ${
                    windowWidth < 700
                        ? windowWidth < 500
                            ? "px-8"
                            : "px-16"
                        : "px-32"
                } flex items-end`}
                style={{
                    clipPath:
                        "polygon(0 100%, 100% 100%, 100% 0, 85% 15%, 72% 20%, 59% 25%, 48% 22%, 39% 17%, 31% 10%, 24% 6%, 14% 4%, 5% 7%, 0 13%)",
                }}
            >
                <div className="bg-white w-[600px] h-24 text-verde-escuro-1 text-3xl font-semibold flex items-center px-16 rounded-tr-[90%] rounded-tl-[80px]">
                    Serviços Oferecidos
                </div>
            </div>
            <div
                className={`w-full ${
                    windowWidth < 700
                        ? windowWidth < 500
                            ? "px-8"
                            : "px-16"
                        : "px-32"
                } bg-verde-escuro-1 flex`}
            >
                <div className="bg-white w-[600px] py-4 text-verde-escuro-1 text-xl font-semibold flex flex-col justify-center px-16 gap-4">
                    {hasInfoLoaded
                        ? servicos?.map(({ id, nome }) => (
                              <div key={id} className="flex gap-2">
                                  <div className="text-[8px]">⬤</div>
                                  {nome}
                              </div>
                          ))
                        : Array.from({ length: 3 }).map((_, i) => (
                              <Skeleton key={i} />
                          ))}
                </div>
            </div>
            <div
                className={`h-30 w-full bg-verde-escuro-1 ${
                    windowWidth < 700
                        ? windowWidth < 500
                            ? "px-8"
                            : "px-16"
                        : "px-32"
                } flex items-start`}
                style={{
                    clipPath:
                        "polygon(0% 0%, 100% 0%, 100% 88%, 90% 78%, 82% 71%, 73% 70%, 61% 73%, 56% 76%, 50% 79%, 41% 83%, 40% 84%, 34% 85%, 24% 86%, 14% 81%, 5% 70%, 0 58%)",
                }}
            >
                <div className="bg-white w-[600px] h-12 rounded-bl-[50px] rounded-br-[50px]" />
            </div>
        </div>
    );
}
