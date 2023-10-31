export default function ChatUsuario({ chat }) {
    return chat.mensagens.map(({ anexo, horario, selfSender, mensagem }, i) => {
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
                    className={`max-w-[80%] p-2 rounded-lg break-words ${
                        selfSender
                            ? `bg-[#5faf88] ${
                                  isFirstMsgOfChunk ? "rounded-tr-none" : "mr-2"
                              }`
                            : `bg-[#c0e8c0] ${
                                  isFirstMsgOfChunk ? "rounded-tl-none" : "ml-2"
                              }`
                    }`}
                >
                    {mensagem}
                </div>
                {selfSender && isFirstMsgOfChunk && (
                    <div
                        className="w-2 h-3 bg-[#5faf88]"
                        style={{
                            clipPath: "polygon(0 0, 100% 0, 0 100%)",
                        }}
                    />
                )}
            </div>
        );
    });
}
