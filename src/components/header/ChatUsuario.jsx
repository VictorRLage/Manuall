import BlueCheckmark from "@/assets/icons/blue_checkmark.svg";
import ClockIcon from "@/assets/icons/clock_icon.png";
import GrayCheckmark from "@/assets/icons/gray_checkmark.svg";

export default function ChatUsuario({ chat }) {
    return chat.mensagens.map(
        (
            {
                solicitacaoId,
                tempId,
                id,
                anexo,
                visto,
                selfSender,
                horario,
                mensagem,
                loading,
            },
            i,
        ) => {
            const isFirstMsgOfChunk = chat.mensagens[i - 1]
                ? selfSender
                    ? !chat.mensagens[i - 1].selfSender
                    : chat.mensagens[i - 1].selfSender
                : true;
            return (
                <div
                    key={i}
                    className={`w-full px-3 pb-0.5 flex ${
                        selfSender ? "justify-end" : "justify-start"
                    } ${isFirstMsgOfChunk && "pt-2"}`}
                    style={{
                        animation: "pop_up_test 150ms",
                    }}
                >
                    {!selfSender && isFirstMsgOfChunk && (
                        <div
                            className="w-2 h-3 bg-[#c0e8c0]"
                            style={{
                                clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                            }}
                        />
                    )}
                    <div
                        className={`max-w-[80%] p-2 rounded-lg flex flex-col ${
                            selfSender
                                ? `bg-[rgb(132,208,171)] items-end ${
                                      isFirstMsgOfChunk
                                          ? "rounded-tr-none"
                                          : "mr-2"
                                  }`
                                : `bg-[#c0e8c0] items-start ${
                                      isFirstMsgOfChunk
                                          ? "rounded-tl-none"
                                          : "ml-2"
                                  }`
                        }`}
                    >
                        <span className="break-words max-w-full">
                            {mensagem}
                        </span>
                        <div className="flex justify-center items-center gap-1">
                            <span className="text-gray-800 text-[10px] opacity-70">
                                {new Date(horario)
                                    .getDate()
                                    .toString()
                                    .padStart(2, "0")}
                                /{new Date(horario).getMonth() + 1}
                                {" - "}
                                {new Date(horario).getHours()}:
                                {new Date(horario).getMinutes()}
                            </span>
                            {selfSender &&
                                (loading == true ? (
                                    <img
                                        src={ClockIcon}
                                        className="h-[8px] opacity-70"
                                        alt=""
                                    />
                                ) : visto ? (
                                    <img
                                        src={BlueCheckmark}
                                        className="h-[8px] opacity-70"
                                        alt=""
                                    />
                                ) : (
                                    <img
                                        src={GrayCheckmark}
                                        className="h-[8px] opacity-70"
                                        alt=""
                                    />
                                ))}
                        </div>
                    </div>
                    {selfSender && isFirstMsgOfChunk && (
                        <div
                            className="w-2 h-3 bg-[rgb(132,208,171)]"
                            style={{
                                clipPath: "polygon(0 0, 100% 0, 0 100%)",
                            }}
                        />
                    )}
                </div>
            );
        },
    );
}
